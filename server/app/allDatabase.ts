import {
  CheckLikeFavoriteResponseSchemaType,
  LikeFavoriteResponseSchemaType,
} from "@/schemas/activity/activity";
import { db } from "../db";

// Funciones para likes
export async function toggleLike(
  userEmail: string,
  itemUuid: string,
  userType: string
): Promise<LikeFavoriteResponseSchemaType> {
  try {
    // Verificar si ya existe el like
    const [existingLike] = await db.execute(
      `SELECT id FROM item_likes_${userType} WHERE user_email = ? AND item_uuid = ?`,
      [userEmail, itemUuid]
    );

    if (Array.isArray(existingLike) && existingLike.length > 0) {
      // Si existe, eliminar el like
      await db.execute(
        `DELETE FROM item_likes_${userType} WHERE user_email = ? AND item_uuid = ?`,
        [userEmail, itemUuid]
      );
      return { error: false };
    } else {
      // Si no existe, agregar el like
      await db.execute(
        `INSERT INTO item_likes_${userType} (user_email, item_uuid) VALUES (?, ?)`,
        [userEmail, itemUuid]
      );
      return { error: false };
    }
  } catch (error) {
    console.error("Error toggling like: 3", error);
    return { error: true, details: "Error al manejar el like" };
  }
}

export async function checkIfLiked(
  userEmail: string,
  itemUuid: string,
  userType: string
): Promise<CheckLikeFavoriteResponseSchemaType> {
  try {
    const [rows] = await db.execute(
      `SELECT id FROM item_likes_${userType} WHERE user_email = ? AND item_uuid = ?`,
      [userEmail, itemUuid]
    );
    return { error: false, isSelected: Array.isArray(rows) && rows.length > 0 };
  } catch (error) {
    console.error("Error checking like:QQQQ", error);
    return { error: true, details: "Error al verificar el like" };
  }
}

// Funciones para favoritos
export async function toggleFavorite(
  userEmail: string,
  itemUuid: string,
  userType: string
): Promise<LikeFavoriteResponseSchemaType> {
  try {
    // Verificar si ya existe el favorito
    const [existingFavorite] = await db.execute(
      `SELECT id FROM item_favorites_${userType} WHERE user_email = ? AND item_uuid = ?`,
      [userEmail, itemUuid]
    );

    if (Array.isArray(existingFavorite) && existingFavorite.length > 0) {
      // Si existe, eliminar el favorito
      await db.execute(
        `DELETE FROM item_favorites_${userType} WHERE user_email = ? AND item_uuid = ?`,
        [userEmail, itemUuid]
      );
      return { error: false };
    } else {
      // Si no existe, agregar el favorito
      await db.execute(
        `INSERT INTO item_favorites_${userType} (user_email, item_uuid) VALUES (?, ?)`,
        [userEmail, itemUuid]
      );
      return { error: false };
    }
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
  try {
    const [rows] = await db.execute(
      `SELECT id FROM item_favorites_${userType} WHERE user_email = ? AND item_uuid = ?`,
      [userEmail, itemUuid]
    );

    return { error: false, isSelected: Array.isArray(rows) && rows.length > 0 };
  } catch (error) {
    console.error("Error checking favorite:", error);
    return { error: true, details: "Error al verificar el favorito" };
  }
}
