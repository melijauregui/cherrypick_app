import {
  CatalogResponseSchemaType,
  ItemSchema,
  ItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import logger from "../logger";
import {
  extractImageFeatures,
  extractImageFeaturesFromBase64,
  extractTextFeatures,
  getCollection,
  Preferences,
  searchText,
} from "../catalog/functions";
import { Sorting } from "weaviate-client";
import { EmbbedingResponseSchemaType } from "@/schemas/search/search-schema";

export async function SearchItems(
  page: number,
  limit: number,
  type: "text" | "image",
  embedding: number[],
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

  const queryOptions = {
    limit: limit,
    offset: offset,
    returnProperties: returnProperties,
    targetVector: type === "text" ? "image_vector" : "text_vector", // ToDo: ver si con image_vector funciona mejor en ambos casos
    includeDistance: true,
    includeMatchDistance: true,
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
