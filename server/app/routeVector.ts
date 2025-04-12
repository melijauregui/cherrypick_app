import { z } from '@hono/zod-openapi'
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";
import { config } from '../config'


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
export { callVGGNet };

interface Metadata {
  id: string;
  description: string;
  image_url: string;
  url: string;
  type : string;
}

//funcion para hacer query a pinecone
async function queryPinecone(queryVector: number[], topK: number) : Promise<Metadata[]>  {
  try {
    const pc = new Pinecone({ apiKey: config.PINECONE_API_KEY});
    const namespace = pc.index(config.PINECONE_INDEX_NAME, config.PINECONE_HOST_NAME).namespace(config.PINECONE_NAMESPACE);
    const queryResponse  = await namespace.query({
      topK: topK, 
      vector: queryVector,
      includeMetadata: true,
      filter: {type: "image"}
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
        description: match.metadata?.description || "",
        image_url: match.metadata?.image_url || "",
        url: match.metadata?.url || "",
        type: match.metadata?.type || "",
      };
    }).filter((item): item is Metadata => item !== null);
    
    return topResults;

  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return [];
  }
}
export { queryPinecone };

//schema para el parametro del endpoint (image_path)
const ImageParamSchema = z.object({
  image_path: z.string().openapi({
    example: 'jean.webp',
  }),
})
export { ImageParamSchema };

//schema para la respuesta del endpoint (Top 3 Matches)
const TopMatchSchema = z
  .object({
    id: z.string().openapi({
      example: '13.jpg',
    }),
    description: z.string().openapi({
      example: 'A nice pair of jeans',
    }),
    image_url: z.string().openapi({
      example: 'https://example.com/jeans.jpg',
    }),
    url: z.string().openapi({
      example: 'https://example.com/jeans',
    }),
    type: z.string().openapi({
      example: 'image',
    }),
  })
  .openapi('User')

const TopMatchesSchema = z.array(TopMatchSchema).openapi({
  example: [
    {
      id: '13.jpg',
      description: 'A nice pair of jeans',
      image_url: 'https://example.com/jeans.jpg',
      url: 'https://example.com/jeans',
      type: 'image',
    },
  ],
})
export { TopMatchesSchema };
