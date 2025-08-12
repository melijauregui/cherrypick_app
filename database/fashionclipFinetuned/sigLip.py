from sklearn.metrics import confusion_matrix
from torch.nn.functional import cosine_similarity
import os
from rembg import remove
import pandas as pd
from PIL import Image
import requests
from tqdm import tqdm
from torch.utils.data import Dataset, DataLoader, Sampler
from transformers import AutoProcessor, AutoModel
import torch
import random
from torchvision import transforms
import torch.optim as optim
# pip install nlpaug transformers sentencepiece
from sklearn.model_selection import train_test_split
import torch.nn.functional as F
import multiprocessing
# import nltk
from nltk.corpus import stopwords
import re
# import spacy
# nlp = spacy.load("en_core_web_sm")  # python -m spacy download en_core_web_sm

# nltk.download('stopwords')
# stop_words_en = set(stopwords.words('english'))
# stop_words_es = set(stopwords.words('spanish'))

# --- CONFIGURACIÓN ---
BATCH_SIZE = 30
EPOCHS = 30
LR = 1e-5
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

NUM_WORKERS = min(4, os.cpu_count() or 1)
TEMPERATURE = 0.05

# print(f"Using {NUM_WORKERS} workers for data loading.")
data_transforms = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(7),
    transforms.RandomResizedCrop(224, scale=(0.9, 1.0)),
    transforms.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1),
    transforms.RandomAffine(degrees=5, translate=(0.02, 0.02))
])


# def clean_text(text):
#    tokens = re.findall(r'\b\w+\b', text.lower())
#    filtered = [word for word in tokens if word not in stop_words_en]
#    return " ".join(filtered)

# def clean_text2(text):
#    doc = nlp(text.lower())
#    lemmatized = [
#        token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
#    return " ".join(lemmatized)


# --- DATASET PERSONALIZADO ---

class BalancedBatchSampler(Sampler):
    def __init__(self, dataframe, batch_size):
        self.batch_size = batch_size

        # Reindexar dataframe para que sea de 0..n-1
        df = dataframe.reset_index(drop=True)

        # Guardar índices por categoría
        self.indices_jeans = df[df["task"] == "roturas"].index.tolist()
        self.indices_estilos = df[df["task"] == "estilos"].index.tolist()

        assert self.indices_jeans and self.indices_estilos, "Faltan datos de alguna categoría"

    def __iter__(self):
        jeans = self.indices_jeans.copy()
        estilos = self.indices_estilos.copy()

        # Repetir la categoría más chica para empatar tamaño
        while len(jeans) < len(estilos):
            faltan = len(estilos) - \
                len(jeans) if len(estilos) > len(jeans) else 0
            if faltan > 0:
                jeans += random.choices(jeans, k=faltan)
        while len(estilos) < len(jeans):
            faltan = len(jeans) - \
                len(estilos) if len(jeans) > len(estilos) else 0
            if faltan > 0:
                estilos += random.choices(estilos, k=faltan)

        # Mezclar
        random.shuffle(jeans)
        random.shuffle(estilos)

        # Mezclar intercalando
        combined = [val for pair in zip(jeans, estilos) for val in pair]

        # Entregar en batches
        for i in range(0, len(combined), self.batch_size):
            yield combined[i:i+self.batch_size]

    def __len__(self):
        return (max(len(self.indices_jeans), len(self.indices_estilos)) * 2) // self.batch_size


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

        # ahora es la ruta local a la imagen PNG ya procesada
        filename = row["image"]

        try:
            image = Image.open(filename).convert("RGB")
            if is_augmented:
                image = self.augment(image)
        except Exception as e:
            print(f"⚠️ Error al cargar la imagen {filename}: {e}")
            return None

        text = row["description"]
        if row.get("tags", "") != "":
            if not text.endswith("."):
                text += "."
            text += f" {row['tags']}"
        return image, text


# --- FUNCIONES AUXILIARES ---


