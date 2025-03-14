import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Required variables
REQUIRED_VARS = ["PINECONE_API_KEY", "PINECONE_INDEX_NAME"]

# Check for missing environment variables
missing_vars = [var for var in REQUIRED_VARS if not os.getenv(var)]
if missing_vars:
    raise ValueError(f"❌ Missing environment variables: {', '.join(missing_vars)}")

# Expose environment variables
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
