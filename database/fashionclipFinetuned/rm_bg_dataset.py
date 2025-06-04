import os
import pandas as pd
from PIL import Image
from rembg import remove
from io import BytesIO
import requests
from tqdm import tqdm

INPUT_CSV = "datasets/con-sin-roturas-english.csv"
OUTPUT_DIR = "processed_images_english"
OUTPUT_CSV = "datasets/con-sin-roturas-english-v2.csv"

os.makedirs(OUTPUT_DIR, exist_ok=True)

df = pd.read_csv(INPUT_CSV)
processed_entries = []

for idx, row in tqdm(df.iterrows(), total=len(df)):
    url = row["image"]
    description = row["description"]

    try:
        # Nombre de archivo base
        basename = os.path.basename(url).split("?")[0]
        output_filename = os.path.join(OUTPUT_DIR, basename.replace(".jpg", "_nobg.png").replace(".png", "_nobg.png"))

        if not os.path.exists(output_filename):
            # Descargar la imagen
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            image = Image.open(BytesIO(response.content)).convert("RGB")

            # Eliminar fondo
            image_nobg = remove(image)
            image_nobg.save(output_filename)

        processed_entries.append({
            "image": output_filename,
            "description": description
        })

    except Exception as e:
        print(f"⚠️ Error con imagen {url}: {e}")

# Guardar nuevo CSV con rutas locales
processed_df = pd.DataFrame(processed_entries)
processed_df.to_csv(OUTPUT_CSV, index=False)

print(f"✅ Proceso terminado. Imágenes guardadas en '{OUTPUT_DIR}' y CSV generado en '{OUTPUT_CSV}'.")
