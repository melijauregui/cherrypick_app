import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "../config";
import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";

// //funcion para llamar a la red neuronal
// async function callVGGNet(imagePath: string): Promise<number[]> {
//   const formData = new FormData();
//   const fs = require("fs");
//   const fileBuffer = fs.readFileSync(imagePath);
//   const fileBlob = new Blob([fileBuffer]);
//   formData.append("file", fileBlob, imagePath);

//   const response = await fetch("http://127.0.0.1:8000/predict/", {
//     method: "POST",
//     body: formData,
//   });

//   const result = await response.json();
//   return result;
// }
// export { callVGGNet };

//funcion para hacer query a pinecone
async function QueryPineconeImage(
  queryVector: number[],
  topK: number
): Promise<CatalogItemSchemaType[]> {
  try {
    const pc = new Pinecone({ apiKey: config.PINECONE_API_KEY });
    const namespace = pc
      .index(config.PINECONE_INDEX_NAME, config.PINECONE_HOST_NAME)
      .namespace(config.PINECONE_NAMESPACE);
    const queryResponse = await namespace.query({
      topK: topK,
      vector: queryVector,
      includeMetadata: true,
      filter: { type: "image" },
    });

    if (
      !queryResponse ||
      !queryResponse.matches ||
      queryResponse.matches.length === 0
    ) {
      console.log("No results found");
      return [];
    }

    const topResults: CatalogItemSchemaType[] = queryResponse.matches
      .map(match => {
        if (
          !match.id ||
          typeof match.score !== "number" ||
          !Array.isArray(match.values)
        ) {
          console.error("Invalid metadata format", match);
          return null;
        }

        return {
          id: match.id,
          name: match.metadata?.name || "",
          description: match.metadata?.description || "",
          image_url: match.metadata?.image_url || "",
          url: match.metadata?.url || "",
          brand: match.metadata?.brand || "",
          price: match.metadata?.price || 0,
        };
      })
      .filter((item): item is CatalogItemSchemaType => item !== null);

    return topResults;
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return [];
  }
}
export { QueryPineconeImage };
