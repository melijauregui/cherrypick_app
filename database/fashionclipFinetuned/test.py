
import os
from PIL import Image
from rm_bg import remove_background
import numpy as np
from transformers import AutoProcessor, AutoModel
import torch
import torch.optim as optim
from fashionClipTestingText import test_text_clasification, find_similarities_matrix2

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_PUSH = "Sofia-gb/cherrypick-sigLip3"

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
# print("Model name:", MODEL_NAME_TO_PUSH)
model = AutoModel.from_pretrained(
    pretrained_model_name_or_path=MODEL_NAME_TO_PUSH, trust_remote_code=True)
processor = AutoProcessor.from_pretrained(
    pretrained_model_name_or_path=ORIGINAL_MODEL_NAME, trust_remote_code=True)
model.eval()
torch.manual_seed(42)


def run_test(description, image_paths, images, has, clasification_img, yellow_flags=[]):
    print("Descripcion:", description)
    probabilities = find_similarities_matrix2(
        model, processor, description, image_paths, images)
    test_text_clasification(probabilities=probabilities,
                            image_paths=image_paths, has=has,
                            clasification_img=clasification_img,
                            yellow_flags=yellow_flags)
    print("\n")


def run_tests(input_folder, output_folder, run_func):
    remove_background(input_folder, output_folder)

    image_paths = []
    for root, _, files in os.walk(output_folder):
        for file in files:
            if file.endswith(('.png', '.jpg', '.jpeg')):
                image_paths.append(os.path.join(root, file))

    images = [Image.open(p).convert("RGB") for p in image_paths]

    run_func(image_paths, images)


def run_tests_roturas(image_paths, images):
    run_test(description="jean liso", image_paths=image_paths,
             images=images, has=False, clasification_img="rotura")

    run_test(description="jean con roturas", image_paths=image_paths,
             images=images, has=True, clasification_img="rotura")

    run_test(description="jean wide leg", image_paths=image_paths, images=images,
             has=True, clasification_img="wide", yellow_flags=["palazzo"])

    run_test(description="jean skinny", image_paths=image_paths,
             images=images, has=True, clasification_img="skinny")

    run_test(description="jean recto", image_paths=image_paths, images=images, has=True, clasification_img="recto",
             yellow_flags=["mom"])

    run_test(description="jean palazzo", image_paths=image_paths, images=images,
             has=True, clasification_img="palazzo", yellow_flags=["wide"])

    run_test(description="jean cargo", image_paths=image_paths,
             images=images, has=True, clasification_img="cargo")

    run_test(description="jean mom", image_paths=image_paths,
             images=images, has=True, clasification_img="mom", yellow_flags=["recto"])

    run_test(description="jean acampanado", image_paths=image_paths,
             images=images, has=True, clasification_img="flared")


def run_tests_preferences(image_paths, images):
    run_test(description="jean boho chic", image_paths=image_paths,
             images=images, has=True, clasification_img="bohochic")

    run_test(description="jean old money", image_paths=image_paths,
             images=images, has=True, clasification_img="oldmoney")

    run_test(description="short", image_paths=image_paths,
             images=images, has=True, clasification_img="short")

    run_test(description="pollera", image_paths=image_paths,
             images=images, has=True, clasification_img="pollera")

    run_test(description="coquette", image_paths=image_paths,
             images=images, has=True, clasification_img="coquette")

    run_test(description="minimalista", image_paths=image_paths,
             images=images, has=True, clasification_img="minimalista")

    run_test(description="streetwear", image_paths=image_paths,
             images=images, has=True, clasification_img="streetwear")


def run_tests_general(image_paths, images):
    run_test(description="remera", image_paths=image_paths,
             images=images, has=True, clasification_img="remera")

    run_test(description="remera celeste", image_paths=image_paths,
             images=images, has=True, clasification_img="remera celeste", yellow_flags=["camisa celeste"])

    run_test(description="sweater", image_paths=image_paths,
             images=images, has=True, clasification_img="sweater")

    run_test(description="sweater rosa", image_paths=image_paths,
             images=images, has=True, clasification_img="sweater rosa")

    run_test(description="vestido", image_paths=image_paths,
             images=images, has=True, clasification_img="vestido")

    run_test(description="vestido estampado", image_paths=image_paths,
             images=images, has=True, clasification_img="vestido estampado")

    run_test(description="vestido liso", image_paths=image_paths,
             images=images, has=True, clasification_img="vestido liso")

    run_test(description="vestido rojo", image_paths=image_paths,
             images=images, has=True, clasification_img="vestido rojo")

    run_test(description="vestido estampado rojo", image_paths=image_paths,
             images=images, has=True, clasification_img="vestido estampado rojo")

    run_test(description="campera", image_paths=image_paths,
             images=images, has=True, clasification_img="campera")

    run_test(description="campera de cuero", image_paths=image_paths,
             images=images, has=True, clasification_img="campera cuero")

    run_test(description="campera negra", image_paths=image_paths,
             images=images, has=True, clasification_img="campera negra")

    run_test(description="campera de jean", image_paths=image_paths,
             images=images, has=True, clasification_img="campera jean")

    run_test(description="camisa", image_paths=image_paths,
             images=images, has=True, clasification_img="camisa")

    run_test(description="camisa celeste", image_paths=image_paths,
             images=images, has=True, clasification_img="camisa celeste", yellow_flags=["remera celeste"])

    run_test(description="camisa manga larga", image_paths=image_paths,
             images=images, has=True, clasification_img="camisa manga larga")

    run_test(description="camisa manga corta", image_paths=image_paths,
             images=images, has=True, clasification_img="camisa manga corta")


if __name__ == "__main__":
    input_folder = "images-testing-roturas"
    output_folder = "images-testing-roturas-nobg"
    # run_tests(input_folder, output_folder, run_tests_roturas)

    input_folder = "images-testing-preferences"
    output_folder = "images-testing-preferences-nobg"
    # run_tests(input_folder, output_folder, run_tests_preferences)

    input_folder = "images_testing_general"
    output_folder = "images-testing-general-nobg"
    run_tests(input_folder, output_folder, run_tests_general)
