import { config } from "../config";
import {
  CatalogItemSchemaType,
  catalogItemSchema,
} from "../../schemas/catalog/catalog-schema";
import weaviate, { vectorizer } from "weaviate-client";

//funcion para hacer query a pinecone
async function QueryWeaviateImage(
  queryVector: number[],
  page: number,
  limit: number
): Promise<CatalogItemSchemaType[]> {
  try {
    const client = await weaviate.connectToWeaviateCloud(config.WEAVIATE_URL, {
      authCredentials: new weaviate.ApiKey(config.WEAVIATE_API_KEY),
    });

    // Verificar que la conexión esté lista
    if (!client.isReady()) {
      throw new Error("No se pudo conectar a Weaviate");
    }

    let collection;
    try {
      collection = client.collections.get("FashionItem");
    } catch (error) {
      console.log("No results found, weaviate FashionItem is inicilized");
      return [];
    }

    let offset = page * limit;
    console.log("offset", offset);
    const queryOptions: any = {
      filters: client.collections
        .get("FashionItem")
        .filter.byProperty("embedding_type")
        .equal("text"),
      returnProperties: [
        "name",
        "description",
        "image_url",
        "url",
        "brand",
        "price",
        "embedding_type",
      ],
      limit: limit,
      offset: offset,
    };

    const result = await collection.query.nearVector(queryVector, queryOptions);

    console.log(
      "topResults",
      result.objects.map(
        match => match.properties?.name + " " + match.properties?.embedding_type
      )
    );

    const topResults: CatalogItemSchemaType[] = result.objects
      .map(match => {
        const item = {
          name: match.properties?.name || "",
          description: match.properties?.description || "",
          image_url: match.properties?.image_url || "",
          url: match.properties?.url || "",
          brand: match.properties?.brand || "",
          price: match.properties?.price || 0,
        };

        // Validar el item usando Zod schema
        const validationResult = catalogItemSchema.safeParse(item);
        if (!validationResult.success) {
          console.log("Item validation failed:", validationResult.error);
          return null;
        }
        return validationResult.data;
      })
      .filter((item): item is CatalogItemSchemaType => item !== null);

    return topResults;
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return [];
  }
}
export { QueryWeaviateImage };
