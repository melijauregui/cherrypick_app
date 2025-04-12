import { z } from '@hono/zod-openapi'
import { Pinecone, RecordMetadata, QueryResponse } from "@pinecone-database/pinecone";
import fs from "fs";


// Esquema para validar los parámetros de paginación (query string)
const PaginationSchema = z.object({
  page: z.preprocess((val) => parseInt(val as string) || 1, z.number().min(1)),
  limit: z.preprocess((val) => parseInt(val as string) || 10, z.number().min(1)),
})
export { PaginationSchema }
  
// Esquema para la respuesta paginada
const PaginatedResponseSchema = z.object({
  data: z.array(z.string()),
  page: z.number(),
  limit: z.number(),
  total: z.number(),
})
export { PaginatedResponseSchema }
  
  
// await function getPaginatedData(page: number, limit: number): Promise<{ data: string[], page: number, limit: number, total: number }> {
//     const data = await getClothingItems()
//     const start = (page - 1) * limit
//     const end = start + limit
//     return {
//       data: data.slice(start, end),
//       page,
//       limit,
//       total: data.length,
//     }
//   }

interface PaginatedPineconeResponse {
  data: any[];  // Aquí puedes tipar según la forma de tus metadatos o resultados
  page: number;
  limit: number;
  total: number;
}

async function queryPineconePaginated(page: number, limit: number): Promise<PaginatedPineconeResponse> {
  // Obtenemos el total de vectores del índice
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY?.toString() || "",
    });
    const index = pc.Index(process.env.PINECONE_INDEX_NAME?.toString() || "");
    const indexInfo = await index.describeIndexStats();
    const total = indexInfo?.totalRecordCount || 0;

    const offset = (page - 1) * limit;
    console.log(`Simulando offset: ${offset}`);

    const dummyVector = new Array(512).fill(0);

    // Realizamos la consulta a Pinecone con topK igual a "limit".
    // Esto retornará los vectores más similares al dummyVector.
    const queryResponse: QueryResponse = await index.query({
        vector: dummyVector,
        topK: limit,
        includeMetadata: true,
    });

    const data = queryResponse.matches || [];

    return {
        data,
        page,
        limit,
        total,
    };
}

// Ejemplo de uso:
(async () => {
  try {
    const page = 2;
    const limit = 10;
    const result = await queryPineconePaginated(page, limit);
    console.log("Resultados paginados desde Pinecone:", result);
  } catch (error) {
    console.error("Error en la consulta a Pinecone:", error);
  }
})();
