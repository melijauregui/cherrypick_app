from io import BytesIO
from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
from transformers import AutoModel, AutoProcessor


app = FastAPI()
model_name = "melijauregui/fashionclip-roturas"
pretrained_model_name="Marqo/marqo-fashionSigLIP"
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


# Run server with: uvicorn server:app --reload
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        print(f"Received file: {file.filename}")  
        image_bytes = await file.read() 
        X = extract_feat_image(image_bytes)
        return  X.tolist()

    except Exception as e:
        return {"error": str(e)}
    
    
def extract_feat_image(image_bytes):
    model = AutoModel.from_pretrained(model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(pretrained_model_name, trust_remote_code=True)
    model.eval()
    torch.manual_seed(42)  

    # Cargar y procesar imagen
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image_inputs = processor(images=image, return_tensors="pt", padding=True).to(device)

    with torch.no_grad():
        image_features = model.get_image_features(**image_inputs)
        image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True) 
        
    return image_features