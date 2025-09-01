import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { getCollection } from "./functions";
import db from "../db";
import { Collection } from "weaviate-client";
import { DeleteItemsResponseSchemaType } from "@/schemas/catalog/catalog-schema";

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

    await deleteFromDatabase(itemsUuids);

    return {
      error: false,
    };
  } catch (error) {
    console.error("Error deleting from Weaviate:", error);
    return {
      error: true,
      details: `Error deleting from Weaviate: ${error}`,
    };
  }
}

async function deleteFromDatabase(itemsUuids: string[]) {
  // Delete from likes and favorites tables for both clients and brands using Prisma
  await db.itemLike.deleteMany({
    where: {
      itemUuid: {
        in: itemsUuids,
      },
    },
  });

  await db.itemFavorite.deleteMany({
    where: {
      itemUuid: {
        in: itemsUuids,
      },
    },
  });
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

  await deleteFromDatabase(itemsUuids);
  return res;
}
