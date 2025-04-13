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

try:
    nltk.data.find('taggers/averaged_perceptron_tagger_eng')
except LookupError:
    nltk.download('averaged_perceptron_tagger_eng')


# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionCLIP"
MODEL_NAME = "Marqo/marqo-fashionCLIP"
MODEL_NAME_TO_PUSH = "melijauregui/fashionclip-roturas4"
CSV_PATH = "datasets/roturas-vs-sin.csv"
BATCH_SIZE = 20
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
aug_text = naw.SynonymAug(aug_p=0.3)

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
        response = requests.get(row["image"])
        image = Image.open(BytesIO(response.content))
        if self.aug_img:
            image = data_transforms(image)
        text = row["description"]
        if self.aug_text:
            text = aug_text.augment(text)
            if isinstance(text, list):
                text = text[0]
            else:
                text = text
        return image, text


# --- FUNCIONES AUXILIARES ---
def collate_fn(batch):
    images, texts = zip(*batch)
    return list(images), list(texts)


def freeze_layers(model):
    # Congelar visión
    for param in model.model._modules["visual"].parameters():
        param.requires_grad = False

    # Congelar texto
    for param in model.model._modules["text"].parameters():
        param.requires_grad = False

    # Dejamos libres las capas finales de proyección (para fine-tuning)
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
def fine_tune(csv_path, original_model_name, model_name, model_name_to_push, batch_size=BATCH_SIZE, epochs=EPOCHS, data_aug=False):
    df = pd.read_csv(csv_path)
    processor = AutoProcessor.from_pretrained(
        original_model_name, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(DEVICE)
    freeze_layers(model)

    if data_aug:
        dataset = FashionDataset(
            df, processor, aug_img=True, aug_text=True)
    else:
        dataset = FashionDataset(df, processor)
    dataloader = DataLoader(dataset, batch_size=batch_size,
                            shuffle=True, collate_fn=collate_fn)

    optimizer = optim.AdamW(model.parameters(), lr=LR)

    # --- ENTRENAMIENTO ---
    model.train()
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

    print(f'Pushing model to {model_name_to_push}')
    # --- GUARDAR MODELO ---
    model.push_to_hub(model_name_to_push)
    processor.push_to_hub(model_name_to_push)


fine_tune(csv_path="datasets/roturas-vs-sin.csv", original_model_name="Marqo/marqo-fashionSigLIP", model_name="Marqo/marqo-fashionSigLIP",
          model_name_to_push="Sofia-gb/fashionSigLIP-roturas5", data_aug=True)
