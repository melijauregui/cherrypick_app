import os
import time
from pinecone import Pinecone, ServerlessSpec # type: ignore
import pandas as pd # type: ignore

import numpy as np
from VGG_feature_extractor import VGGNet
import config 

pc = Pinecone(
    api_key=config.PINECONE_API_KEY,
)

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
path = "database/all_images/"
img_list = [os.path.join(path,f) for f in os.listdir(path)]
print("  start feature extraction ")
model = VGGNet()


vectors = []
for im in os.listdir(path):  
    print("Extracting features from image - ", im)
    X = model.extract_feat(path+im)
    vectors.append(
        {
        "id": im, 
        "values": X.tolist(), 
        "metadata": {"type": "jean", "brand": "pinterest"}
        }
    )
    
index.upsert(vectors,  namespace="example-namespace")