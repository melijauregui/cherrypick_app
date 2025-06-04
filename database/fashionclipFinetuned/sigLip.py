from torch.nn.functional import cosine_similarity
import random
from huggingface_hub import HfApi, HfFolder, Repository
from io import BytesIO
import os
from rembg import remove
import pandas as pd
from PIL import Image
import requests
from tqdm import tqdm
from torch.utils.data import Dataset, DataLoader
from transformers import AutoProcessor, AutoModel
import torch
import torch.nn as nn
from torchvision import transforms
import torch.optim as optim
from huggingface_hub import create_repo, upload_file
# pip install nlpaug transformers sentencepiece
import random
from sklearn.model_selection import train_test_split
import torch.nn.functional as F
import multiprocessing

# --- CONFIGURACIÓN ---
BATCH_SIZE = 30
EPOCHS = 30
LR = 1e-5
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

NUM_WORKERS = min(4, os.cpu_count() or 1)
TEMPERATURE = 0.1
CACHE_DIR = "cached_images"

# print(f"Using {NUM_WORKERS} workers for data loading.")
data_transforms = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(7),
    transforms.RandomResizedCrop(224, scale=(0.9, 1.0)),
    transforms.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1),
    transforms.RandomAffine(degrees=5, translate=(0.02, 0.02))
])

# --- DATASET PERSONALIZADO ---


class FashionDataset(Dataset):
    def __init__(self, dataframe, processor, data_aug=False, n_augmented=5):
        self.dataframe = dataframe
        self.processor = processor
        self.n_augmented = n_augmented
        self.data_aug = data_aug
        self.augment = transforms.Compose([
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomRotation(5),
            transforms.RandomResizedCrop(224, scale=(0.95, 1.0)),
            transforms.ColorJitter(
                brightness=0.05, contrast=0.05, saturation=0.05),
            transforms.RandomAffine(degrees=3, translate=(0.01, 0.01)),
        ])

    def __len__(self):
        if not self.data_aug:
            return len(self.dataframe)
        else:
            return len(self.dataframe) * (self.n_augmented + 1)

    def __getitem__(self, idx):
        if not self.data_aug:
            row = self.dataframe.iloc[idx]
            is_augmented = False
        else:
            base_idx = idx // (self.n_augmented + 1)
            is_augmented = idx % (self.n_augmented + 1) != 0

            row = self.dataframe.iloc[base_idx]

        url = row["image"]
        filename = os.path.join(CACHE_DIR, os.path.basename(url).split("?")[0])
        processed_filename = filename.replace(
            ".jpg", "_nobg.jpg").replace(".png", "_nobg.png")
        name = processed_filename.split(".")[0]
        output_filename = name + ".png"

        try:
            if not os.path.exists(processed_filename):
                if not os.path.exists(filename):
                    response = requests.get(url, timeout=10)
                    response.raise_for_status()
                    image = Image.open(
                        BytesIO(response.content)).convert("RGB")
                    image.save(output_filename)
                else:
                    image = Image.open(filename).convert("RGB")

                no_bg = remove(image)
                no_bg.save(output_filename)
            else:
                no_bg = Image.open(processed_filename).convert("RGB")

                if is_augmented:
                    no_bg = self.augment(no_bg)
        except Exception as e:
            print(f"Error al cargar la imagen: {e}")
            return None
        text = row["description"]
        return image, text

# --- FUNCIONES AUXILIARES ---


def collate_fn(batch):
    batch = [item for item in batch if item is not None]
    if not batch:
        return [], []
    images, texts = zip(*batch)
    return list(images), list(texts)


def freeze_layers(model, n_layers=4):
    # Descongelar todas las capas
    for param in model.parameters():
        param.requires_grad = False

    # --- VISIÓN ---
    # Descongelar las últimas capas de visión
    if n_layers != 0:
        visual_blocks = model.model.visual.trunk.blocks
        for block in visual_blocks[-n_layers:]:
            for param in block.parameters():
                param.requires_grad = True

    # Descongelar la attn_pool
    for param in model.model.visual.trunk.attn_pool.parameters():
        param.requires_grad = True

    # --- TEXTO ---
    # Descongelar las últimas capas de texto
    if n_layers != 0:
        text_layers = model.model.text.transformer.resblocks
        for layer in text_layers[-n_layers:]:
            for param in layer.parameters():
                param.requires_grad = True

    # Descongelar la proyección de texto
    for param in model.model.text.text_projection.parameters():
        param.requires_grad = True


