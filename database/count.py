import pandas as pd
from collections import defaultdict

# Definí las palabras clave que vas a buscar
cortes = {
    # "liso",
    "jean wide leg": [0, 0],
    "jean skinny": [0, 0],
    "jean recto": [0, 0],
    "jean palazzo": [0, 0],
    "jean cargo": [0, 0],
    "jean mom": [0, 0],
    "jean acampanado": [0, 0],
}

df = pd.read_csv('datasets/con-sin-roturas-v3.csv')

for desc in df['description']:
    desc_lower = desc.lower()
    for corte, _ in cortes.items():
        if corte in desc_lower:
            if "rotura" in desc_lower:
                cortes[corte][0] += 1
            else:
                cortes[corte][1] += 1

for corte, _ in cortes.items():
    con_rotura, sin_rotura = cortes[corte]
    if con_rotura == 25 and sin_rotura == 25:
        continue
    print(f"{corte}: {con_rotura} con rotura, {sin_rotura} sin rotura")
