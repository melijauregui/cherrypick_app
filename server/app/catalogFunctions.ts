import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import {
  PropertiesItemSchemaType,
  UpdateItemBodySchemaType,
  PropertiesItemSchema,
  DeleteItemsResponseSchemaType,
} from "../../schemas/catalog/catalog-schema";
import { config } from "../config";
import { db } from "../db.config";
import weaviate, { Collection, Filters } from "weaviate-client";

// Función para extraer características de imagen desde URL
async function extractImageFeatures(imageUrl: string): Promise<number[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/extract-image-features/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error extracting image features:", error);
    throw error;
  }
}

// Función para extraer características de texto
async function extractTextFeatures(text: string): Promise<number[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/extract-text-features/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error extracting text features:", error);
    throw error;
  }
}

// Función para verificar si ya existe un elemento con el mismo nombre y brand en Weaviate
async function getCollection(): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
      collection: Collection;
    }
> {
  try {
    const client = await weaviate.connectToWeaviateCloud(config.WEAVIATE_URL, {
      authCredentials: new weaviate.ApiKey(config.WEAVIATE_API_KEY),
    });

    // Verificar que la conexión esté lista
    if (!client.isReady()) {
      throw new Error("No se pudo conectar a Weaviate");
    }

    let collection: Collection;
    const exists = await client.collections.exists("FashionItem");
    if (!exists) {
      collection = (await client.collections.create({
        name: "FashionItem",
        properties: [
          { name: "name", dataType: "text" },
          { name: "brandId", dataType: "text" },
          { name: "description", dataType: "text" },
          { name: "price", dataType: "text" },
          { name: "imageUrl", dataType: "text" },
          { name: "url", dataType: "text" },
        ],
        vectorizers: [
          weaviate.configure.vectors.selfProvided({ name: "image_vector" }),
          weaviate.configure.vectors.selfProvided({ name: "text_vector" }),
        ],
      })) as Collection;
    } else {
      collection = client.collections.get("FashionItem") as Collection;
    }

    return {
      error: false,
      collection: collection,
    };
  } catch (error) {
    console.error("Error getting collection in Weaviate:", error);
    return {
      error: true,
      details: "Error getting collection in Weaviate: " + error,
    };
  }
}
export { getCollection };

// Función para validar items JSON
async function validateJsonItems(
  items: PropertiesItemSchemaType[],
  collection: Collection,
  brandId: string
): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
      catalogItems: PropertiesItemSchemaType[];
    }
> {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      error: true,
      details: "No se han proporcionado items válidos",
    };
  }
  const invalidRows: number[] = [];
  const duplicateRows: number[] = [];
  const validItems: PropertiesItemSchemaType[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = { ...items[i] };
    try {
      const validatedItem = PropertiesItemSchema.parse(item);
      // Check if item already exists in Weaviate with same name and brand
      const isDuplicate = await checkDuplicateInWeaviate(
        collection,
        validatedItem.name,
        brandId
      );
      if (isDuplicate) {
        duplicateRows.push(i + 1);
        continue;
      }
      validItems.push(validatedItem);
    } catch (error) {
      console.log("error", error);
      invalidRows.push(i + 1);
    }
  }
  if (invalidRows.length > 0 || duplicateRows.length > 0) {
    const rowNumbers = invalidRows.join(",");
    return {
      error: true,
      details: `ítem(s) [${rowNumbers}] mal formados y ítem(s) [${duplicateRows}] duplicados`,
    };
  }
  return {
    error: false,
    catalogItems: validItems,
  };
}

// Cambiado para aceptar items JSON
export async function UpdateCatalog(
  items: PropertiesItemSchemaType[],
  brandId: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;
  const collectionRes = await getCollection();
  if (collectionRes.error) {
    return {
      error: true,
      details: collectionRes.details,
    };
  }
  const collection = collectionRes.collection;
  const validationResult = await validateJsonItems(items, collection, brandId);
  if (validationResult.error) {
    res = validationResult;
    return res;
  }

  const weaviateResult = await insertCatalogItemsToWeaviate(
    validationResult.catalogItems,
    brandId,
    collection
  );
  if (weaviateResult.success) {
    res = {
      error: false,
    };
    console.log(
      `Successfully inserted ${weaviateResult.insertedCount} vectors into Weaviate`
    );
  } else {
    res = {
      error: true,
      details: `Error inserting into Weaviate: ${weaviateResult.errors.join(", ")}`,
    };
    console.error("Weaviate insertion errors:", weaviateResult.errors);
  }
  return res;
}

