import {
  catalogItemSchema,
  CatalogItemSchemaType,
  CatalogUpdateResponseSchemaType,
} from "../../schemas/catalog/catalog-schema";
import { config } from "../config";
import {
  BrandSchemaResType,
  QueryDbSchemaBrand,
} from "../../schemas/auth/brand-schema";
import { db } from "../db";
import weaviate, { vectorizer } from "weaviate-client";

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

// Función para validar CSV
export async function validateCsvFile(file: File): Promise<
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
      "brand",
      "image_url",
      "url",
    ];
    const isValidHeaders = expectedHeaders.every(header =>
      headers.includes(header)
    );

    if (!isValidHeaders) {
      return {
        error: true,
        details: "Header mal formado",
      };
    }

    const invalidRows: number[] = [];
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

      // Validate item against schema
      try {
        const validatedItem = catalogItemSchema.parse(item);
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
        details: `línea [${rowNumbers}] mal formadas`,
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

export async function UpdateCatalog(
  file: File
): Promise<CatalogUpdateResponseSchemaType> {
  let res: CatalogUpdateResponseSchemaType;
  const validationResult = await validateCsvFile(file);

  if (validationResult.error) {
    res = validationResult;
    return res;
  }

  const weaviateResult = await insertCatalogItemsToWeaviate(
    validationResult.catalogItems
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

// Función para insertar items del catálogo en Pinecone
export async function insertCatalogItemsToWeaviate(
  catalogItems: CatalogItemSchemaType[]
): Promise<{
  success: boolean;
  insertedCount: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let insertedCount = 0;

  try {
    const client = await weaviate.connectToWeaviateCloud(config.WEAVIATE_URL, {
      authCredentials: new weaviate.ApiKey(config.WEAVIATE_API_KEY),
    });

    // Verificar que la conexión esté lista
    if (!client.isReady()) {
      throw new Error("No se pudo conectar a Weaviate");
    }

    // Obtener o crear la colección
    let collection;
    try {
      collection = client.collections.get("FashionItem");
    } catch (error) {
      // Si la colección no existe, la creamos
      collection = await client.collections.create({
        name: "FashionItem",
        vectorizers: vectorizer.none(),
      });
      console.log("We have a new collection!", collection["name"]);
    }

    for (const item of catalogItems) {
      try {
        const imageFeatures = await extractImageFeatures(item.image_url);
        const textFeatures = await extractTextFeatures(item.description);

        const itemData = {
          name: item.name,
          description: item.description,
          price: item.price,
          brand: item.brand,
          image_url: item.image_url,
          url: item.url,
        };

        console.log("imageFeatures", imageFeatures.length);
        console.log("textFeatures", textFeatures.length);
        // Insertar embedding de imagen
        if (imageFeatures) {
          const result = await collection.data.insert({
            properties: {
              name: item.name,
              description: item.description,
              price: item.price,
              brand: item.brand,
              image_url: item.image_url,
              url: item.url,
              embedding_type: "image",
            },
            vectors: imageFeatures,
          });
          console.log(`Finished importing ${result} objects.`);
          insertedCount++;
        }

        // Insertar embedding de texto
        if (textFeatures) {
          const result = await collection.data.insert({
            properties: {
              name: item.name,
              description: item.description,
              price: item.price,
              brand: item.brand,
              image_url: item.image_url,
              url: item.url,
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
