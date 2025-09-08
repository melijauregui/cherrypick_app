import {
  CatalogResponseSchema,
  CatalogResponseSchemaType,
  ItemSchema,
  ItemSchemaType,
  ItemUuidNameResponseSchemaType,
  ItemUuidNameSchema,
  ItemUuidNameSchemaType,
} from "@/schemas/catalog/catalog-schema";
import weaviate, { Collection, Filters, ObjectDataType } from "weaviate-client";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import { config } from "../../config";
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
          logger.warn("Item validation failed:", validationResult.error);
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
): Promise<{ error: boolean; details: string; features: number[] }> {
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
    if (!Array.isArray(result)) {
      const msg =
        typeof (result as any)?.error === "string"
          ? (result as any).error
          : "Non-array features payload";
      return { error: true, details: msg, features: [] };
    }
    return {
      error: false,
      details: "Image features extracted successfully",
      features: result,
    };
  } catch (error) {
    console.error("Error extracting image features:", error);
    return {
      error: true,
      details: "Error extracting image features",
      features: [],
    };
  }
}

export async function extractImageFeaturesFromBase64(
  imageBase64: string
): Promise<{ error: boolean; details: string; features: number[] }> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/extract-image-features/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_base64: imageBase64 }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      const msg =
        typeof (result as any)?.error === "string"
          ? (result as any).error
          : "Non-array features payload";
      return { error: true, details: msg, features: [] };
    }

    return {
      error: false,
      details: "Image features extracted successfully",
      features: result,
    };
  } catch (error) {
    console.error("Error extracting image features from base64:", error);
    return {
      error: true,
      details: "Error extracting image features from base64",
      features: [],
    };
  }
}

// Función para extraer características de texto
export async function extractTextFeatures(
  text: string
): Promise<{ error: boolean; details: string; features: number[] }> {
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
    if (!Array.isArray(result)) {
      const msg =
        typeof result?.error === "string"
          ? result.error
          : "Non-array features payload";
      return { error: true, details: msg, features: [] };
    }
    return {
      error: false,
      details: "Text features extracted successfully",
      features: result,
    };
  } catch (error) {
    logger.error("Error extracting text features: %s", error);
    return {
      error: true,
      details: "Error extracting text features",
      features: [],
    };
  }
}

export async function extractFeatures(
  text: string,
  imageUrl: string
): Promise<{ error: boolean; details: string; features: FeaturesResult }> {
  try {
    const response = await fetch("http://127.0.0.1:8000/extract-features/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, image_url: imageUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();
    return {
      error: false,
      details: "Features extracted successfully",
      features: result,
    };
  } catch (error) {
    logger.error("Error extracting features: %s", error);
    return {
      error: true,
      details: "Error extracting features",
      features: { image_features: [], text_features: [] },
    };
  }
}

export type FeaturesResult = {
  image_features: number[];
  text_features: number[];
};

export type PreferencesSimilaritiesResult = {
  preference: string;
  similarity: number;
};

export async function getPreferencesSimilarities(image_url: string): Promise<{
  error: boolean;
  details: string;
  similarities: PreferencesSimilaritiesResult[];
}> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/similarities-preferences/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences: preferencesRepr, image_url }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();

    return {
      error: false,
      details: "preferences similarities extracted successfully",
      similarities: result.similarities ?? [],
    };
  } catch (error) {
    logger.error("Error extracting preferences similarities: %s", error);
    return {
      error: true,
      details: "Error extracting preferences similarities",
      similarities: [],
    };
  }
}

type TextImageMatchResult = {
  image_url: string;
  similarity: number;
  [key: string]: any;
};

export async function searchText(
  text: string,
  image_urls: string[]
): Promise<{ error: boolean; details: string; results: string[] }> {
  try {
    const response = await fetch("http://127.0.0.1:8000/search-text/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, image_urls }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const result = await response.json();
    console.log("searchText result:", result);
    console.log("searcghText result type:", typeof result);
    return {
      error: false,
      details: "Text search successfull",
      results: result,
    };
  } catch (error) {
    logger.error("Error during text search: %s", error);
    return {
      error: true,
      details: "Error during text search",
      results: [],
    };
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
          /* ...Object.values(Preferences).map(pref => ({
            name: pref.property as string,
            dataType: "number" as ObjectDataType,
          })), */
        ],
        vectorizers: [
          weaviate.configure.vectors.selfProvided({ name: "image_vector" }),
          weaviate.configure.vectors.selfProvided({ name: "text_vector" }),
        ],
      })) as Collection;
    } else {
      collection = client.collections.get("FashionItem") as Collection;
      /* const collectionConfig = await collection.config.get()
      const existingProps = collectionConfig.properties.map((p) => p.name);
      Object.values(Preferences)
        .filter(pref => !existingProps.includes(pref.property))
        .forEach(pref => (
          collection.config.addProperty({ name: pref.property as string, dataType: "number" as ObjectDataType }
          ))); */
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

export const Preferences = {
  Minimalista: {
    name: "Minimalist",
    property: "minimalista",
    searchName: "minimalista",
  },
  Coquette: {
    name: "Coquette",
    property: "coquette",
    searchName: "coquette",
  },
  BohoChic: {
    name: "Boho-Chic",
    property: "bohoChic",
    searchName: "boho chic",
  },
  OldMoney: {
    name: "Old Money",
    property: "oldMoney",
    searchName: "old money",
  },
  Streetwear: {
    name: "Streetwear",
    property: "streetwear",
    searchName: "streetwear",
  },
  Deportivo: {
    name: "Sporty",
    property: "deportivo",
    searchName: "deportivo",
  },
} as const;

export const preferencesRepr: string[] = Object.values(Preferences).map(
  pref => pref.searchName
); // ["minimalista", "boho chic", ...]

export async function GetItemsFromWeaviate(
  uuids: string[],
  limit: number
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
  const resCollection = await getCollection();
  if (resCollection.error) {
    return {
      error: true,
      details: resCollection.details || "Error getting collection",
    };
  }
  const collection = resCollection.collection;

  const filters = collection.filter.byId().containsAny(uuids);

  const queryOptions: any = {
    filters: filters,
    limit: limit,
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

  if (result.objects.length === 0) {
    return {
      error: true,
      details: "Items not found",
    };
  }

  // Crear un mapa para mantener el orden original de los UUIDs
  const uuidOrderMap = new Map();
  uuids.forEach((uuid, index) => {
    uuidOrderMap.set(uuid, index);
  });

  const items = result.objects
    .map(obj => {
      const item = {
        name: obj.properties?.name || "",
        description: obj.properties?.description || "",
        imageUrl: obj.properties?.imageUrl || "",
        url: obj.properties?.url || "",
        brandId: obj.properties?.brandId || "",
        price: obj.properties?.price || 0,
        uuid: obj.uuid || "",
      };
      const validationResult = ItemSchema.safeParse(item);
      if (!validationResult.success) {
        console.log("Item validation failed:", validationResult.error);
        return null;
      }
      return validationResult.data;
    })
    .filter((item): item is ItemSchemaType => item !== null)
    .sort((a, b) => {
      const orderA = uuidOrderMap.get(a.uuid) ?? Number.MAX_SAFE_INTEGER;
      const orderB = uuidOrderMap.get(b.uuid) ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
  return {
    error: false,
    items: items,
  };
}
