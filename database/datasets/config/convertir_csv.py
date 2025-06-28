import csv
import re
import pandas as pd

input_file = 'con-sin-roturas-english-v5.csv'
output_file = 'con-sin-roturas-english-v7.csv'


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


def __extract_style(description, ripped):
    if ripped:
        match = re.search(r"\bripped\s+(.+?)\s+jeans\b", description.lower())
    else:
        match = re.search(r"\bplain\s+(.+?)\s+jeans\b", description.lower())
    if match:
        return match.group(1)
    return None


def __extract_tags(description):
    desc = description.lower()
    tags = []
    jeanType = __extract_style(desc, True)

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


def transform_tags():
    df = pd.read_csv(input_file, header=None, names=['url', 'description'])
    df['tags'] = df['description'].apply(__extract_tags)
    df.to_csv(output_file, index=False, header=False)
    print(f"Archivo con tags guardado en {output_file}")


if __name__ == "__main__":
    transform_tags()
