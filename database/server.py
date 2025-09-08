from rembg import remove
from io import BytesIO
from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
from transformers import AutoModel, AutoProcessor
import requests
from pydantic import BaseModel
import numpy as np


app = FastAPI()
model_name = "Sofia-gb/cherrypick-sigLip11"
pretrained_model_name = "Marqo/marqo-fashionSigLIP"
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# Load model and processor once at startup
print(f"Loading model {model_name} and processor...")
model = AutoModel.from_pretrained(
    model_name, trust_remote_code=True).to(device)
processor = AutoProcessor.from_pretrained(
    pretrained_model_name, trust_remote_code=True)
model.eval()
torch.manual_seed(42)
print("Model and processor loaded successfully!")


@app.post("/extract-image-features/")
async def extract_image_features(request: dict):
    try:
        # Check if we have image_url or image_base64
        if "image_url" in request and request["image_url"]:
            print("Obteniendo features de imagen url")
            image_url = request.get("image_url", "")
            X = extract_feat_image_url(image_url)
        elif "image_base64" in request and request["image_base64"]:
            print("Obteniendo features de imagen base64")
            image_base64 = request.get("image_base64", "")
            X = extract_feat_image_base64(image_base64)
        else:
            return {"error": "Either image_url or image_base64 must be provided"}

        return X[0].cpu().tolist()

    except Exception as e:
        return {"error": str(e)}


@app.post("/extract-text-features/")
async def extract_text_features(request: dict):
    try:
        print("Obteniendo features de texto")
        text = request.get("text", "")
        X = extract_feat_text(text)
        return X[0].cpu().tolist()

    except Exception as e:
        print(f"Error extracting text features: {str(e)}")
        return {"error": str(e)}


def extract_feat_image_url(image_url: str):
    """
    Extrae características de una imagen desde una URL
    (con fondo eliminado usando rembg)
    """
    try:
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()

        # Convertir a RGB y remover fondo
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image_no_bg = remove(image)

        image_inputs = processor(
            images=image_no_bg, return_tensors="pt",
            padding=True, truncation=True
        ).to(device)

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=image_inputs["pixel_values"], normalize=True)

        return image_features

    except requests.RequestException as e:
        raise Exception(f"Error downloading image from URL: {str(e)}")
    except Exception as e:
        raise Exception(f"Error processing image from URL: {str(e)}")


def extract_feat_image_base64(image_base64: str):
    """
    Extrae características de una imagen desde datos base64
    (con fondo eliminado usando rembg)
    """
    try:
        import base64
        image_data = base64.b64decode(image_base64)

        # Convertir a RGB y remover fondo
        image = Image.open(BytesIO(image_data)).convert("RGB")
        image_no_bg = remove(image)

        image_inputs = processor(
            images=image_no_bg, return_tensors="pt",
            padding=True, truncation=True
        ).to(device)

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=image_inputs["pixel_values"], normalize=True)

        return image_features

    except Exception as e:
        raise Exception(f"Error processing image from base64: {str(e)}")


def extract_feat_text(text: str):
    """
    Extrae características de un texto (descripción)
    """
    text_inputs = processor(
        text=[text], padding='max_length', return_tensors="pt").to(device)

    input_ids = text_inputs["input_ids"]
    attention_mask = text_inputs["attention_mask"]

    with torch.no_grad():
        text_features = model.get_text_features(
            input_ids=input_ids, attention_mask=attention_mask, normalize=True)

    return text_features


@app.post("/extract-features/")
async def extract_features(request: dict):
    try:
        if "image_url" in request and request["image_url"]:
            image_url = request.get("image_url", "")
        if "text" in request and request["text"]:
            text = request.get("text", "")
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content)).convert("RGB")

        processed = processor(
            text=[text], images=[img], padding='max_length', return_tensors="pt").to(device)

        pixel_values = processed["pixel_values"]
        input_ids = processed["input_ids"]
        attention_mask = processed["attention_mask"]

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=pixel_values, normalize=True)
            text_features = model.get_text_features(
                input_ids=input_ids, attention_mask=attention_mask, normalize=True)

        return {
            "image_features": image_features[0].cpu().tolist(),
            "text_features": text_features[0].cpu().tolist()
        }

    except Exception as e:
        return {"error": str(e)}


@app.post("/search-text/")
async def similarities_matrix(request: dict):
    try:
        if "image_urls" in request and request["image_urls"]:
            image_urls = request.get("image_urls", [])
        if "text" in request and request["text"]:
            text = request.get("text", "")
        images = []
        for url in image_urls:
            response = requests.get(url)
            img = Image.open(BytesIO(response.content)).convert("RGB")
            images.append(img)

        processed = processor(
            text=[text], images=images, padding='max_length', return_tensors="pt").to(device)

        pixel_values = processed["pixel_values"]
        input_ids = processed["input_ids"]
        attention_mask = processed["attention_mask"]

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=pixel_values, normalize=True)
            text_features = model.get_text_features(
                input_ids=input_ids, attention_mask=attention_mask, normalize=True)

        # Matriz de similitud: (n imágenes x 1 texto)
        similarity_scores = (image_features @
                             text_features.T).squeeze(-1)  # (n imágenes,)
        # Opcional: pasarlo a "probabilidad" tipo sigmoidea
        probabilities = similarity_scores.sigmoid()  # entre 0 y 1

        sorted_indices = np.argsort(probabilities.cpu().numpy())[::-1]
        sorted_results = []
        for rank, img_idx in enumerate(sorted_indices):
            # similarity = probabilities[img_idx]
            sorted_results.append(image_urls[img_idx])

        return sorted_results

    except Exception as e:
        return {"error": str(e)}


@app.post("/similarities-preferences/")
async def similarities_preferences(request: dict):
    try:
        if "image_url" in request and request["image_url"]:
            image_url = request.get("image_url", "")
        if "preferences" in request and request["preferences"]:
            preferences = request.get("preferences", "")
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content)).convert("RGB")
        processed = processor(
            text=preferences, images=[img], padding='max_length', return_tensors="pt").to(device)

        pixel_values = processed["pixel_values"]
        input_ids = processed["input_ids"]
        attention_mask = processed["attention_mask"]

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=pixel_values, normalize=True)
            text_features = model.get_text_features(
                input_ids=input_ids, attention_mask=attention_mask, normalize=True)

        similarity_scores = (image_features @
                             text_features.T).squeeze(0)

        probabilities = similarity_scores.sigmoid().cpu().tolist()

        result = [
            {"preference": pref, "similarity": prob}
            for pref, prob in zip(preferences, probabilities)
        ]

        return {"error": False, "details": "Similarities computed successfully", "similarities": result}

    except Exception as e:
        return {"error": True, "details": str(e), "similarities": []}
