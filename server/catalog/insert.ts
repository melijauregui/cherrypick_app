import {
  PropertiesItemSchema,
  PropertiesItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { Collection, Filters } from "weaviate-client";
import {
  extractImageFeatures,
  extractTextFeatures,
  getCollection,
} from "./functions";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";

// Función para validar items JSON
async function validateJsonItems(
  items: PropertiesItemSchemaType[],
  collection: Collection,
  brandId: string,
  includeDuplicates = false
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
      if (includeDuplicates) {
        await deleteIfDuplicateInWeaviate(collection, validatedItem.name, brandId);
      } else {
        const isDuplicate = await checkDuplicateInWeaviate(
          collection,
          validatedItem.name,
          brandId
        );
        if (isDuplicate) {
          duplicateRows.push(i + 1);
          continue;
        }
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
        if (imageFeatures.error) {
          throw new Error(imageFeatures.details);
        }

        const textFeatures = await extractTextFeatures(item.description);
        if (textFeatures.error) {
          throw new Error(textFeatures.details);
        }

        if (
          imageFeatures.features.length === 0 &&
          textFeatures.features.length === 0
        ) {
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
            image_vector: imageFeatures.features,
            text_vector: textFeatures.features,
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

export async function deleteIfDuplicateInWeaviate(
  collection: Collection,
  name: string,
  brandId: string
) {
  const result = await collection.query.fetchObjects({
    filters: Filters.and(
      collection.filter.byProperty("name").equal(name),
      collection.filter.byProperty("brandId").equal(brandId)
    ),
    limit: 1,
  });

  let exists = result.objects.length > 0;

  if (exists && result.objects[0]) {
    const id = result.objects[0].uuid;
    console.log("check duplicate in weaviate for", name, brandId, id, "is", exists);
    await collection.data.deleteById(id);
    console.log("deleted duplicate with id", id);
  }
}

export async function checkDuplicateInWeaviate(
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
  const totalCountBefore = await countObjects(collection);
  console.log(`Total objects in collection before insertion: ${totalCountBefore}`);
  //await clearCollection(collection, brandId); //solo para testing

  const validationResult = await validateJsonItems(items, collection, brandId, true);
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

    const totalCountAfter = await countObjects(collection);
    console.log(`Total objects in collection after insertion: ${totalCountAfter}`);

  } else {
    res = {
      error: true,
      details: `Error inserting into Weaviate: ${weaviateResult.errors.join(", ")}`,
    };
    console.error("Weaviate insertion errors:", weaviateResult.errors);
  }
  return res;
}

export async function countObjects(collection: Collection) {
  const agg = await collection.aggregate.overAll();

  const count = agg.totalCount;

  return count;
}

// Elimina todos los objetos de una colección
export async function clearCollection(collection: Collection, brandId: string) {
  const result = await collection.query.fetchObjects({
    filters: Filters.and(
      collection.filter.byProperty("brandId").equal(brandId),
    ),
    limit: 50 //ToDo
  });
  const objects = result.objects;

  // Elimina todos los objetos del batch
  for (const obj of objects) {
    if (obj.uuid) {
      try {
        await collection.data.deleteById(obj.uuid);
        console.log("Deleted object", obj.uuid);
      } catch (err) {
        console.error("Error deleting object", obj.uuid, err);
      }
    }

  }

  console.log(`Cleared collection of brand ${brandId}: ${objects.length} objects deleted.`);
}