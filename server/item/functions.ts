import {
  ItemResponseSchemaType,
  ItemSchema,
} from "@/schemas/catalog/catalog-schema";
import { getCollection } from "../app/catalogFunctions";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";

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
export { GetItem as QueryWeaviateItem };
