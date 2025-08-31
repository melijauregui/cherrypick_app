import { ItemSchema, ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { getCollection } from "../app/catalogFunctions";
import logger from "../logger";

//funcion para hacer query a pinecone
export async function GetCatalog(
  queryVector: number[],
  page: number,
  limit: number,
  brandId: string | undefined
): Promise<{ items: ItemSchemaType[]; error: boolean }> {
  try {
    const resCollection = await getCollection();
    if (resCollection.error || !resCollection.collection) {
      throw new Error(resCollection.details);
    }
    const collection = resCollection.collection;

    const filters = collection.filter.byProperty("brandId").equal(brandId);

    let offset = page * limit;
    const queryOptions: any = {
      filters: brandId ? filters : undefined,
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
    };
    const result = await collection.query.fetchObjects(queryOptions);
    const topResults: ItemSchemaType[] = result.objects
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

        // Validar el item usando Zod schema
        const validationResult = ItemSchema.safeParse(item);
        if (!validationResult.success) {
          console.log("Item validation failed:", validationResult.error);
          return null;
        }
        return validationResult.data;
      })
      .filter((item): item is ItemSchemaType => item !== null);

    return { items: topResults, error: false };
  } catch (error) {
    console.error("Error querying Weaviate:", error);
    return { items: [], error: true };
  }
}
