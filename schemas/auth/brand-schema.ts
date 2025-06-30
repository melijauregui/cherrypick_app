import { z } from "zod";

const brandSchema = z.object({
  name: z.string(),
  email: z.string(),
  description: z.string(),
  url: z.string(),
  logo_url: z.string(),
});
export { brandSchema };

const QueryDbSchemaBrand = z.tuple([brandSchema]);
export { QueryDbSchemaBrand };

const BrandSchemaRes = z.union([
  z.object({
    error: z.literal(false),
    brand: brandSchema,
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
