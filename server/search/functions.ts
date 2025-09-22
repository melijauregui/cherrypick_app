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
