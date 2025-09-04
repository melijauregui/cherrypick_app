## Resumen Métricas

**Recall@k** mide qué proporción de las etiquetas verdaderas (relevantes) están presentes entre las k predicciones principales del modelo. Es útil en tareas multilabel o de recomendación, donde importa recuperar la mayor cantidad posible de elementos relevantes. Por ejemplo, si una imagen tiene 3 etiquetas verdaderas y el modelo acierta 2 de ellas en sus 5 predicciones principales, el Recall@5 sería 2/3 ≈ 0.67. A mayor k, más fácil recuperar etiquetas correctas, pero también más "tolerante".

**Precision@k** mide qué proporción de las k predicciones principales del modelo son correctas. Es útil para evaluar qué tan "precisas" son las primeras predicciones del modelo. Por ejemplo, si el modelo predice 5 etiquetas y 2 de ellas son verdaderas, el Precision@5 sería 2/5 = 0.4. A menor k, esta métrica se vuelve más exigente, destacando cuán certeras son las primeras predicciones.

**MRR** (Mean Reciprocal Rank) evalúa cuán pronto aparece la primera respuesta relevante en una lista ordenada de predicciones. Para cada muestra, se calcula el recíproco del índice de la primera etiqueta relevante predicha. Si la primera etiqueta relevante aparece en la posición 1, su recíproco es 1 (perfecto); si aparece en la posición 3, es 1/3 ≈ 0.33. El MRR final es el promedio de estos recíprocos en todas las muestras.

## Ajuste de Hiperparámetros

Parámetros ajustados durante el fine-tunning:
- Batch size
- Epochs
- Learning rate
- Función de pérdida utilizada
- Temperature: En el contexto de funciones de pérdida contrastiva, como InfoNCE, es un escalar que ajusta la escala de los logits (similitudes entre embeddings). Su propósito es controlar la suavidad o agudeza de las probabilidades softmax.
- Cantidad de capas a entrenar

## Resultados y Métricas

### Tests

Realizamos tests sobre 
- Roturas
- Estilos
- Tipos de prendas 
- Colores
- Combinaciones de los anteriores

Los tests calculan las siguientes métricas:
- Presición
- Recall
- MRR
- Accuracy

A su vez, los tests tienen en cuenta
- Yellow flags: Se refieren a items de ropa *parecidos* a la descripción dada, y aceptables. 
- Red flag: items de ropa que no corresponden a la descripción dada.

Umbrales para considerar que los resultados son aceptables:
- Basado en ranking: Exigir que la primera imagen correcta esté en Top-3 del ranking de similitud. Esto se mide con MRR > 0.3 
- Precisión >= 0.7
- Accuracy >= 0.8
- Recall >= 0.6


### Modelos

#### Modelo: Sofia-gb/fashionSigLIP-roturas23

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

#### Modelo: Sofia-gb/cherrypick-sigLip

Resultados TRAIN:
- recall@1: 0.5881
- recall@5: 0.8958
- recall@10: 0.9529
- MRR: 0.7131
- Precision@5: 0.8983

Resultados TEST:
- recall@1: 0.6733
- recall@5: 0.9406
- recall@10: 0.9901
- MRR: 0.7895
- Precision@5: 0.9406

#### Modelo: Sofia-gb/cherrypick-sigLip2

Resultads TRAIN:
- Loss: 0.0208
- recall@1: 0.9706
- recall@5: 1.0000
- recall@10: 1.0000
- MRR: 0.9853
- Precision@5: 1.0000

Resultados TEST:
- Loss: 0.0881
- recall@1: 0.9706
- recall@5: 0.9706
- recall@10: 1.0000
- MRR: 0.9739
- Precision@5: 0.9706

#### Modelo: Sofia-gb/cherrypick-sigLip3

Resultados TRAIN:                                                                                          
- Loss: 0.0417
- recall@1: 0.4557
- recall@5: 0.9520
- recall@10: 0.9963
- MRR: 0.6622
- Precision@5: 0.9520

