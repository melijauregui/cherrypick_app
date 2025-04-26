
import os
from PIL import Image
import numpy as np
from transformers import AutoProcessor, AutoModel
import torch
import torch.optim as optim
from fashionclipFinetuned.fashionClipTestingText import find_similarities_matrix, test_text_clasification

#cd database && python3 run-model.py > test.txt 

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_FINETUNE = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_PUSH = "melijauregui/fashionSigLIP-roturas"
CSV_PATH = "datasets/roturas-vs-sin.csv"
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
model = AutoModel.from_pretrained(pretrained_model_name_or_path=MODEL_NAME_TO_PUSH, trust_remote_code=True).to(DEVICE)
processor = AutoProcessor.from_pretrained(pretrained_model_name_or_path=ORIGINAL_MODEL_NAME, trust_remote_code=True)
model.eval()
torch.manual_seed(42)  

image_paths = []
for root, _, files in os.walk(FOLDER_IMAGES_TESTING):
    for file in files:
        if file.endswith(('.png', '.jpg', '.jpeg')):
            image_paths.append(os.path.join(root, file))
            
images = [Image.open(p).convert("RGB") for p in image_paths]
image_inputs = processor(images=images, return_tensors="pt", padding=True).to(DEVICE)

# --- test texto con descripcion de roturas vs liso
descriptions = [
    "jean liso"
]

print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=False, clasification_img="rotura")
print("\n")

descriptions = [
    "jean con roturas"
]

print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="rotura")
print("\n")

# --- test texto con descripcion de wide leg
descriptions = [
    "jean wide leg",
]
print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="wide")
print("\n")

# --- test texto con descripcion de skinny
descriptions = [
    "jean skinny",
]
print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="skinny")
print("\n")

# --- test texto con descripcion de recto
descriptions = [
    "jean recto",
]
print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="recto")
print("\n")

# --- test texto con descripcion de palazzo
descriptions = [
    "jean palazzo",
]
print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="palazzo")
print("\n")

# --- test texto con descripcion de cargo
descriptions = [
    "jean cargo",
]
print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="cargo")
print("\n")

# --- test texto con descripcion de mom
descriptions = [
    "jean mom",
]
print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="mom")
print("\n")

# --- test texto con descripcion de flared
descriptions = [
    "jean flared",
]
print("\nDescripciones:", descriptions)
similarity_matrix = find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs)  
test_text_clasification(similarity_matrix=similarity_matrix, image_paths=image_paths, has=True, clasification_img="flared")
print("\n")




