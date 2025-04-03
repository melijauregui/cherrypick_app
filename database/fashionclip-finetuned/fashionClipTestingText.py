import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np

# Configurar dispositivo
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


def find_most_similar_description(model_name, image_path, descriptions):
    # Cargar modelo y processor
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(
        "Marqo/marqo-fashionCLIP", trust_remote_code=True)

    # Tu imagen
    image = Image.open(image_path).convert("RGB")

    # Procesar imagen
    image_inputs = processor(images=image, return_tensors="pt").to(device)
    with torch.no_grad():
        image_features = model.get_image_features(**image_inputs)
        image_features = image_features / \
            image_features.norm(p=2, dim=-1, keepdim=True)

    # Procesar textos
    text_inputs = processor(
        text=descriptions,
        return_tensors="pt",
        padding="max_length",
        truncation=True,
        max_length=77
    ).to(device)
    with torch.no_grad():
        text_features = model.get_text_features(**text_inputs)
        text_features = text_features / \
            text_features.norm(p=2, dim=-1, keepdim=True)

    # Calcular similitudes
    similarities = torch.matmul(
        image_features, text_features.T).squeeze().cpu().numpy()

    sorted_indices = np.argsort(similarities)[::-1]
    for i in sorted_indices:
        print(f"Similitud con '{descriptions[i]}': {similarities[i]}")

    print(f"Descripción más similar: {descriptions[np.argmax(similarities)]}")


# model_name = "melijauregui/fashionclip-roturas4"
model_name = "Sofia-gb/fashionclip-roturas2"
image_path = "images-testing/sin-rotura.png"
# Lista de descripciones posibles
descriptions = [
    "jean sin rotura",
    "jean con rotura",
]
find_most_similar_description(model_name, image_path, descriptions)
