import { z } from '@hono/zod-openapi'
import { Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import fs from "fs";


//funcion para llamar a la red neuronal
async function callVGGNet(imagePath: string) : Promise<number[]> {
  const formData = new FormData();
  const fs  = require("fs");
  const fileBuffer = fs.readFileSync(imagePath);
  const fileBlob = new Blob([fileBuffer]);
  formData.append("file", fileBlob, imagePath);
  
  const response = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      body: formData,
  });

  const result = await response.json();
  return result;
}

interface Metadata {
  id: string;
  score: number;
  values: number[];
  brand : string;
  type : string;
}

//funcion para hacer query a pinecone
async function queryPinecone(queryVector: number[]) : Promise<Metadata[]>  {
  try {
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY?.toString() || "",
     });

    const index = pc.Index(process.env.PINECONE_INDEX_NAME?.toString() || "");
    const queryResponse  = await index.namespace('example-namespace').query({
      topK: 3, 
      vector: queryVector,
      includeMetadata: true,
    });

    if (!queryResponse || !queryResponse.matches || queryResponse.matches.length === 0) {
      console.log("No results found");
      return [];
    }
    
    const topResults: Metadata[] = queryResponse.matches.map((match) => {
      if (!match.id || typeof match.score !== "number" || !Array.isArray(match.values)) {
        console.error("Invalid metadata format", match);
        return null;
      }
    
      return {
        id: match.id,
        score: match.score,
        values: match.values,
        brand: match.metadata?.brand || "Unknown",
        type: match.metadata?.type || "Unknown",
      };
    }).filter((item): item is Metadata => item !== null);
    
    return topResults;

  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return [];
  }
}

//schema para el parametro del endpoint (image_path)
const ImageParamSchema = z.object({
  image_path: z.string().openapi({
    param: { name: 'image_path', in: 'path' },
    example: 'jean.webp',
  }),
})

//schema para la respuesta del endpoint (Top 3 Matches)
const TopMatchSchema = z
  .object({
    id: z.string().openapi({
      example: '13.jpg',
    }),
    score: z.number().openapi({
      example: 0.98,
    }),
    values: z.array(z.number()).openapi({
      example: [0.1, 0.2, 0.3],
    }),
    brand: z.string().openapi({
      example: 'Levis',
    }),
    type: z.string().openapi({
      example: 'Jeans',
    }),
  })
  .openapi('User')

const TopMatchesSchema = z.array(TopMatchSchema).openapi({
  example: [
    {
      id: '13.jpg',
      score: 0.98,
      values: [0.1, 0.2, 0.3],
      brand: 'Levis',
      type: 'Jeans',
    },
  ],
})


import { createRoute } from '@hono/zod-openapi'

const route = createRoute({
  method: 'get',
  path: '/images/{image_path}',
  request: {
    params: ImageParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TopMatchesSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})


import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.openapi(route, async (c) => {
  const { image_path } = c.req.valid('param')
  const image_path_complete = `./server/images/${image_path}`;
  const queryVector = await callVGGNet(image_path_complete);
  fs.writeFileSync('result.json', JSON.stringify(queryVector));
  const res = await queryPinecone(queryVector);
  return c.json(
    res,
    200 
  )
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})

export default app