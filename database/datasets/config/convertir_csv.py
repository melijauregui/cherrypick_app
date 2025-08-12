import csv
import re
from collections import Counter
import pandas as pd

input_file = 'unificado/roturas-preferencias.csv'
output_file = 'unificado/roturas-preferencias-v2.csv'


def __clean_description(texto):
    # texto = re.sub(r'\.?\s*podria ser[^.]*\.', '.', texto, flags=re.IGNORECASE)

    # texto = re.sub(r'\bde mujer\b', '', texto, flags=re.IGNORECASE)

   # texto = re.sub(r'\bsin rotura\b', '', texto, flags=re.IGNORECASE)

    # texto = re.sub(r'RECTO', 'recto', texto)
    # texto = re.sub(r'WIDE LEG', 'wide leg', texto)
    # texto = re.sub(r'SKINNY', 'skinny', texto)
    # texto = re.sub(r'PALAZZO', 'palazzo', texto)
    # texto = re.sub(r'CARGO', 'cargo', texto)
    # texto = re.sub(r'ACAMPANADO', 'acampanado', texto)
    # texto = re.sub(r'flared o CAMPANA', 'ACAMPANADO',
    #               texto, flags=re.IGNORECASE)
    # texto = re.sub(r'flatered o CAMPANA', 'ACAMPANADO',
    #               texto, flags=re.IGNORECASE)
    # texto = re.sub(r'flared', 'ACAMPANADO', texto)

    # texto = re.sub(r'FLATERED o CAMPANA', 'ACAMPANADO', textoflags=re.IGNORECASE)
    # texto = re.sub(r' MOM ', ' mom ', texto)
    # texto = re.sub(r'ROTURAS', 'roturas', texto)
    # texto = re.sub(r'ROTURA', 'rotura', texto)
    # texto = re.sub(r'jean  ', 'jean ', texto)

    # texto = re.sub(r'flatered', 'FLATERED', texto, flags=re.IGNORECASE)
    # texto = re.sub(r'campana', 'CAMPANA', texto, flags=re.IGNORECASE)
    # texto = re.sub(r'\s+', ' ', texto).strip()

    # if ('rips' in texto.lower() or 'rip ' in texto.lower()) and not texto.startswith('plain'):
    #    # texto = re.sub(r'jeans', 'ripped jeans', texto)
    #    texto = 'ripped ' + texto
    # texto = re.sub(r'([a-zA-Z])\.([a-zA-Z])',
    #               lambda m: f"{m.group(1)}. {m.group(2).upper()}", texto)

    # texto = re.sub(r'([a-zA-Z])\. ([a-zA-Z])',
    #               lambda m: f"{m.group(1)}. {m.group(2).upper()}", texto)

    return texto


def __extract_jean_style(description, ripped):
    if ripped:
        match = re.search(r"\bripped\s+(.+?)\s+jeans\b", description.lower())
    else:
        match = re.search(r"\bplain\s+(.+?)\s+jeans\b", description.lower())
    if match:
        return match.group(1)
    return None


def __extract_tags_ripped_jeans(description):
    desc = description.lower()
    tags = []
    jeanType = __extract_jean_style(desc, True)

    if desc.startswith("plain"):
        tags.append("plain jeans")
        tags.append(f'{jeanType} jeans')
        tags.append(f'plain {jeanType} jeans')
    elif desc.startswith("ripped"):
        tags.append("ripped jeans")
        tags.append(f'{jeanType} jeans')
        tags.append(f'ripped {jeanType} jeans')
    else:
        tags.append("tags")

    return (', ').join(tags)


def transfor_description():
    with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
            open(output_file, 'w', newline='', encoding='utf-8') as outfile:

        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        for row in reader:
            url, descripcion = row
            descripcion_limpia = __clean_description(descripcion)
            writer.writerow([url, descripcion_limpia])

    print(f"Archivo limpio guardado en {output_file}")


def transform_tags(func):
    df = pd.read_csv(input_file, header=0, names=[
                     'image', 'description', 'tags'])
    df['tags'] = df['description'].apply(func)
    df.to_csv(output_file, index=False, header=True)
    print(f"Archivo con tags guardado en {output_file}")


def extraer_tipos_jeans_y_roturas(descripcion):
    tipos = [
        "wide leg", "recto", "skinny", "palazzo", "cargo", "acampanado", "mom"
    ]

    descripcion = descripcion.lower()

    tipo_jean = ""
    roturas = False

    for tipo in tipos:
        matches = list(re.finditer(
            rf'{re.escape(tipo)}', descripcion))
        if matches:
            tipo_jean = tipo
            break

    if re.search(r'rotura(s)?', descripcion):
        roturas = True

    return f"Tipo jean: {'roturas' if roturas else 'liso'}, {tipo_jean}".strip()


def extraer_estilos(descripcion):
    estilos_posibles = [
        "boho chic", "coquette", "minimalista",
        "old money", "streetwear", "deportiv", "salir de noche"
    ]

    descripcion = descripcion.lower()

    contador = Counter()
    primeras_apariciones = {}

    for estilo in estilos_posibles:
        matches = list(re.finditer(
            rf'\b{re.escape(estilo)}', descripcion))
        if matches:
            clave = estilo
            if estilo == "deportiv":
                clave = "deportivo"
            contador[clave] = len(matches)
            primeras_apariciones[clave] = matches[0].start()

    # Ordenar primero por cantidad (desc), luego por primera aparición (asc)
    estilos_ordenados = sorted(
        contador.items(),
        key=lambda item: (-item[1], primeras_apariciones[item[0]])
    )
    return 'Estilos: ' + ', '.join(estilo for estilo, _ in estilos_ordenados)


def agregar_tasks():
    df = pd.read_csv(input_file, header=0, names=[
                     'image', 'description', 'tags'])
    df['task'] = df['tags'].apply(agregar_task)
    df.to_csv(output_file, index=False, header=True)
    print(f"Archivo con tasks guardado en {output_file}")


def agregar_task(tag):
    if re.search(r'Estilos:', tag, re.IGNORECASE):
        return 'estilos'
    return 'roturas'


if __name__ == "__main__":
    # transform_tags(__extract_tags_ripped_jeans)
    # transform_tags(extraer_estilos)
    # transform_tags(extraer_tipos_jeans_y_roturas)
    agregar_tasks()
