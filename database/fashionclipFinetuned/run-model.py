
import os
from PIL import Image
from rm_bg import remove_background
import numpy as np
from transformers import AutoProcessor, AutoModel
import torch
import torch.optim as optim
from fashionClipTestingText import test_text_clasification, find_similarities_matrix2

# cd database && python3 run-model.py > test.txt

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionSigLIP"
# MODEL_NAME_TO_FINETUNE = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_PUSH = "Sofia-gb/cherrypick-sigLip3"
# CSV_PATH = "datasets/con-sin-roturas.csv"
FOLDER_IMAGES_TESTING = "images_testing_general"


BATCH_SIZE = 32
EPOCHS = 30
LR = 1e-5
PATIENCE = 3
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


# --- TRAIN ---
# fine_tune(csv_path=CSV_PATH, original_model_name=ORIGINAL_MODEL_NAME, model_name=MODEL_NAME_TO_FINETUNE,
#           model_name_to_push=MODEL_NAME_TO_PUSH, batch_size=BATCH_SIZE, epochs=EPOCHS, lr=LR, patience=PATIENCE)


# --- TESTS ---
# print the info of the model
print("Model name:", MODEL_NAME_TO_PUSH)
model = AutoModel.from_pretrained(
    pretrained_model_name_or_path=MODEL_NAME_TO_PUSH, trust_remote_code=True)
processor = AutoProcessor.from_pretrained(
    pretrained_model_name_or_path=ORIGINAL_MODEL_NAME, trust_remote_code=True)
model.eval()
torch.manual_seed(42)

input_folder = FOLDER_IMAGES_TESTING
output_folder = "images-testing-general-nobg"
# if not os.path.exists(output_folder):
remove_background(input_folder, output_folder)

image_paths = []
for root, _, files in os.walk(output_folder):
    for file in files:
        if file.endswith(('.png', '.jpg', '.jpeg')):
            image_paths.append(os.path.join(root, file))


images = [Image.open(p).convert("RGB") for p in image_paths]

description = "remera"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="remera")
print("\n")

description = "remera celeste"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="remera celeste", yellow_flags=["camisa celeste"])
print("\n")

description = "sweater rosa"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="sweater rosa")
print("\n")

description = "sweater"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="sweater")
print("\n")

description = "vestido"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="vestido")
print("\n")

description = "vestido estampado"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="vestido estampado")
print("\n")

description = "vestido liso"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="vestido liso")
print("\n")

description = "vestido rojo"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="vestido rojo")
print("\n")

description = "vestido estampado rojo"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="vestido estampado rojo")
print("\n")

description = "campera"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="campera")
print("\n")

description = "campera de cuero"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="campera cuero")
print("\n")

description = "campera negra"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="campera negra")
print("\n")

description = "campera de jean"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="campera jean")
print("\n")

description = "camisa"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="camisa")
print("\n")

description = "camisa celeste"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="camisa celeste", yellow_flags=["remera celeste"])
print("\n")

description = "camisa manga larga"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="camisa manga larga")
print("\n")

description = "camisa manga corta"
print("\nDescripcion:", description)
probabilities = find_similarities_matrix2(
    model, processor, description, image_paths, images)
test_text_clasification(probabilities=probabilities,
                        image_paths=image_paths, has=True, clasification_img="camisa manga corta")
print("\n")
