import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np


def find_most_similar_image(query_image_path, pretrained_model_name, gallery_paths, model_name):
    folder_path = "images-testing"
    # Configurar dispositivo
    device = torch.device(
        "mps" if torch.backends.mps.is_available() else "cpu")

    # Cargar modelo y processor
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(
        pretrained_model_name, trust_remote_code=True)

    query_image = Image.open(
        f'{folder_path}/{query_image_path}').convert("RGB")

    gallery_images = [Image.open(
        f'{folder_path}/{p}').convert("RGB") for p in gallery_paths]

    with torch.no_grad():
        # Procesar query
        query_inputs = processor(
            images=query_image, return_tensors="pt").to(device)
        query_emb = model.model.encode_image(query_inputs["pixel_values"])
        query_emb = query_emb / query_emb.norm(p=2, dim=-1, keepdim=True)

        gallery_inputs = processor(
            images=gallery_images, return_tensors="pt").to(device)
        gallery_embs = model.model.encode_image(gallery_inputs["pixel_values"])
        gallery_embs = gallery_embs / \
            gallery_embs.norm(p=2, dim=-1, keepdim=True)

    similarities = torch.matmul(
        query_emb, gallery_embs.T).squeeze().cpu().numpy()

    sorted_indices = np.argsort(similarities)[::-1]
    for i in sorted_indices:
        print(f"Similitud con '{gallery_paths[i]}': {similarities[i]}")

    print(
        f"📸 Imagen más similar para :{query_image_path}: {gallery_paths[np.argmax(similarities)]}\n")


pretrained_model_name_or_path = "Marqo/marqo-fashionSigLIP"
model_name = "melijauregui/fashionSigLIP-roturas2"
query_image_path = "roturas-negro2.jpg"
gallery_paths = [
    "rotura1.png",
    "rotura2.png",
    "rotura3.png",
    "sin-rotura.png",
    "roturas-negro1.jpg",
    "skinny-rotura.png"
]
find_most_similar_image(query_image_path, pretrained_model_name_or_path, gallery_paths,
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
find_most_similar_image(query_image_path, pretrained_model_name_or_path, gallery_paths,
                        model_name=model_name)

""" 
pretrained_model_name_or_path = "Marqo/marqo-fashionSigLIP"
model_name = "Sofia-gb/fashionSigLIP-roturas"

Similitud con 'roturas-negro1.jpg': 0.9825956225395203
Similitud con 'rotura1.png': 0.9593182802200317
Similitud con 'rotura2.png': 0.9545838832855225
Similitud con 'rotura3.png': 0.9480644464492798
Similitud con 'sin-rotura.png': 0.8960565328598022
Similitud con 'skinny-rotura.png': 0.8698640465736389
📸 Imagen más similar para :roturas-negro2.jpg: roturas-negro1.jpg

Similitud con 'rotura3.png': 0.9768972396850586
Similitud con 'rotura2.png': 0.9755618572235107
Similitud con 'roturas-negro1.jpg': 0.9666265249252319
Similitud con 'roturas-negro2.jpg': 0.9593180418014526
Similitud con 'skinny-rotura.png': 0.903894305229187
Similitud con 'sin-rotura.png': 0.8768881559371948
📸 Imagen más similar para :rotura1.png: rotura3.png

------------------------

pretrained_model_name_or_path = "Marqo/marqo-fashionSigLIP"
model_name = "Sofia-gb/fashionSigLIP-roturas2"

Similitud con 'roturas-negro1.jpg': 0.9772899746894836
Similitud con 'rotura2.png': 0.9400231838226318
Similitud con 'rotura3.png': 0.9360625743865967
Similitud con 'rotura1.png': 0.9252451658248901
Similitud con 'sin-rotura.png': 0.9028607606887817
Similitud con 'skinny-rotura.png': 0.8645125031471252
📸 Imagen más similar para :roturas-negro2.jpg: roturas-negro1.jpg

Similitud con 'rotura3.png': 0.9816862344741821
Similitud con 'rotura2.png': 0.9697244167327881
Similitud con 'sin-rotura.png': 0.9368839263916016
Similitud con 'roturas-negro1.jpg': 0.9331836104393005
Similitud con 'skinny-rotura.png': 0.9270892143249512
Similitud con 'roturas-negro2.jpg': 0.9252451658248901
📸 Imagen más similar para :rotura1.png: rotura3.png

--------------------------

pretrained_model_name_or_path = "Marqo/marqo-fashionSigLIP"
model_name = "Sofia-gb/fashionSigLIP-roturas3"

Similitud con 'roturas-negro1.jpg': 0.9869186878204346
Similitud con 'rotura2.png': 0.9609938263893127
Similitud con 'rotura3.png': 0.9580990076065063
Similitud con 'rotura1.png': 0.9506805539131165
Similitud con 'sin-rotura.png': 0.917148232460022
Similitud con 'skinny-rotura.png': 0.8671223521232605
📸 Imagen más similar para :roturas-negro2.jpg: roturas-negro1.jpg

Similitud con 'rotura3.png': 0.9871813654899597
Similitud con 'rotura2.png': 0.97878098487854
Similitud con 'roturas-negro1.jpg': 0.9603569507598877
Similitud con 'roturas-negro2.jpg': 0.9506804943084717
Similitud con 'sin-rotura.png': 0.925117552280426
Similitud con 'skinny-rotura.png': 0.9138990640640259
📸 Imagen más similar para :rotura1.png: rotura3.png

-------------------------

pretrained_model_name_or_path = "Marqo/marqo-fashionCLIP"
model_name = "Sofia-gb/fashionclip-roturas3"

Similitud con 'roturas-negro1.jpg': 0.9827072620391846
Similitud con 'rotura2.png': 0.8716366291046143
Similitud con 'rotura3.png': 0.8712751269340515
Similitud con 'rotura1.png': 0.866313099861145
Similitud con 'sin-rotura.png': 0.8477672934532166
Similitud con 'skinny-rotura.png': 0.8231112957000732
📸 Imagen más similar para :roturas-negro2.jpg: roturas-negro1.jpg

Similitud con 'rotura3.png': 0.986778974533081
Similitud con 'rotura2.png': 0.9802199602127075
Similitud con 'sin-rotura.png': 0.9763138890266418
Similitud con 'skinny-rotura.png': 0.9402551651000977
Similitud con 'roturas-negro2.jpg': 0.8663132190704346
Similitud con 'roturas-negro1.jpg': 0.8636921644210815
📸 Imagen más similar para :rotura1.png: rotura3.png

"""
