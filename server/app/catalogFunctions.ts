import {
  catalogItemSchema,
  CatalogItemSchemaType,
} from "../../schemas/catalog/catalog-schema";
import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "../config";

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

// Función para insertar items del catálogo en Pinecone
export async function insertCatalogItemsToPinecone(
  catalogItems: CatalogItemSchemaType[]
): Promise<{
  success: boolean;
  insertedCount: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let insertedCount = 0;

  try {
    const pc = new Pinecone({ apiKey: config.PINECONE_API_KEY });
    const index = pc.index(
      config.PINECONE_INDEX_NAME,
      config.PINECONE_HOST_NAME
    );
    const namespace = index.namespace(config.PINECONE_NAMESPACE);

    for (const item of catalogItems) {
      try {
        const imageFeatures = await extractImageFeatures(item.image_url);
        const textFeatures = await extractTextFeatures(item.description);

        const metadata = {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          brand: item.brand,
          image_url: item.image_url,
          url: item.url,
        };

        // Insertar en Pinecone con características de imagen y texto
        await namespace.upsert([
          {
            id: `${item.id}_${item.brand}_image`,
            values: imageFeatures,
            metadata: {
              ...metadata,
              type: "image",
            },
          },
          {
            id: `${item.id}_${item.brand}_text`,
            values: textFeatures,
            metadata: {
              ...metadata,
              type: "text",
            },
          },
        ]);

        insertedCount += 2;
        console.log(`Successfully inserted ${item.id} into Pinecone`);
      } catch (error) {
        const errorMsg = `Error processing item ${item.id}: ${error}`;
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
    console.error("Error in insertCatalogItemsToPinecone:", error);
    return {
      success: false,
      insertedCount: 0,
      errors: [`General error: ${error}`],
    };
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
      "id",
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
