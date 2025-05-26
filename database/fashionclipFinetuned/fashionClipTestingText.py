import os
import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np

# Configurar dispositivo
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


def find_most_similar_description(model_name, pretrained_model_name, image_path, descriptions):
    # Cargar modelo y processor
    model = AutoModel.from_pretrained(
        model_name, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained(
        pretrained_model_name, trust_remote_code=True)

    # Tu imagen
    image = Image.open(image_path).convert("RGB")

    # Procesar imagen
    image_inputs = processor(images=image, return_tensors="pt").to(device)
    with torch.no_grad():
        image_features = model.get_image_features(**image_inputs)
        image_features = image_features / \
            image_features.norm(p=2, dim=-1, keepdim=True)

    text_features = []
    with torch.no_grad():
        for desc in descriptions:
            inputs = processor(text=desc, return_tensors="pt",
                               padding=True, truncation=True).to(device)
            emb = model.get_text_features(**inputs)
            emb = emb / emb.norm(p=2, dim=-1, keepdim=True)
            text_features.append(emb.squeeze(0))  # quitar dimensión batch

    text_features = torch.stack(text_features)

    # Calcular similitudes
    similarities = torch.matmul(
        image_features, text_features.T).squeeze().cpu().numpy()

    sorted_indices = np.argsort(similarities)[::-1]
    for i in sorted_indices:
        print(f"Similitud con '{descriptions[i]}': {similarities[i]}")
    if len(similarities) == 2:
        delta = abs(similarities[0] - similarities[1])
        print(f"Diferencia: {delta}")

    print(f"Descripción más similar: {descriptions[np.argmax(similarities)]}")


def find_similarities_matrix(model, processor, descriptions, image_paths, image_inputs):
    # Cargar modelo y processor
    with torch.no_grad():
        image_features = model.get_image_features(**image_inputs)
        image_features = image_features / \
            image_features.norm(p=2, dim=-1, keepdim=True)

    # Procesar descripciones
    text_features = []
    with torch.no_grad():
        for desc in descriptions:
            inputs = processor(text=desc, return_tensors="pt",
                               padding=True, truncation=True).to(device)
            emb = model.get_text_features(**inputs)
            emb = emb / emb.norm(p=2, dim=-1, keepdim=True)
            text_features.append(emb.squeeze(0))

    text_features = torch.stack(text_features)

    # Calcular matriz de similitud: [N imágenes, M textos]
    similarity_matrix = torch.matmul(
        text_features, image_features.T).cpu().numpy()

    for i, description in enumerate(descriptions):
        print(f"\n📝 SIMILITUD CON DESCRIPCIÓN: '{description}'\n")
        sorted_indices = np.argsort(similarity_matrix[i])[::-1]
        for rank, img_idx in enumerate(sorted_indices):
            similarity = similarity_matrix[i][img_idx]
            print(
                f"   {rank+1}. {image_paths[img_idx]} → Similitud: {similarity:.3f}")

    return similarity_matrix


def find_similarities_matrix2(model, processor, description, image_paths, images):
    processed = processor(
        text=[description], images=images, padding='max_length', return_tensors="pt")

    with torch.no_grad():
        image_features = model.get_image_features(
            processed['pixel_values'], normalize=True)
        text_features = model.get_text_features(
            processed['input_ids'], normalize=True)

    # Matriz de similitud: (n imágenes x 1 texto)
    similarity_scores = (image_features @
                         text_features.T).squeeze(-1)  # (n imágenes,)
    # Opcional: pasarlo a "probabilidad" tipo sigmoidea
    probabilities = similarity_scores.sigmoid()  # entre 0 y 1

    print(f"\n📝 SIMILITUD CON DESCRIPCIÓN: '{description}'\n")
    sorted_indices = np.argsort(probabilities.cpu().numpy())[::-1]
    for rank, img_idx in enumerate(sorted_indices):
        similarity = probabilities[img_idx]
        print(
            f"   {rank+1}. {image_paths[img_idx]} → Similitud: {similarity:.3f}")

    return probabilities


def test_text_clasification(probabilities, image_paths, has, clasification_img, yellow_flags=[], imprimir_mayores_al_minimo = False):
    # Extraer nombres de archivo
    image_names = [os.path.basename(path) for path in image_paths]

    # Clasificar imágenes
    rotura_imgs = []
    no_rotura_imgs = []

    for i, name in enumerate(image_names):
        if has:
            if has and clasification_img in name:
                rotura_imgs.append(i)
            else:
                no_rotura_imgs.append(i)
        else:
            if clasification_img in name:
                no_rotura_imgs.append(i)
            else:
                rotura_imgs.append(i)

    # Evaluar condición 1: rotura con descripción 1
    max_no_rotura = float('-inf')
    best_idx = None
    max_yellow_flag = float('-inf')
    best_idx_yellow_flag = None
    for j in no_rotura_imgs:
        if probabilities[j] > max_no_rotura:
            if any(flag in image_names[j] for flag in yellow_flags):
                if probabilities[j] > max_yellow_flag:
                    max_yellow_flag = probabilities[j]
                    best_idx_yellow_flag = j
                continue
            max_no_rotura = probabilities[j]
            best_idx = j

    print(
        f"mayor red flag es {image_names[best_idx]} con {max_no_rotura} de probabilidad")
    if best_idx_yellow_flag is not None:
        print(
            f"mayor yellow flag es {image_names[best_idx_yellow_flag]} con {max_yellow_flag} de probabilidad")
    correct = 0
    correct_aprox = 0
    total = len(rotura_imgs)

    for i in rotura_imgs:
        value = probabilities[i]
        success = value > max_no_rotura and value > max_yellow_flag

        if success:
            correct += 1

        if value > max_no_rotura:
            status = '🟨'  # Amarillo si supera max_no_rotura pero no max_yellow_flag
            correct_aprox += 1
        else:
            status = '❌'  # Rojo si no supera ni max_no_rotura

        if success:
            status = '✅'  # Verde si supera ambos

        print(
            f"[{clasification_img}] {image_names[i]}: {value:.3f} > {max_no_rotura:.3f}? {status}")

    accuracy = (correct / total) * 100 if total > 0 else 0
    print(f"\n🎯 Porcentaje de acierto: {accuracy:.2f}% ({correct}/{total})")
    if correct_aprox > correct:
        accuracy = (correct_aprox / total) * 100 if total > 0 else 0

        print(
            f"\n🎯 Porcentaje de acierto incluyendo 🟨: {accuracy:.2f}% ({correct_aprox}/{total})")
        
    #imprimo todos los que estan arriba del minimo rotura
    
    if imprimir_mayores_al_minimo:
        # imprimo la probabilidad mas chica de roturas
        if rotura_imgs:
            min_rotura = min(probabilities[i] for i in rotura_imgs)
            print(f"\nProbabilidad más baja: {min_rotura:.3f}")

        print("\nImágenes con probabilidad mayor al mínimo:")
        for i, value in enumerate(probabilities):
            if value > min_rotura and i not in rotura_imgs:
                print(f"Esta imagen sobrepaso al minimo: {image_names[i]}: {value:.3f}") 

""" 
Resultados:

descriptions = [
    "jean sin roturas",
    "jean con roturas visibles"
]

FASHIONCLIP:
Similitud con 'jean con roturas visibles': 0.4796622097492218
Similitud con 'jean sin roturas': 0.31197893619537354
Descripción más similar: jean con roturas visibles

FASHIONSIGLIP:
Similitud con 'jean sin roturas': 0.13367873430252075
Similitud con 'jean con roturas visibles': 0.11075586080551147
Descripción más similar: jean sin roturas

-----------------------

descriptions = [
    "jean sin roturas",
    "jean con roturas"
]

FASHIONCLIP:
Similitud con 'jean con roturas': 0.42065301537513733
Similitud con 'jean sin roturas': 0.31197893619537354
Descripción más similar: jean con roturas

FASHIONSIGLIP:
Similitud con 'jean con roturas': 0.17554162442684174
Similitud con 'jean sin roturas': 0.13367873430252075
Descripción más similar: jean con roturas

----------------------

descriptions = [
    "jean wide leg sin roturas. Color celeste.",
    "jean wide leg con roturas. Color celeste."
]

Sofia-gb/fashionclip-roturas2:
Similitud con 'jean wide leg con roturas. Color celeste.': 0.7467606067657471
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.7414008975028992
Descripción más similar: jean wide leg con roturas. Color celeste.

Sofia-gb/fashionclip-roturas3:
Similitud con 'jean wide leg con roturas. Color celeste.': 0.7874948382377625
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.7807509899139404
Diferencia: 0.0067438483238220215
Descripción más similar: jean wide leg con roturas. Color celeste.

Sofia-gb/fashionSigLIP-roturas:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.11929132044315338
Similitud con 'jean wide leg con roturas. Color celeste.': 0.0963045060634613
Descripción más similar: jean wide leg sin roturas. Color celeste.

Sofia-gb/fashionSigLIP-roturas2:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.0039484696462750435
Similitud con 'jean wide leg con roturas. Color celeste.': -0.015217212960124016
Descripción más similar: jean wide leg sin roturas. Color celeste.

Sofia-gb/fashionSigLIP-roturas3:
Similitud con 'jean wide leg sin roturas. Color celeste.': 0.14181290566921234
Similitud con 'jean wide leg con roturas. Color celeste.': 0.11660870164632797
Diferencia: 0.02520420402288437
Descripción más similar: jean wide leg sin roturas. Color celeste

-----------------------------------

Sofia-gb/fashionSigLIP-roturas4: congelar capas y optimizar solo la última.

📝 SIMILITUD CON DESCRIPCIÓN: 'jean sin rotura.'

   1. images-testing/rotura3.png → Similitud: 0.587
   2. images-testing/roturas-negro1.jpg → Similitud: 0.580
   3. images-testing/rotura2.png → Similitud: 0.569
   4. images-testing/skinny-rotura.png → Similitud: 0.566
   5. images-testing/roturas-negro2.jpg → Similitud: 0.542
   6. images-testing/rotura1.png → Similitud: 0.542
   7. images-testing/sin-rotura.png → Similitud: 0.348

📝 SIMILITUD CON DESCRIPCIÓN: 'jean con roturas.'

   1. images-testing/rotura3.png → Similitud: 0.590
   2. images-testing/roturas-negro1.jpg → Similitud: 0.588
   3. images-testing/rotura2.png → Similitud: 0.573
   4. images-testing/skinny-rotura.png → Similitud: 0.558
   5. images-testing/roturas-negro2.jpg → Similitud: 0.556
   6. images-testing/rotura1.png → Similitud: 0.543
   7. images-testing/sin-rotura.png → Similitud: 0.351
   
--------------------------

Sofia-gb/fashionSigLIP-roturas5: congelar capas y optimizar solo la última + data augmentation.

📝 SIMILITUD CON DESCRIPCIÓN: 'jean sin cortes ni roturas'

   1. images-testing/rotura2.png → Similitud: 0.447
   2. images-testing/rotura3.png → Similitud: 0.443
   3. images-testing/sin-rotura.png → Similitud: 0.438
   4. images-testing/roturas-negro1.jpg → Similitud: 0.437
   5. images-testing/roturas-negro2.jpg → Similitud: 0.429
   6. images-testing/rotura1.png → Similitud: 0.414
   7. images-testing/skinny-rotura.png → Similitud: 0.411

📝 SIMILITUD CON DESCRIPCIÓN: 'jean con roturas.'

   1. images-testing/rotura2.png → Similitud: 0.483
   2. images-testing/roturas-negro1.jpg → Similitud: 0.468
   3. images-testing/rotura3.png → Similitud: 0.465
   4. images-testing/roturas-negro2.jpg → Similitud: 0.458
   5. images-testing/sin-rotura.png → Similitud: 0.450
   6. images-testing/skinny-rotura.png → Similitud: 0.439
   7. images-testing/rotura1.png → Similitud: 0.429
   
---------------------------

Sofia-gb/fashionSigLIP-roturas6: congelar capas y optimizar últimas 2 + data augmentation.
ds = datasets/roturas-vs-sin.csv

📝 SIMILITUD CON DESCRIPCIÓN: 'jean sin cortes ni roturas'

   1. images-testing/sin-rotura.png → Similitud: 0.623
   2. images-testing/roturas-negro2.jpg → Similitud: 0.603
   3. images-testing/rotura2.png → Similitud: 0.599
   4. images-testing/rotura1.png → Similitud: 0.595
   5. images-testing/roturas-negro1.jpg → Similitud: 0.594
   6. images-testing/skinny-rotura.png → Similitud: 0.593
   7. images-testing/rotura3.png → Similitud: 0.592

📝 SIMILITUD CON DESCRIPCIÓN: 'jean con roturas'

   1. images-testing/sin-rotura.png → Similitud: 0.735
   2. images-testing/roturas-negro2.jpg → Similitud: 0.731
   3. images-testing/roturas-negro1.jpg → Similitud: 0.729
   4. images-testing/rotura2.png → Similitud: 0.728
   5. images-testing/rotura1.png → Similitud: 0.722
   6. images-testing/rotura3.png → Similitud: 0.722
   7. images-testing/skinny-rotura.png → Similitud: 0.721
   
---------------------------

# Sofia-gb/fashionSigLIP-roturas6: congelar capas y optimizar últimas 2 + data augmentation.
ds = datasets/con-sin-roturas.csv

 SIMILITUD CON DESCRIPCIÓN: 'jean sin cortes ni roturas'

   1. images-testing/roturas-negro2.jpg → Similitud: 0.287
   2. images-testing/rotura1.png → Similitud: 0.285
   3. images-testing/rotura2.png → Similitud: 0.284
   4. images-testing/roturas-negro1.jpg → Similitud: 0.282
   5. images-testing/rotura3.png → Similitud: 0.279
   6. images-testing/skinny-rotura.png → Similitud: 0.275
   7. images-testing/sin-rotura.png → Similitud: 0.272

📝 SIMILITUD CON DESCRIPCIÓN: 'jean con roturas'

   1. images-testing/roturas-negro2.jpg → Similitud: 0.350
   2. images-testing/rotura2.png → Similitud: 0.349
   3. images-testing/roturas-negro1.jpg → Similitud: 0.344
   4. images-testing/rotura3.png → Similitud: 0.343
   5. images-testing/rotura1.png → Similitud: 0.339
   6. images-testing/sin-rotura.png → Similitud: 0.338
   7. images-testing/skinny-rotura.png → Similitud: 0.338
   
--------------------------

Sofia-gb/fashionSigLIP-roturas6: congelar capas y optimizar últimas 4 + data augmentation + early stopping.
ds = datasets/con-sin-roturas.csv

📝 SIMILITUD CON DESCRIPCIÓN: 'jean sin cortes ni roturas'

   1. images-testing/rotura3.png → Similitud: 0.259
   2. images-testing/sin-rotura.png → Similitud: 0.258
   3. images-testing/rotura2.png → Similitud: 0.256
   4. images-testing/roturas-negro2.jpg → Similitud: 0.255
   5. images-testing/rotura1.png → Similitud: 0.254
   6. images-testing/roturas-negro1.jpg → Similitud: 0.245
   7. images-testing/skinny-rotura.png → Similitud: 0.244

📝 SIMILITUD CON DESCRIPCIÓN: 'jean con roturas'

   1. images-testing/rotura3.png → Similitud: 0.322
   2. images-testing/roturas-negro2.jpg → Similitud: 0.320
   3. images-testing/rotura2.png → Similitud: 0.318
   4. images-testing/sin-rotura.png → Similitud: 0.317
   5. images-testing/roturas-negro1.jpg → Similitud: 0.309
   6. images-testing/rotura1.png → Similitud: 0.309
   7. images-testing/skinny-rotura.png → Similitud: 0.308
   
---------------------------

Sofia-gb/fashionSigLIP-roturas7: congelar capas y optimizar últimas 4 + data augmentation (RANDOM-text) + early stopping.
ds = datasets/con-sin-roturas.csv

 SIMILITUD CON DESCRIPCIÓN: 'jean sin cortes ni roturas'

   1. images-testing/rotura2.png → Similitud: 0.409
   2. images-testing/roturas-negro2.jpg → Similitud: 0.409
   3. images-testing/skinny-rotura.png → Similitud: 0.406
   4. images-testing/sin-rotura.png → Similitud: 0.403
   5. images-testing/rotura1.png → Similitud: 0.402
   6. images-testing/roturas-negro1.jpg → Similitud: 0.401
   7. images-testing/rotura3.png → Similitud: 0.399

📝 SIMILITUD CON DESCRIPCIÓN: 'jean con roturas'

   1. images-testing/roturas-negro2.jpg → Similitud: 0.520
   2. images-testing/rotura2.png → Similitud: 0.520
   3. images-testing/skinny-rotura.png → Similitud: 0.516
   4. images-testing/rotura1.png → Similitud: 0.514
   5. images-testing/roturas-negro1.jpg → Similitud: 0.512
   6. images-testing/rotura3.png → Similitud: 0.511
   7. images-testing/sin-rotura.png → Similitud: 0.509
   
---------------------------

Sofia-gb/fashionSigLIP-roturas8: 
congelar capas y optimizar últimas 4 + data augmentation (RANDOM-text) + early stopping con validation.
ds = datasets/con-sin-roturas.csv

📝 SIMILITUD CON DESCRIPCIÓN: 'jean sin cortes ni roturas'

   1. images-testing/sin-rotura.png → Similitud: 0.191
   2. images-testing/rotura3.png → Similitud: 0.191
   3. images-testing/rotura2.png → Similitud: 0.189
   4. images-testing/skinny-rotura.png → Similitud: 0.187
   5. images-testing/rotura1.png → Similitud: 0.187
   6. images-testing/roturas-negro2.jpg → Similitud: 0.184
   7. images-testing/roturas-negro1.jpg → Similitud: 0.181

📝 SIMILITUD CON DESCRIPCIÓN: 'jean con roturas'

   1. images-testing/roturas-negro2.jpg → Similitud: 0.231
   2. images-testing/rotura3.png → Similitud: 0.229
   3. images-testing/rotura2.png → Similitud: 0.229
   4. images-testing/skinny-rotura.png → Similitud: 0.227
   5. images-testing/rotura1.png → Similitud: 0.227
   6. images-testing/sin-rotura.png → Similitud: 0.225
   7. images-testing/roturas-negro1.jpg → Similitud: 0.225
"""
