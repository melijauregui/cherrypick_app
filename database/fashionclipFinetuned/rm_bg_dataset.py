import os
import pandas as pd
from PIL import Image
from rembg import remove
from io import BytesIO
import requests
from tqdm import tqdm

INPUT_CSV = "datasets/preferencias/preferencias-nobg4.csv"
OUTPUT_DIR = "processed_preferences_images"
OUTPUT_CSV = "datasets/preferencias/preferencias-nobg4.csv"

os.makedirs(OUTPUT_DIR, exist_ok=True)

df = pd.read_csv(INPUT_CSV)
processed_entries = []

for idx, row in tqdm(df.iterrows(), total=len(df)):
    url = row["image"]
    description = row["description"]
    tags = row["tags"]

    try:
        # Nombre de archivo base
        basename = os.path.basename(url).split("?")[0]
        rm = False
        if not url.endswith('nobg.png'):
            if url.endswith('.jpg'):
                basename = basename.replace(
                    ".jpg", "_nobg.png")
            else:
                basename = basename.replace(".png", "_nobg.png")
            rm = True

        output_filename = os.path.join(OUTPUT_DIR, basename)
        if url.endswith('_nobg_nobg.png'):
            output_filename = output_filename.replace(
                "_nobg_nobg.png", "_nobg.png")
            os.rename(os.path.join(OUTPUT_DIR, basename), output_filename)

        if rm and not os.path.exists(output_filename):
            # Descargar la imagen
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            image = Image.open(BytesIO(response.content)).convert("RGB")

            # Eliminar fondo
            image_nobg = remove(image)
            image_nobg.save(output_filename)

        processed_entries.append({
            "image": output_filename,
            "description": description,
            "tags": tags
        })

    except Exception as e:
        print(f"⚠️ Error con imagen {url}: {e}")

# Guardar nuevo CSV con rutas locales
processed_df = pd.DataFrame(processed_entries)
processed_df.to_csv(OUTPUT_CSV, index=False)

print(
    f"✅ Proceso terminado. Imágenes guardadas en '{OUTPUT_DIR}' y CSV generado en '{OUTPUT_CSV}'.")
