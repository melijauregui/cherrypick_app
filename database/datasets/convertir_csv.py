import csv
import re
import pandas as pd

input_file = 'con-sin-roturas-v3.csv'
output_file = 'con-sin-roturas-v4.csv'


def limpiar_descripcion(texto):
    # texto = re.sub(r'\.?\s*podria ser[^.]*\.', '.', texto, flags=re.IGNORECASE)

    # texto = re.sub(r'\bde mujer\b', '', texto, flags=re.IGNORECASE)

   # texto = re.sub(r'\bsin rotura\b', '', texto, flags=re.IGNORECASE)

    texto = re.sub(r'RECTO', 'recto', texto)
    texto = re.sub(r'WIDE LEG', 'wide leg', texto)
    texto = re.sub(r'SKINNY', 'skinny', texto)
    texto = re.sub(r'PALAZZO', 'palazzo', texto)
    texto = re.sub(r'CARGO', 'cargo', texto)
    texto = re.sub(r'ACAMPANADO', 'acampanado', texto)
    # texto = re.sub(r'flared o CAMPANA', 'ACAMPANADO',
    #               texto, flags=re.IGNORECASE)
    # texto = re.sub(r'flatered o CAMPANA', 'ACAMPANADO',
    #               texto, flags=re.IGNORECASE)
    # texto = re.sub(r'flared', 'ACAMPANADO', texto)

    # texto = re.sub(r'FLATERED o CAMPANA', 'ACAMPANADO', textoflags=re.IGNORECASE)
    texto = re.sub(r' MOM ', ' mom ', texto)
    texto = re.sub(r'ROTURAS', 'roturas', texto)
    texto = re.sub(r'ROTURA', 'rotura', texto)
    # texto = re.sub(r'jean  ', 'jean ', texto)

    # texto = re.sub(r'flatered', 'FLATERED', texto, flags=re.IGNORECASE)
    # texto = re.sub(r'campana', 'CAMPANA', texto, flags=re.IGNORECASE)
    # texto = re.sub(r'\s+', ' ', texto).strip()

    if 'rotura' not in texto.lower():
        if texto.startswith('jean'):
            texto = texto.replace('jean', 'jean liso', 1)
        else:
            texto = texto.replace('Jean', 'Jean liso', 1)

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
