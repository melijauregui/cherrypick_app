import {
  ItemResponseSchemaType,
  ItemSchema,
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

// Function to query specific item by name and brand in Weaviate
export async function GetItem(
  uuid: string
): Promise<ItemResponseSchemaType | ErrorSchemaType> {
  const resCollection = await getCollection();
  if (resCollection.error) {
    return {
      error: true,
      details: resCollection.details || "Error getting collection",
    };
  }
  const collection = resCollection.collection;

  const filters = collection.filter.byId().equal(uuid);

  const queryOptions: any = {
    filters: filters,
    limit: 1,
    returnProperties: [
      "name",
      "description",
      "imageUrl",
      "url",
      "brandId",
      "price",
    ],
  };

  const result = await collection.query.fetchObjects(queryOptions);

  if (result.objects.length === 0 || !result.objects[0]) {
    return {
      error: true,
      details: "Item not found",
    };
  }

  const match = result.objects[0];

  const item = {
    name: match.properties?.name || "",
    description: match.properties?.description || "",
    imageUrl: match.properties?.imageUrl || "",
    url: match.properties?.url || "",
    brandId: match.properties?.brandId || "",
    price: match.properties?.price || 0,
    uuid: match.uuid || "",
  };

  // Validate the item using Zod schema
  const validationResult = ItemSchema.safeParse(item);
  if (!validationResult.success) {
    console.log("Item validation failed:", validationResult.error);
    return {
      error: true,
      details: "Invalid item data",
    };
  }

  return {
    error: false,
    item: validationResult.data,
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
  if (updatedItem.imageUrl !== undefined)
    propertiesToUpdate.image_url = updatedItem.imageUrl;
  if (updatedItem.url !== undefined) propertiesToUpdate.url = updatedItem.url;

  const vectorsToUpdate: any = {};
  if (updatedItem.imageUrl) {
    console.log("extracting image features");
    const imageFeatures = await extractImageFeatures(updatedItem.imageUrl);
    vectorsToUpdate.image_vector = imageFeatures;
  }
  if (updatedItem.description) {
    console.log("extracting text features");
    const textFeatures = await extractTextFeatures(updatedItem.description);
    vectorsToUpdate.text_vector = textFeatures;
  }

  const updateData: any = {
    id: uuid,
    properties: propertiesToUpdate,
    vectors: vectorsToUpdate,
  };
  await collection.data.update(updateData);

  return {
    error: false,
  };
}
