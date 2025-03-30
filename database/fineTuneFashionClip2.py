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


# Load the CLIP model and processor
df = pd.read_csv(CSV_PATH)
processor = AutoProcessor.from_pretrained(MODEL_NAME, trust_remote_code=True)
model = AutoModel.from_pretrained(MODEL_NAME, trust_remote_code=True).to(DEVICE)


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
        # Tokenize text using CLIP's tokenizer
        text = torch.clip.tokenize(text)
        return image, text
    
    
# Function to convert model's parameters to FP32 format
#This is done so that our model loads in the provided memory.
def convert_models_to_fp32(model): 
    for p in model.parameters(): 
        p.data = p.data.float() 
        p.grad.data = p.grad.data.float() 
        
def collate_fn(batch):
    images, texts = zip(*batch)
    return list(images), list(texts)

# Check if the device is set to CPU
if DEVICE == "cpu":
    model.float()  # Convert the model's parameters to float if using CPU

# Prepare the optimizer
optimizer = torch.optim.Adam(
    model.parameters(), lr=5e-5, betas=(0.9, 0.98), eps=1e-6 ,weight_decay=0.2) 
    
# Adam optimizer is used with specific hyperparameters
# lr (learning rate) is set to 5e-5, which is considered safe for fine-tuning to a new dataset
# betas are used for the optimization algorithm
# eps is a small value to prevent division by zero
# weight_decay adds L2 regularization to the optimizer

loss_img = nn.CrossEntropyLoss()
loss_txt = nn.CrossEntropyLoss()

dataset = FashionDataset(df, processor)
train_dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True, collate_fn=collate_fn)

 
# Train the model
num_epochs = 4 # Number of training epochs
for epoch in range(num_epochs):
    pbar = tqdm(train_dataloader, total=len(train_dataloader))
    
    # Iterate through the batches in the training data
    for batch in pbar:
        optimizer.zero_grad()  # Zero out gradients for the optimizer
        
        # Extract images and texts from the batch
        images, texts = batch
        
        # Print the current device (CPU or GPU)
        print(f"Current device: {DEVICE}")
        
        # Move images and texts to the specified device (CPU or GPU)
        images = images.to(DEVICE)
        texts = texts.to(DEVICE)

        # Forward pass through the model
        logits_per_image, logits_per_text = model(images, texts)

        # Compute the loss
        ground_truth = torch.arange(len(images), dtype=torch.long, device=DEVICE)
        total_loss = (loss_img(logits_per_image, ground_truth) + 
        loss_txt(logits_per_text, ground_truth)) / 2

        # Backward pass and update the model's parameters 
        total_loss.backward()
        
        # If the device is CPU, directly update the model 
        if DEVICE == "cpu":
            optimizer.step()
        else:
            # Convert model's parameters to FP32 format, update, and convert back
            convert_models_to_fp32(model)
            optimizer.step()
            torch.clip.model.convert_weights(model)

        # Update the progress bar with the current epoch and loss
        pbar.set_description(f"Epoch {epoch}/{num_epochs}, Loss: {total_loss.item():.4f}")
