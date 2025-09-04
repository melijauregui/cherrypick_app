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
} from "../catalog/functions";

export async function SearchItems(
  page: number,
  limit: number,
  type: "text" | "image" | "image-base64",
  query: string
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
  // Get text embedding from Python server
  const embeddingResponse =
    type === "text"
      ? await extractTextFeatures(query)
      : type === "image"
        ? await extractImageFeatures(query)
        : await extractImageFeaturesFromBase64(query);
  if (embeddingResponse.error || embeddingResponse.features.length === 0) {
    logger.error("Error extracting features: %s", embeddingResponse.details);
    return {
      error: true,
      details: embeddingResponse.details,
    };
  }

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

  // First try: nearVector with text_vector
  const queryOptions = {
    limit: limit,
    offset: offset,
    returnProperties: [
      "name",
      "description",
      "imageUrl",
      "url",
      "brandId",
      "price",
    ],
    targetVector: type === "text" ? ["image_vector"] : ["text_vector"], // Specify which vector space to search
  };

  result = await collection.query.nearVector(
    embeddingResponse.features,
    queryOptions
  );

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
      console.log("item", item?.name);
      return item !== null;
    });

  logger.info(
    "Search completed successfully, returning %s items",
    items.length
  );

  return {
    error: false,
    items: items,
  };
}
