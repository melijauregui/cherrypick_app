import time
import os
from rembg import remove
from PIL import Image
import io


def process(input_folder, output_folder, img_name):

    input_path = os.path.join(input_folder, img_name)
    output_path = os.path.join(output_folder, os.path.splitext(img_name)[
        0] + ".png")  # siempre PNG

    with open(input_path, 'rb') as f:
        input_data = f.read()
        output_data = remove(input_data)

    img = Image.open(io.BytesIO(output_data))
    img.save(output_path)


def remove_background(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)

    # Filtrar archivos de imagen
    valid_extensions = (".jpg", ".jpeg", ".png")
    images = [f for f in os.listdir(
        input_folder) if f.lower().endswith(valid_extensions)]

    print(f"Procesando {len(images)} imágenes...")

    total_start = time.time()

    for img_name in images:
        try:
            start = time.time()
            process(input_folder, output_folder, img_name)

            elapsed = time.time() - start
            print(f"{img_name} procesada en {elapsed:.2f}s")
        except Exception as e:
            print(f"Error procesando {img_name}: {e}")

    total_elapsed = time.time() - total_start
    print(f"\nFinalizado. Tiempo total: {total_elapsed:.2f} segundos.")


# remove_background(input_folder, output_folder)
