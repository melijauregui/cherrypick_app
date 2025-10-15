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
    // 1. Primero obtener los UUIDs de los items a eliminar desde PostgreSQL
    const items = await db.item.findMany({
      where: {
        brandId: brandId,
      },
      select: {
        id: true,
      },
    });

    const itemsUuids = items.map(item => item.id);

    if (itemsUuids.length === 0) {
      return {
        error: false,
      };
    }

    // 2. Eliminar de PostgreSQL (cascade eliminará likes y favorites)
    await deleteFromDatabase(itemsUuids);

    // 3. Eliminar de Weaviate usando los UUIDs obtenidos
    const collectionRes = await getCollection();
    if (collectionRes.error) {
      return {
        error: true,
        details: collectionRes.details,
      };
    }
    const collection = collectionRes.collection;

    // Eliminar de Weaviate usando los UUIDs
    for (const uuid of itemsUuids) {
      try {
        await collection.data.deleteById(uuid);
      } catch (error) {
        console.warn(`Failed to delete ${uuid} from Weaviate:`, error);
        // Continuar con los demás aunque falle uno
      }
    }

    return {
      error: false,
    };
  } catch (error) {
    console.error("Error deleting items:", error);
    return {
      error: true,
      details: `Error deleting items: ${error}`,
    };
  }
}

async function deleteFromDatabase(itemsUuids: string[]) {
  // Delete from items table - cascade will handle likes and favorites
  await db.item.deleteMany({
    where: {
      id: {
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
  await deleteFromDatabase(itemsUuids);

  res = await deleteCatalogItemsFromWeaviate(itemsUuids, collection, brandId);

  return res;
}
