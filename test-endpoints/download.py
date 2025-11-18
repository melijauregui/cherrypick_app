import os
import json
import requests
from urllib.parse import urlparse

OUTPUT_DIR = "./images-charo"


def get_file_extension(url, content_type=None):
    """Obtiene la extensión del archivo desde la URL o content-type"""
    # Intentar obtener de la URL
    parsed = urlparse(url)
    path = parsed.path.lower()
    
    if path.endswith(('.jpg', '.jpeg')):
        return '.jpg'
    elif path.endswith('.png'):
        return '.png'
    elif path.endswith('.gif'):
        return '.gif'
    elif path.endswith('.webp'):
        return '.webp'
    # Si no se encuentra en la URL, usar content-type
    elif content_type:
        if 'jpeg' in content_type or 'jpg' in content_type:
            return '.jpg'
        elif 'png' in content_type:
            return '.png'
        elif 'gif' in content_type:
            return '.gif'
        elif 'webp' in content_type:
            return '.webp'
    
    # Por defecto, jpg
    return '.jpg'


def download_catalog(file):
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with open(file, "r", encoding="utf-8") as f:
        items = json.load(f)

    for item in items:
        name = item["name"].replace(" ", "_").lower()
        url = item["imageUrl"]

        try:
            print(f"Descargando {name} desde {url} ...")
            response = requests.get(url, timeout=10)
            response.raise_for_status()

            # Obtener extensión del archivo
            content_type = response.headers.get('content-type', '')
            ext = get_file_extension(url, content_type)
            
            filename = os.path.join(OUTPUT_DIR, f"{name}{ext}")

            with open(filename, "wb") as img_file:
                img_file.write(response.content)

            print(f"✅ Guardado en {filename}")
        except Exception as e:
            print(f"❌ Error al descargar {url}: {e}")


if __name__ == "__main__":
    download_catalog("archivos/catalog-items-charo.json")
