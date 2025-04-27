import csv
import re
import pandas as pd

input_file = 'con-sin-roturas.csv'
output_file = 'con-sin-roturas-v3.csv'


def limpiar_descripcion(texto):
    texto = re.sub(r'\.?\s*podria ser[^.]*\.', '.', texto, flags=re.IGNORECASE)

    texto = re.sub(r'\bde mujer\b', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'\bsin rotura\b', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'recto', 'RECTO', texto, flags=re.IGNORECASE)
    texto = re.sub(r'wide leg', 'WIDE LEG', texto, flags=re.IGNORECASE)
    texto = re.sub(r'skinny', 'SKINNY', texto, flags=re.IGNORECASE)
    texto = re.sub(r'palazzo', 'PALAZZO', texto, flags=re.IGNORECASE)
    texto = re.sub(r'cargo', 'CARGO', texto, flags=re.IGNORECASE)
    texto = re.sub(r'acampanado', 'ACAMPANADO', texto, flags=re.IGNORECASE)
    texto = re.sub(r'roturas', 'ROTURAS', texto, flags=re.IGNORECASE)
    texto = re.sub(r'rotura', 'ROTURA', texto)

    texto = re.sub(r'flatered', 'FLATERED', texto, flags=re.IGNORECASE)
    texto = re.sub(r'campana', 'CAMPANA', texto, flags=re.IGNORECASE)
    # texto = re.sub(r'\s+', ' ', texto).strip()

    return texto


with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
        open(output_file, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    for row in reader:
        if len(row) != 2:
            continue
        url, descripcion = row
        descripcion_limpia = limpiar_descripcion(descripcion)
        writer.writerow([url, descripcion_limpia])

    df = pd.read_csv(output_file, names=["image", "description"])
    print(df['description'].str.contains('rotura', case=False).value_counts())


print(f"Archivo limpio guardado en {output_file}")
