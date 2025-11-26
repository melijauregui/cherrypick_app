import requests
import json

# Configuración del servidor
BASE_URL = "http://localhost:8000"  # Puerto por defecto de uvicorn

def test_predict_url():
    """Prueba el endpoint /extract-image-features/ con una URL de imagen"""
    url = f"{BASE_URL}/extract-image-features/"
    
    # Ejemplo con una imagen de prueba
    payload = {
        "image_url": "https://i.pinimg.com/736x/56/82/a6/5682a6f4fa91e2a534d46b98c5271675.jpg"
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Features extracted: {len(result)} dimensions")
            print(f"First 5 values: {result[:5]}")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error making request: {e}")

def test_extract_text_features():
    """Prueba el endpoint /extract-text-features/ con una descripción"""
    url = f"{BASE_URL}/extract-text-features/"
    
    # Ejemplo con una descripción de producto
    payload = {
        "text": "Camisa casual de algodón azul con diseño moderno"
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Text features extracted: {len(result)} dimensions")
            print(f"First 5 values: {result[:5]}")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error making request: {e}")

if __name__ == "__main__":
    print("=== Testing Database Endpoints ===\n")
    
    print("1. Testing image URL feature extraction:")
    test_predict_url()
    print()
    
    print("2. Testing text feature extraction:")
    test_extract_text_features()
    print()
    
    print("=== Tests completed ===") 