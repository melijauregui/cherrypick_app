import {
  CatalogResponseSchemaType,
  ItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { CheckLikeFavoriteResponseSchemaType } from "@/schemas/catalog/like-favorite-schema.ts";
import { db } from "../db.config";
import { prisma } from "../db";

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
export async function getAllLikedItems(
  userId: string,
  page: number = 0,
  limit: number = 100
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
  let res: CatalogResponseSchemaType | ErrorSchemaType;

  const offset = page * limit;

  const likedItems = await prisma.itemLike.findMany({
    where: {
      userId: userId,
    },
    skip: offset,
    take: limit,
    include: {
      item: {
        include: {
          files: true, // Incluir la imagen del item
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!likedItems || likedItems.length === 0) {
    res = { error: false, items: [] };
    return res;
  }

  // Mapear los items obtenidos directamente de PostgreSQL
  const items: ItemSchemaType[] = likedItems.map(like => ({
    name: like.item.name,
    description: like.item.description,
    image: {
      url: like.item.files.url,
      updatedAt: like.item.files.updatedAt.toISOString(),
    },
    url: like.item.url,
    brandId: like.item.brandId,
    price: like.item.price,
    uuid: like.item.id,
  }));

  res = { error: false, items: items };
  return res;
}

// Funciones para obtener todos los items liked y favorited
export async function getAllFavoritedItems(
  userId: string,
  page: number = 0,
  limit: number = 100
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
  let res: CatalogResponseSchemaType | ErrorSchemaType;

  const offset = page * limit;

  const favoritedItems = await prisma.itemFavorite.findMany({
    where: {
      userId: userId,
    },
    skip: offset,
    take: limit,
    include: {
      item: {
        include: {
          files: true, // Incluir la imagen del item
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!favoritedItems || favoritedItems.length === 0) {
    res = { error: false, items: [] };
    return res;
  }

  // Mapear los items obtenidos directamente de PostgreSQL
  const items: ItemSchemaType[] = favoritedItems.map(like => ({
    name: like.item.name,
    description: like.item.description,
    image: {
      url: like.item.files.url,
      updatedAt: like.item.files.updatedAt.toISOString(),
    },
    url: like.item.url,
    brandId: like.item.brandId,
    price: like.item.price,
    uuid: like.item.id,
  }));

  res = { error: false, items: items };
  return res;
}