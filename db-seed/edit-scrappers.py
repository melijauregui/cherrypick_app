import os
import json
import requests
import sys
from urllib.parse import urlparse


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


def sanitize_filename(name):
    """Sanitiza el nombre del archivo para que sea válido"""
    # Reemplazar espacios y caracteres especiales
    name = name.replace(" ", "_").lower()
    # Remover caracteres no válidos para nombres de archivo
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        name = name.replace(char, '_')
    return name


def process_catalog(json_file_path, output_dir):
    """
    Procesa un archivo JSON de catálogo:
    1. Descarga las imágenes de cada item
    2. Guarda las imágenes en output/images
    3. Actualiza las URLs de imageUrl en el JSON
    4. Guarda el JSON actualizado en output
    """
    # Crear directorio de imágenes
    images_dir = os.path.join(output_dir, "images")
    os.makedirs(images_dir, exist_ok=True)
    
    # Leer el JSON
    with open(json_file_path, "r", encoding="utf-8") as f:
        items = json.load(f)
    
    # Procesar cada item
    for item in items:
        name = sanitize_filename(item["name"])
        url = item["imageUrl"]
        
        # Si la URL ya es una ruta local, saltarla
        if url.startswith("./") or url.startswith("/") or not url.startswith("http"):
            print(f"⚠️  Saltando {name}: URL parece ser local ({url})")
            continue
        
        try:
            print(f"Descargando {name} desde {url} ...")
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            # Obtener extensión del archivo
            content_type = response.headers.get('content-type', '')
            ext = get_file_extension(url, content_type)
            
            filename = f"{name}{ext}"
            filepath = os.path.join(images_dir, filename)
            
            # Guardar imagen
            with open(filepath, "wb") as img_file:
                img_file.write(response.content)
            
            # Actualizar imageUrl en el item
            item["imageUrl"] = os.path.join("images", filename).replace("\\", "/")
            
            print(f"✅ Guardado en {filepath}")
        except Exception as e:
            print(f"❌ Error al descargar {url}: {e}")
    
    # Guardar JSON actualizado
    output_json_path = os.path.join(output_dir, os.path.basename(json_file_path))
    with open(output_json_path, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ JSON actualizado guardado en {output_json_path}")


if __name__ == "__main__":
    root_dir = "./scrapping/charo"
    json_file_path = os.path.join(root_dir, "charo-pantalones-sample.json")
    
    if not os.path.exists(json_file_path):
        print(f"❌ Error: El archivo {json_file_path} no existe")
        sys.exit(1)
    
    process_catalog(json_file_path, root_dir)

