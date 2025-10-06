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

export async function SearchPersonalizedItems(
  preferences: string[],
  likesDescriptions: string[]
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

  const meanEmbeddingPreferences =
    preferences.length > 0 ? await getEmbeddingsForTexts(preferences) : [];

  const meanEmbeddingLikes =
    likesDescriptions.length > 0 ? await getEmbeddingsForTexts(likesDescriptions) : [];

  if (preferences.length > 0 && meanEmbeddingPreferences.length === 0) {
    return {
      error: true,
      details: "No valid embeddings for preferences",
    };
  }

  if (likesDescriptions.length > 0 && meanEmbeddingLikes.length === 0) {
    return {
      error: true,
      details: "No valid embeddings for likes descriptions",
    };
  }

  let meanEmbedding: number[] = [];

  if (meanEmbeddingPreferences.length > 0 && meanEmbeddingLikes.length > 0) {
    const weightPref = 0.7;
    const weightLikes = 0.3;
    meanEmbedding = meanEmbeddingPreferences.map(
      (v, i) => v * weightPref + (meanEmbeddingLikes[i] ?? 0) * weightLikes
    );
  } else if (meanEmbeddingPreferences.length > 0) {
    meanEmbedding = meanEmbeddingPreferences;
  } else if (meanEmbeddingLikes.length > 0) {
    meanEmbedding = meanEmbeddingLikes;
  } else {
    return {
      error: true,
      details: "No valid embeddings for preferences or likes descriptions",
    };
  }

  let results = await collection.query.nearVector(meanEmbedding, queryOptions);

  const uniqueResults = results.objects;

  // Map results to ItemSchemaType
  const items: ItemSchemaType[] = uniqueResults
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
      return item !== null;
    });

  return {
    error: false,
    items: items,
  };
}

export async function SearchPersonalizedItems2(
  preferences: string[],
  likesDescriptions: string[]
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

  const meanEmbeddingPreferences =
    preferences.length > 0 ? await getEmbeddingsForTexts(preferences) : [];

  const meanEmbeddingLikes =
    likesDescriptions.length > 0 ? await getEmbeddingsForTexts(likesDescriptions) : [];

  if (preferences.length > 0 && meanEmbeddingPreferences.length === 0) {
    return {
      error: true,
      details: "No valid embeddings for preferences",
    };
  }

  if (likesDescriptions.length > 0 && meanEmbeddingLikes.length === 0) {
    return {
      error: true,
      details: "No valid embeddings for likes descriptions",
    };
  }

  const resultsPref = meanEmbeddingPreferences.length > 0 ? await collection.query.nearVector(meanEmbeddingPreferences, queryOptions) : { objects: [] };
  const likesResults = meanEmbeddingLikes.length > 0
    ? await collection.query.nearVector(meanEmbeddingLikes, queryOptions)
    : { objects: [] };

  let sortedItems: any[] = [];

  if (meanEmbeddingPreferences.length > 0 && meanEmbeddingLikes.length > 0) {
    const weightPref = 0.7;
    const weightLikes = 0.3;

    const combinedMap = new Map<string, { item: any; score: number }>();
    addResults(resultsPref, weightPref, combinedMap);
    addResults(likesResults, weightLikes, combinedMap);

    sortedItems = Array.from(combinedMap.values())
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.item);

  } else if (meanEmbeddingPreferences.length > 0) {
    sortedItems = resultsPref.objects;
  } else if (meanEmbeddingLikes.length > 0) {
    sortedItems = likesResults.objects;
  }

  // Map results to ItemSchemaType
  const items: ItemSchemaType[] = sortedItems
    .map(match => {
      const item = {
        name: match.name || match.properties?.name || "",
        description: match.description || match.properties?.description || "",
        imageUrl: match.imageUrl || match.properties?.imageUrl || "",
        url: match.url || match.properties?.url || "",
        brandId: match.brandId || match.properties?.brandId || "",
        price: match.price || match.properties?.price || 0,
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

function addResults(results: any, weight: number, combinedMap: Map<string, { item: any; score: number }>) {
  results.objects.forEach((obj: any) => {
    const uuid = obj.uuid;
    const distance = obj.metadata?.distance ?? 0;
    const score = (1 - distance) * weight; // convertir distancia a score
    if (!combinedMap.has(uuid)) {
      obj.properties.uuid = uuid; // Asegurarse de que uuid esté en properties
      combinedMap.set(uuid, { item: obj.properties, score });
    } else {
      combinedMap.get(uuid)!.score += score;
    }
  });
}

async function getEmbeddingsForTexts(texts: string[]): Promise<number[]> {

  const embeddingResponses = await Promise.all(
    texts.map(text => extractTextFeatures(text))
  );
  const embeddings = embeddingResponses
    .filter(r => !r.error && Array.isArray(r.features))
    .map(r => r.features);


  const meanEmbedding = computeMeanEmbedding(embeddings);

  return meanEmbedding;
}

function computeMeanEmbedding(vectors: number[][]): number[] {
  if (vectors.length === 0 || !vectors[0]) return [];
  return vectors[0].map((_, i) =>
    vectors.reduce((sum, emb) => sum + (emb?.[i] ?? 0), 0) / vectors.length
  );
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
