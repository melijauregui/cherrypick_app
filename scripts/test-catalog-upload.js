const fs = require("fs/promises");
const { PrismaClient } = require("../server/generated/prisma");

LOCAL_IP = "localhost";
const prisma = new PrismaClient();

// Función para insertar imagen directamente en la tabla files
async function insertImageToFiles(imageUrl, uuid, name) {
  try {
    const fileRecord = await prisma.files.upsert({
      where: { id: uuid },
      update: {
        name: `item-image-${name}`,
        contentType: "image/jpeg",
        bucket: "fashion-items",
        url: imageUrl,
        uploadUrl: imageUrl,
        metadata: {},
      },
      create: {
        id: uuid, // Usar el mismo UUID que el item
        name: `item-image-${name}`,
        contentType: "image/jpeg",
        bucket: "fashion-items",
        url: imageUrl,
        uploadUrl: imageUrl,
        metadata: {},
      },
    });

    console.log(`Image inserted successfully for ${uuid}`);
    return fileRecord.id;
  } catch (error) {
    console.error(`Error inserting image for ${uuid}:`, error);
    return null;
  }
}

// Función para procesar y subir items
async function processAndUploadItems(brandEmail, filePath, onlyWeaviate = false) {
  const items = JSON.parse(await fs.readFile(filePath, "utf-8"));

  console.log(`Processing ${items.length} items...`);

  // Paso 1: Subir cada imagen a la tabla files
  const processedItems = [];

  for (const item of items) {

    let fileId;
    console.log(`Uploading image for item: ${item.name} (${item.uuid})`);
    if (!onlyWeaviate) {
      // Insertar imagen directamente en la tabla files
      fileId = await insertImageToFiles(
        item.imageUrl,
        item.uuid,
        item.name
      );

    }

    if (fileId || onlyWeaviate) {
      // Crear item modificado con imageId en lugar de imageUrl
      const processedItem = {
        uuid: item.uuid,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        url: item.url,
        imageId: item.uuid, // Usar el mismo UUID como imageId
      };

      processedItems.push(processedItem);
    } else {
      console.error(`Failed to upload image for item: ${item.name}`);
    }

    // Pequeña pausa entre uploads para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  if (!onlyWeaviate) {
    console.log(`Successfully processed ${processedItems.length} items`);
  }

  // Paso 2: Subir los items modificados
  if (processedItems.length > 0) {
    try {
      const response = await fetch(
        `http://${LOCAL_IP}:3000/brand/insert-items2`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brandEmail, items: processedItems }),
        }
      );
      const result = await response.json();
      console.log("Items upload response:", result);
      if (!result.error) {
        console.log("All items uploaded successfully");
      } else {
        console.log("Items upload error:", result.details);
      }
    } catch (error) {
      console.error("Error uploading items:", error);
    }
  }
}

// Ejecutar el proceso
async function main() {
  console.log("Starting upload process for Napoli items...");
  const onlyWeaviate = process.argv.includes("--w");
  if (onlyWeaviate) {
    console.log("Running in Weaviate-only mode (skipping image uploads)...");
  }
  await processAndUploadItems(
    "cherrypick.brand.example@gmail.com",
    "test-endpoints/archivos/catalog-items-tienda-napoli.json",
    onlyWeaviate
  );

  console.log("\nWaiting 5 seconds before Charo items...");
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log("Starting upload process for Charo items...");
  await processAndUploadItems(
    "charostoreok@gmail.com",
    "test-endpoints/archivos/catalog-items-charo.json",
    onlyWeaviate
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
