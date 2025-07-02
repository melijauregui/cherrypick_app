import { z } from "zod";

export const catalogJsonItemSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z.number().positive("El precio debe ser positivo"),
  image_url: z.string().url("Debe ser una URL válida"),
  url: z.string().url("Debe ser una URL válida"),
});

export type catalogJsonItemSchemaType = z.infer<typeof catalogJsonItemSchema>;

export const catalogItemSchema = z.object({
  ...catalogJsonItemSchema.shape,
  brand: z.string().min(1, "La marca es requerida"),
});

// Schema for CSV file upload
export const csvFileUploadSchema = z.object({
  file: z.instanceof(File, { message: "Debe ser un archivo CSV válido" }),
  brand: z.string().min(1, "La marca es requerida"),
});

export const deleteItemsSchema = z.object({
  itemsNames: z.array(z.string()).min(1, "Debe tener al menos un nombre"),
  brand: z.string().min(1, "La marca es requerida"),
});

// Response schema for catalog update
export const CatalogResponseSchema = z.union([
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
  z.object({
    error: z.literal(false),
  }),
]);

export const CatalogResponseSchemaDelete = z.union([
  z.object({
    error: z.literal(true),
    details: z.string(),
    numberDeleted: z.number().min(0),
  }),
  z.object({
    error: z.literal(false),
    numberDeleted: z.number().min(0),
  }),
]);

export type CatalogResponseSchemaDeleteType = z.infer<
  typeof CatalogResponseSchemaDelete
>;

//array de catalogItemSchema
export const CatalogItemArraySchema = z.array(catalogItemSchema);

export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type CsvFileUpload = z.infer<typeof csvFileUploadSchema>;
export type CatalogItemSchemaType = z.infer<typeof catalogItemSchema>;
export type CatalogResponseSchemaType = z.infer<typeof CatalogResponseSchema>;

const PaginationSchemaBrand = z.object({
  page: z.preprocess(val => parseInt(val as string) || 0, z.number().min(0)),
  limit: z.preprocess(val => parseInt(val as string) || 10, z.number().min(1)),
  brand: z.string().min(1, "La marca es requerida"),
});
export { PaginationSchemaBrand };

// Schema for JSON catalog upload
export const jsonCatalogUploadSchema = z.object({
  items: z.array(catalogJsonItemSchema).min(1, "Debe tener al menos un item"),
  brand: z.string().min(1, "La marca es requerida"),
});
