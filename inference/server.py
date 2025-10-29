from rembg import remove
from io import BytesIO
from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
from transformers import AutoModel, AutoProcessor
import requests
from pydantic import BaseModel
import numpy as np
import time
import os
import gc
import uuid
from datetime import datetime, timezone

try:
    import psutil  # optional, for RSS memory
except Exception:
    psutil = None

try:
    import resource  # optional, RSS fallback on Unix
except Exception:
    resource = None


app = FastAPI()
#model_name = "Sofia-gb/cherrypick-sigLip11"
model_name="Cherrypick-group/sigLip"
pretrained_model_name = "Marqo/marqo-fashionSigLIP"
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# Load model and processor once at import/startup
PROCESS_START_TIME = time.time()
PROCESS_START_ISO = datetime.now(timezone.utc).isoformat()
PID = os.getpid()
MODEL_INSTANCE_UUID = str(uuid.uuid4())

print(f"[startup] pid={PID} device={device} starting load: model={model_name} processor={pretrained_model_name}")
model = AutoModel.from_pretrained(model_name, trust_remote_code=True).to(device)
processor = AutoProcessor.from_pretrained(pretrained_model_name, trust_remote_code=True)
model.eval()
torch.manual_seed(42)

def _get_memory_info():
    rss_mb = None
    # Try psutil first
    if psutil is not None:
        try:
            rss_mb = psutil.Process(PID).memory_info().rss / (1024 * 1024)
            return rss_mb
        except Exception:
            rss_mb = None
    # Fallback to resource on Unix
    if resource is not None:
        try:
            usage = resource.getrusage(resource.RUSAGE_SELF)
            # ru_maxrss is KB on Linux, bytes on macOS. Assume KB if large.
            ru = usage.ru_maxrss
            if ru is not None:
                if ru > 10_000:  # likely KB
                    rss_mb = ru / 1024
                else:  # likely bytes
                    rss_mb = ru / (1024 * 1024)
        except Exception:
            rss_mb = None
    return rss_mb

def _gc_info():
    try:
        counts = gc.get_count()
    except Exception:
        counts = None
    try:
        thresh = gc.get_threshold()
    except Exception:
        thresh = None
    return counts, thresh

mem_mb = _get_memory_info()
gc_counts, gc_thresh = _gc_info()
print(f"[startup] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} rss_mb={mem_mb} gc_counts={gc_counts} gc_thresh={gc_thresh}")
print("[startup] Model and processor loaded successfully")


@app.post("/extract-image-features/")
async def extract_image_features(request: dict):
    start_time = time.time()
    try:
        req_uuid = str(uuid.uuid4())
        mem_mb_before = _get_memory_info()
        gc_counts_before, _ = _gc_info()
        print(f"[req:{req_uuid}] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} rss_mb={mem_mb_before} gc_counts={gc_counts_before}")
        # Check if we have image_url or image_base64
        if "image_url" in request and request["image_url"]:
            print("Obteniendo features de imagen url")
            image_url = request.get("image_url", "")
            X = extract_feat_image_url(image_url)
        elif "image_base64" in request and request["image_base64"]:
            print("Obteniendo features de imagen base64")
            image_base64 = request.get("image_base64", "")
            X = extract_feat_image_base64(image_base64)
        else:
            return {"error": "Either image_url or image_base64 must be provided"}

        print("Features de imagen obtenidos")
        processing_time = time.time() - start_time
        mem_mb_after = _get_memory_info()
        gc_counts_after, _ = _gc_info()
        print(f"[req:{req_uuid}] Tiempo de procesamiento: {processing_time:.4f} segundos rss_mb_before={mem_mb_before} rss_mb_after={mem_mb_after} gc_counts_before={gc_counts_before} gc_counts_after={gc_counts_after}")
        return X[0].cpu().tolist()

    except Exception as e:
        processing_time = time.time() - start_time
        print(f"[req:ERROR] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} t={processing_time:.4f}s error={str(e)}")
        return {"error": str(e)}


@app.post("/extract-text-features/")
async def extract_text_features(request: dict):
    start_time = time.time()
    try:
        req_uuid = str(uuid.uuid4())
        mem_mb_before = _get_memory_info()
        gc_counts_before, _ = _gc_info()
        print(f"[req:{req_uuid}] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} rss_mb={mem_mb_before} gc_counts={gc_counts_before}")
        print("Obteniendo features de texto")
        text = request.get("text", "")
        t0 = time.time()
        # tokenization time
        text_inputs = processor(text=[text], padding='max_length', return_tensors="pt").to(device)
        t1 = time.time()
        with torch.no_grad():
            X = model.get_text_features(
                input_ids=text_inputs["input_ids"],
                attention_mask=text_inputs["attention_mask"],
                normalize=True,
            )
        t2 = time.time()
        processing_time = time.time() - start_time
        mem_mb_after = _get_memory_info()
        gc_counts_after, _ = _gc_info()
        print(
            f"[req:{req_uuid}] Tiempo de procesamiento: {processing_time:.4f} segundos tokeniz={t1-t0:.4f}s forward={t2-t1:.4f}s rss_mb_before={mem_mb_before} rss_mb_after={mem_mb_after} gc_counts_before={gc_counts_before} gc_counts_after={gc_counts_after}"
        )
        return X[0].cpu().tolist()

    except Exception as e:
        processing_time = time.time() - start_time
        print(f"[req:ERROR] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} t={processing_time:.4f}s error={str(e)}")
        return {"error": str(e)}