Resultados TEST:
- Loss: 0.1935
- recall@1: 0.6436
- recall@5: 0.9307
- recall@10: 0.9802
- MRR: 0.7742
- Precision@5: 0.9307

#### Modelo: Sofia-gb/cherrypick-sigLip5

Resultados TRAIN:
- Loss: 0.0536
- recall@1: 0.4797
- recall@5: 0.9373
- recall@10: 0.9834
- MRR: 0.6676
- Precision@5: 0.9391

Resultados TEST:
- Loss: 0.1927
- recall@1: 0.6832
- recall@5: 0.9406
- recall@10: 0.9901
- MRR: 0.8032
- Precision@5: 0.9406

#### Modelo: Sofia-gb/cherrypick-sigLip6

TRAIN:
- Loss: 0.0631
- recall@1: 0.4244
- recall@5: 0.9096
- recall@10: 0.9834
- MRR: 0.6244
- Precision@5: 0.9114

TEST:
- Loss: 0.1931
- recall@1: 0.6634
- recall@5: 0.9604
- recall@10: 0.9901
- MRR: 0.7866
- Precision@5: 0.9604

#### 7
🧪 Loss: 0.0896
Recall 🔍 recall@1: 0.6123
Recall 🔍 recall@5: 0.9102
Recall 🔍 recall@10: 0.9622
🔍 MRR: 0.7347
🔍 Precision@5: 0.9078

🧪 Loss: 0.1789
Recall 🔍 recall@1: 0.6226
Recall 🔍 recall@5: 0.9057
Recall 🔍 recall@10: 0.9811
🔍 MRR: 0.7450
🔍 Precision@5: 0.9057

#### 8

🧪 Loss: 0.0864
Recall 🔍 recall@1: 0.6572
Recall 🔍 recall@5: 0.8936
Recall 🔍 recall@10: 0.9527
🔍 MRR: 0.7524
🔍 Precision@5: 0.8936


🧪 Loss: 0.1915
Recall 🔍 recall@1: 0.6132
Recall 🔍 recall@5: 0.9057
Recall 🔍 recall@10: 0.9623
🔍 MRR: 0.7462
🔍 Precision@5: 0.9057

#### 9

🧪 Loss: 0.0389
Recall 🔍 recall@1: 0.5392
Recall 🔍 recall@5: 0.9664
Recall 🔍 recall@10: 0.9981
🔍 MRR: 0.7287
🔍 Precision@5: 0.9646

🧪 Loss: 0.1673
Recall 🔍 recall@1: 0.6604
Recall 🔍 recall@5: 0.9245
Recall 🔍 recall@10: 0.9717
🔍 MRR: 0.7764
🔍 Precision@5: 0.9245

#### 10

TRAIN:
- 🧪 Loss: 0.1237
- Recall 🔍 recall@1: 0.5694
- Recall 🔍 recall@5: 0.8611
- Recall 🔍 recall@10: 0.9405
- 🔍 MRR: 0.7048
- 🔍 Precision@5: 0.8631

TEST:
- 🧪 Loss: 0.2221
- Recall 🔍 recall@1: 0.6142
- Recall 🔍 recall@5: 0.9291
- Recall 🔍 recall@10: 0.9685
- 🔍 MRR: 0.7483
- 🔍 Precision@5: 0.9291

#### 11

TRAIN:
- 🧪 Loss: 0.1802
- Recall 🔍 recall@1: 0.5656
- Recall 🔍 recall@5: 0.8936
- Recall 🔍 recall@10: 0.9415
- 🔍 MRR: 0.7054
- 🔍 Precision@5: 0.8936

TEST:
- 🧪 Loss: 0.4182
- Recall 🔍 recall@1: 0.5423
- Recall 🔍 recall@5: 0.8732
- Recall 🔍 recall@10: 0.9085
- 🔍 MRR: 0.6984
- 🔍 Precision@5: 0.8732