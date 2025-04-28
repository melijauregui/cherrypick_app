import csv
import re
import pandas as pd

input_file = 'con-sin-roturas.csv'
output_file = 'con-sin-roturas-v3.csv'


def limpiar_descripcion(texto):
    texto = re.sub(r'\.?\s*podria ser[^.]*\.', '.', texto, flags=re.IGNORECASE)

    texto = re.sub(r'\bde mujer\b', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'\bsin rotura\b', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'recto', 'RECTO', texto)
    texto = re.sub(r'wide leg', 'WIDE LEG', texto)
    texto = re.sub(r'skinny', 'SKINNY', texto)
    texto = re.sub(r'palazzo', 'PALAZZO', texto)
    texto = re.sub(r'cargo', 'CARGO', texto)
    texto = re.sub(r'acampanado', 'ACAMPANADO', texto)
    texto = re.sub(r'flared o CAMPANA', 'ACAMPANADO',
                   texto, flags=re.IGNORECASE)
    texto = re.sub(r'flatered o CAMPANA', 'ACAMPANADO',
                   texto, flags=re.IGNORECASE)
    texto = re.sub(r'flared', 'ACAMPANADO', texto)

    # texto = re.sub(r'FLATERED o CAMPANA', 'ACAMPANADO', textoflags=re.IGNORECASE)
    texto = re.sub(r' mom ', ' MOM ', texto)
    texto = re.sub(r'roturas', 'ROTURAS', texto)
    texto = re.sub(r'rotura', 'ROTURA', texto)
    texto = re.sub(r'jean  ', 'jean ', texto)

    # texto = re.sub(r'flatered', 'FLATERED', texto, flags=re.IGNORECASE)
    # texto = re.sub(r'campana', 'CAMPANA', texto, flags=re.IGNORECASE)
    # texto = re.sub(r'\s+', ' ', texto).strip()

    return texto


with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
        open(output_file, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    for row in reader:
        url, descripcion = row
        descripcion_limpia = limpiar_descripcion(descripcion)
        writer.writerow([url, descripcion_limpia])

print(f"Archivo limpio guardado en {output_file}")
