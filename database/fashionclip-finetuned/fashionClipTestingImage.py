import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np


def find_most_similar_image(query_image_path, gallery_paths, model_name):
    folder_path = "images-testing"
    # Configurar dispositivo
    device = torch.device(
        "mps" if torch.backends.mps.is_available() else "cpu")

    # Cargar modelo y processor
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(
        "Marqo/marqo-fashionCLIP", trust_remote_code=True)

    query_image = Image.open(f'{folder_path}/{query_image_path}').convert("RGB")

    gallery_images = [Image.open(f'{folder_path}/{p}').convert("RGB") for p in gallery_paths]

    with torch.no_grad():
        # Procesar query
        query_inputs = processor(
            images=query_image, return_tensors="pt").to(device)
        query_emb = model.model.encode_image(query_inputs["pixel_values"])
        query_emb = query_emb / query_emb.norm(p=2, dim=-1, keepdim=True)

        gallery_inputs = processor(images=gallery_images, return_tensors="pt").to(device)
        gallery_embs = model.model.encode_image(gallery_inputs["pixel_values"])
        gallery_embs = gallery_embs / gallery_embs.norm(p=2, dim=-1, keepdim=True)

    similarities = torch.matmul(
        query_emb, gallery_embs.T).squeeze().cpu().numpy()

    for i, path in enumerate(gallery_paths):
        print(f"Similitud con '{path}': {similarities[i]:.4f}")

    print(f"📸 Imagen más similar para image:{query_image_path}: {gallery_paths[np.argmax(similarities)]}\n")

model_name="melijauregui/fashionclip-roturas2"
query_image_path = "roturas-negro2.jpg"
gallery_paths = [
    "rotura1.png",
    "rotura2.png",
    "rotura3.png",
    "sin-rotura.png",
    "roturas-negro1.jpg",
    "skinny-rotura.png"
]
find_most_similar_image(query_image_path, gallery_paths,
                        model_name=model_name)

query_image_path = "rotura1.png"
gallery_paths = [
    "rotura2.png",
    "rotura3.png",
    "sin-rotura.png",
    "roturas-negro1.jpg",
    "roturas-negro2.jpg",
    "skinny-rotura.png"
]
find_most_similar_image(query_image_path, gallery_paths,
                       model_name=model_name)
