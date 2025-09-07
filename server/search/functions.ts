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

export async function SearchItems(
  page: number,
  limit: number,
  type: "text" | "image" | "image-base64",
  query: string
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

  /* const preference = Object.values(Preferences).find(
    pref => pref.name.toLowerCase() === query.toLowerCase() || pref.searchName.toLocaleLowerCase() === query.toLocaleLowerCase()
  );

  if (preference) {
    const sortProperty = preference.property;

    result = await collection.query.fetchObjects({
      limit: limit,
      offset: offset,
      returnProperties: returnProperties,
      sort: new Sorting<string>().byProperty(sortProperty, false), // descending order
    });
  } else { */
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

  const queryOptions = {
    limit: limit,
    offset: offset,
    returnProperties: returnProperties,
    targetVector: type === "text" ? 'image_vector' : 'text_vector', // ToDo: ver si con image_vector funciona mejor en ambos casos
    includeDistance: true,
    includeMatchDistance: true,
  };

  result = await collection.query.nearVector(
    embeddingResponse.features,
    queryOptions
  );
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
      console.log("item", item?.name);
      return item !== null && item.imageUrl !== query;
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
