import { z } from "zod";
import { SuccessSchema } from "../standar-response-schema";

const UpdateBrandSchema = z.object({
  description: z.string().describe("Descripción de la marca"),
  url: z.string().url().describe("URL de la marca"),
});
export { UpdateBrandSchema };
export type UpdateBrandSchemaType = z.infer<typeof UpdateBrandSchema>;

const BrandSchemaProperties = z.object({
  ...UpdateBrandSchema.shape,
  id: z.string().describe("ID de la marca"),
  name: z.string().describe("Nombre de la marca"),
  logoUrl: z.string().url().describe("URL del logo de la marca"),
});
export { BrandSchemaProperties };
export type BrandSchemaPropertiesType = z.infer<typeof BrandSchemaProperties>;

const BrandSchema = z.object({
  ...BrandSchemaProperties.shape,
  email: z.string().email().describe("Email de la marca"),
});
export { BrandSchema };
export type BrandSchemaType = z.infer<typeof BrandSchema>;

const BrandSchemaResponse = z.object({
  ...SuccessSchema.shape,
  brand: BrandSchema,
});
export { BrandSchemaResponse };
export type BrandSchemaResponseType = z.infer<typeof BrandSchemaResponse>;

const BrandSchemaPropertiesResponse = z.object({
  ...SuccessSchema.shape,
  brand: BrandSchemaProperties,
});
export { BrandSchemaPropertiesResponse };
export type BrandSchemaPropertiesResponseType = z.infer<
  typeof BrandSchemaPropertiesResponse
>;
