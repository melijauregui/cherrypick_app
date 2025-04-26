import os
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

    text_features = []
    with torch.no_grad():
        for desc in descriptions:
            inputs = processor(text=desc, return_tensors="pt", padding=True, truncation=True).to(device)
            emb = model.get_text_features(**inputs)
            emb = emb / emb.norm(p=2, dim=-1, keepdim=True)
            text_features.append(emb.squeeze(0))  # quitar dimensión batch

    text_features = torch.stack(text_features)

    # Calcular similitudes
    similarities = torch.matmul(
        image_features, text_features.T).squeeze().cpu().numpy()

    sorted_indices = np.argsort(similarities)[::-1]
    for i in sorted_indices:
        print(f"Similitud con '{descriptions[i]}': {similarities[i]}")
    if len(similarities) == 2:
        delta = abs(similarities[0] - similarities[1])
        print(f"Diferencia: {delta}")

    print(f"Descripción más similar: {descriptions[np.argmax(sorted_indices)]}")
    

def find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs):
    # Cargar modelo y processor
    with torch.no_grad():
        image_features = model.get_image_features(**image_inputs)
        image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True) 
    
    # Procesar descripciones
    text_features = []
    with torch.no_grad():
        for desc in descriptions:
            inputs = processor(text=desc, return_tensors="pt", padding=True, truncation=True).to(device)
            emb = model.get_text_features(**inputs)
            emb = emb / emb.norm(p=2, dim=-1, keepdim=True)
            text_features.append(emb.squeeze(0)) 

    text_features = torch.stack(text_features)

    # Calcular matriz de similitud: [N imágenes, M textos]
    similarity_matrix = torch.matmul(text_features , image_features.T).cpu().numpy()
        
    for i, description in enumerate(descriptions):
        print(f"\n📝 SIMILITUD CON DESCRIPCIÓN: '{description}'\n")
        sorted_indices = np.argsort(similarity_matrix[i])[::-1]
        for rank, img_idx in enumerate(sorted_indices):
            similarity = similarity_matrix[i][img_idx]
            print(f"   {rank+1}. {image_paths[img_idx]} → Similitud: {similarity:.3f}")

    return similarity_matrix

def test_text_clasification(similarity_matrix, image_paths, has, clasification_img):
    # Extraer nombres de archivo
    image_names = [os.path.basename(path) for path in image_paths]

    # Clasificar imágenes
    rotura_imgs = []
    no_rotura_imgs = []

    for i, name in enumerate(image_names):
        if has:
            if has and clasification_img in name:
                rotura_imgs.append(i)
            else:
                no_rotura_imgs.append(i)
        else:
            if clasification_img in name:
                no_rotura_imgs.append(i)
            else:
                rotura_imgs.append(i)

    # Evaluar condición 1: rotura con descripción 1
    max_no_rotura = max(similarity_matrix[0][j] for j in no_rotura_imgs)
    for i in rotura_imgs:
        value = similarity_matrix[0][i]
        print(f"[{clasification_img}] {image_names[i]}: {value:.3f} > {max_no_rotura:.3f}? {'✅' if value > max_no_rotura else '❌'}")


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

Sofia-gb/fashionclip-roturas3:
Similitud con 'jean wide leg con roturas. Color celeste.': 0.7874948382377625
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.7807509899139404
Diferencia: 0.0067438483238220215
Descripción más similar: jean wide leg con roturas. Color celeste.

Sofia-gb/fashionSigLIP-roturas:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.11929132044315338
Similitud con 'jean wide leg con roturas. Color celeste.': 0.0963045060634613
Descripción más similar: jean wide leg sin roturas. Color celeste.

Sofia-gb/fashionSigLIP-roturas2:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.0039484696462750435
Similitud con 'jean wide leg con roturas. Color celeste.': -0.015217212960124016
Descripción más similar: jean wide leg sin roturas. Color celeste.

Sofia-gb/fashionSigLIP-roturas3:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.14181290566921234
Similitud con 'jean wide leg con roturas. Color celeste.': 0.11660870164632797
Diferencia: 0.02520420402288437
Descripción más similar: jean wide leg sin roturas. Color celeste
"""
