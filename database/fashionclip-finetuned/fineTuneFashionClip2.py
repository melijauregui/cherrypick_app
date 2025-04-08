from sklearn.model_selection import train_test_split
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
import torch.optim as optim

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionCLIP"
MODEL_NAME = "Marqo/marqo-fashionCLIP"
MODEL_NAME_TO_PUSH = "melijauregui/fashionclip-roturas4"
CSV_PATH = "datasets/roturas-vs-sin.csv"
BATCH_SIZE = 32
EPOCHS = 30
LR = 1e-5
PATIENCE = 3
DEVICE = torch.device("mps" if torch.backends.mps.is_available(
) else "cuda" if torch.cuda.is_available() else "cpu")


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
        image = Image.open(BytesIO(response.content)).convert("RGB")
        text = row["description"]
        return image, text


# --- FUNCIONES AUXILIARES ---
def collate_fn(batch):
    images, texts = zip(*batch)
    return list(images), list(texts)


def contrastive_loss(image_embeds, text_embeds, margin=0.5):
    positive = cosine_similarity(image_embeds, text_embeds)
    negative = 1 - positive
    loss = torch.mean(torch.relu(margin - positive + negative))
    return loss


@torch.no_grad()
def evaluate(model, val_loader, processor):
    model.eval()
    total_loss = 0
    for images, texts in val_loader:
        inputs = processor(images=images, text=texts, return_tensors="pt",
                           padding=True, truncation=True).to(DEVICE)

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
        text_embeds = text_embeds / text_embeds.norm(p=2, dim=-1, keepdim=True)

        loss = contrastive_loss(image_embeds, text_embeds)
        total_loss += loss.item()
    return total_loss / len(val_loader)


# --- ENTRENAMIENTO ---
def fine_tune(csv_path, original_model_name, model_name, model_name_to_push, batch_size=BATCH_SIZE, epochs=EPOCHS):
    df = pd.read_csv(csv_path)

    # División entrenamiento / validación
    train_df, val_df = train_test_split(
        df, test_size=0.2, random_state=42, shuffle=True)

    processor = AutoProcessor.from_pretrained(
        original_model_name, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(DEVICE)

    train_dataset = FashionDataset(train_df, processor)
    val_dataset = FashionDataset(val_df, processor)

    train_loader = DataLoader(
        train_dataset, batch_size=batch_size, shuffle=True, collate_fn=collate_fn)
    val_loader = DataLoader(
        val_dataset, batch_size=batch_size, shuffle=False, collate_fn=collate_fn)

    optimizer = optim.AdamW(model.parameters(), lr=LR)

    best_val_loss = float("inf")
    counter = 0

    for epoch in range(epochs):
        model.train()
        running_loss = 0.0

        for images, texts in tqdm(train_loader, desc=f"Epoch {epoch+1}/{epochs}"):
            inputs = processor(images=images, text=texts, return_tensors="pt",
                               padding=True, truncation=True).to(DEVICE)

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

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        avg_loss = running_loss / len(train_loader)
        val_loss = evaluate(model, val_loader, processor)

        print(
            f"✅ Epoch {epoch+1} - Train Loss: {avg_loss:.4f} - Val Loss: {val_loss:.4f}")

        # Early stopping
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            counter = 0
            torch.save(model.state_dict(), "best_model.pt")
        else:
            counter += 1
            if counter >= PATIENCE:
                print("🛑 Early stopping activado.")
                break

    # Restaurar el mejor modelo
    model.load_state_dict(torch.load("best_model.pt"))

    print(f'📤 Pushing modelo a {model_name_to_push}')
    model.push_to_hub(model_name_to_push)
    processor.push_to_hub(model_name_to_push)


model = "Marqo/marqo-fashionSigLIP"
fine_tune(csv_path="datasets/con-sin-roturas.csv", original_model_name=model, model_name=model,
          model_name_to_push="Sofia-gb/fashionSigLIP-roturas3", batch_size=32, epochs=15)
