
import os
from PIL import Image
from rm_bg import remove_background
import numpy as np
from transformers import AutoProcessor, AutoModel
import torch
import torch.optim as optim
from fashionClipTestingText import test_clasification, find_similarities_text2images, find_similarities_image2image

# --- CONFIGURACIÓN ---
ORIGINAL_MODEL_NAME = "Marqo/marqo-fashionSigLIP"
MODEL_NAME_TO_PUSH = "Sofia-gb/cherrypick-sigLip11"

BATCH_SIZE = 32
EPOCHS = 30
LR = 1e-5
PATIENCE = 3
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

model = AutoModel.from_pretrained(
    pretrained_model_name_or_path=MODEL_NAME_TO_PUSH, trust_remote_code=True)
processor = AutoProcessor.from_pretrained(
    pretrained_model_name_or_path=ORIGINAL_MODEL_NAME, trust_remote_code=True)
model.eval()
torch.manual_seed(42)


class TestInfo:
    def __init__(self, description, clasification_img, has=True, yellow_flags=[]):
        self.description = description
        self.has = has
        self.clasification_img = clasification_img
        self.yellow_flags = yellow_flags


def run_tests(input_folder, output_folder, run_tests_func, test_img=False, test=True):
    remove_background(input_folder, output_folder)

    image_paths = []
    for root, _, files in os.walk(output_folder):
        for file in files:
            if file.endswith(('.png', '.jpg', '.jpeg')):
                image_paths.append(os.path.join(root, file))

    images = [Image.open(p).convert("RGB") for p in image_paths]

    run_tests_func(image_paths, images, test_img, test)


def run_tests_roturas(image_paths, images, test_img, test):

    test_cases = [
        TestInfo(description="jean liso",
                 clasification_img="rotura", has=False),
        TestInfo(description="jean con roturas", clasification_img="rotura"),
        TestInfo(description="jean wide leg",
                 clasification_img="wide", yellow_flags=["palazzo"]),
        TestInfo(description="jean skinny", clasification_img="skinny"),
        TestInfo(description="jean recto",
                 clasification_img="recto", yellow_flags=["mom"]),
        TestInfo(description="jean palazzo",
                 clasification_img="palazzo", yellow_flags=["wide"]),
        TestInfo(description="jean cargo", clasification_img="cargo"),
        TestInfo(description="jean mom", clasification_img="mom",
                 yellow_flags=["recto"]),
        TestInfo(description="jean acampanado", clasification_img="flared"),
    ]

    _run_test(test_cases, image_paths, images, test_img, test)


def run_tests_preferences(image_paths, images, test_img, test):

    test_cases = [
        TestInfo(description="boho chic", clasification_img="bohochic"),
        TestInfo(description="pantalon boho chic",
                 clasification_img="pantalon bohochic"),
        TestInfo(description="pollera boho chic",
                 clasification_img="pollera bohochic"),
        TestInfo(description="old money", clasification_img="oldmoney",
                 yellow_flags=["minimalista"]),
        TestInfo(description="pantalon old money", clasification_img="pantalon oldmoney",
                 yellow_flags=["pantalon minimalista"]),
        TestInfo(description="short", clasification_img="short"),
        TestInfo(description="pollera", clasification_img="pollera"),
        TestInfo(description="coquette", clasification_img="coquette"),
        TestInfo(description="minimalista", clasification_img="minimalista",
                 yellow_flags=["oldmoney"]),
        TestInfo(description="streetwear", clasification_img="streetwear"),
        TestInfo(description="night out", clasification_img="night"),
    ]

    _run_test(test_cases, image_paths, images, test_img, test)


def run_tests_general(image_paths, images, test_img, test):

    test_cases = [
        TestInfo(description="remera", clasification_img="remera",
                 yellow_flags=["top"]),
        TestInfo(description="remera celeste",
                 clasification_img="remera celeste", yellow_flags=["camisa celeste"]),
        TestInfo(description="sweater", clasification_img="sweater"),
        TestInfo(description="sweater rosa", clasification_img="sweater rosa"),
        TestInfo(description="vestido", clasification_img="vestido"),
        TestInfo(description="vestido estampado",
                 clasification_img="vestido estampado"),
        TestInfo(description="vestido liso", clasification_img="vestido liso"),
        TestInfo(description="vestido rojo", clasification_img="vestido rojo"),
        TestInfo(description="vestido estampado rojo",
                 clasification_img="vestido estampado rojo"),
        TestInfo(description="campera", clasification_img="campera"),
        TestInfo(description="campera de cuero",
                 clasification_img="campera cuero"),
        TestInfo(description="campera negra",
                 clasification_img="campera negra"),
        TestInfo(description="campera de jean",
                 clasification_img="campera jean"),
        TestInfo(description="camisa", clasification_img="camisa"),
        TestInfo(description="camisa celeste",
                 clasification_img="camisa celeste", yellow_flags=["remera celeste"]),
        TestInfo(description="camisa manga larga",
                 clasification_img="camisa manga larga"),
        TestInfo(description="camisa manga corta",
                 clasification_img="camisa manga corta"),
    ]

    _run_test(test_cases, image_paths, images, test_img, test)


def _run_test(test_cases, image_paths, images, test_img=False, test=True):
    image_paths_test = image_paths.copy()
    for test_info in test_cases:
        if test_img:
            path, img, image_paths_test, images_test = _find_candidate_img(
                image_paths, images, test_info.clasification_img, has=test_info.has)
            print("Image:", os.path.basename(path))
            probabilities = find_similarities_image2image(
                model, processor, img, image_paths_test, images_test)
        else:
            print("Descripcion:", test_info.description)
            probabilities = find_similarities_text2images(
                model, processor, test_info.description, image_paths, images)
        if test:
            test_clasification(probabilities=probabilities,
                               image_paths=image_paths_test, has=test_info.has,
                               clasification_img=test_info.clasification_img,
                               yellow_flags=test_info.yellow_flags)
        print("\n")
        if test_img:
            image_paths_test = image_paths.copy()


def _find_candidate_img(image_paths, images, clasification_img, has):
    paths_copy = image_paths.copy()
    images_copy = images.copy()
    for i, path in enumerate(image_paths):
        candidate = os.path.basename(path).lower()
        if (has and clasification_img in candidate) or (not has and clasification_img not in candidate):
            paths_copy.pop(i)
            images_copy.pop(i)
            return image_paths[i], images[i], paths_copy, images_copy
    return None, None, paths_copy, images_copy


if __name__ == "__main__":
    input_folder = "images-testing-roturas"
    output_folder = "images-testing-roturas-nobg"
    run_tests(input_folder, output_folder,
              run_tests_roturas)

    input_folder = "images-testing-preferences"
    output_folder = "images-testing-preferences-nobg"
    # run_tests(input_folder, output_folder,
    #          run_tests_preferences)

    input_folder = "images_testing_general"
    output_folder = "images-testing-general-nobg"
    # run_tests(input_folder, output_folder,
    #          run_tests_general)
