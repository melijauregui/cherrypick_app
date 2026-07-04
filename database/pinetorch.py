import os
import time
from pinecone import Pinecone, ServerlessSpec
import pandas as pd
#------------
import h5py
import numpy as np
from VGG_feature_extractor import VGGNet

# Get API key from environment variable
api_key = os.environ.get('PINECONE_API_KEY')
if not api_key:
    raise EnvironmentError("PINECONE_API_KEY environment variable is not set. Do NOT hard-code API keys in source.")

# Initialize Pinecone
pc = Pinecone(
    api_key=api_key,
)

index_name = "cherrypick-index"
pc.create_index(
    name=index_name,
    dimension=512,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)

# Wait for the index to be ready
while not pc.describe_index(index_name).status['ready']:
    time.sleep(1)

index = pc.Index(index_name)

path = "database/all_images/"
img_list = [os.path.join(path,f) for f in os.listdir(path)]

print("  start feature extraction ")
model = VGGNet()


vectors = []
for im in os.listdir(path):  #iterate through all images to extract features
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
