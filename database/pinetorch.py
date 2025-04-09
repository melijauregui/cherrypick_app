import os
import time
import numpy as np
from pinecone import Pinecone, ServerlessSpec
import pandas as pd 
# import numpy as np
import config 

from transformers import AutoModel, AutoProcessor
import torch
from PIL import Image
import requests
from io import BytesIO

device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


def extract_image_features(url):
    if url is None :
        return None
    try:
        # response = requests.get(url)
        # image = Image.open(BytesIO(response.content))
        image = Image.open(url).convert("RGB")
        image_inputs = processor(images=image, return_tensors="pt", padding=True).to(device)
    
        with torch.no_grad():
            image_features = model.get_image_features(**image_inputs)
            image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True) 
    
        return image_features.flatten()
    except Exception as e:
        df.loc[df['image'] == url, 'image'] = None

def extract_text_features(text):
    emb=[]
    with torch.no_grad():
        inputs = processor(text=text, return_tensors="pt", padding=True, truncation=True).to(device)
        emb = model.get_text_features(**inputs)
        emb = emb / emb.norm(p=2, dim=-1, keepdim=True)
        emb = emb.squeeze(0)
    return emb


csv_filename = "fashion_data.csv"
df = pd.read_csv(csv_filename)

model = AutoModel.from_pretrained("melijauregui/fashionSigLIP-roturas2", trust_remote_code=True).to(device)
processor = AutoProcessor.from_pretrained("Marqo/marqo-fashionSigLIP", trust_remote_code=True)
model.eval()
torch.manual_seed(42) 
df['image_embedding'] = df['image'].apply(extract_image_features)
df['text_embedding'] = df['description'].apply(extract_text_features)
df.dropna(subset=['image_embedding', 'text_embedding', 'image'], inplace=True)

# ---- pinecone ----

pc = Pinecone(
    api_key=config.PINECONE_API_KEY,
)
if config.PINECONE_INDEX_NAME in pc.list_indexes().names():
    pc.delete_index(config.PINECONE_INDEX_NAME)


pc.create_index(
    name=config.PINECONE_INDEX_NAME,
    dimension=768,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)

# Wait for the index to be ready
while not pc.describe_index(config.PINECONE_INDEX_NAME).status['ready']:
    time.sleep(1)

index = pc.Index(config.PINECONE_INDEX_NAME)


# ---- upsert ----
vectors = []
    
for i, row in df.iterrows():
    vectors.append(
        {
        "id": f'{i}_image',
        "values": row['image_embedding'].tolist(), 
        "metadata": {"image": row['image'],"description": row['description'], "type": "image"}
        }
    )  
    
    vectors.append(
        {
        "id": f'{i}_text', 
        "values": row['text_embedding'], 
        "metadata": {"image": row['image'],"description": row['description'], "type": "text"}
        }
    )  
     
index.upsert(vectors,  namespace="example-namespace")