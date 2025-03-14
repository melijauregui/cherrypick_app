from fastapi import FastAPI
from VGG_feature_extractor import VGGNet
from fastapi import FastAPI, File, UploadFile

app = FastAPI()
model = VGGNet()

# Run server with: uvicorn server:app --reload
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        print(f"Received file: {file.filename}")  
        image_bytes = await file.read() 
        X = model.extract_feat_image(image_bytes)
        return  X.tolist()

    except Exception as e:
        return {"error": str(e)}