def collate_fn(batch):
    batch = [item for item in batch if item is not None]
    if not batch:
        return [], []
    images, texts = zip(*batch)
    return list(images), list(texts)


def freeze_layers(model, n_layers=10):
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


def contrastive_loss_InfoNCE_hard_negatives(text_embeds, image_embeds, temperature=TEMPERATURE):
    text_embeds = F.normalize(text_embeds, dim=-1)
    image_embeds = F.normalize(image_embeds, dim=-1)

    logits = torch.matmul(text_embeds, image_embeds.T) / temperature
    labels = torch.arange(len(text_embeds)).to(logits.device)

    # Seleccionar hard negatives
    hard_negatives = logits.topk(k=1, dim=1, largest=True).indices.squeeze()

    loss_hard_negatives = F.cross_entropy(logits, hard_negatives)
    loss_i2t = F.cross_entropy(logits, labels)
    loss_t2i = F.cross_entropy(logits.T, labels)

    return (loss_i2t + loss_t2i + loss_hard_negatives) / 3


def contrastive_loss_InfoNCE(text_embeds, image_embeds, temperature=TEMPERATURE):
    text_embeds = F.normalize(text_embeds, dim=-1)
    image_embeds = F.normalize(image_embeds, dim=-1)

    logits = torch.matmul(text_embeds, image_embeds.T) / temperature
    labels = torch.arange(len(text_embeds)).to(logits.device)

    loss_i2t = F.cross_entropy(logits, labels)
    loss_t2i = F.cross_entropy(logits.T, labels)

    return (loss_i2t + loss_t2i) / 2


# def compute_recall_at_k(image_embeds, text_embeds, k=5):
#     sims = image_embeds @ text_embeds.T
#     targets = torch.arange(len(image_embeds), device=sims.device)
#     _, topk = sims.topk(k, dim=1)
#     correct = topk.eq(targets.unsqueeze(1)).any(dim=1).float()
#     return correct.mean().item()

def compute_recall_at_ks(image_embeds, text_embeds, ks=[1, 5, 10]):
    sims = image_embeds @ text_embeds.T
    targets = torch.arange(len(image_embeds), device=sims.device)
    recalls = {}
    for k in ks:
        _, topk = sims.topk(k, dim=1)
        correct = topk.eq(targets.unsqueeze(1)).any(
            dim=1).float().mean().item()
        recalls[f"recall@{k}"] = correct
    return recalls


def compute_mrr(image_embeds, text_embeds):
    sims = image_embeds @ text_embeds.T
    targets = torch.arange(len(image_embeds), device=sims.device)
    sorted_indices = sims.argsort(dim=1, descending=True)
    ranks = (sorted_indices == targets.unsqueeze(1)).nonzero()[:, 1] + 1
    reciprocal_ranks = 1.0 / ranks.float()
    return reciprocal_ranks.mean().item()


def compute_precision(image_embeds, text_embeds, k=5):
    image_embeds = torch.nn.functional.normalize(image_embeds, dim=-1)
    text_embeds = torch.nn.functional.normalize(text_embeds, dim=-1)

    similarity = image_embeds @ text_embeds.T
    topk = similarity.topk(k, dim=-1).indices
    matches = torch.arange(len(image_embeds)).unsqueeze(1).to(topk.device)
    precision = (topk == matches).any(dim=1).float().mean().item()
    return precision


def evaluate_by_class(image_embeds, text_embeds, df_val, ks=[1, 5, 10]):
    # df_val debe tener columnas 'cut_type' y 'has_rips'
    results = {}
    labels = df_val["has_rips"].values  # 0 o 1
    for cls in [0, 1]:
        idxs = (labels == cls).nonzero()[0]
        sub_img_emb = image_embeds[idxs]
        sub_txt_emb = text_embeds[idxs]
        recalls = compute_recall_at_ks(sub_img_emb, sub_txt_emb, ks)
        results[f"has_rips={cls}"] = recalls
    # idem podrías hacer por cut_type iterando sus valores únicos
    return results


