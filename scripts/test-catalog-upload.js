const fs = require("fs/promises");
const path = require("path");
const { FormData, File } = require("undici");
const { PrismaClient } = require("../server/generated/prisma");

const LOCAL_IP = "localhost";
const API_HOST = process.env.BRAND_API_HOST ?? `http://${LOCAL_IP}:3000`;

const prisma = new PrismaClient();

const BRAND_CONFIGS = [
  {
    brandEmail: "cherrypick.brand.example@gmail.com",
    filePath: "test-endpoints/archivos/catalog-items-tienda-napoli.json",
  },
  {
    brandEmail: "charostoreok@gmail.com",
    filePath: "test-endpoints/archivos/catalog-items-charo.json",
  },
];

function normalizePrice(price) {
  if (typeof price === "number") {
    return price.toString();
  }
  if (typeof price === "string") {
    return price.replace(",", ".").trim();
  }
  throw new Error(`Invalid price value: ${price}`);
}

function getMimeType(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

async function getBrandIdByEmail(email) {
  const brand = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!brand) {
    throw new Error(`Brand with email ${email} not found`);
  }

  return brand.id;
}

async function buildFormData({ brandId, items, baseDir }) {
  const formData = new FormData();
  formData.set("brandId", brandId);

  // Preparar items sin las imágenes (las imágenes van por separado)
  const itemsWithoutImages = items.map((item, index) => {
    const itemData = {
      name: item.name,
      description: item.description,
      price: normalizePrice(item.price),
      url: item.url,
    };
    if (item.uuid) {
      itemData.uuid = item.uuid;
    }
    return itemData;
  });

  // Enviar items como JSON string
  formData.set("items", JSON.stringify(itemsWithoutImages));

  // Enviar imágenes por separado con nombres simples
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const imagePath = path.resolve(baseDir, item.imageUrl);
    const buffer = await fs.readFile(imagePath);
    const fileName = path.basename(imagePath);
    const mimeType = getMimeType(fileName);
    const file = new File([buffer], fileName, { type: mimeType });
    formData.set(`image_${index}`, file);
  }

  return formData;
}

async function uploadCatalog({ brandEmail, filePath }) {
  const absolutePath = path.resolve(filePath);
  const baseDir = path.dirname(absolutePath);
  const brandId = await getBrandIdByEmail(brandEmail);
  const raw = await fs.readFile(absolutePath, "utf-8");
  const items = JSON.parse(raw);

  console.log(
    `Uploading ${items.length} items for ${brandEmail} (brandId: ${brandId})`
  );

  const formData = await buildFormData({ brandId, items, baseDir });

  const response = await fetch(`${API_HOST}/brand/insert-items-complete`, {
    method: "POST",
    body: formData,
  });

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error(
      `Failed to parse response for ${brandEmail}: ${error.message}`
    );
  }

  if (!response.ok || payload.error) {
    throw new Error(
      `Upload failed for ${brandEmail}: ${payload?.details ?? response.statusText}`
    );
  }

  console.log(
    `✅ Catalog uploaded successfully for ${brandEmail} (${items.length} items)`
  );
}

async function main() {
  for (let i = 0; i < BRAND_CONFIGS.length; i++) {
    const config = BRAND_CONFIGS[i];
    await uploadCatalog(config);

    // Small delay between brands to avoid overwhelming the API
    if (i < BRAND_CONFIGS.length - 1) {
      console.log("Waiting 5 seconds before next brand...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

main()
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
