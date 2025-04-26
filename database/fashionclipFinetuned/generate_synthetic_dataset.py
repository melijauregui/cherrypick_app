import pandas as pd
from transformers import pipeline
import torch
from transformers import pipeline

pipe = pipeline(
    "text-generation",
    model="google/gemma-2-2b-it",
    model_kwargs={"torch_dtype": torch.bfloat16},
    device="cpu",)


def generar_respuesta(text, num_aug_per_sample=3):

    prompt = (
        f"Generar {num_aug_per_sample} descripciones alternativas cortas (1 párrafo cada una) en español para la siguiente prenda de ropa."
        " Formatea la respuesta exactamente de esta manera:"
        "\n\n"
        "**Opción 1:** Texto de la descripción 1.\n"
        "**Opción 2:** Texto de la descripción 2.\n"
        "y continuar con las siguientes (sin texto adicional fuera de las opciones). Prenda: "
    )
    messages = [
        {"role": "user", "content": f"{prompt} '{text}'"},
    ]
    outputs = pipe(messages, max_new_tokens=256)
    assistant_response = outputs[0]["generated_text"][-1]["content"].strip()
    return assistant_response


def parsear_respuestas(respuesta):
    descripciones = []
    opciones = respuesta.split("**Opción ")
    for opcion in opciones[1:]:
        try:
            descripcion = opcion.split(":**")[1].strip()
            descripcion = limpiar_texto(descripcion)
            descripciones.append(descripcion)
        except IndexError:
            continue
    return descripciones


def limpiar_texto(texto):
    return texto.replace('"', '').replace("“", '').replace("”", '').strip()


def generate_synthetic_dataset(df, num_aug_per_sample=3):
    synthetic_data = []
    for i, row in df.iterrows():
        print(f"Processing image {i+1}/{len(df)}: {row['image']}")
        synthetic_data.append(
            {"image": row["image"], "description": row["description"]})

        texto_generado = generar_respuesta(
            row["description"], num_aug_per_sample)
        descripciones = parsear_respuestas(texto_generado)

        for descripcion in descripciones:
            # print(f"Description for image {i+1}: {descripcion}")
            synthetic_data.append(
                {"image": row["image"], "description": descripcion})

    synthetic_df = pd.DataFrame(synthetic_data)
    return synthetic_df


if __name__ == "__main__":
    # Ejemplo:
    # text = "jean de mujer wide leg sin rotura. Estampado blanco de estrellas. Podria ser palazzo o recto por su silueta. Tiro alto. Color negro destenido"
    # respuesta = generar_respuesta(text)
    # print(respuesta)
    df = pd.read_csv("datasets/con-sin-roturas.csv")
    synthetic_df = generate_synthetic_dataset(df)
    synthetic_df.to_csv("datasets/cs-roturas-synthetic.csv",
                        index=False, quotechar='"')
