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
BATCH_SIZE = 32
MODEL_NAME = "Sofia-gb/fashionSigLIP-roturas23"
CSV_PATH = "datasets/roturas-español/con-sin-roturas-v4-nbg.csv"
# CHECKPOINT_PATH = "checkpoints/best_model.pt"


def compute_precision(image_embeds, text_embeds, k=5):
    image_embeds = torch.nn.functional.normalize(image_embeds, dim=-1)
    text_embeds = torch.nn.functional.normalize(text_embeds, dim=-1)

    similarity = image_embeds @ text_embeds.T
    topk = similarity.topk(k, dim=-1).indices
    matches = torch.arange(len(image_embeds)).unsqueeze(1).to(topk.device)
    precision = (topk == matches).any(dim=1).float().mean().item()
    return precision


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
    _, train_image_embeds, train_text_embeds, _ = validate(
        model, train_loader, processor, epoch=0, epochs=1, loss_func=contrastive_loss_InfoNCE)
    train_recalls = compute_recall_at_ks(train_image_embeds, train_text_embeds)
    train_mrr = compute_mrr(train_image_embeds, train_text_embeds)
    precision_train = compute_precision(
        train_image_embeds, train_text_embeds, k=5)

    print("\n📊 Resultados TRAIN:")
    for k, v in train_recalls.items():
        print(f"{k}: {v:.4f}")
    print(f"MRR: {train_mrr:.4f}")
    print(f"Precision@5: {precision_train:.4f}")

    print("\n🔎 Evaluando sobre el conjunto de TESTEO...")
    _, test_image_embeds, test_text_embeds, _ = validate(
        model, test_loader, processor, epoch=0, epochs=1, loss_func=contrastive_loss_InfoNCE)
    test_recalls = compute_recall_at_ks(test_image_embeds, test_text_embeds)
    test_mrr = compute_mrr(test_image_embeds, test_text_embeds)
    precision_test = compute_precision(
        test_image_embeds, test_text_embeds, k=5)

    print("\n📊 Resultados TEST:")
    for k, v in test_recalls.items():
        print(f"{k}: {v:.4f}")
    print(f"MRR: {test_mrr:.4f}")
    print(f"Precision@5: {precision_test:.4f}")


if __name__ == "__main__":
    print_results(MODEL_NAME, CSV_PATH)