def extract_feat_image_url(image_url: str):
    """
    Extrae características de una imagen desde una URL
    (con fondo eliminado usando rembg)
    """
    try:
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()

        # Convertir a RGB y remover fondo
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image_no_bg = remove(image)

        image_inputs = processor(
            images=image_no_bg, return_tensors="pt",
            padding=True, truncation=True
        ).to(device)

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=image_inputs["pixel_values"], normalize=True)

        return image_features

    except requests.RequestException as e:
        raise Exception(f"Error downloading image from URL: {str(e)}")
    except Exception as e:
        raise Exception(f"Error processing image from URL: {str(e)}")


def extract_feat_image_base64(image_base64: str):
    """
    Extrae características de una imagen desde datos base64
    (con fondo eliminado usando rembg)
    """
    try:
        import base64
        image_data = base64.b64decode(image_base64)

        # Convertir a RGB y remover fondo
        image = Image.open(BytesIO(image_data)).convert("RGB")
        # image_no_bg = remove(image)

        image_inputs = processor(
            images=image, return_tensors="pt",
            padding=True, truncation=True
        ).to(device)

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=image_inputs["pixel_values"], normalize=True)

        return image_features

    except Exception as e:
        raise Exception(f"Error processing image from base64: {str(e)}")


def extract_feat_text(text: str):
    """
    Extrae características de un texto (descripción)
    """
    text_inputs = processor(
        text=[text], padding='max_length', return_tensors="pt").to(device)

    input_ids = text_inputs["input_ids"]
    attention_mask = text_inputs["attention_mask"]

    with torch.no_grad():
        text_features = model.get_text_features(
            input_ids=input_ids, attention_mask=attention_mask, normalize=True)

    return text_features


@app.post("/extract-features/")
async def extract_features(request: dict):
    start_time = time.time()
    try:
        req_uuid = str(uuid.uuid4())
        mem_mb_before = _get_memory_info()
        gc_counts_before, _ = _gc_info()
        print(f"[req:{req_uuid}] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} rss_mb={mem_mb_before} gc_counts={gc_counts_before}")
        if "image_url" in request and request["image_url"]:
            image_url = request.get("image_url", "")
        if "text" in request and request["text"]:
            text = request.get("text", "")
        t0 = time.time()
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content)).convert("RGB")
        t1 = time.time()
        processed = processor(
            text=[text], images=[img], padding='max_length', return_tensors="pt").to(device)

        pixel_values = processed["pixel_values"]
        input_ids = processed["input_ids"]
        attention_mask = processed["attention_mask"]

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=pixel_values, normalize=True)
            text_features = model.get_text_features(
                input_ids=input_ids, attention_mask=attention_mask, normalize=True)
        t2 = time.time()

        processing_time = time.time() - start_time
        mem_mb_after = _get_memory_info()
        gc_counts_after, _ = _gc_info()
        print(
            f"[req:{req_uuid}] Tiempo de procesamiento: {processing_time:.4f} segundos net_img={t1-t0:.4f}s forward_both={t2-t1:.4f}s rss_mb_before={mem_mb_before} rss_mb_after={mem_mb_after} gc_counts_before={gc_counts_before} gc_counts_after={gc_counts_after}"
        )
        return {
            "image_features": image_features[0].cpu().tolist(),
            "text_features": text_features[0].cpu().tolist()
        }

    except Exception as e:
        processing_time = time.time() - start_time
        print(f"[req:ERROR] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} t={processing_time:.4f}s error={str(e)}")
        return {"error": str(e)}


