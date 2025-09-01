import {
  ItemSchema,
  ItemSchemaType,
  ItemUuidNameResponseSchemaType,
  ItemUuidNameSchema,
  ItemUuidNameSchemaType,
  PropertiesItemSchema,
  PropertiesItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import weaviate, { Collection, Filters } from "weaviate-client";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import { config } from "../config";

//funcion para hacer query a pinecone
export async function GetCatalog(
  queryVector: number[],
  page: number,
  limit: number,
  brandId: string | undefined
): Promise<{ items: ItemSchemaType[]; error: boolean }> {
  try {
    const resCollection = await getCollection();
    if (resCollection.error) {
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

export async function GetItemsUuidNamesFromBrand(
  brandId: string,
  filter?: string,
  page: number = 0,
  limit: number = 10
): Promise<ItemUuidNameResponseSchemaType | ErrorSchemaType> {
  const resCollection = await getCollection();
  if (resCollection.error) {
    return {
      error: true,
      details: "Error getting collection: " + resCollection.details,
    };
  }
  const collection = resCollection.collection;

  let filters = collection.filter.byProperty("brandId").equal(brandId);

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

  const topResults: ItemUuidNameSchemaType[] = result.objects
    .map(match => {
      const validationResult = ItemUuidNameSchema.safeParse({
        name: match.properties?.name || "",
        uuid: match.uuid || "",
      });
      if (!validationResult.success) {
        console.log("Item validation failed:", validationResult.error);
        return null;
      }
      return validationResult.data;
    })
    .filter((item): item is ItemUuidNameSchemaType => item !== null);

  return {
    error: false,
    items: topResults,
  };
}

// Función para extraer características de imagen desde URL
export async function extractImageFeatures(
  imageUrl: string
): Promise<number[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/extract-image-features/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error extracting image features:", error);
    throw error;
  }
}

// Función para extraer características de texto
export async function extractTextFeatures(text: string): Promise<number[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/extract-text-features/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error extracting text features:", error);
    throw error;
  }
}

// Función para verificar si ya existe un elemento con el mismo nombre y brand en Weaviate
export async function getCollection(): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
      collection: Collection;
    }
> {
  try {
    const client = await weaviate.connectToWeaviateCloud(config.WEAVIATE_URL, {
      authCredentials: new weaviate.ApiKey(config.WEAVIATE_API_KEY),
    });

    // Verificar que la conexión esté lista
    if (!client.isReady()) {
      throw new Error("No se pudo conectar a Weaviate");
    }

    let collection: Collection;
    const exists = await client.collections.exists("FashionItem");
    if (!exists) {
      collection = (await client.collections.create({
        name: "FashionItem",
        properties: [
          { name: "name", dataType: "text" },
          { name: "brandId", dataType: "text" },
          { name: "description", dataType: "text" },
          { name: "price", dataType: "text" },
          { name: "imageUrl", dataType: "text" },
          { name: "url", dataType: "text" },
        ],
        vectorizers: [
          weaviate.configure.vectors.selfProvided({ name: "image_vector" }),
          weaviate.configure.vectors.selfProvided({ name: "text_vector" }),
        ],
      })) as Collection;
    } else {
      collection = client.collections.get("FashionItem") as Collection;
    }

    return {
      error: false,
      collection: collection,
    };
  } catch (error) {
    console.error("Error getting collection in Weaviate:", error);
    return {
      error: true,
      details: "Error getting collection in Weaviate: " + error,
    };
  }
}
