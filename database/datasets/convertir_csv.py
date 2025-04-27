import csv
import re
import pandas as pd

input_file = 'con-sin-roturas.csv'
output_file = 'con-sin-roturas-v2.csv'


def limpiar_descripcion(texto):
    texto = re.sub(r'\.?\s*podria ser[^.]*\.', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'\bde mujer\b', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'\bsin rotura\b', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'\s+', ' ', texto).strip()

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
