import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np

# Configurar dispositivo
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


def find_most_similar_description(model_name, pretrained_model_name, image_path, descriptions):
    # Cargar modelo y processor
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(
        pretrained_model_name, trust_remote_code=True)

    # Tu imagen
    image = Image.open(image_path).convert("RGB")

    # Procesar imagen
    image_inputs = processor(images=image, return_tensors="pt").to(device)
    with torch.no_grad():
        image_features = model.get_image_features(**image_inputs)
        image_features = image_features / \
            image_features.norm(p=2, dim=-1, keepdim=True)

    if pretrained_model_name.endswith("SigLIP"):
        text_inputs = processor(
            text=descriptions, return_tensors="pt",
            padding=True,
            truncation=True,
        ).to(device)
    else:
        text_inputs = processor(text=descriptions, return_tensors="pt",
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
    if len(similarities) == 2:
        delta = abs(similarities[0] - similarities[1])
        print(f"Diferencia: {delta}")

    print(f"Descripción más similar: {descriptions[np.argmax(similarities)]}")


# model_name = "melijauregui/fashionclip-roturas4"
model_name = "Sofia-gb/fashionclip-roturas2"
image_path = "images-testing/sin-rotura.png"
pretrained_model_name = "Marqo/marqo-fashionCLIP"
# Lista de descripciones posibles
descriptions = [
    "jean wide leg sin roturas. Color celeste.",
    "jean wide leg con roturas. Color celeste."
]

find_most_similar_description(
    model_name, pretrained_model_name, image_path, descriptions)

find_most_similar_description("Sofia-gb/fashionSigLIP-roturas",
                              "Marqo/marqo-fashionSigLIP",
                              image_path, descriptions)

find_most_similar_description("Sofia-gb/fashionSigLIP-roturas2",
                              "Marqo/marqo-fashionSigLIP",
                              image_path, descriptions)

""" 
Resultados:

descriptions = [
    "jean sin roturas",
    "jean con roturas visibles"
]

FASHIONCLIP:
Similitud con 'jean con roturas visibles': 0.4796622097492218
Similitud con 'jean sin roturas': 0.31197893619537354
Descripción más similar: jean con roturas visibles

FASHIONSIGLIP:
Similitud con 'jean sin roturas': 0.13367873430252075
Similitud con 'jean con roturas visibles': 0.11075586080551147
Descripción más similar: jean sin roturas

-----------------------

descriptions = [
    "jean sin roturas",
    "jean con roturas"
]

FASHIONCLIP:
Similitud con 'jean con roturas': 0.42065301537513733
Similitud con 'jean sin roturas': 0.31197893619537354
Descripción más similar: jean con roturas

FASHIONSIGLIP:
Similitud con 'jean con roturas': 0.17554162442684174
Similitud con 'jean sin roturas': 0.13367873430252075
Descripción más similar: jean con roturas

----------------------

descriptions = [
    "jean wide leg sin roturas. Color celeste.",
    "jean wide leg con roturas. Color celeste."
]

Sofia-gb/fashionclip-roturas2:
Similitud con 'jean wide leg con roturas. Color celeste.': 0.7467606067657471
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.7414008975028992
Descripción más similar: jean wide leg con roturas. Color celeste.

Sofia-gb/fashionBlip-roturas:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.11929132044315338
Similitud con 'jean wide leg con roturas. Color celeste.': 0.0963045060634613
Descripción más similar: jean wide leg sin roturas. Color celeste.

Sofia-gb/fashionBlip-roturas2:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.0039484696462750435
Similitud con 'jean wide leg con roturas. Color celeste.': -0.015217212960124016
Descripción más similar: jean wide leg sin roturas. Color celeste.
"""
