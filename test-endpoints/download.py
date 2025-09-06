import os
import json
import requests

OUTPUT_DIR = "images-catalog"


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

            ext = ".jpg"
            filename = os.path.join(OUTPUT_DIR, f"{name}{ext}")

            with open(filename, "wb") as img_file:
                img_file.write(response.content)

            print(f"✅ Guardado en {filename}")
        except Exception as e:
            print(f"❌ Error al descargar {url}: {e}")


if __name__ == "__main__":
    download_catalog("archivos/catalog-items-charo.json")
    download_catalog("archivos/catalog-items-tienda-napoli.json")
