import { z } from "zod";
import { PaginationSchema } from "../catalog/catalog-schema";

export const QuerySchema = z.object({
  query: z.string().trim().min(1, { message: "Search query is required" }),
});

export type QuerySchemaType = z.infer<typeof QuerySchema>;