def contrastive_loss(image_embeds, text_embeds, margin=0.5):
    positive = cosine_similarity(image_embeds, text_embeds)

    negative = 1 - positive
    loss = torch.mean(torch.relu(margin - positive + negative))
    return loss


def contrastive_loss_InfoNCE(text_embeds, image_embeds, temperature=TEMPERATURE):
    text_embeds = F.normalize(text_embeds, dim=-1)
    image_embeds = F.normalize(image_embeds, dim=-1)

    logits = torch.matmul(text_embeds, image_embeds.T) / temperature
    labels = torch.arange(len(text_embeds)).to(logits.device)

    loss_i2t = F.cross_entropy(logits, labels)
    loss_t2i = F.cross_entropy(logits.T, labels)

    return (loss_i2t + loss_t2i) / 2


def compute_recall_at_k(image_embeds, text_embeds, k=5):
    sims = image_embeds @ text_embeds.T
    targets = torch.arange(len(image_embeds), device=sims.device)
    _, topk = sims.topk(k, dim=1)
    correct = topk.eq(targets.unsqueeze(1)).any(dim=1).float()
    return correct.mean().item()


def compute_mrr(image_embeds, text_embeds):
    sims = image_embeds @ text_embeds.T
    targets = torch.arange(len(image_embeds), device=sims.device)
    sorted_indices = sims.argsort(dim=1, descending=True)
    ranks = (sorted_indices == targets.unsqueeze(1)).nonzero()[:, 1] + 1
    reciprocal_ranks = 1.0 / ranks.float()
    return reciprocal_ranks.mean().item()


def validate(model, val_loader, processor, epoch, epochs, loss_func):
    model.eval()
    val_loss = 0.0
    all_image_embeds = []
    all_text_embeds = []
    with torch.no_grad():
        for images, texts in tqdm(val_loader, desc=f"Epoch {epoch+1}/{epochs} [Validation]"):
            if not images:
                continue

            inputs = processor(
                images=images, text=texts, return_tensors="pt",
                padding=True,
                truncation=True,
            ).to(DEVICE)

            pixel_values = inputs["pixel_values"]
            input_ids = inputs["input_ids"]
            attention_mask = inputs["attention_mask"]

            image_embeds = model.model.encode_image(pixel_values)
            text_embeds = model.get_text_features(
                input_ids=input_ids,
                attention_mask=attention_mask,
                normalize=True
            )

            image_embeds = image_embeds / \
                image_embeds.norm(p=2, dim=-1, keepdim=True)
            text_embeds = text_embeds / \
                text_embeds.norm(p=2, dim=-1, keepdim=True)

            all_image_embeds.append(image_embeds)
            all_text_embeds.append(text_embeds)

            loss = loss_func(image_embeds, text_embeds)
            val_loss += loss.item()

    avg_val_loss = val_loss / len(val_loader)
    image_embeds = torch.cat(all_image_embeds)
    text_embeds = torch.cat(all_text_embeds)

    recall_at_5 = compute_recall_at_k(image_embeds, text_embeds, k=5)
    mrr = compute_mrr(image_embeds, text_embeds)
    print(f"🧪 Epoch {epoch+1} - Validation Loss: {avg_val_loss:.4f}")
    print(f"🔍 Recall@5: {recall_at_5:.4f}")
    print(f"🔍 MRR: {mrr:.4f}")
    return avg_val_loss


