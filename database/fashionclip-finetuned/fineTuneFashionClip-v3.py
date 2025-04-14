from torch.nn.functional import cosine_similarity
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
import nlpaug.augmenter.word as naw
# pip install nlpaug transformers sentencepiece
import random

try:
    nltk.data.find('taggers/averaged_perceptron_tagger_eng')
except LookupError:
    nltk.download('averaged_perceptron_tagger_eng')


# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionCLIP"
MODEL_NAME = "Marqo/marqo-fashionCLIP"
MODEL_NAME_TO_PUSH = "melijauregui/fashionclip-roturas4"
CSV_PATH = "datasets/roturas-vs-sin.csv"
BATCH_SIZE = 30
EPOCHS = 30
LR = 1e-5
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# Definir las transformaciones
data_transforms = transforms.Compose([
    transforms.RandomHorizontalFlip(),  # Volteo horizontal aleatorio
    transforms.RandomRotation(30),  # Rotación aleatoria entre -30 y 30 grados
    # Recorte aleatorio y redimensionado de la imagen
    transforms.RandomResizedCrop(224),
    transforms.ColorJitter(brightness=0.2, contrast=0.2,
                           saturation=0.2, hue=0.2),  # Cambios de iluminación
])

synonym_aug = naw.SynonymAug(aug_p=0.4)
random_swap_aug = naw.RandomWordAug(action="swap")
contextual_aug = naw.ContextualWordEmbsAug(
    model_path='bert-base-uncased',
    action="substitute"
)

# --- DATASET PERSONALIZADO ---


class FashionDataset(Dataset):
    def __init__(self, dataframe, processor, aug_img=False, aug_text=False):
        self.dataframe = dataframe
        self.processor = processor
        self.aug_img = aug_img
        self.aug_text = aug_text

    def __len__(self):
        return len(self.dataframe)

    def __getitem__(self, idx):
        row = self.dataframe.iloc[idx]
        try:
            response = requests.get(row["image"])
            image = Image.open(BytesIO(response.content))
            if self.aug_img:
                image = data_transforms(image)
        except Exception as e:
            print(f"Error al cargar la imagen: {e}")
            return None
        text = row["description"]
        if self.aug_text:
            augs = [contextual_aug, synonym_aug, random_swap_aug]
            chosen_aug = random.choice(augs)
            text = chosen_aug.augment(text)

            # text = synonym_aug.augment(text)
            # text = random_swap_aug.augment(text)
            if isinstance(text, list):
                text = text[0]
            else:
                text = text
        return image, text


# --- FUNCIONES AUXILIARES ---
def collate_fn(batch):
    batch = [item for item in batch if item is not None]
    if not batch:
        return [], []
    images, texts = zip(*batch)
    return list(images), list(texts)


def freeze_layers2(model):
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


def freeze_layers(model):
    # Congelar visión
    for param in model.model._modules["visual"].parameters():
        param.requires_grad = False

    # Congelar texto
    for param in model.model._modules["text"].parameters():
        param.requires_grad = False

    for param in model.model._modules["visual"].trunk.attn_pool.parameters():
        param.requires_grad = True

    for param in model.model._modules["text"].text_projection.parameters():
        param.requires_grad = True

    print("🔒 Capas congeladas. Solo entrenamos las proyecciones finales.")


def contrastive_loss(image_embeds, text_embeds, margin=0.5):
    positive = cosine_similarity(image_embeds, text_embeds)
    negative = 1 - positive
    loss = torch.mean(torch.relu(margin - positive + negative))
    return loss


def store_csv(username, dataset_name, csv_path):
    repo_id = f"{username}/roturas"  # nombre del repo
    create_repo(repo_id, repo_type="dataset", exist_ok=True)
    upload_file(
        path_or_fileobj=csv_path,
        path_in_repo=dataset_name,  # cómo se llamará el archivo en el repo
        repo_id=repo_id,
        repo_type="dataset"
    )
    print(f"Dataset subido: https://huggingface.co/datasets/{repo_id}")


# --- CARGA DE DATOS Y MODELO ---
def fine_tune(csv_path, original_model_name, model_name, model_name_to_push,
              batch_size=BATCH_SIZE, epochs=EPOCHS, img_aug=False, text_aug=False, freeze_func=freeze_layers):
    df = pd.read_csv(csv_path)
    processor = AutoProcessor.from_pretrained(
        original_model_name, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(DEVICE)
    freeze_func(model)

    dataset = FashionDataset(
        df, processor, aug_img=img_aug, aug_text=text_aug)
    dataloader = DataLoader(dataset, batch_size=batch_size,
                            shuffle=True, collate_fn=collate_fn)

    optimizer = optim.AdamW(model.parameters(), lr=LR, weight_decay=1e-4)

    # --- ENTRENAMIENTO ---
    model.train()
    patience = 3
    best_loss = float('inf')
    counter = 0
    for epoch in range(epochs):
        running_loss = 0.0
        for images, texts in tqdm(dataloader, desc=f"Epoch {epoch+1}/{epochs}"):
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

        avg_loss = running_loss / len(dataloader)
        print(f"✅ Epoch {epoch+1} - Loss: {avg_loss:.4f}")

        if avg_loss < best_loss:
            best_loss = avg_loss
            counter = 0
            # Guardar el mejor modelo
            model.save_pretrained(model_name_to_push)
            processor.save_pretrained(model_name_to_push)
            print(f"✨ Nuevo mejor modelo guardado en epoch {epoch+1}")
        else:
            counter += 1
            print(
                f"⚠️ No hay mejora en la pérdida. Patience: {counter}/{patience}")
            if counter >= patience:
                print("🛑 Early stopping activado.")
                break
        if avg_loss < 0.01:
            print("🛑 Early stopping activado por pérdida baja.")
            break

    print(f'Pushing model to {model_name_to_push}')
    # --- GUARDAR MODELO ---
    model.push_to_hub(model_name_to_push)
    processor.push_to_hub(model_name_to_push)


fine_tune(csv_path="datasets/con-sin-roturas.csv", original_model_name="Marqo/marqo-fashionSigLIP", model_name="Marqo/marqo-fashionSigLIP",
          model_name_to_push="Sofia-gb/fashionSigLIP-roturas7", img_aug=False, text_aug=True, freeze_func=freeze_layers2)
