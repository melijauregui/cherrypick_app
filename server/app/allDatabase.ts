import {
  CheckLikeFavoriteResponseSchemaType,
  LikeFavoriteResponseSchemaType,
} from "@/schemas/activity/activity";
import { db } from "../db.config";
import {
  CatalogItemArraySchema,
  CatalogItemArraySchemaQueryType,
} from "../../schemas/catalog/catalog-schema";
import { getCollection } from "./catalogFunctions";

// Funciones para likes
export async function toggleLike(
  userEmail: string,
  itemUuid: string,
  userType: string
): Promise<LikeFavoriteResponseSchemaType> {
  // try {
  //   // Verificar si ya existe el like
  //   const [existingLike] = await db.execute(
  //     `SELECT id FROM item_likes_${userType} WHERE user_email = ? AND item_uuid = ?`,
  //     [userEmail, itemUuid]
  //   );

  //   if (Array.isArray(existingLike) && existingLike.length > 0) {
  //     // Si existe, eliminar el like
  //     await db.execute(
  //       `DELETE FROM item_likes_${userType} WHERE user_email = ? AND item_uuid = ?`,
  //       [userEmail, itemUuid]
  //     );
  //     return { error: false };
  //   } else {
  //     // Si no existe, agregar el like
  //     await db.execute(
  //       `INSERT INTO item_likes_${userType} (user_email, item_uuid) VALUES (?, ?)`,
  //       [userEmail, itemUuid]
  //     );
  //     return { error: false };
  //   }
  // } catch (error) {
  //   console.error("Error toggling like: 3", error);
  //   return { error: true, details: "Error al manejar el like" };
  // }
  return { error: false };
}

export async function checkIfLiked(
  userEmail: string,
  itemUuid: string,
  userType: string
): Promise<CheckLikeFavoriteResponseSchemaType> {
  // try {
  //   const [rows] = await db.execute(
  //     `SELECT id FROM item_likes_${userType} WHERE user_email = ? AND item_uuid = ?`,
  //     [userEmail, itemUuid]
  //   );
  //   return { error: false, isSelected: Array.isArray(rows) && rows.length > 0 };
  // } catch (error) {
  //   console.error("Error checking like:QQQQ", error);
  //   return { error: true, details: "Error al verificar el like" };
  // }
  return { error: false, isSelected: false };
}

// Funciones para favoritos
export async function toggleFavorite(
  userEmail: string,
  itemUuid: string,
  userType: string
): Promise<LikeFavoriteResponseSchemaType> {
  try {
    // // Verificar si ya existe el favorito
    // const [existingFavorite] = await db.execute(
    //   `SELECT id FROM item_favorites_${userType} WHERE user_email = ? AND item_uuid = ?`,
    //   [userEmail, itemUuid]
    // );

    // if (Array.isArray(existingFavorite) && existingFavorite.length > 0) {
    //   // Si existe, eliminar el favorito
    //   await db.execute(
    //     `DELETE FROM item_favorites_${userType} WHERE user_email = ? AND item_uuid = ?`,
    //     [userEmail, itemUuid]
    //   );
    //   return { error: false };
    // } else {
    //   // Si no existe, agregar el favorito
    //   await db.execute(
    //     `INSERT INTO item_favorites_${userType} (user_email, item_uuid) VALUES (?, ?)`,
    //     [userEmail, itemUuid]
    //   );
    return { error: false };
    // }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { error: true, details: "Error al manejar el favorito" };
  }
}

export async function checkIfFavorited(
  userEmail: string,
  itemUuid: string,
  userType: string
): Promise<CheckLikeFavoriteResponseSchemaType> {
  // try {
  //   const [rows] = await db.execute(
  //     `SELECT id FROM item_favorites_${userType} WHERE user_email = ? AND item_uuid = ?`,
  //     [userEmail, itemUuid]
  //   );

  //   return { error: false, isSelected: Array.isArray(rows) && rows.length > 0 };
  // } catch (error) {
  //   console.error("Error checking favorite:", error);
  //   return { error: true, details: "Error al verificar el favorito" };
  // }
  return { error: false, isSelected: false };
}

// Funciones para obtener todos los items liked y favorited
export async function getAllLikedFavoritedItems(
  type: "likes" | "favorites",
  userEmail: string,
  userType: string,
  page: number = 0,
  limit: number = 100
): Promise<CatalogItemArraySchemaQueryType> {
  // try {
  //   const offset = page * limit;
  //   // Primero obtener los UUIDs de los items liked
  //   const tableName = `item_${type}_${userType}`;
  //   const [likedFavoritedUuids] = await db.query(
  //     `SELECT item_uuid FROM ${tableName}
  //      WHERE user_email = ?
  //      ORDER BY created_at DESC
  //      LIMIT ? OFFSET ?`,
  //     [userEmail, limit, offset]
  //   );

  //   if (
  //     !Array.isArray(likedFavoritedUuids) ||
  //     likedFavoritedUuids.length === 0
  //   ) {
  //     return { error: false, items: [] };
  //   }

  //   // Obtener los items de weaviate
  //   const items = await getItemsFromWeaviate(
  //     likedFavoritedUuids.map((row: any) => row.item_uuid),
  //     limit
  //   );
  //   return items;
  // } catch (error) {
  //   console.error("Error getting liked items:", error);
  //   return { error: true, details: "Error al obtener los items liked" };
  // }
  return { error: false, items: [] };
}

async function getItemsFromWeaviate(
  uuids: string[],
  limit: number
): Promise<CatalogItemArraySchemaQueryType> {
  try {
    const resCollection = await getCollection();
    if (resCollection.error || !resCollection.collection) {
      return {
        error: true,
        details: resCollection.details || "Error getting collection",
      };
    }
    const collection = resCollection.collection;

    const filters = collection.filter.byId().containsAny(uuids);

    const queryOptions: any = {
      filters: filters,
      limit: limit,
      returnProperties: [
        "name",
        "description",
        "image_url",
        "url",
        "brandId",
        "price",
      ],
    };

    const result = await collection.query.fetchObjects(queryOptions);

    if (result.objects.length === 0) {
      return {
        error: true,
        details: "Items not found",
      };
    }

    // Crear un mapa para mantener el orden original de los UUIDs
    const uuidOrderMap = new Map();
    uuids.forEach((uuid, index) => {
      uuidOrderMap.set(uuid, index);
    });

    const items = result.objects
      .map(obj => ({
        name: obj.properties?.name || "",
        description: obj.properties?.description || "",
        image_url: obj.properties?.image_url || "",
        url: obj.properties?.url || "",
        brandId: obj.properties?.brandId || "",
        price: obj.properties?.price || 0,
        uuid: obj.uuid || "",
      }))
      .sort((a, b) => {
        const orderA = uuidOrderMap.get(a.uuid) ?? Number.MAX_SAFE_INTEGER;
        const orderB = uuidOrderMap.get(b.uuid) ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
      });

    // Validate the item using Zod schema
    const validationResult = CatalogItemArraySchema.safeParse(items);
    if (!validationResult.success) {
      console.log("Item validation failed:", validationResult.error);
      return {
        error: true,
        details: "Invalid items data",
      };
    }

    return {
      error: false,
      items: validationResult.data,
    };
  } catch (error) {
    console.error("Error querying items in Weaviate:", error);
    return {
      error: true,
      details: "Error querying Weaviate: " + error,
    };
  }
}