export async function VerifyBrand(brand: string): Promise<boolean> {
  // const [result]: any = await db.query("SELECT * FROM brands WHERE email = ?", [
  //   brand,
  // ]);
  // return result.length > 0;
  return false;
}

export async function GetBrandEmail(brandId: string): Promise<string | null> {
  // const [result]: any = await db.query(
  //   "SELECT email FROM brands WHERE id = ?",
  //   [brandId]
  // );
  // return result[0].email || null;
  return null;
}

// Función para insertar items del catálogo en Pinecone
export async function insertCatalogItemsToWeaviate(
  catalogItems: PropertiesItemSchemaType[],
  brandId: string,
  collection: Collection
): Promise<{
  success: boolean;
  insertedCount: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let insertedCount = 0;

  try {
    for (const item of catalogItems) {
      try {
        const imageFeatures = await extractImageFeatures(item.imageUrl);
        const textFeatures = await extractTextFeatures(item.description);

        if (imageFeatures.length === 0 && textFeatures.length === 0) {
          throw new Error(
            "No se pudieron extraer características de la imagen o el texto"
          );
        }

        const itemData = {
          ...item,
          brandId: brandId,
        };

        const result = await collection.data.insert({
          properties: {
            ...itemData,
          },
          vectors: {
            image_vector: imageFeatures,
            text_vector: textFeatures,
          },
        });
        insertedCount++;
      } catch (error) {
        const errorMsg = `Error processing item ${item.name}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    console.log(
      `Insertion completed. ${insertedCount} vectors inserted, ${errors.length} errors.`
    );

    return {
      success: errors.length === 0,
      insertedCount,
      errors,
    };
  } catch (error) {
    console.error("Error in insertCatalogItemsToWeaviate:", error);
    return {
      success: false,
      insertedCount: 0,
      errors: [`General error: ${error}`],
    };
  }
}

async function checkDuplicateInWeaviate(
  collection: Collection,
  name: string,
  brandId: string
): Promise<boolean> {
  const result = await collection.query.fetchObjects({
    filters: Filters.and(
      collection.filter.byProperty("name").equal(name),
      collection.filter.byProperty("brandId").equal(brandId)
    ),
    limit: 1,
  });

  const exists = result.objects.length > 0;
  console.log("check duplicate in weaviate for", name, brandId, "is", exists);

  return exists;
}

export async function DeleteFromCatalog(
  itemsUuids: string[],
  brandId: string
): Promise<DeleteItemsResponseSchemaType | ErrorSchemaType> {
  let res: DeleteItemsResponseSchemaType | ErrorSchemaType;
  const collectionRes = await getCollection();
  if (collectionRes.error) {
    return {
      error: true,
      details: collectionRes.details,
    };
  }

  const collection = collectionRes.collection;
  if (!collection) {
    return {
      error: true,
      details: "Collection not found",
    };
  }
  if (!itemsUuids || itemsUuids.length === 0) {
    return {
      error: true,
      details: "No se han proporcionado uuids de items",
    };
  }

  for (const itemUuid of itemsUuids) {
    if (!itemUuid) continue; // Skip empty lines
  }

  res = await deleteCatalogItemsFromWeaviate(itemsUuids, collection, brandId);

  if (res.error) {
    return res;
  }

  const deleteFromDatabaseRes = await deleteFromDatabase(itemsUuids);
  if (deleteFromDatabaseRes.error) {
    return {
      error: true,
      details: deleteFromDatabaseRes.details,
    };
  }
  return res;
}

async function deleteCatalogItemsFromWeaviate(
  itemsUuids: string[],
  collection: Collection,
  brandId: string
): Promise<DeleteItemsResponseSchemaType | ErrorSchemaType> {
  try {
    let numberDeleted = 0;
    const invalidItems: string[] = [];
    for (const itemUuid of itemsUuids) {
      // 1. Buscar el objeto por su id (uuid)
      const result = await collection.query.fetchObjects({
        filters: collection.filter.byId().equal(itemUuid),
        limit: 1,
        returnProperties: ["brandId"],
      });

      if (
        result.objects.length > 0 &&
        result.objects[0]?.properties?.brandId === brandId
      ) {
        const response = await collection.data.deleteById(itemUuid);
        if (response) {
          numberDeleted++;
        } else {
          invalidItems.push(itemUuid);
        }
      } else {
        console.log("No se encontró un objeto con ese id y brandId.");
        invalidItems.push(itemUuid);
      }
    }
    if (invalidItems.length > 0) {
      return {
        error: true,
        details: `items [${invalidItems.join(",")}] no encontrados y ${numberDeleted} eliminados correctamente`,
      };
    }
    return {
      error: false,
      numberDeleted: numberDeleted,
    };
  } catch (error) {
    return {
      error: true,
      details: `Error deleting from Weaviate: ${error}`,
    };
  }
}

async function deleteFromDatabase(
  itemsUuids: string[]
): Promise<SuccessSchemaType | ErrorSchemaType> {
  try {
    // Delete from likes and favorites tables for both clients and brands using Prisma
    await db.itemLikeClient.deleteMany({
      where: {
        itemUuid: {
          in: itemsUuids,
        },
      },
    });

    await db.itemFavoriteClient.deleteMany({
      where: {
        itemUuid: {
          in: itemsUuids,
        },
      },
    });

    await db.itemLikeBrand.deleteMany({
      where: {
        itemUuid: {
          in: itemsUuids,
        },
      },
    });

    await db.itemFavoriteBrand.deleteMany({
      where: {
        itemUuid: {
          in: itemsUuids,
        },
      },
    });

    return {
      error: false,
    };
  } catch (error) {
    console.error("Error deleting from database:", error);
    return {
      error: true,
      details: `Error deleting from database: ${error}`,
    };
  }
}

export async function UpdateItem(
  uuid: string,
  updatedItem: UpdateItemBodySchemaType
): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
    }
> {
  try {
    const collectionResult = await getCollection();
    if (collectionResult.error) {
      return {
        error: true,
        details: collectionResult.details,
      };
    }

    const collection = collectionResult.collection!;

    // Fetch the object
    const result = await collection.query.fetchObjects({
      filters: collection.filter.byId().equal(uuid),
      limit: 1,
    });

    if (result.objects.length === 0) {
      return {
        error: true,
        details: `No se encontró el item "${uuid}"`,
      };
    }

    const object = result.objects[0];
    if (!object || !object.uuid) {
      return {
        error: true,
        details: "No se pudo obtener el ID del item a actualizar",
      };
    }

    const id = object.uuid;

    // Prepare properties to update (only include fields that are provided)
    const propertiesToUpdate: any = {};
    if (updatedItem.name !== undefined)
      propertiesToUpdate.name = updatedItem.name;
    if (updatedItem.description !== undefined)
      propertiesToUpdate.description = updatedItem.description;
    if (updatedItem.price !== undefined)
      propertiesToUpdate.price = updatedItem.price;
    if (updatedItem.imageUrl !== undefined)
      propertiesToUpdate.image_url = updatedItem.imageUrl;
    if (updatedItem.url !== undefined) propertiesToUpdate.url = updatedItem.url;

    const vectorsToUpdate: any = {};
    if (updatedItem.imageUrl) {
      console.log("extracting image features");
      const imageFeatures = await extractImageFeatures(updatedItem.imageUrl);
      vectorsToUpdate.image_vector = imageFeatures;
    }
    if (updatedItem.description) {
      console.log("extracting text features");
      const textFeatures = await extractTextFeatures(updatedItem.description);
      vectorsToUpdate.text_vector = textFeatures;
    }

    // Update the object
    const updateData: any = {
      id: id,
      properties: propertiesToUpdate,
      vectors: vectorsToUpdate,
    };
    await collection.data.update(updateData);

    return {
      error: false,
    };
  } catch (error) {
    console.error("Error updating item:", error);
    return {
      error: true,
      details: `Error al actualizar el item: ${error instanceof Error ? error.message : "Error desconocido"}`,
    };
  }
}

export async function DeleteFromWeaviate(
  brandId: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  try {
    const collectionRes = await getCollection();
    if (collectionRes.error) {
      return {
        error: true,
        details: collectionRes.details,
      };
    }
    const collection = collectionRes.collection;
    console.log("brandId", brandId);
    const res = await collection.data.deleteMany(
      collection.filter.byProperty("brandId").equal(brandId),
      { verbose: true }
    );

    const itemsUuids = res.objects.map(obj => obj.id);

    const deleteFromDatabaseRes = await deleteFromDatabase(itemsUuids);

    return deleteFromDatabaseRes;
  } catch (error) {
    console.error("Error deleting from Weaviate:", error);
    return {
      error: true,
      details: `Error deleting from Weaviate: ${error}`,
    };
  }
}
