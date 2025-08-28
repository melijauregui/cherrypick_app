
import os
from PIL import Image
import numpy as np
from transformers import AutoProcessor, AutoModel
from rm_bg import remove_background
import torch
from fashionClipTestingText import test_text_clasification, find_similarities_matrix2

# cd database && python3 run-model.py > test.txt

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_PUSH = "Sofia-gb/cherrypick-sigLip3"
# CSV_PATH = "datasets/con-sin-roturas.csv"
FOLDER_IMAGES_TESTING = "images-testing-preferences-nobg"

input_folder = "images-testing-preferences"
output_folder = FOLDER_IMAGES_TESTING
# if not os.path.exists(output_folder):
remove_background(input_folder, output_folder)


BATCH_SIZE = 32
EPOCHS = 30
LR = 1e-5
PATIENCE = 3
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# --- TESTS ---
# print the info of the model
print("Model name:", MODEL_NAME_TO_PUSH)
model = AutoModel.from_pretrained(
    pretrained_model_name_or_path=MODEL_NAME_TO_PUSH, trust_remote_code=True)
processor = AutoProcessor.from_pretrained(
    pretrained_model_name_or_path=ORIGINAL_MODEL_NAME, trust_remote_code=True)
model.eval()
torch.manual_seed(42)

image_paths = []
for root, _, files in os.walk(FOLDER_IMAGES_TESTING):
    for file in files:
        if file.endswith(('.png', '.jpg', '.jpeg')):
            image_paths.append(os.path.join(root, file))

images = [Image.open(p).convert("RGB") for p in image_paths]

# --- test texto con descripcion de roturas vs liso
description = "jean boho chic"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="bohochic", imprimir_mayores_al_minimo=True)
print("\n")


description = "jean old money"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="oldmoney", imprimir_mayores_al_minimo=True)
print("\n")

description = "short"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="short", imprimir_mayores_al_minimo=True)
print("\n")

description = "pollera"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="pollera", imprimir_mayores_al_minimo=True)
print("\n")

description = "coquette"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="coquette", imprimir_mayores_al_minimo=True)
print("\n")

description = "minimalista"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="minimalista", imprimir_mayores_al_minimo=True)
print("\n")

description = "streetwear"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="streetwear", yellow_flags=["jean"], imprimir_mayores_al_minimo=True)
print("\n")
