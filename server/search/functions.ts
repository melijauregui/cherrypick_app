import {
  CatalogResponseSchemaType,
  ItemSchemaType,
  IdNameImageSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import logger from "../logger";
import { prisma } from "../db";
import {
  extractImageFeaturesFromBase64,
  extractTextFeatures,
  getCollection,
} from "../catalog/functions";
import { EmbbedingResponseSchemaType } from "@/schemas/search/search-schema";
import { db } from "../db.config";
import { Filters } from "weaviate-client";

export async function SearchItems(
  page: number,
  limit: number,
  type: "text" | "image",
  embedding: number[],
  minPrice?: number,
  maxPrice?: number,
  brandIds?: string[],
  imageUrl?: string
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
  // Get Weaviate collection
  const resCollection = await getCollection();
  if (resCollection.error) {
    return {
      error: true,
      details: resCollection.details || "Error getting collection",
    };
  }

  const collection = resCollection.collection;
  const offset = page * limit;

  let result;

  if (embedding.length !== 768) {
    return {
      error: true,
      details: "Embedding must be 768 numbers",
    };
  }

  // Build filters array for Weaviate
  const filterConditions = [];

  // Price filters
  if (minPrice !== undefined) {
    filterConditions.push(
      collection.filter.byProperty("price").greaterOrEqual(minPrice)
    );
  }
  if (maxPrice !== undefined) {
    filterConditions.push(
      collection.filter.byProperty("price").lessOrEqual(maxPrice)
    );
  }

  // Brand filters
  if (brandIds && brandIds.length > 0) {
    filterConditions.push(
      collection.filter.byProperty("brandId").containsAny(brandIds)
    );
  }

  // Create combined filter if we have any conditions
  const filters =
    filterConditions.length > 0 ? Filters.and(...filterConditions) : undefined;

  const queryOptions = {
    limit: limit,
    offset: offset,
    targetVector: type === "text" ? "image_vector" : "text_vector",
    includeDistance: true,
    includeMatchDistance: true,
    filters,
  };

  result = await collection.query.nearVector(embedding, queryOptions);

  // Obtener UUIDs de Weaviate manteniendo el orden
  const uuids = result.objects.map(match => match.uuid);

  if (uuids.length === 0) {
    return {
      error: false,
      items: [],
    };
  }

  // Obtener items de PostgreSQL manteniendo el orden
  const items = await prisma.item.findMany({
    where: {
      id: {
        in: uuids,
      },
    },
    include: {
      files: true, // Incluir la imagen del item
    },
  });

  // Crear un mapa para mantener el orden de Weaviate
  const uuidOrderMap = new Map();
  uuids.forEach((uuid, index) => {
    uuidOrderMap.set(uuid, index);
  });

  // Mapear y ordenar los items según el orden de Weaviate
  const orderedItems: ItemSchemaType[] = items
    .map(item => ({
      name: item.name,
      description: item.description,
      image: {
        url: item.files.url,
        updatedAt: item.files.updatedAt.toISOString(),
      },
      url: item.url,
      brandId: item.brandId,
      price: item.price,
      uuid: item.id,
    }))
    .filter(item => item.image.url !== imageUrl)
    .sort((a, b) => {
      const orderA = uuidOrderMap.get(a.uuid) ?? Number.MAX_SAFE_INTEGER;
      const orderB = uuidOrderMap.get(b.uuid) ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

  return {
    error: false,
    items: orderedItems,
  };
}

export async function GetEmbedding(
  type: "text" | "image",
  query: string
): Promise<EmbbedingResponseSchemaType | ErrorSchemaType> {
  const embeddingResponse =
    type === "text"
      ? await extractTextFeatures(query)
      : await extractImageFeaturesFromBase64(query);
  if (
    embeddingResponse.error ||
    !Array.isArray(embeddingResponse.features) ||
    embeddingResponse.features.length === 0
  ) {
    logger.error("Error extracting features: %s", embeddingResponse.details);
    return {
      error: true,
      details: embeddingResponse.details,
    };
  }

  if (embeddingResponse.features.length !== 768) {
    return {
      error: true,
      details: "Embedding must be 768 numbers",
    };
  }

  return {
    error: false,
    embedding: embeddingResponse.features,
  };
}

export async function GetAllBrands(
  filter: string | undefined,
  page: number,
  limit: number
): Promise<IdNameImageSchemaType[]> {
  //busco en mi bdd de brands
  const res = await db.brand.findMany({
    where: {
      name: {
        contains: filter ? filter : undefined,
      },
    },
    select: {
      name: true,
      userId: true,
      files: {
        select: {
          url: true,
          updatedAt: true,
        },
      },
    },
    skip: page * limit,
    take: limit,
    orderBy: {
      name: "asc",
    },
  });

  const data = res.map(brand => ({
    name: brand.name,
    id: brand.userId,
    image: {
      url: brand.files.url,
      updatedAt: brand.files.updatedAt.toISOString(),
    },
  }));

  return data;
}

export async function GetAllInspirationItems(
  category: string
): Promise<ItemSchemaType[]> {
  const res = await db.inspoItems.findMany({
    where: {
      category: category,
    },
    include: {
      item: {
        include: {
          files: true,
        },
      },
    },
  });
  res.sort((a, b) => a.index - b.index);
  const data = res.map(inspoItem => ({
    name: inspoItem.item.name,
    description: inspoItem.item.description,
    image: {
      url: inspoItem.item.files.url,
      updatedAt: inspoItem.item.files.updatedAt.toISOString(),
      width: inspoItem.item.files.width ?? undefined,
      height: inspoItem.item.files.height ?? undefined,
    },
    url: inspoItem.item.url,
    brandId: inspoItem.item.brandId,
    price: inspoItem.item.price,
    uuid: inspoItem.item.id,
  }));

  return data;
}
