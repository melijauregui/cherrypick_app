import os
import torch
from PIL import Image
from transformers import AutoModel, AutoProcessor
import numpy as np
from sklearn.metrics import precision_score, recall_score, f1_score

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


def find_similarities_matrix_2(model, processor, descriptions, image_paths, image_inputs):
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


def contains(text, img_name):
    words = text.lower().split()
    for word in words:
        if word not in img_name.lower():
            return False
    return True


def find_similarities_text2images(model, processor, description, image_paths, images):
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

    sorted_indices = np.argsort(probabilities.cpu().numpy())[::-1]
    for rank, img_idx in enumerate(sorted_indices):
        similarity = probabilities[img_idx]
        print(
            f"   {rank+1}. {image_paths[img_idx]} → Similitud: {similarity:.3f}")

    return probabilities


def find_similarities_image2image(model, processor, query_image, candidate_image_paths, candidate_images):
    processed = processor(
        images=[query_image] + candidate_images,
        return_tensors="pt",
        padding="max_length"
    )

    with torch.no_grad():
        image_features = model.get_image_features(
            processed["pixel_values"], normalize=True)

    query_features = image_features[0].unsqueeze(0)  # (1, d)
    candidate_features = image_features[1:]          # (n, d)

    similarity_scores = (candidate_features @
                         query_features.T).squeeze(-1)  # (n,)
    probabilities = similarity_scores.sigmoid()

    # Ranking
    sorted_indices = np.argsort(probabilities.cpu().numpy())[::-1]
    for rank, img_idx in enumerate(sorted_indices):
        similarity = probabilities[img_idx]
        print(
            f"   {rank+1}. {candidate_image_paths[img_idx]} → Similitud: {similarity:.3f}")

    return probabilities


def test_clasification(probabilities, image_paths, has, clasification_img, yellow_flags=[], imprimir_mayores_al_minimo=False):
    # Extraer nombres de archivo
    image_names = [os.path.basename(path) for path in image_paths]

    # Clasificar imágenes
    rotura_imgs = []
    no_rotura_imgs = []

    for i, name in enumerate(image_names):
        if has:
            if has and contains(clasification_img, name):
                rotura_imgs.append(i)
            else:
                no_rotura_imgs.append(i)
        else:
            if contains(clasification_img, name):
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
            if any(contains(flag, image_names[j]) for flag in yellow_flags):
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
    print(f"🎯 Porcentaje de acierto: {accuracy:.2f}% ({correct}/{total})")
    if correct_aprox > correct:
        accuracy = (correct_aprox / total) * 100 if total > 0 else 0

        print(
            f"🎯 Porcentaje de acierto incluyendo 🟨: {accuracy:.2f}% ({correct_aprox}/{total})")

    # Definir umbral para clasificar predicción positiva
    threshold = max_no_rotura

    # Predicciones binarias: si probabilidad > threshold -> pred positive
    predicted_positive = set(i for i, p in enumerate(
        probabilities) if p > threshold)
    true_positive = set(rotura_imgs)
    true_negative = set(no_rotura_imgs)

    # Precision = TP / (TP + FP)
    TP = len(predicted_positive.intersection(true_positive))
    FP = len(predicted_positive.difference(true_positive))
    precision = TP / (TP + FP) if (TP + FP) > 0 else 0

    # Recall = TP / (TP + FN)
    FN = len(true_positive.difference(predicted_positive))
    recall = TP / (TP + FN) if (TP + FN) > 0 else 0

    print(f"📊 Precision: {precision:.3f}")
    print(f"📊 Recall: {recall:.3f}")

    # MRR - buscar el primer ranking con imagen real positiva
    sorted_indices = np.argsort(probabilities.cpu().numpy())[::-1]
    mrr = 0
    first_rank = None
    for rank, idx in enumerate(sorted_indices, start=1):
        if idx in true_positive:
            mrr = 1 / rank
            first_rank = rank
            break

    print(f"📊 MRR (Mean Reciprocal Rank): {mrr:.3f}")
    if first_rank:
        print(f"📊 Primer positivo aparece en rank: {first_rank}")

    """ if imprimir_mayores_al_minimo:
        # imprimo la probabilidad mas chica de roturas
        if rotura_imgs:
            min_rotura = min(probabilities[i] for i in rotura_imgs)
            print(f"\nProbabilidad más baja: {min_rotura:.3f}")

        print("\nImágenes con probabilidad mayor al mínimo:")
        for i, value in enumerate(probabilities):
            if value > min_rotura and i not in rotura_imgs:
                print(
                    f"Esta imagen sobrepaso al minimo: {image_names[i]}: {value:.3f}")
    """

    # --- RESUMEN FINAL ---
    print("RESUMEN FINAL:")
    print(f"{'❌' if accuracy < 0.8 else '✅'} Accuracy vs red/yellow flags (>= 0.8)")
    print(f"{'❌' if precision < 0.7 else '✅'} Precision (>= 0.7)")
    print(f"{'❌' if recall < 0.6 else '✅'} Recall (>= 0.6)")
    print(f"{'❌' if mrr < 0.3 else '✅'} MRR (>= 0.3)")
    if first_rank:
        print(f"{'❌' if first_rank > 3 else '✅'} Top-3 check")
    print("==============================")