# --- CARGA DE DATOS Y MODELO ---
def fine_tune(csv_path, original_model_name, model_name, model_name_to_push,
              batch_size=BATCH_SIZE, epochs=EPOCHS, lr=LR, data_aug=False,
              freeze_func=freeze_layers, n_layers=4, loss_func=contrastive_loss):
    df = pd.read_csv(csv_path)
    train_df, val_df = train_test_split(df, test_size=0.2, random_state=42)

    processor = AutoProcessor.from_pretrained(
        original_model_name, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(DEVICE)

    freeze_func(model, n_layers=n_layers)

    train_dataset = FashionDataset(
        train_df, processor, data_aug=data_aug)

    val_dataset = FashionDataset(
        val_df, processor, data_aug=False)

    train_loader = DataLoader(
        train_dataset, batch_size=batch_size, shuffle=True, collate_fn=collate_fn, num_workers=NUM_WORKERS)
    val_loader = DataLoader(
        val_dataset, batch_size=batch_size, shuffle=False, collate_fn=collate_fn, num_workers=NUM_WORKERS)

    params_to_optimize = []
    params_frozen = []

    for name, param in model.named_parameters():
        if param.requires_grad:
            params_to_optimize.append(param)
        else:
            params_frozen.append(param)

    optimizer = optim.AdamW(params_to_optimize, lr=lr, weight_decay=1e-4)
    # scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    #    optimizer, mode='min', patience=2, factor=0.5, verbose=True)

    # --- ENTRENAMIENTO ---
    patience = 3
    best_loss = float('inf')
    counter = 0
    model.train()
    best_model_state_dict = None
    for epoch in range(epochs):
        running_loss = 0.0
        for images, texts in tqdm(train_loader, desc=f"Epoch {epoch+1}/{epochs}"):
            if original_model_name.endswith("SigLIP"):
                inputs = processor(
                    images=images, text=texts, return_tensors="pt",
                    padding=True,
                    truncation=True,
                ).to(DEVICE)
            else:
                inputs = processor(images=images, text=texts, return_tensors="pt",
                                   padding="max_length",
                                   truncation=True,
                                   max_length=77
                                   ).to(DEVICE)

            pixel_values = inputs["pixel_values"]
            input_ids = inputs["input_ids"]
            attention_mask = inputs["attention_mask"]

            image_embeds = model.model.encode_image(pixel_values)
            text_embeds = model.get_text_features(
                input_ids=input_ids,
                attention_mask=attention_mask,
                normalize=True
            )

            # Normalizar (igual que get_*_features)
            image_embeds = image_embeds / \
                image_embeds.norm(p=2, dim=-1, keepdim=True)
            text_embeds = text_embeds / \
                text_embeds.norm(p=2, dim=-1, keepdim=True)

            # Calcular loss
            loss = loss_func(image_embeds, text_embeds)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        avg_loss = running_loss / len(train_loader)
        print(f"✅ Epoch {epoch+1} - Loss: {avg_loss:.4f}")

        avg_val_loss = validate(
            model, val_loader, processor, epoch, epochs, loss_func=loss_func)

        if avg_val_loss < best_loss:
            best_loss = avg_val_loss
            counter = 0
            # Guardar el mejor modelo
            best_model_state_dict = model.state_dict()
            print(f"✨ Nuevo mejor modelo guardado en epoch {epoch+1}")
        else:
            counter += 1
            print(
                f"⚠️ No hay mejora en la pérdida. Patience: {counter}/{patience}")
            if counter >= patience:
                print("🛑 Early stopping activado.")
                break
        if avg_val_loss < 0.01:
            print("🛑 Early stopping activado por pérdida baja.")
            break

        # scheduler.step(avg_val_loss)

    # --- GUARDAR MODELO ---
    if best_model_state_dict:
        print(f'Pushing model to {model_name_to_push}')
        model.load_state_dict(best_model_state_dict)
        model.save_pretrained(model_name_to_push)
        processor.save_pretrained(model_name_to_push)
        model.push_to_hub(model_name_to_push)
        processor.push_to_hub(model_name_to_push)


if __name__ == "__main__":
    multiprocessing.freeze_support()
    fine_tune(csv_path="datasets/con-sin-roturas-english.csv", original_model_name="Marqo/marqo-fashionSigLIP", model_name="Marqo/marqo-fashionSigLIP",
              model_name_to_push="melijauregui/fashionSigLIP-roturas27", data_aug=False,
              loss_func=contrastive_loss_InfoNCE, batch_size=8, epochs=32, lr=2e-5,
              n_layers=2)
