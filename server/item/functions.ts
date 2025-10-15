import {
  ItemResponseSchemaType,
  UpdateItemBodySchemaType,
} from "@/schemas/catalog/catalog-schema";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import {
  extractImageFeatures,
  extractTextFeatures,
  getCollection,
} from "../catalog/functions";
import { EmbbedingResponseSchemaType } from "@/schemas/search/search-schema";
import logger from "../logger";
import { prisma } from "../db";
import { getFileUrl } from "../file-uploader";

// Function to query specific item from PostgreSQL
export async function GetItem(
  uuid: string
): Promise<ItemResponseSchemaType | ErrorSchemaType> {
  const item = await prisma.item.findUnique({
    where: {
      id: uuid,
    },
    include: {
      files: true, // Incluir la imagen del item
    },
  });

  if (!item) {
    logger.error("Item not found with uuid: %s", uuid);
    return {
      error: true,
      details: "Item not found",
    };
  }

  const itemData = {
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
  };

  return {
    error: false,
    item: itemData,
  };
}

export async function UpdateItem(
  uuid: string,
  updatedItem: UpdateItemBodySchemaType
): Promise<SuccessSchemaType | ErrorSchemaType> {
  const collectionResult = await getCollection();
  if (collectionResult.error) {
    return {
      error: true,
      details: "Error getting collection" + collectionResult.details,
    };
  }

  const collection = collectionResult.collection!;

  // Prepare properties to update (only include fields that are provided)
  const propertiesToUpdate: any = {};
  if (updatedItem.name !== undefined)
    propertiesToUpdate.name = updatedItem.name;
  if (updatedItem.description !== undefined)
    propertiesToUpdate.description = updatedItem.description;
  if (updatedItem.price !== undefined)
    propertiesToUpdate.price = updatedItem.price;
  if (updatedItem.imageId !== undefined)
    propertiesToUpdate.imageId = updatedItem.imageId;
  if (updatedItem.url !== undefined) propertiesToUpdate.url = updatedItem.url;

  // Update PostgreSQL table
  await prisma.item.update({
    where: { id: uuid },
    data: propertiesToUpdate,
  });

  const vectorsToUpdate: any = {};
  if (updatedItem.imageId) {
    const image = await getFileUrl(updatedItem.imageId);
    console.log("extracting image features");
    const imageFeatures = await extractImageFeatures(image.url);
    if (imageFeatures.error) {
      return {
        error: true,
        details: imageFeatures.details,
      };
    }
    vectorsToUpdate.image_vector = imageFeatures.features;
  }
  if (updatedItem.description) {
    console.log("extracting text features");
    const textFeatures = await extractTextFeatures(updatedItem.description);
    if (textFeatures.error) {
      return {
        error: true,
        details: textFeatures.details,
      };
    }
    vectorsToUpdate.text_vector = textFeatures.features;
  }

  const updateData: any = {
    id: uuid,
    vectors: vectorsToUpdate,
  };
  await collection.data.update(updateData);

  return {
    error: false,
  };
}

export async function GetEmbeddingItem(
  itemUuid: string
): Promise<EmbbedingResponseSchemaType | ErrorSchemaType> {
  const collectionResult = await getCollection();
  if (collectionResult.error) {
    return {
      error: true,
      details: "Error getting collection" + collectionResult.details,
    };
  }

  const collection = collectionResult.collection!;
  const result = await collection.query.fetchObjects({
    filters: collection.filter.byId().equal(itemUuid),
    limit: 1,
    includeVector: true,
  });
  if (result.objects.length === 0 || !result.objects[0]) {
    logger.error("Item not found with uuid: %s", itemUuid);
    return {
      error: true,
      details: "Item not found",
    };
  }
  const embedding = result.objects[0].vectors?.image_vector as number[];
  return {
    error: false,
    embedding: embedding,
  };
}
