import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Required variables
REQUIRED_VARS = ["WEAVIATE_URL", "WEAVIATE_API_KEY"]

# Check for missing environment variables
missing_vars = [var for var in REQUIRED_VARS if not os.getenv(var)]
if missing_vars:
    raise ValueError(f"❌ Missing environment variables: {', '.join(missing_vars)}")

# Expose environment variables
WEAVIATE_URL = os.getenv("WEAVIATE_URL")
WEAVIATE_API_KEY = os.getenv("WEAVIATE_API_KEY")