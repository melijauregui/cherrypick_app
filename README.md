# 🍒 Cherrypick

**Encontrá la prenda exacta que viste, sacándole una foto.**

Cherrypick es una app mobile de descubrimiento de moda que usa **búsqueda visual por similitud**: sacás una foto (o subís una imagen) de una prenda y la app la matchea contra un catálogo de marcas real usando un modelo de visión propio (**FashionCLIP finetuneado**) y una base de datos vectorial (**Weaviate**), devolviendo los ítems más parecidos rankeados por score de similitud.

Full-stack end-to-end: app mobile en **React Native + Expo**, backend en **Hono + Prisma + PostgreSQL**, autenticación con **better-auth**, storage de imágenes en **S3/R2**, emails transaccionales con **Resend**, y un servicio de inferencia en **Python (FastAPI/uvicorn)** que corre el modelo de embeddings de imágenes.

## ✨ Features

- 📸 Búsqueda visual: sacá una foto y encontrá prendas similares en el catálogo
- 🧠 Modelo propio de embeddings de imágenes (FashionCLIP finetuneado) + búsqueda vectorial con Weaviate
- 🏷️ Catálogo de marcas e ítems, con feed de inspiración
- 🔐 Auth con Google OAuth (better-auth)
- ☁️ Upload y storage de imágenes en S3/Cloudflare R2
- ✉️ Notificaciones por email con React Email + Resend
- 📱 App nativa multiplataforma (iOS/Android) con Expo Router

## 🛠️ Stack

| Capa | Tecnologías |
|---|---|
| Mobile | React Native, Expo, Expo Router, NativeWind (Tailwind) |
| Backend | Hono, Prisma, PostgreSQL, Zod, better-auth |
| ML / Inference | Python, FastAPI, FashionCLIP (finetuned), Weaviate |
| Infra | AWS S3, Cloudflare R2, Resend |


Este proyecto lo desarrollamos en equipo con Sofía Gómez Belis, con quien fuimos construyendo y refinando CherryPick en cada iteración hasta llegar al MVP. En especial, quiero agradecer a nuestros tutores Cesar F. Caiafa, Maia Naftali y Bruno Lanzillotta, por el acompañamiento durante todo el proceso y el feedback constante, que fue fundamental para orientar decisiones y elevar la calidad en cada iteración.

Me quedo con una experiencia enorme en producto + ingeniería, y con ganas de seguir construyendo!
- Tesis completa: https://lnkd.in/dWH8Ydww
- Video demo / pitch: https://lnkd.in/dRViwxdu

## 🚀 Correr el proyecto

```bash
npm install

# App
npm run ios      # o npm run android

# Backend
npm run start:backend

# Servicio de inferencia (Python)
cd inference && source .venv/bin/activate
uvicorn server:app --reload

# Seed de la base de datos
npm run db:seed-complete
```

### Permisos en iOS

En `ios/Info.plist` hay que declarar el acceso a cámara y galería:

```xml
<key>NSCameraUsageDescription</key>
<string>Necesitamos acceso a la cámara para tomar fotos y grabar videos.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Permitir que Cherrypick acceda a tus foto.</string>
```

## 📡 Ejemplo de uso del endpoint de búsqueda

`GET http://localhost:3000/images/jean.webp`

```json
[
  { "id": "9.jpg", "score": 0.699426651, "values": [], "brand": "pinterest", "type": "jean" },
  { "id": "14.jpg", "score": 0.697699, "values": [], "brand": "pinterest", "type": "jean" },
  { "id": "11.jpg", "score": 0.661187947, "values": [], "brand": "pinterest", "type": "jean" }
]
```
