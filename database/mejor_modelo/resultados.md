## Resumen Métricas

**Recall@k** mide qué proporción de las etiquetas verdaderas (relevantes) están presentes entre las k predicciones principales del modelo. Es útil en tareas multilabel o de recomendación, donde importa recuperar la mayor cantidad posible de elementos relevantes. Por ejemplo, si una imagen tiene 3 etiquetas verdaderas y el modelo acierta 2 de ellas en sus 5 predicciones principales, el Recall@5 sería 2/3 ≈ 0.67. A mayor k, más fácil recuperar etiquetas correctas, pero también más "tolerante".

**Precision@k** mide qué proporción de las k predicciones principales del modelo son correctas. Es útil para evaluar qué tan "precisas" son las primeras predicciones del modelo. Por ejemplo, si el modelo predice 5 etiquetas y 2 de ellas son verdaderas, el Precision@5 sería 2/5 = 0.4. A menor k, esta métrica se vuelve más exigente, destacando cuán certeras son las primeras predicciones.

**MRR** (Mean Reciprocal Rank) evalúa cuán pronto aparece la primera respuesta relevante en una lista ordenada de predicciones. Para cada muestra, se calcula el recíproco del índice de la primera etiqueta relevante predicha. Si la primera etiqueta relevante aparece en la posición 1, su recíproco es 1 (perfecto); si aparece en la posición 3, es 1/3 ≈ 0.33. El MRR final es el promedio de estos recíprocos en todas las muestras.

## Hiperparámetros

Parámetros ajustados durante el fine-tunning:
- Batch size
- Epochs
- Learning rate
- Función de pérdida utilizada
- Temperature: En el contexto de funciones de pérdida contrastiva, como InfoNCE, es un escalar que ajusta la escala de los logits (similitudes entre embeddings). Su propósito es controlar la suavidad o agudeza de las probabilidades softmax.
- Cantidad de capas a entrenar

## Resultados y Métricas

### Roturas

Modelo: Sofia-gb/fashionSigLIP-roturas23

Resultados TRAIN:
- recall@1: 0.3962
- recall@5: 0.8189
- recall@10: 0.9396
- MRR: 0.5712
- Precision@5: 0.822

Resultados TEST (validación):
- recall@1: 0.4627
- recall@5: 0.8955
- recall@10: 0.9851
- MRR: 0.6303
- Precision@5: 0.8955