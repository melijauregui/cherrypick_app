import { z } from "zod";

export const catalogItemSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z.number().positive("El precio debe ser positivo"),
  image_url: z.string().url("Debe ser una URL válida"),
  url: z.string().url("Debe ser una URL válida"),
  brand: z.string().min(1, "La marca es requerida"),
});

// Schema for CSV file upload
export const csvFileUploadSchema = z.object({
  file: z.instanceof(File, { message: "Debe ser un archivo CSV válido" }),
});

// Response schema for catalog update
export const CatalogUpdateResponseSchema = z.union([
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
  z.object({
    error: z.literal(false),
  }),
]);

//array de catalogItemSchema
export const CatalogItemArraySchema = z.array(catalogItemSchema);

export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type CsvFileUpload = z.infer<typeof csvFileUploadSchema>;
export type CatalogItemSchemaType = z.infer<typeof catalogItemSchema>;
export type CatalogUpdateResponseSchemaType = z.infer<
  typeof CatalogUpdateResponseSchema
>;

const PaginationSchemaBrand = z.object({
  page: z.preprocess(val => parseInt(val as string) || 0, z.number().min(0)),
  limit: z.preprocess(val => parseInt(val as string) || 10, z.number().min(1)),
  brand: z.string().min(1, "La marca es requerida"),
});
export { PaginationSchemaBrand };
