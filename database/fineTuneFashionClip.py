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
import torch.optim as optim

# --- CONFIGURACIÓN ---
MODEL_NAME = "Marqo/marqo-fashionCLIP"
CSV_PATH = "dataset_fashion.csv"
IMAGE_DIR = "images"  
BATCH_SIZE = 8
EPOCHS = 5
LR = 1e-5
SAVE_PATH = "fashionclip-finetuned"
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


# --- DATASET PERSONALIZADO ---
class FashionDataset(Dataset):
    def __init__(self, dataframe, processor):
        self.dataframe = dataframe
        self.processor = processor

    def __len__(self):
        return len(self.dataframe)

    def __getitem__(self, idx):
        row = self.dataframe.iloc[idx]
        response = requests.get(row["image"])
        image = Image.open(BytesIO(response.content))
        text = row["description"]
        return image, text


# --- FUNCIONES AUXILIARES ---
def collate_fn(batch):
    images, texts = zip(*batch)
    return list(images), list(texts)


def cosine_similarity_loss(image_embeds, text_embeds):
    # Normalizamos
    image_embeds = image_embeds / image_embeds.norm(p=2, dim=-1, keepdim=True)
    text_embeds = text_embeds / text_embeds.norm(p=2, dim=-1, keepdim=True)
    logits = image_embeds @ text_embeds.T
    labels = torch.arange(len(logits)).to(DEVICE)
    loss_i2t = nn.CrossEntropyLoss()(logits, labels)
    loss_t2i = nn.CrossEntropyLoss()(logits.T, labels)
    return (loss_i2t + loss_t2i) / 2


# --- CARGA DE DATOS Y MODELO ---
df = pd.read_csv(CSV_PATH)
processor = AutoProcessor.from_pretrained(MODEL_NAME, trust_remote_code=True)
model = AutoModel.from_pretrained(MODEL_NAME, trust_remote_code=True).to(DEVICE)

dataset = FashionDataset(df, processor)
dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True, collate_fn=collate_fn)

optimizer = optim.AdamW(model.parameters(), lr=LR)

# --- ENTRENAMIENTO ---
model.train()
for epoch in range(EPOCHS):
    running_loss = 0.0
    for images, texts in tqdm(dataloader, desc=f"Epoch {epoch+1}/{EPOCHS}"):
        inputs = processor(
            images=images,
            text=texts,
            return_tensors="pt",
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
        image_embeds = image_embeds / image_embeds.norm(p=2, dim=-1, keepdim=True)
        text_embeds = text_embeds / text_embeds.norm(p=2, dim=-1, keepdim=True)

        # Calcular loss
        loss = cosine_similarity_loss(image_embeds, text_embeds)


        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    avg_loss = running_loss / len(dataloader)
    print(f"✅ Epoch {epoch+1} - Loss: {avg_loss:.4f}")


# --- GUARDADO DEL MODELO ---
model.save_pretrained(SAVE_PATH)
processor.save_pretrained(SAVE_PATH)
print(f"\n📦 Modelo guardado en: {SAVE_PATH}")
