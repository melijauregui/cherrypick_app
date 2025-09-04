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

estilos = [
    "boho chic", "coquette", "minimalista",
    "old money", "streetwear", "deportivo", "salir de noche"
]


def contar_estilos(df):
    contador = defaultdict(int)
    for tags in df['tags']:
        for estilo in estilos:
            if estilo in tags:
                contador[estilo] += 1
    for estilo, cantidad in contador.items():
        print(f"{estilo}: {cantidad}")


def contar_cortes(df):
    for desc in df['tags']:
        desc_lower: str = desc.lower()
        for corte, _ in cortes.items():
            if corte in desc_lower:
                # prefix = "jean " + corte
                # if prefix in desc_lower and "rotura" in desc_lower:
                if "rotura" in desc_lower:
                    cortes[corte][0] += 1
                else:
                    cortes[corte][1] += 1

    for corte, _ in cortes.items():
        con_rotura, sin_rotura = cortes[corte]
        print(f"{corte}: {con_rotura} con rotura, {sin_rotura} sin rotura")


if __name__ == "__main__":
    df = pd.read_csv('unificado/roturas-preferencias-v2.csv')
    contar_estilos(df)
    contar_cortes(df)
