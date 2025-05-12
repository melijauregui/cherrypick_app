import { z } from "@hono/zod-openapi";
import {
  Pinecone,
  RecordMetadata,
  QueryResponse,
} from "@pinecone-database/pinecone";
import fs from "fs";

// Esquema para validar los parámetros de paginación (query string)
const PaginationSchema = z.object({
  page: z.preprocess((val) => parseInt(val as string) || 1, z.number().min(1)),
  limit: z.preprocess(
    (val) => parseInt(val as string) || 10,
    z.number().min(1)
  ),
});
export { PaginationSchema };

// Esquema para la respuesta paginada
const PaginatedResponseSchema = z.object({
  data: z.array(z.string()),
  page: z.number(),
  limit: z.number(),
  total: z.number(),
});
export { PaginatedResponseSchema };

interface PaginatedPineconeResponse {
  data: any[]; // Aquí puedes tipar según la forma de tus metadatos o resultados
  page: number;
  limit: number;
  total: number;
}

async function queryPineconePaginated(
  page: number,
  limit: number
): Promise<PaginatedPineconeResponse> {
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
