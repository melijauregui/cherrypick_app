import {
  catalogJsonItemSchema,
  catalogItemSchema,
  CatalogItemSchemaType,
  CatalogResponseSchemaType,
  CatalogResponseSchemaDeleteType,
  catalogJsonItemSchemaType,
} from "../../schemas/catalog/catalog-schema";
import { config } from "../config";
import {
  BrandSchemaResType,
  QueryDbSchemaBrand,
} from "../../schemas/auth/brand-schema";
import { db } from "../db";
import weaviate, {
  Collection,
  vectorizer,
  generateUuid5,
  Filters,
} from "weaviate-client";

// Función para extraer características de imagen desde URL
async function extractImageFeatures(imageUrl: string): Promise<number[]> {
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
async function extractTextFeatures(text: string): Promise<number[]> {
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
async function getCollection(): Promise<{
  error: boolean;
  details: string;
  collection: Collection | null;
}> {
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
          { name: "brand", dataType: "text" },
          { name: "description", dataType: "text" },
          { name: "price", dataType: "number" },
          { name: "image_url", dataType: "text" },
          { name: "url", dataType: "text" },
          { name: "embedding_type", dataType: "text" },
        ],
        vectorizers: weaviate.configure.vectorizer.none(),
      })) as Collection;
    } else {
      collection = client.collections.get("FashionItem") as Collection;
    }

    return {
      error: false,
      details: "",
      collection: collection,
    };
  } catch (error) {
    console.error("Error getting collection in Weaviate:", error);
    return {
      error: true,
      details: "Error getting collection in Weaviate: " + error,
      collection: null,
    };
  }
}
export { getCollection };

// Función para validar CSV
export async function validateCsvFile(
  file: File,
  collection: Collection,
  brand: string
): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
      catalogItems: CatalogItemSchemaType[];
    }
> {
  try {
    const csvText = await file.text();
    const lines = csvText.trim().split("\n");
    const headers = lines[0]?.split(",");

    if (!headers || headers.length === 0) {
      return {
        error: true,
        details: "Archivo CSV vacío o inválido",
      };
    }

    // Validate headers
    const expectedHeaders = [
      "name",
      "description",
      "price",
      "image_url",
      "url",
    ];
    const isValidHeaders = expectedHeaders.every(header =>
      headers.includes(header)
    );

    if (!isValidHeaders) {
      return {
        error: true,
        details: "Header mal formado o no incluido",
      };
    }

    const invalidRows: number[] = [];
    const duplicateRows: number[] = [];
    const validItems: CatalogItemSchemaType[] = [];

    // Process each row (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]?.trim();
      if (!line) continue; // Skip empty lines

      const values = line.split(",");
      if (values.length !== expectedHeaders.length) {
        invalidRows.push(i + 1);
        continue;
      }

      // Create object from CSV row
      const item: any = {};
      expectedHeaders.forEach((header, index) => {
        item[header] = values[index];
      });

      // Convert price to number
      const price = parseFloat(item.price);
      if (isNaN(price)) {
        invalidRows.push(i + 1);
        continue;
      }
      item.price = price;
      item.brand = brand;

      // Validate item against schema
      try {
        const validatedItem = catalogItemSchema.parse(item);

        // Check if item already exists in Weaviate with same name and brand
        const isDuplicate = await checkDuplicateInWeaviate(
          collection,
          validatedItem.name,
          brand
        );
        if (isDuplicate) {
          duplicateRows.push(i + 1);
          continue;
        }

        validItems.push(validatedItem);
      } catch (error) {
        invalidRows.push(i + 1);
      }
    }

    // Check if there are any invalid rows
    if (invalidRows.length > 0) {
      const rowNumbers = invalidRows.join(",");
      return {
        error: true,
        details: `línea [${rowNumbers}] mal formadas y línea [${duplicateRows}] con items duplicados`,
      };
    }

    // All items are valid
    return {
      error: false,
      catalogItems: validItems,
    };
  } catch (error) {
    return {
      error: true,
      details: "Error interno del servidor al procesar el CSV",
    };
  }
}

// Función para validar items JSON
export async function validateJsonItems(
  items: catalogJsonItemSchemaType[],
  collection: Collection,
  brand: string
): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
      catalogItems: catalogJsonItemSchemaType[];
    }
