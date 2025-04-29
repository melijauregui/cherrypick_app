
import os
from PIL import Image
import numpy as np
from transformers import AutoProcessor, AutoModel
import torch
import torch.optim as optim
from fashionclipFinetuned.fashionClipTestingText import test_text_clasification, find_similarities_matrix2

# cd database && python3 run-model.py > test.txt

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_FINETUNE = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_PUSH = "Sofia-gb/fashionSigLIP-roturas15"
# CSV_PATH = "datasets/con-sin-roturas.csv"
FOLDER_IMAGES_TESTING = "images-testing"


BATCH_SIZE = 32
EPOCHS = 30
LR = 1e-5
PATIENCE = 3
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


# --- TRAIN ---
# fine_tune(csv_path=CSV_PATH, original_model_name=ORIGINAL_MODEL_NAME, model_name=MODEL_NAME_TO_FINETUNE,
#           model_name_to_push=MODEL_NAME_TO_PUSH, batch_size=BATCH_SIZE, epochs=EPOCHS, lr=LR, patience=PATIENCE)


# --- TESTS ---
#print the info of the model
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
description = "jean liso"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=False, clasification_img="rotura")
print("\n")

description = "jean con roturas"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="rotura")
print("\n")

# --- test texto con descripcion de wide leg
description = "jean wide leg"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="wide", yellow_flags=["palazzo"])
print("\n")

# --- test texto con descripcion de skinny
description = "jean skinny"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="skinny")
print("\n")

# --- test texto con descripcion de recto
description = "jean recto"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="recto")
print("\n")

# --- test texto con descripcion de palazzo
description = "jean palazzo"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="palazzo", yellow_flags=["wide"])
print("\n")

# --- test texto con descripcion de cargo
description = "jean cargo"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="cargo")
print("\n")

# --- test texto con descripcion de mom
description = "jean mom"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="mom")
print("\n")

# --- test texto con descripcion de flared
description = "jean acampanado"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="flared")
print("\n")
