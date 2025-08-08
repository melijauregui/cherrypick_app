import { config } from "../config";
import {
  CatalogItemSchemaType,
  CatalogItemSchema,
  GetItemResponseSchemaType,
} from "../../schemas/catalog/catalog-schema";
import weaviate, { Filters } from "weaviate-client";
import { getCollection } from "./catalogFunctions";
import { AllBrandItemsSchemaResType } from "../../schemas/auth/brand-schema";

//funcion para hacer query a pinecone
async function QueryWeaviateImage(
  queryVector: number[],
  page: number,
  limit: number,
  brand: string | undefined
): Promise<CatalogItemSchemaType[]> {
  try {
    const resCollection = await getCollection();
    if (resCollection.error || !resCollection.collection) {
      throw new Error(resCollection.details);
    }
    const collection = resCollection.collection;

    const filters = brand
      ? Filters.and(
          collection.filter.byProperty("embedding_type").equal("image"),
          collection.filter.byProperty("brand").equal(brand)
        )
      : collection.filter.byProperty("embedding_type").equal("image");

    let offset = page * limit;
    console.log("offset", offset);
    const queryOptions: any = {
      filters: filters,
      limit: limit,
      offset: offset,
      returnProperties: [
        "name",
        "description",
        "image_url",
        "url",
        "brand",
        "price",
        "embedding_type",
      ],
    };
    const result = await collection.query.fetchObjects(queryOptions);

    console.log(
      "topResults en catalogoo",
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
        const validationResult = CatalogItemSchema.safeParse(item);
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

//funcion para hacer query a pinecone
async function QueryWeaviateAllItems(
  brand: string,
  filter?: string,
  page: number = 0,
  limit: number = 10
): Promise<AllBrandItemsSchemaResType> {
  try {
    const resCollection = await getCollection();
    if (resCollection.error || !resCollection.collection) {
      throw new Error(resCollection.details);
    }
    const collection = resCollection.collection;

    let filters = Filters.and(
      collection.filter.byProperty("embedding_type").equal("image"),
      collection.filter.byProperty("brand").equal(brand)
    );

    // Add filter for name search if provided
    if (filter && filter.trim() !== "") {
      filters = Filters.and(
        filters,
        collection.filter.byProperty("name").like(`*${filter}*`)
      );
    }

    const offset = page * limit;
    const queryOptions: any = {
      filters: filters,
      limit: limit,
      offset: offset,
      returnProperties: ["name"],
    };
    const result = await collection.query.fetchObjects(queryOptions);

    console.log(
      "topResults",
      result.objects.map(match => match.properties?.name)
    );

    const topResults: { name: string }[] = result.objects
      .map(match => {
        if (match.properties?.name) {
          return { name: match.properties.name };
        }
        return null;
      })
      .filter((item): item is { name: string } => item !== null);

    return {
      error: false,
      data: topResults,
    };
  } catch (error) {
    console.error("Error querying Weaviate:", error);
    return {
      error: true,
      details: "Error querying Weaviate: " + error,
    };
  }
}
export { QueryWeaviateAllItems };

// Function to query specific item by name and brand in Weaviate
async function QueryWeaviateItem(
  name: string,
  brand: string
): Promise<GetItemResponseSchemaType> {
  try {
    const resCollection = await getCollection();
    if (resCollection.error || !resCollection.collection) {
      return {
        error: true,
        details: resCollection.details || "Error getting collection",
      };
    }
    const collection = resCollection.collection;

    // Filter by name, brand, and image embedding type to get unique item
    const filters = Filters.and(
      collection.filter.byProperty("name").equal(name),
      collection.filter.byProperty("brand").equal(brand),
      collection.filter.byProperty("embedding_type").equal("image")
    );

    const queryOptions: any = {
      filters: filters,
      limit: 1,
      returnProperties: [
        "name",
        "description",
        "image_url",
        "url",
        "brand",
        "price",
      ],
    };

    const result = await collection.query.fetchObjects(queryOptions);

    console.log(
      "QueryWeaviateItem result for",
      name,
      brand,
      "found:",
      result.objects.length
    );

    if (result.objects.length === 0) {
      return {
        error: true,
        details: "Item not found",
      };
    }

    const match = result.objects[0];
    if (!match) {
      return {
        error: true,
        details: "Item not found",
      };
    }
    const item = {
      name: match.properties?.name || "",
      description: match.properties?.description || "",
      image_url: match.properties?.image_url || "",
      url: match.properties?.url || "",
      brand: match.properties?.brand || "",
      price: match.properties?.price || 0,
    };

    // Validate the item using Zod schema
    const validationResult = CatalogItemSchema.safeParse(item);
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
  } catch (error) {
    console.error("Error querying item in Weaviate:", error);
    return {
      error: true,
      details: "Error querying Weaviate: " + error,
    };
  }
}
export { QueryWeaviateItem };
