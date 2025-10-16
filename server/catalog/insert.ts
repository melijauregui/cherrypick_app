import {
  CreateItemSchema,
  CreateItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { Collection, Filters } from "weaviate-client";
import { getCollection, extractFeatures } from "./functions";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { prisma } from "../db";
import { getFileUrl } from "../file-uploader";

// Función para validar items JSON
async function validateJsonItems(items: CreateItemSchemaType[]): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
      catalogItems: CreateItemSchemaType[];
    }
> {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      error: true,
      details: "No se han proporcionado items válidos",
    };
  }
  const invalidRows: number[] = [];
  const validItems: CreateItemSchemaType[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = { ...items[i] };
    try {
      const validatedItem = CreateItemSchema.parse(item);
      validItems.push(validatedItem);
    } catch (error) {
      console.error("error", error);
      invalidRows.push(i + 1);
    }
  }
  if (invalidRows.length > 0) {
    const rowNumbers = invalidRows.join(",");
    return {
      error: true,
      details: `ítem(s) [${rowNumbers}] mal formados`,
    };
  }
  return {
    error: false,
    catalogItems: validItems,
  };
}

// Función para insertar items del catálogo en PostgreSQL y Weaviate
export async function insertCatalogItems(
  catalogItems: CreateItemSchemaType[],
  brandId: string,
  collection: Collection
): Promise<{
  success: boolean;
  insertedCount: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let insertedCount = 0;

  for (const item of catalogItems) {
    try {
      //obtengo el url del imageId
      const image = await getFileUrl(item.imageId);
      // 1. Primero extraer características para validar que la imagen es válida
      const featuresResult = await extractFeatures(item.description, image.url);

      if (
        featuresResult.error ||
        featuresResult.features.image_features.length === 0 ||
        featuresResult.features.text_features.length === 0
      ) {
        throw new Error(
          "No se pudieron extraer características de la imagen o el texto"
        );
      }

      // 3. Insertar el item en PostgreSQL
      const dbItem = await prisma.item.create({
        data: {
          ...(item.uuid && { id: item.uuid }), // Solo incluir id si item.uuid está definido
          name: item.name,
          description: item.description,
          price: item.price,
          url: item.url,
          brandId: brandId,
          imageId: item.imageId,
        },
      });

      await collection.data.insert({
        id: dbItem.id, // Usar el UUID de PostgreSQL
        vectors: {
          image_vector: featuresResult.features.image_features,
          text_vector: featuresResult.features.text_features,
        },
      });

      console.log(`Item inserted with UUID: ${dbItem.id}`);
      insertedCount++;
    } catch (error) {
      const errorMsg = `Error processing item ${item.name}: ${error}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }

  console.log(
    `Insertion completed. ${insertedCount} items inserted in PostgreSQL and Weaviate, ${errors.length} errors.`
  );

  return {
    success: errors.length === 0,
    insertedCount,
    errors,
  };
}

// Cambiado para aceptar items JSON
export async function UpdateCatalog(
  items: CreateItemSchemaType[],
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
  console.log(
    `Total objects in collection before insertion: ${totalCountBefore}`
  );
  //await clearCollection(collection, brandId); //solo para testing

  const validationResult = await validateJsonItems(items);
  if (validationResult.error) {
    res = validationResult;
    return res;
  }

  const weaviateResult = await insertCatalogItems(
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
    console.log(
      `Total objects in collection after insertion: ${totalCountAfter}`
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

export async function countObjects(collection: Collection) {
  const agg = await collection.aggregate.overAll();

  const count = agg.totalCount;

  return count;
}

// Elimina todos los objetos de una colección
export async function clearCollection(collection: Collection, brandId: string) {
  const result = await collection.query.fetchObjects({
    filters: Filters.and(
      collection.filter.byProperty("brandId").equal(brandId)
    ),
    limit: 50, //ToDo
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

  console.log(
    `Cleared collection of brand ${brandId}: ${objects.length} objects deleted.`
  );
}
