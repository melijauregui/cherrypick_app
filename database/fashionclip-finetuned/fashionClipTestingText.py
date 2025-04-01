import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np

# Configurar dispositivo
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# Cargar modelo y processor
model = AutoModel.from_pretrained("fashionclip-finetuned", trust_remote_code=True).to(device)
processor = AutoProcessor.from_pretrained("Marqo/marqo-fashionCLIP", trust_remote_code=True)

# model = AutoModel.from_pretrained("Marqo/marqo-fashionCLIP", trust_remote_code=True).to(device)
# processor = AutoProcessor.from_pretrained("Marqo/marqo-fashionCLIP", trust_remote_code=True)

# Tu imagen
image_path = "image.png"
image = Image.open(image_path).convert("RGB")

# Lista de descripciones posibles
descriptions = [
    "Jean wide leg celeste sin roturas",
    "Jean wide leg con rotura",
    "Jean holgado de corte recto",
    "Jean celeste de pierna ancha",
    "Jean claro sin detalles",
    "Jean casual estilo urbano"
]

# Procesar imagen
image_inputs = processor(images=image, return_tensors="pt").to(device)
with torch.no_grad():
    image_features = model.get_image_features(**image_inputs)
    image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True)

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
    text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True)

# Calcular similitudes
similarities = torch.matmul(image_features, text_features.T).squeeze().cpu().numpy()

#itero por cada descripción
for i, description in enumerate(descriptions):
    print(f"Similitud con '{description}': {similarities[i]}")

print(f"Descripción más similar: {descriptions[np.argmax(similarities)]}")