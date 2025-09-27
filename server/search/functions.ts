import {
  CatalogResponseSchemaType,
  ItemSchema,
  ItemSchemaType,
  UuidNameResponseSchemaType,
  UuidNameSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import logger from "../logger";
import {
  extractImageFeaturesFromBase64,
  extractTextFeatures,
  getCollection,
} from "../catalog/functions";
import { EmbbedingResponseSchemaType } from "@/schemas/search/search-schema";
import { db } from "../db.config";
import { Filters, Metadata } from "weaviate-client";
import { QueryIdSchemaType } from "@/schemas/standar-query-schema";
import { keyof } from "zod/v4";
import { countObjects } from "../catalog/insert";

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
  const returnProperties = [
    "name",
    "description",
    "imageUrl",
    "url",
    "brandId",
    "price",
  ];

  let result;

  if (embedding.length !== 768) {
    return {
      error: true,
      details: "Embedding must be 768 numbers",
    };
  }
  // Build filters array
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
    returnProperties: returnProperties,
    targetVector: type === "text" ? "image_vector" : "text_vector", // ToDo: ver si con image_vector funciona mejor en ambos casos
    includeDistance: true,
    includeMatchDistance: true,
    filters,
  };

  result = await collection.query.nearVector(embedding, queryOptions);
  //}

  // Map results to ItemSchemaType
  const items: ItemSchemaType[] = result.objects
    .map(match => {
      const item = {
        name: match.properties?.name || "",
        description: match.properties?.description || "",
        imageUrl: match.properties?.imageUrl || "",
        url: match.properties?.url || "",
        brandId: match.properties?.brandId || "",
        price: match.properties?.price || 0,
        uuid: match.uuid || "",
      };

      const validationResult = ItemSchema.safeParse(item);
      if (!validationResult.success) {
        logger.warn("Item validation failed:", validationResult.error);
        return null;
      }
      return validationResult.data;
    })
    .filter((item): item is ItemSchemaType => {
      return item !== null && item.imageUrl !== imageUrl;
    });

  return {
    error: false,
    items: items,
  };
}

export async function SearchPrefItems(
  preferences: string[],
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
  const resCollection = await getCollection();
  if (resCollection.error) {
    return {
      error: true,
      details: resCollection.details || "Error getting collection",
    };
  }

  const collection = resCollection.collection;
  const returnProperties = [
    "name",
    "description",
    "imageUrl",
    "url",
    "brandId",
    "price",
  ];

  const limit = await countObjects(collection);

  const queryOptions = {
    limit: limit,
    returnProperties: returnProperties,
    targetVector: "image_vector",
    includeDistance: true,
    includeMatchDistance: true,
    returnMetadata: ["distance"] as (keyof Metadata)[]
  };

  const embeddings: number[][] = [];

  for (const pref of preferences) {
    const embeddingResponse = await extractTextFeatures(pref);
    if (
      embeddingResponse.error ||
      !Array.isArray(embeddingResponse.features)
    ) {
      logger.error("Error extracting features for preference: %s", pref);
      continue;
    }
    embeddings.push(embeddingResponse.features);
  }

  if (!embeddings[0]) {
    return {
      error: true,
      details: "No valid embeddings from preferences",
    };
  }

  const vectorSize = embeddings[0].length;
  if (!embeddings.every(e => e.length === vectorSize)) {
    return {
      error: true,
      details: "Embeddings have inconsistent dimensions",
    };
  }

  const meanEmbedding = embeddings[0].map((_, i) =>
    embeddings.reduce((sum, emb) => sum + (emb?.[i] ?? 0), 0) / embeddings.length
  );

  let results = await collection.query.nearVector(meanEmbedding, queryOptions);


  const uniqueResults = aggregateResults(results.objects);

  // Map results to ItemSchemaType
  const items: ItemSchemaType[] = uniqueResults
    .map(match => {
      const item = {
        name: match.name || "",
        description: match.description || "",
        imageUrl: match.imageUrl || "",
        url: match.url || "",
        brandId: match.brandId || "",
        price: match.price || 0,
        uuid: match.uuid || "",
      };

      const validationResult = ItemSchema.safeParse(item);
      if (!validationResult.success) {
        logger.warn("Item validation failed:", validationResult.error);
        return null;
      }
      return validationResult.data;
    })
    .filter((item): item is ItemSchemaType => {
      return item !== null;
    });

  return {
    error: false,
    items: items,
  };
}

interface ItemWithDistance extends ItemSchemaType {
  totalDistance: number;
}

function aggregateResults(results: any[]) {
  const itemsMap = new Map<string, ItemWithDistance>();

  for (const match of results) {
    const uuid = match.uuid;
    const distance = (match.metadata?.distance ?? 0) as number;

    if (!uuid) continue;

    const existing = itemsMap.get(uuid);
    if (existing) {
      existing.totalDistance += distance;
    } else {
      const item: ItemWithDistance = {
        name: match.properties?.name || "",
        description: match.properties?.description || "",
        imageUrl: match.properties?.imageUrl || "",
        url: match.properties?.url || "",
        brandId: match.properties?.brandId || "",
        price: match.properties?.price || 0,
        uuid,
        totalDistance: distance,
      };
      itemsMap.set(uuid, item);
    }
  }

  const finalItems = Array.from(itemsMap.values())
    .sort((a, b) => a.totalDistance - b.totalDistance);

  return finalItems;
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
): Promise<UuidNameSchemaType[]> {
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
    },
    skip: page * limit,
    take: limit,
    orderBy: {
      name: "asc",
    },
  });

  const data = res.map(brand => ({
    name: brand.name,
    uuid: brand.userId,
  }));

  return data;
}

export async function GetAllInspirationItems(
  category: string
): Promise<QueryIdSchemaType[]> {
  const res = await db.inspoItems.findMany({
    where: {
      category: category,
    },
  });
  res.sort((a, b) => a.index - b.index);
  const data = res.map(inspoItem => ({
    id: inspoItem.itemUuid,
  }));

  return data;
}
