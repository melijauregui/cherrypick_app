import { CatalogResponseSchemaType, ItemSchema, ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import weaviate, { Collection } from "weaviate-client";
import { config } from "../../config";
import logger from "../logger";
import { prisma } from "../db";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";

//funcion para obtener items de PostgreSQL
export async function GetCatalog(
  page: number,
  limit: number,
  brandId: string | undefined,
  filter?: string
): Promise<{ items: ItemSchemaType[]; error: boolean }> {
  try {
    const offset = page * limit;

    // Construir filtros para PostgreSQL
    let whereClause: any = {};

    if (brandId) {
      whereClause.brandId = brandId;
    }

    // Agregar filtro por nombre si se proporciona
    if (filter && filter.trim() !== "") {
      whereClause.name = {
        contains: filter,
        mode: "insensitive", // Búsqueda case-insensitive
      };
    }

    const items = await prisma.item.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      include: {
        files: true, // Incluir información del archivo de imagen
      },
    });

    const topResults: ItemSchemaType[] = items.map(item => ({
      name: item.name,
      description: item.description,
      image: {
        url: item.files.url,
        updatedAt: item.files.updatedAt.toISOString(),
        width: item.files.width ?? undefined,
        height: item.files.height ?? undefined,
      },
      url: item.url,
      brandId: item.brandId,
      price: item.price,
      uuid: item.id,
    }));

    return { items: topResults, error: false };
  } catch (error) {
    console.error("Error querying PostgreSQL:", error);
    return { items: [], error: true };
  }
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
        vectorizers: [
          weaviate.configure.vectors.selfProvided({ name: "image_vector" }),
          weaviate.configure.vectors.selfProvided({ name: "text_vector" }),
        ],
        properties: [
          {
            name: "brandId",
            dataType: weaviate.configure.dataType.TEXT,
          },
          {
            name: "price",
            dataType: weaviate.configure.dataType.NUMBER,
          },
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