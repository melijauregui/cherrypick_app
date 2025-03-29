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

def extract_image_features(url):
    if url is None :
        return None
    try:
        response = requests.get(url)
        image = Image.open(BytesIO(response.content))
        processed = processor(images=image, return_tensors="pt")
    
        with torch.no_grad():
            image_features = model.get_image_features(processed['pixel_values'], normalize=True)
        
        res = image_features.numpy().flatten()
        if np.isnan(res).any():
            return None 
        return res
    except Exception as e:
        df.loc[df['image'] == url, 'image'] = None

def extract_text_features(text):
    if isinstance(text, str):
        text = [text]  # convertir en lista de 1 elemento si no lo es

    processed = processor(
        text=text,
        return_tensors="pt",
        padding="max_length",  # fuerza que todos tengan largo 77
        truncation=True,
        max_length=77
    )

    with torch.no_grad():
        text_features = model.get_text_features(
            input_ids=processed["input_ids"],
            attention_mask=processed["attention_mask"]
        )

    # normalización
    text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True)
    res = text_features[0].numpy() 
    if np.isnan(res).any():
        return None 
    return res



csv_filename = "fashion_data2.csv"
df = pd.read_csv(csv_filename)

model = AutoModel.from_pretrained('Marqo/marqo-fashionCLIP', trust_remote_code=True)
processor = AutoProcessor.from_pretrained('Marqo/marqo-fashionCLIP', trust_remote_code=True)

df['image_embedding'] = df['image'].apply(extract_image_features)
df['text_embedding'] = df['product_details'].apply(extract_text_features)
df.dropna(subset=['image_embedding', 'text_embedding', 'image'], inplace=True)
#df.to_csv(csv_filename, index=False)


# ---- pinecone ----

pc = Pinecone(
    api_key=config.PINECONE_API_KEY,
)
if config.PINECONE_INDEX_NAME in pc.list_indexes().names():
    pc.delete_index(config.PINECONE_INDEX_NAME)


pc.create_index(
    name=config.PINECONE_INDEX_NAME,
    dimension=512,
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


# ---- upsert fashion data ----
vectors = []
    
for _, row in df.iterrows():
    print(f'Processing {row["uuid"]}...')
    print(f'Image URL: {row["image"]}')
    print(f'Image embedding: {row["image_embedding"]}')
    print(f'Text embedding: {row["text_embedding"]}')
    print(f'Brand: {row["brand"]}')
    print(f'URL: {row["url"]}')
    print(f'Title: {row["title"]}')
    print(f'Selling price: {row["selling_price"]}')
    print(f'Product details: {row["product_details"]}')
    print('-----------------------------------')
    vectors.append(
        {
        "id": f'{row["uuid"]}_image', 
        "values": row['image_embedding'].tolist(), 
        "metadata": {"brand": row['brand'], "url" : row['url'], "title": row['title'], "selling_price": row['selling_price'], "product_details": row['product_details']}
        }
    )  
    
    vectors.append(
        {
        "id": f'{row["uuid"]}_text', 
        "values": row['text_embedding'].tolist(), 
        "metadata": {"brand": row['brand'], "url" : row['url'], "title": row['title'], "selling_price": row['selling_price'], "product_details": row['product_details']}
        }
    )  
     
index.upsert(vectors,  namespace="example-namespace")