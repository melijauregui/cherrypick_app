import { z } from "zod";

const QueryAllBrandItemsSchema = z.object({
  filter: z.string().optional(),
  page: z
    .preprocess(val => parseInt(val as string) || 0, z.number().min(0))
    .optional(),
  limit: z
    .preprocess(val => parseInt(val as string) || 10, z.number().min(1))
    .optional(),
});
export { QueryAllBrandItemsSchema };

const AllBrandNamesItemsSchema = z.object({
  name: z.string(),
  uuid: z.string(),
});
export { AllBrandNamesItemsSchema };
export type AllBrandNamesItemsSchemaType = z.infer<
  typeof AllBrandNamesItemsSchema
>;

const AllBrandItemsSchemaRes = z.union([
  z.object({
    error: z.literal(false),
    data: z.array(AllBrandNamesItemsSchema),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { AllBrandItemsSchemaRes };
export type AllBrandItemsSchemaResType = z.infer<typeof AllBrandItemsSchemaRes>;

const QueryDbSchemaBrandUpdate = z.object({
  email: z.string(),
  description: z.string(),
  url: z.string().url(),
});
export { QueryDbSchemaBrandUpdate };
export type QueryDbSchemaBrandUpdateType = z.infer<
  typeof QueryDbSchemaBrandUpdate
>;