> {
  try {
    if (!Array.isArray(items) || items.length === 0) {
      return {
        error: true,
        details: "No se han proporcionado items válidos",
      };
    }
    const invalidRows: number[] = [];
    const duplicateRows: number[] = [];
    const validItems: CatalogItemSchemaType[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = { ...items[i], brand };
      try {
        const validatedItem = catalogItemSchema.parse(item);
        // Check if item already exists in Weaviate with same name and brand
        const isDuplicate = await checkDuplicateInWeaviate(
          collection,
          validatedItem.name,
          brand
        );
        if (isDuplicate) {
          duplicateRows.push(i + 1);
          continue;
        }
        validItems.push(validatedItem);
      } catch (error) {
        console.log("error", error);
        invalidRows.push(i + 1);
      }
    }
    if (invalidRows.length > 0 || duplicateRows.length > 0) {
      const rowNumbers = invalidRows.join(",");
      return {
        error: true,
        details: `ítem(s) [${rowNumbers}] mal formados y ítem(s) [${duplicateRows}] duplicados`,
      };
    }
    return {
      error: false,
      catalogItems: validItems,
    };
  } catch (error) {
    return {
      error: true,
      details: "Error interno del servidor al procesar los items JSON",
    };
  }
}

// Cambiado para aceptar items JSON
export async function UpdateCatalog(
  items: catalogJsonItemSchemaType[],
  brand: string
): Promise<CatalogResponseSchemaType> {
  let res: CatalogResponseSchemaType;
  const collectionRes = await getCollection();
  if (collectionRes.error) {
    return {
      error: true,
      details: collectionRes.details,
    };
  }
  const collection = collectionRes.collection;
  if (!collection) {
    return {
      error: true,
      details: "Collection not found",
    };
  }
  const validationResult = await validateJsonItems(items, collection, brand);
  if (validationResult.error) {
    res = validationResult;
    return res;
  }
  const weaviateResult = await insertCatalogItemsToWeaviate(
    validationResult.catalogItems,
    brand,
    collection
  );
  if (weaviateResult.success) {
    res = {
      error: false,
    };
    console.log(
      `Successfully inserted ${weaviateResult.insertedCount} vectors into Weaviate`
    );
  } else {
    res = {
      error: true,
      details: `Error inserting into Weaviate: ${weaviateResult.errors.join(", ")}`,
    };
    console.error("Weaviate insertion errors:", weaviateResult.errors);
  }
  return res;
}

export async function GetBrand(email: string): Promise<BrandSchemaResType> {
  let res: BrandSchemaResType;
  const [result]: any = await db.query("SELECT * FROM brands WHERE email = ?", [
    email,
  ]);

  if (result.length > 0) {
    const parsedRows = QueryDbSchemaBrand.parse(result);
    const { name, description, email, url, logo_url } = parsedRows[0];
    res = {
      error: false,
      brand: {
        name: name,
        description: description,
        email: email,
        url: url,
        logo_url: logo_url,
      },
    };
  } else {
    res = {
      error: true,
      details: "Brand not found",
    };
  }
  return res;
}

export async function VerifyBrand(brand: string): Promise<boolean> {
  const [result]: any = await db.query("SELECT * FROM brands WHERE name = ?", [
    brand,
  ]);
  return result.length > 0;
}

