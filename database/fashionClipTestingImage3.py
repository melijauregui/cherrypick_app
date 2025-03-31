import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np


def find_most_similar_image(query_image_path, gallery_paths, model_name):
    # Configurar dispositivo
    device = torch.device(
        "mps" if torch.backends.mps.is_available() else "cpu")

    # Cargar modelo y processor
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(
        "Marqo/marqo-fashionCLIP", trust_remote_code=True)

    # model = AutoModel.from_pretrained("Marqo/marqo-fashionCLIP", trust_remote_code=True).to(device)
    # processor = AutoProcessor.from_pretrained("Marqo/marqo-fashionCLIP", trust_remote_code=True)

    # Tu imagen
    query_image = Image.open(query_image_path).convert("RGB")

    # Lista de descripciones posibles
    gallery_images = [Image.open(p).convert("RGB") for p in gallery_paths]

    with torch.no_grad():
        # Procesar query
        query_inputs = processor(
            images=query_image, return_tensors="pt").to(device)
        query_emb = model.model.encode_image(query_inputs["pixel_values"])
        query_emb = query_emb / query_emb.norm(p=2, dim=-1, keepdim=True)

        # Procesar galería
        gallery_inputs = processor(
            images=gallery_images, return_tensors="pt").to(device)
        gallery_embs = model.model.encode_image(gallery_inputs["pixel_values"])
        gallery_embs = gallery_embs / \
            gallery_embs.norm(p=2, dim=-1, keepdim=True)

    # Calcular similitud coseno entre query e imágenes de galería
    similarities = torch.matmul(
        query_emb, gallery_embs.T).squeeze().cpu().numpy()

    # Mostrar resultados
    for i, path in enumerate(gallery_paths):
        print(f"Similitud con '{path}': {similarities[i]:.4f}")

    print(f"\n📸 Imagen más similar: {gallery_paths[np.argmax(similarities)]}")

    # Calcular similitud coseno entre query e imágenes de galería
    similarities = torch.matmul(
        query_emb, gallery_embs.T).squeeze().cpu().numpy()

    # Mostrar resultados
    for i, path in enumerate(gallery_paths):
        print(f"Similitud con '{path}': {similarities[i]:.4f}")

    print(f"\n📸 Imagen más similar: {gallery_paths[np.argmax(similarities)]}")


model_name = "Sofia-gb/fashionclip-finetuned"
query_image_path = "roturas_negro2.jpg"
gallery_paths = [
    "rotura1.png",
    "rotura2.png",
    "rotura3.png",
    "sinRotura.png",
    "roturas_negro1.jpg",
]
find_most_similar_image(query_image_path, gallery_paths, model_name)

query_image_path = "rotura1.png"
gallery_paths = [
    "rotura2.png",
    "rotura3.png",
    "sinRotura.png",
    "roturas_negro1.jpg",
    "roturas_negro2.jpg",
]
find_most_similar_image(query_image_path, gallery_paths, model_name)
