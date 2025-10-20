import { z } from "zod";
import { SuccessSchema } from "../standar-response-schema";

export const MinimumPropertiesBrandSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(200, { message: "Description must be less than 200 characters" })
    .describe("Descripción de la marca"),
  url: z
    .string({ required_error: "URL de la marca es requerida" })
    .url({ message: "URL de la marca debe ser una URL válida" })
    .describe("URL de la marca"),
});
export const UpdateBrandSchema = MinimumPropertiesBrandSchema.extend({
  logoId: z.string().describe("ID del logo de la marca"),
});
export type UpdateBrandSchemaType = z.infer<typeof UpdateBrandSchema>;

export const BrandSchema = MinimumPropertiesBrandSchema.extend({
  id: z.string().describe("ID de la marca"),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" })
    .describe("Nombre de la marca"),
  logo: z
    .object({
      url: z
        .string({ required_error: "URL del logo de la marca es requerida" })
        .url({ message: "URL del logo de la marca debe ser una URL válida" }),
      updatedAt: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .describe("Logo de la marca"),
});
export type BrandSchemaType = z.infer<typeof BrandSchema>;

export const BrandSchemaResponse = z.object({
  ...SuccessSchema.shape,
  brand: BrandSchema,
});
export type BrandSchemaResponseType = z.infer<typeof BrandSchemaResponse>;

export const BrandSchemaPropertiesResponse = z.object({
  ...SuccessSchema.shape,
  brand: BrandSchema,
});
export type BrandSchemaPropertiesResponseType = z.infer<
  typeof BrandSchemaPropertiesResponse
>;

// Schema for getting multiple brands by IDs
export const GetBrandsByIdsSchema = z.object({
  ids: z.array(z.string().uuid()).describe("Array de IDs de marcas"),
});
export type GetBrandsByIdsSchemaType = z.infer<typeof GetBrandsByIdsSchema>;

export const BrandsResponseSchema = z.object({
  ...SuccessSchema.shape,
  brands: z.array(BrandSchema),
});
export type BrandsResponseSchemaType = z.infer<typeof BrandsResponseSchema>;
