import { z } from "zod";
import { PaginationSchema } from "../catalog/catalog-schema";
import { SuccessSchema } from "../standar-response-schema";

export const EmbbedingSchema = z.object({
  embedding: z
    .array(z.number())
    .length(768, { message: "Embedding must be 768 numbers" }),
});

export const QuerySchema = z.object({
  query: z.string().trim().min(1, { message: "Search query is required" }),
});

export const EmbbedingResponseSchema = z.object({
  ...SuccessSchema.shape,
  embedding: z
    .array(z.number())
    .length(768, { message: "Embedding must be 768 numbers" }),
});
export type EmbbedingResponseSchemaType = z.infer<
  typeof EmbbedingResponseSchema
>;
