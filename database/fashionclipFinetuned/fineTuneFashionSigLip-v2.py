from torch.nn.functional import cosine_similarity
import random
from huggingface_hub import HfApi, HfFolder, Repository
from io import BytesIO
import os
import pandas as pd
from PIL import Image
import requests
from tqdm import tqdm
from torch.utils.data import Dataset, DataLoader
from transformers import AutoProcessor, AutoModel
import torch
import torch.nn as nn
from torchvision import transforms
import nlpaug.augmenter.word as naw
import torch.optim as optim
from huggingface_hub import create_repo, upload_file
import nltk
# pip install nlpaug transformers sentencepiece
import random
from sklearn.model_selection import train_test_split

try:
    nltk.data.find('taggers/averaged_perceptron_tagger_eng')
except LookupError:
    nltk.download('averaged_perceptron_tagger_eng')


# --- CONFIGURACIÓN ---
BATCH_SIZE = 30
EPOCHS = 30
LR = 1e-5
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# data_transforms = transforms.Compose([
#    transforms.RandomHorizontalFlip(),  # Volteo horizontal aleatorio
#    transforms.RandomRotation(30),  # Rotación aleatoria entre -30 y 30 grados
#    # Recorte aleatorio y redimensionado de la imagen
#    transforms.RandomResizedCrop(224),
#    transforms.ColorJitter(brightness=0.2, contrast=0.2,
#                           saturation=0.2, hue=0.2),  # Cambios de iluminación
# ])

data_transforms = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(7),
    transforms.RandomResizedCrop(224, scale=(0.9, 1.0)),
    transforms.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1),
    transforms.RandomAffine(degrees=5, translate=(0.02, 0.02))
])


synonym_aug = naw.SynonymAug(aug_p=0.4)
random_swap_aug = naw.RandomWordAug(action="swap")
contextual_aug = naw.ContextualWordEmbsAug(
    model_path='bert-base-uncased',
    action="substitute"
)

# --- DATASET PERSONALIZADO ---


class FashionDataset(Dataset):
    def __init__(self, dataframe, processor, aug_img=False, aug_text=False, n_augmented=3):
        self.dataframe = dataframe
        self.processor = processor
        self.aug_img = aug_img
        self.aug_text = aug_text
        self.aug_prob = 0.5
        self.n_augmented = n_augmented
        self.augment = transforms.Compose([
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomRotation(5),
            transforms.RandomResizedCrop(224, scale=(0.95, 1.0)),
            transforms.ColorJitter(
                brightness=0.05, contrast=0.05, saturation=0.05),
            transforms.RandomAffine(degrees=3, translate=(0.01, 0.01)),
        ])

    def __len__(self):
        # return len(self.dataframe)
        return len(self.dataframe) * (self.n_augmented + 1)

    def __getitem__(self, idx):
        base_idx = idx // (self.n_augmented + 1)
        is_augmented = idx % (self.n_augmented + 1) != 0

        row = self.dataframe.iloc[base_idx]
        # image, text = self.dataset[base_idx]

        try:
            response = requests.get(row["image"])
            image = Image.open(BytesIO(response.content))
            if is_augmented:
                image = self.augment(image)
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


def freeze_layers(model):
    # Descongelar todas las capas
    for param in model.parameters():
        param.requires_grad = False

    # --- VISIÓN ---
    # Descongelar las últimas capas de visión
    visual_blocks = model.model.visual.trunk.blocks
    for block in visual_blocks[-4:]:
        for param in block.parameters():
            param.requires_grad = True

    # Descongelar la attn_pool
    for param in model.model.visual.trunk.attn_pool.parameters():
        param.requires_grad = True

    # --- TEXTO ---
    # Descongelar las últimas capas de texto
    text_layers = model.model.text.transformer.resblocks
    for layer in text_layers[-4:]:
        for param in layer.parameters():
            param.requires_grad = True

    # Descongelar la proyección de texto
    for param in model.model.text.text_projection.parameters():
        param.requires_grad = True

    print("🔓 Descongelamos las últimas capas de visión y texto + proyecciones finales.")


def contrastive_loss(image_embeds, text_embeds, margin=0.5):
    positive = cosine_similarity(image_embeds, text_embeds)

    negative = 1 - positive
    loss = torch.mean(torch.relu(margin - positive + negative))
    return loss


def validate(model, val_loader, processor, epoch, epochs):
    model.eval()
    val_loss = 0.0
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

            loss = contrastive_loss(image_embeds, text_embeds)
            val_loss += loss.item()

    avg_val_loss = val_loss / len(val_loader)
    print(f"🧪 Epoch {epoch+1} - Validation Loss: {avg_val_loss:.4f}")
    return avg_val_loss


# --- CARGA DE DATOS Y MODELO ---
def fine_tune(csv_path, original_model_name, model_name, model_name_to_push,
              batch_size=BATCH_SIZE, epochs=EPOCHS, img_aug=False, text_aug=False, freeze_func=freeze_layers):
    df = pd.read_csv(csv_path)
    train_df, val_df = train_test_split(df, test_size=0.2, random_state=42)
    # train_df_augmented = augment_train_df(train_df, num_augmented_per_image=10)

    processor = AutoProcessor.from_pretrained(
        original_model_name, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(DEVICE)

    freeze_func(model)

    train_dataset = FashionDataset(
        train_df, processor, aug_img=img_aug, aug_text=text_aug)

    val_dataset = FashionDataset(
        val_df, processor, aug_img=False, aug_text=False)

    train_loader = DataLoader(
        train_dataset, batch_size=batch_size, shuffle=True, collate_fn=collate_fn)
    val_loader = DataLoader(
        val_dataset, batch_size=batch_size, shuffle=False, collate_fn=collate_fn)

    # Definimos dos grupos de parámetros: descongelados y el resto
    params_to_optimize = []
    params_frozen = []

    for name, param in model.named_parameters():
        if param.requires_grad:
            params_to_optimize.append(param)
        else:
            params_frozen.append(param)

    optimizer = optim.AdamW(model.parameters(), lr=LR, weight_decay=1e-4)

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
            loss = contrastive_loss(image_embeds, text_embeds)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        avg_loss = running_loss / len(train_loader)
        print(f"✅ Epoch {epoch+1} - Loss: {avg_loss:.4f}")

        avg_val_loss = validate(model, val_loader, processor, epoch, epochs)

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

    # --- GUARDAR MODELO ---
    if best_model_state_dict:
        print(f'Pushing model to {model_name_to_push}')
        model.load_state_dict(best_model_state_dict)
        model.save_pretrained(model_name_to_push)
        processor.save_pretrained(model_name_to_push)
        model.push_to_hub(model_name_to_push)
        processor.push_to_hub(model_name_to_push)


fine_tune(csv_path="datasets/con-sin-roturas-v3.csv", original_model_name="Marqo/marqo-fashionSigLIP", model_name="Marqo/marqo-fashionSigLIP",
          model_name_to_push="Sofia-gb/fashionSigLIP-roturas17", img_aug=False, text_aug=False, freeze_func=freeze_layers)
