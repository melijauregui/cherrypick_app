import { CatalogResponseSchemaType } from "@/schemas/catalog/catalog-schema";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { CheckLikeFavoriteResponseSchemaType } from "@/schemas/catalog/like-favorite-schema.ts";
import { db } from "../db.config";
import { GetItemsFromWeaviate } from "./functions";

// Funciones para likes
export async function toggleLike(
  userEmail: string,
  itemUuid: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;
  const user = await db.user.findUnique({
    where: { email: userEmail },
  });
  if (!user) {
    res = { error: true, details: "User not found" };
    return res;
  }

  // Verificar si ya existe el like
  const existingLike = await db.itemLike.findUnique({
    where: {
      userId_itemUuid: {
        userId: user.id,
        itemUuid,
      },
    },
  });

  if (existingLike) {
    // Si existe, eliminar el like
    await db.itemLike.delete({
      where: {
        userId_itemUuid: {
          userId: user.id,
          itemUuid,
        },
      },
    });
    res = { error: false };
    return res;
  } else {
    // Si no existe, agregar el like
    await db.itemLike.create({
      data: {
        userId: user.id,
        itemUuid,
      },
    });
    res = { error: false };
    return res;
  }
}

export async function checkIfLiked(
  userEmail: string,
  itemUuid: string
): Promise<CheckLikeFavoriteResponseSchemaType | ErrorSchemaType> {
  let res: CheckLikeFavoriteResponseSchemaType | ErrorSchemaType;
  const user = await db.user.findUnique({
    where: { email: userEmail },
  });
  if (!user) {
    res = { error: true, details: "User not found" };
    return res;
  }
  const existingLike = await db.itemLike.findUnique({
    where: {
      userId_itemUuid: {
        userId: user.id,
        itemUuid,
      },
    },
  });
  res = { error: false, isSelected: !!existingLike };
  return res;
}

// Funciones para favoritos
export async function toggleFavorite(
  userEmail: string,
  itemUuid: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;
  const user = await db.user.findUnique({
    where: { email: userEmail },
  });
  if (!user) {
    res = { error: true, details: "User not found" };
    return res;
  }

  // Verificar si ya existe el favorito
  const existingFavorite = await db.itemFavorite.findUnique({
    where: {
      userId_itemUuid: {
        userId: user.id,
        itemUuid,
      },
    },
  });

  if (existingFavorite) {
    // Si existe, eliminar el favorito
    await db.itemFavorite.delete({
      where: {
        userId_itemUuid: {
          userId: user.id,
          itemUuid,
        },
      },
    });
    res = { error: false };
  } else {
    // Si no existe, agregar el favorito
    await db.itemFavorite.create({
      data: {
        userId: user.id,
        itemUuid,
      },
    });
    res = { error: false };
  }
  return res;
}

export async function checkIfFavorited(
  userEmail: string,
  itemUuid: string
): Promise<CheckLikeFavoriteResponseSchemaType | ErrorSchemaType> {
  let res: CheckLikeFavoriteResponseSchemaType | ErrorSchemaType;
  const user = await db.user.findUnique({
    where: { email: userEmail },
  });
  if (!user) {
    res = { error: true, details: "User not found" };
    return res;
  }
  const existingFavorite = await db.itemFavorite.findUnique({
    where: {
      userId_itemUuid: {
        userId: user.id,
        itemUuid,
      },
    },
  });
  res = { error: false, isSelected: !!existingFavorite };
  return res;
}

// Funciones para obtener todos los items liked y favorited
export async function getAllLikedFavoritedItems(
  type: "likes" | "favorites",
  userEmail: string,
  page: number = 0,
  limit: number = 100
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
  let res: CatalogResponseSchemaType | ErrorSchemaType;
  let likedFavoritedUuids: { itemUuid: string }[] = [];
  const user = await db.user.findUnique({
    where: { email: userEmail },
  });
  if (!user) {
    res = { error: true, details: "User not found" };
    return res;
  }

  const offset = page * limit;
  // const query = {
  //   where: {
  //     userId: user.id,
  //   },
  //   skip: offset,
  //   take: limit,
  //   select: {
  //     itemUuid: true,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // };

  // Primero obtener los UUIDs de los items liked
  if (type === "likes") {
    likedFavoritedUuids = await db.itemLike.findMany({
      where: {
        userId: user.id,
      },
      skip: offset,
      take: limit,
      select: {
        itemUuid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (type === "favorites") {
    likedFavoritedUuids = await db.itemFavorite.findMany({
      where: {
        userId: user.id,
      },
      skip: offset,
      take: limit,
      select: {
        itemUuid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  if (!likedFavoritedUuids || likedFavoritedUuids.length === 0) {
    res = { error: false, items: [] };
    return res;
  }
  const uuids = likedFavoritedUuids.map(item => item.itemUuid);
  // Obtener los items de weaviate
  const itemsRespose = await GetItemsFromWeaviate(uuids, limit);
  if (itemsRespose.error) {
    return itemsRespose;
  }
  const items = itemsRespose.items;
  res = { error: false, items: items };
  return res;
}
