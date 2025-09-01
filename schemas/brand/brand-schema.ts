import { z } from "zod";
import { SuccessSchema } from "../standar-response-schema";

export const UpdateBrandSchema = z.object({
  description: z.string().describe("Descripción de la marca"),
  url: z
    .string({ required_error: "URL de la marca es requerida" })
    .url({ message: "URL de la marca debe ser una URL válida" })
    .describe("URL de la marca"),
});
export type UpdateBrandSchemaType = z.infer<typeof UpdateBrandSchema>;

export const BrandSchemaProperties = z.object({
  ...UpdateBrandSchema.shape,
  id: z.string().describe("ID de la marca"),
  name: z.string().describe("Nombre de la marca"),
  logoUrl: z
    .string({ required_error: "URL del logo de la marca es requerida" })
    .url({ message: "URL del logo de la marca debe ser una URL válida" })
    .describe("URL del logo de la marca"),
});
export type BrandSchemaPropertiesType = z.infer<typeof BrandSchemaProperties>;

export const BrandSchema = z.object({
  ...BrandSchemaProperties.shape,
  email: z.string().email().describe("Email de la marca"),
});
export type BrandSchemaType = z.infer<typeof BrandSchema>;

export const BrandSchemaResponse = z.object({
  ...SuccessSchema.shape,
  brand: BrandSchema,
});
export type BrandSchemaResponseType = z.infer<typeof BrandSchemaResponse>;

export const BrandSchemaPropertiesResponse = z.object({
  ...SuccessSchema.shape,
  brand: BrandSchemaProperties,
});
export type BrandSchemaPropertiesResponseType = z.infer<
  typeof BrandSchemaPropertiesResponse
>;