@app.post("/search-text/")
async def similarities_matrix(request: dict):
    start_time = time.time()
    try:
        req_uuid = str(uuid.uuid4())
        mem_mb_before = _get_memory_info()
        gc_counts_before, _ = _gc_info()
        print(f"[req:{req_uuid}] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} rss_mb={mem_mb_before} gc_counts={gc_counts_before}")
        if "image_urls" in request and request["image_urls"]:
            image_urls = request.get("image_urls", [])
        if "text" in request and request["text"]:
            text = request.get("text", "")
        images = []
        t0 = time.time()
        for url in image_urls:
            response = requests.get(url)
            img = Image.open(BytesIO(response.content)).convert("RGB")
            images.append(img)
        t1 = time.time()
        processed = processor(
            text=[text], images=images, padding='max_length', return_tensors="pt").to(device)

        pixel_values = processed["pixel_values"]
        input_ids = processed["input_ids"]
        attention_mask = processed["attention_mask"]

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=pixel_values, normalize=True)
            text_features = model.get_text_features(
                input_ids=input_ids, attention_mask=attention_mask, normalize=True)
        t2 = time.time()

        # Matriz de similitud: (n imágenes x 1 texto)
        similarity_scores = (image_features @
                             text_features.T).squeeze(-1)  # (n imágenes,)
        # Opcional: pasarlo a "probabilidad" tipo sigmoidea
        probabilities = similarity_scores.sigmoid()  # entre 0 y 1

        sorted_indices = np.argsort(probabilities.cpu().numpy())[::-1]
        sorted_results = []
        for rank, img_idx in enumerate(sorted_indices):
            # similarity = probabilities[img_idx]
            sorted_results.append(image_urls[img_idx])

        processing_time = time.time() - start_time
        mem_mb_after = _get_memory_info()
        gc_counts_after, _ = _gc_info()
        print(
            f"[req:{req_uuid}] Tiempo de procesamiento: {processing_time:.4f} segundos net_imgs={t1-t0:.4f}s preprocess={t2-t1:.4f}s rss_mb_before={mem_mb_before} rss_mb_after={mem_mb_after} gc_counts_before={gc_counts_before} gc_counts_after={gc_counts_after}"
        )
        return sorted_results

    except Exception as e:
        processing_time = time.time() - start_time
        print(f"[req:ERROR] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} t={processing_time:.4f}s error={str(e)}")
        return {"error": str(e)}


@app.post("/similarities-preferences/")
async def similarities_preferences(request: dict):
    start_time = time.time()
    try:
        req_uuid = str(uuid.uuid4())
        mem_mb_before = _get_memory_info()
        gc_counts_before, _ = _gc_info()
        print(f"[req:{req_uuid}] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} rss_mb={mem_mb_before} gc_counts={gc_counts_before}")
        if "image_url" in request and request["image_url"]:
            image_url = request.get("image_url", "")
        if "preferences" in request and request["preferences"]:
            preferences = request.get("preferences", "")
        t0 = time.time()
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content)).convert("RGB")
        t1 = time.time()
        processed = processor(
            text=preferences, images=[img], padding='max_length', return_tensors="pt").to(device)

        pixel_values = processed["pixel_values"]
        input_ids = processed["input_ids"]
        attention_mask = processed["attention_mask"]

        with torch.no_grad():
            image_features = model.get_image_features(
                pixel_values=pixel_values, normalize=True)
            text_features = model.get_text_features(
                input_ids=input_ids, attention_mask=attention_mask, normalize=True)
        t2 = time.time()

        similarity_scores = (image_features @
                             text_features.T).squeeze(0)

        probabilities = similarity_scores.sigmoid().cpu().tolist()

        result = [
            {"preference": pref, "similarity": prob}
            for pref, prob in zip(preferences, probabilities)
        ]

        processing_time = time.time() - start_time
        mem_mb_after = _get_memory_info()
        gc_counts_after, _ = _gc_info()
        print(
            f"[req:{req_uuid}] Tiempo de procesamiento: {processing_time:.4f} segundos net_img={t1-t0:.4f}s preprocess+forward={t2-t1:.4f}s rss_mb_before={mem_mb_before} rss_mb_after={mem_mb_after} gc_counts_before={gc_counts_before} gc_counts_after={gc_counts_after}"
        )
        return {"error": False, "details": "Similarities computed successfully", "similarities": result}

    except Exception as e:
        processing_time = time.time() - start_time
        print(f"[req:ERROR] pid={PID} model_id={id(model)} model_uuid={MODEL_INSTANCE_UUID} t={processing_time:.4f}s error={str(e)}")
        return {"error": True, "details": str(e), "similarities": []}


@app.get("/_debug/model-info")
async def debug_model_info():
    uptime_s = time.time() - PROCESS_START_TIME
    mem_mb = _get_memory_info()
    gc_counts, gc_thresh = _gc_info()
    device_name = str(device)
    torch_mem = {}
    try:
        if torch.cuda.is_available():
            torch_mem = {
                "cuda_allocated_mb": torch.cuda.memory_allocated() / (1024 * 1024),
                "cuda_reserved_mb": torch.cuda.memory_reserved() / (1024 * 1024),
            }
    except Exception:
        torch_mem = {}
    threads_info = {
        "torch_num_threads": torch.get_num_threads(),
        "torch_num_interop_threads": torch.get_num_interop_threads(),
        "omp_num_threads_env": os.getenv("OMP_NUM_THREADS"),
        "mkl_num_threads_env": os.getenv("MKL_NUM_THREADS"),
    }
    return {
        "pid": PID,
        "process_start_iso": PROCESS_START_ISO,
        "uptime_seconds": uptime_s,
        "device": device_name,
        "model_id": id(model),
        "model_uuid": MODEL_INSTANCE_UUID,
        "rss_mb": mem_mb,
        "gc_counts": gc_counts,
        "gc_threshold": gc_thresh,
        "torch_memory": torch_mem,
        "threads": threads_info,
    }
