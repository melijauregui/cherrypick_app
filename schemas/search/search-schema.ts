import { z } from "zod";
import { PaginationSchema } from "../catalog/catalog-schema";
import { SuccessSchema } from "../standar-response-schema";
import { QueryIdSchema } from "../standar-query-schema";

export const EmbbedingSchema = z.object({
  embedding: z
    .array(z.number())
    .length(768, { message: "Embedding must be 768 numbers" }),
});

export const EmbbedingWithFiltersSchema = z.object({
  embedding: z
    .array(z.number())
    .length(768, { message: "Embedding must be 768 numbers" }),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  brandIds: z.array(z.string().uuid()).optional(),
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

export const AllInspirationItemsResponseSchema = z.object({
  ...SuccessSchema.shape,
  items: z.array(QueryIdSchema),
});
