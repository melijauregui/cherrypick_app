import { z } from "zod";

const UpdateBrandSchema = z.object({
  email: z.string(),
  description: z.string(),
  url: z.string(),
});
export { UpdateBrandSchema };
export type UpdateBrandSchemaType = z.infer<typeof UpdateBrandSchema>;

const BrandSchema = z.object({
  name: z.string(),
  email: z.string(),
  description: z.string(),
  url: z.string(),
  logo_url: z.string(),
});
export { BrandSchema };
export type BrandSchemaType = z.infer<typeof BrandSchema>;

const QueryDbSchemaBrand = z.tuple([BrandSchema]);
export { QueryDbSchemaBrand };

const BrandSchemaRes = z.union([
  z.object({
    error: z.literal(false),
    brand: BrandSchema,
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { BrandSchemaRes };
export type BrandSchemaResType = z.infer<typeof BrandSchemaRes>;

const QueryGetBrandSchema = z.object({
  email: z.string(),
});
export { QueryGetBrandSchema };

const QueryAllBrandItemsSchema = z.object({
  brandEmail: z.string(),
  filter: z.string().optional(),
  page: z
    .preprocess(val => parseInt(val as string) || 0, z.number().min(0))
    .optional(),
  limit: z
    .preprocess(val => parseInt(val as string) || 10, z.number().min(1))
    .optional(),
});
export { QueryAllBrandItemsSchema };

const AllBrandItemsSchemaRes = z.union([
  z.object({
    error: z.literal(false),
    data: z.array(z.object({ name: z.string() })),
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
