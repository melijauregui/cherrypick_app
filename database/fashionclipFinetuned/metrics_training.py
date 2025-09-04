import pandas as pd
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader
from transformers import AutoProcessor, AutoModel
import torch
from tqdm import tqdm
import os
from sigLip import *

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionSigLIP"
DEVICE = torch.device("mps" if torch.backends.mps.is_available(
) else "cuda" if torch.cuda.is_available() else "cpu")
BATCH_SIZE = 16
MODEL_NAME = "Sofia-gb/cherrypick-sigLip11"
CSV_PATH = "datasets/unificado/roturas-preferencias-v6.csv"
# CHECKPOINT_PATH = "checkpoints/best_model.pt"


def print_results(model_name, csv_path):

    # --- CARGA DEL DATASET ---
    df = pd.read_csv(csv_path)

    # --- SPLIT ---
    df_train, df_test = train_test_split(df, test_size=0.2, random_state=42)

    # --- PREPROCESADOR Y MODELO ---
    processor = AutoProcessor.from_pretrained(
        pretrained_model_name_or_path=ORIGINAL_MODEL_NAME, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        MODEL_NAME, trust_remote_code=True).to(DEVICE)
    # model.load_state_dict(torch.load(CHECKPOINT_PATH, map_location=DEVICE))
    model.eval()

    # --- DATASETS Y LOADERS ---
    train_dataset = FashionDataset(df_train, processor, data_aug=False)
    test_dataset = FashionDataset(df_test, processor, data_aug=False)

    train_loader = DataLoader(
        train_dataset, batch_size=BATCH_SIZE, shuffle=False, collate_fn=collate_fn)
    test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE,
                             shuffle=False, collate_fn=collate_fn)

    # --- EVALUACIÓN ---
    print("🔎 Evaluando sobre el conjunto de ENTRENAMIENTO...")
    evaluate(
        model, train_loader, processor, loss_func=contrastive_loss_InfoNCE, desc="Evaluando TRAIN")

    print("\n🔎 Evaluando sobre el conjunto de TESTEO...")
    evaluate(
        model, test_loader, processor, loss_func=contrastive_loss_InfoNCE, desc="Evaluando TEST")


if __name__ == "__main__":
    print_results(MODEL_NAME, CSV_PATH)
