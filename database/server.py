from io import BytesIO
from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
from transformers import AutoModel, AutoProcessor
import requests
from pydantic import BaseModel


app = FastAPI()
model_name = "Marqo/marqo-fashionSigLIP"
pretrained_model_name="Marqo/marqo-fashionSigLIP"
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")



@app.post("/extract-image-features/")
async def extract_image_features(request: dict):
    try:
        image_url = request.get("image_url", "")
        X = extract_feat_image_url(image_url)
        return X[0].tolist()

    except Exception as e:
        return {"error": str(e)}


@app.post("/extract-text-features/")
async def extract_text_features(request: dict):
    try:
        text = request.get("text", "")
        X = extract_feat_text(text)
        return X[0].tolist()

    except Exception as e:
        return {"error": str(e)}


def extract_feat_image_url(image_url: str):
    """
    Extrae características de una imagen desde una URL
    """
    model = AutoModel.from_pretrained(model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(pretrained_model_name, trust_remote_code=True)
    model.eval()
    torch.manual_seed(42)  

    try:
        # Descargar imagen desde URL
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()
        
        # Cargar y procesar imagen
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image_inputs = processor(images=image, return_tensors="pt", padding=True).to(device)

        with torch.no_grad():
            image_features = model.get_image_features(**image_inputs)
            image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True) 
            
        return image_features
        
    except requests.RequestException as e:
        raise Exception(f"Error downloading image from URL: {str(e)}")
    except Exception as e:
        raise Exception(f"Error processing image from URL: {str(e)}")


def extract_feat_text(text: str):
    """
    Extrae características de un texto (descripción)
    """
    model = AutoModel.from_pretrained(model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(pretrained_model_name, trust_remote_code=True)
    model.eval()
    torch.manual_seed(42)  

    # Procesar texto
    text_inputs = processor(text=text, return_tensors="pt", padding=True).to(device)

    with torch.no_grad():
        text_features = model.get_text_features(**text_inputs)
        text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True) 
        
    return text_features