def confusion_plain_vs_ripped(image_embeds, df_val, model, processor):
    # construimos dos queries
    queries = ["plain jeans", "ripped jeans"]
    q_embeds = []
    for q in queries:
        inp = processor(text=[q], return_tensors="pt",
                        padding=True, truncation=True).to(DEVICE)
        q_emb = model.get_text_features(**inp, normalize=True)
        q_embeds.append(F.normalize(q_emb, dim=-1)[0])

    # para cada query obtenemos top-1
    sims = torch.stack(q_embeds) @ image_embeds.T  # (2, N_images)
    # índices top1 para cada query
    preds = sims.argmax(dim=1).cpu().numpy()

    # extraemos ground‐truth has_rips
    truths = [
        0,  # plain jeans -> esperamos has_rips=0
        1,  # ripped jeans -> esperamos has_rips=1
    ]
    pred_labels = df_val.iloc[preds]["has_rips"].values
    # Matriz de confusión
    cm = confusion_matrix(truths, pred_labels, labels=[0, 1])
    print("Confusion matrix (plain=0, ripped=1):\n", cm)


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

    train_sampler = BalancedBatchSampler(train_df, batch_size=batch_size)

    train_dataset = FashionDataset(
        train_df, processor, data_aug=data_aug)

    val_dataset = FashionDataset(
        val_df, processor, data_aug=False)

    train_loader = DataLoader(
        train_dataset,
        batch_sampler=train_sampler,
        collate_fn=collate_fn,
        num_workers=NUM_WORKERS
    )

    # train_loader = DataLoader(
    #    train_dataset, batch_size=batch_size, shuffle=True, collate_fn=collate_fn, num_workers=NUM_WORKERS)
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
        print(f"✅ Epoch {epoch+1} - Train Loss: {avg_loss:.4f}")

        evaluate(model, train_loader, processor, loss_func,
                 desc=f"Epoch {epoch+1}/{epochs} [Train]")

        avg_val_loss = evaluate(
            model, val_loader, processor, loss_func, desc=f"Epoch {epoch+1}/{epochs} [Validation]"
        )

        """  df_val = val_df.reset_index(drop=True)
        class_res = evaluate_by_class(img_emb, txt_emb, df_val, ks=[1, 5, 10])
        print("=== Recall por has_rips ===")
        for k, v in class_res.items():
            print(k, v)

        # confusion analysis plain vs ripped
        confusion_plain_vs_ripped(img_emb, df_val, model, processor) """

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


def evaluate(model, loader, processor, loss_func, desc):
    model.eval()
    val_loss = 0.0
    all_image_embeds = []
    all_text_embeds = []
    all_texts = []
    with torch.no_grad():
        for images, texts in tqdm(loader, desc=desc):
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
            all_texts.extend(texts)

            loss = loss_func(image_embeds, text_embeds)
            val_loss += loss.item()

    avg_loss = val_loss / len(loader)
    image_embeds = torch.cat(all_image_embeds)
    text_embeds = torch.cat(all_text_embeds)

    recalls = compute_recall_at_ks(image_embeds, text_embeds)
    mrr = compute_mrr(image_embeds, text_embeds)
    precision = compute_precision(image_embeds, text_embeds)
    print(f"🧪 Loss: {avg_loss:.4f}")
    for k, v in recalls.items():
        print(f"Recall 🔍 {k}: {v:.4f}")
    print(f"🔍 MRR: {mrr:.4f}")
    print(f"🔍 Precision@{5}: {precision:.4f}")
    return avg_loss


if __name__ == "__main__":
    multiprocessing.freeze_support()
    fine_tune(csv_path="datasets/unificado/roturas-preferencias-v2.csv", original_model_name="Marqo/marqo-fashionSigLIP", model_name="Marqo/marqo-fashionSigLIP",
              model_name_to_push="Sofia-gb/cherrypick-sigLip3", data_aug=False,
              loss_func=contrastive_loss_InfoNCE, batch_size=8, epochs=32, lr=2e-5,
              n_layers=2)