// Función para insertar items del catálogo en Pinecone
export async function insertCatalogItemsToWeaviate(
  catalogItems: catalogJsonItemSchemaType[],
  brand: string,
  collection: Collection
): Promise<{
  success: boolean;
  insertedCount: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let insertedCount = 0;

  try {
    for (const item of catalogItems) {
      try {
        const imageFeatures = await extractImageFeatures(item.image_url);
        const textFeatures = await extractTextFeatures(item.description);

        const itemData = {
          name: item.name,
          description: item.description,
          price: item.price,
          brand: brand,
          image_url: item.image_url,
          url: item.url,
        };

        // Insertar embedding de imagen
        if (imageFeatures) {
          const result = await collection.data.insert({
            properties: {
              ...itemData,
              embedding_type: "image",
            },
            vectors: imageFeatures,
          });
          insertedCount++;
        }

        // Insertar embedding de texto
        if (textFeatures) {
          const result = await collection.data.insert({
            properties: {
              ...itemData,
              embedding_type: "text",
            },
            vectors: textFeatures,
          });
          insertedCount++;
        }
      } catch (error) {
        const errorMsg = `Error processing item ${item.name}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    console.log(
      `Insertion completed. ${insertedCount} vectors inserted, ${errors.length} errors.`
    );

    return {
      success: errors.length === 0,
      insertedCount,
      errors,
    };
  } catch (error) {
    console.error("Error in insertCatalogItemsToWeaviate:", error);
    return {
      success: false,
      insertedCount: 0,
      errors: [`General error: ${error}`],
    };
  }
}

async function checkDuplicateInWeaviate(
  collection: Collection,
  name: string,
  brand: string
): Promise<boolean> {
  const result = await collection.query.fetchObjects({
    filters: Filters.and(
      collection.filter.byProperty("name").equal(name),
      collection.filter.byProperty("brand").equal(brand)
    ),
    limit: 1,
  });

  const exists = result.objects.length > 0;
  console.log("check duplicate in weaviate for", name, brand, "is", exists);

  return exists;
}

export async function DeleteFromCatalog(
  itemsNames: string[],
  brand: string
): Promise<CatalogResponseSchemaDeleteType> {
  let res: CatalogResponseSchemaDeleteType;
  const collectionRes = await getCollection();
  if (collectionRes.error) {
    return {
      error: true,
      details: collectionRes.details,
      numberDeleted: 0,
    };
  }

  const collection = collectionRes.collection;
  if (!collection) {
    return {
      error: true,
      details: "Collection not found",
      numberDeleted: 0,
    };
  }
  const validationResult = await validateItemsToDelete(
    itemsNames,
    collection,
    brand
  );

  if (validationResult.error) {
    res = {
      error: true,
      details: validationResult.details,
      numberDeleted: 0,
    };
    return res;
  }

  res = await deleteCatalogItemsFromWeaviate(itemsNames, collection, brand);

  return res;
}

// Función para validar CSV
export async function validateItemsToDelete(
  itemsNames: string[],
  collection: Collection,
  brand: string
): Promise<
  | {
      error: true;
      details: string;
    }
  | {
      error: false;
    }
> {
  try {
    if (!itemsNames || itemsNames.length === 0) {
      return {
        error: true,
        details: "No se han proporcionado nombres de items",
      };
    }

    const invalidItems: string[] = [];

    for (const itemName of itemsNames) {
      if (!itemName) continue; // Skip empty lines

      // Validate item against schema
      try {
        // Check if item already exists in Weaviate with same name and brand
        const isDuplicate = await checkDuplicateInWeaviate(
          collection,
          itemName,
          brand
        );
        if (!isDuplicate) {
          invalidItems.push(itemName);
        }
      } catch (error) {
        invalidItems.push(itemName);
      }
    }

    // Check if there are any invalid rows
    if (invalidItems.length > 0) {
      const itemNames = invalidItems.join(",");
      return {
        error: true,
        details: `items [${itemNames}] no encontrados`,
      };
    }

    // All items are valid
    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      details: "Error interno del servidor al procesar el CSV",
    };
  }
}

async function deleteCatalogItemsFromWeaviate(
  itemsNames: string[],
  collection: Collection,
  brand: string
): Promise<CatalogResponseSchemaDeleteType> {
  try {
    let numberDeleted = 0;
    const invalidItems: string[] = [];
    for (const itemName of itemsNames) {
      const object_uuid = generateUuid5(
        JSON.stringify({ name: itemName, brand: brand })
      );
      const response = await collection.data.deleteMany(
        Filters.and(
          collection.filter.byProperty("name").equal(itemName),
          collection.filter.byProperty("brand").equal(brand)
        )
      );
      if (response) {
        numberDeleted++;
      } else {
        invalidItems.push(itemName);
      }
    }
    if (invalidItems.length > 0) {
      return {
        error: true,
        details: `items [${invalidItems.join(",")}] no encontrados y ${numberDeleted} eliminados correctamente`,
        numberDeleted: numberDeleted,
      };
    }
    return {
      error: false,
      numberDeleted: numberDeleted,
    };
  } catch (error) {
    return {
      error: true,
      details: `Error deleting from Weaviate: ${error}`,
      numberDeleted: 0,
    };
  }
}
