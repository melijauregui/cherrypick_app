import pandas as pd
from collections import defaultdict

cortes = {
    # "liso",
    "wide leg": [0, 0],
    "skinny": [0, 0],
    "recto": [0, 0],
    "palazzo": [0, 0],
    "cargo": [0, 0],
    "mom": [0, 0],
    "acampanado": [0, 0],
}

df = pd.read_csv('datasets/con-sin-roturas-v4.csv')

for desc in df['description']:
    desc_lower: str = desc.lower()
    for corte, _ in cortes.items():
        if corte in desc_lower:
            prefix = "jean " + corte
            if prefix in desc_lower and "rotura" in desc_lower:
                cortes[corte][0] += 1
            else:
                cortes[corte][1] += 1

for corte, _ in cortes.items():
    con_rotura, sin_rotura = cortes[corte]
    print(f"{corte}: {con_rotura} con rotura, {sin_rotura} sin rotura")
