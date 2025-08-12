import { z } from "zod";

export const InsertItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required" })
    .refine(val => /[a-zA-Z0-9]/.test(val), {
      message: "Product name must contain at least one letter or number",
    }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform(val => val.replace(",", "."))
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url({ message: "Please enter a valid URL" }),
  image_url: z
    .string()
    .min(1, { message: "Image URL is required" })
    .url({ message: "Please enter a valid image URL" }),
  uuid: z.string().min(1, { message: "UUID is required" }),
});

export type InsertItemSchemaType = z.infer<typeof InsertItemSchema>;

export const CatalogItemSchema = z.object({
  ...InsertItemSchema.shape,
  brandEmail: z.string().min(1, "El email de la marca es requerido"),
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

// Schema for JSON delete items
export const deleteItemsJsonSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().min(1, "El nombre es requerido"),
      })
    )
    .min(1, "Debe tener al menos un item"),
  brandEmail: z.string().min(1, "El email de la marca es requerido"),
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
export const CatalogItemArraySchema = z.array(CatalogItemSchema);

export type CatalogItem = z.infer<typeof CatalogItemSchema>;
export type CsvFileUpload = z.infer<typeof csvFileUploadSchema>;
export type CatalogItemSchemaType = z.infer<typeof CatalogItemSchema>;
export type CatalogResponseSchemaType = z.infer<typeof CatalogResponseSchema>;

const PaginationSchemaBrand = z.object({
  page: z.preprocess(val => parseInt(val as string) || 0, z.number().min(0)),
  limit: z.preprocess(val => parseInt(val as string) || 10, z.number().min(1)),
  brandEmail: z.string().min(1, "La marca es requerida"),
});
export { PaginationSchemaBrand };

// Schema for JSON catalog upload
export const jsonCatalogUploadSchema = z.object({
  items: z.array(InsertItemSchema).min(1, "Debe tener al menos un item"),
  brandEmail: z.string().min(1, "El email de la marca es requerido"),
});

// Schema for get-item query parameters
export const GetItemQuerySchema = z.object({
  uuid: z.string().min(1, "El uuid es requerido"),
});

// Response schema for get-item
export const GetItemResponseSchema = z.union([
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
  z.object({
    error: z.literal(false),
    item: CatalogItemSchema,
  }),
]);

export type GetItemQuerySchemaType = z.infer<typeof GetItemQuerySchema>;
export type GetItemResponseSchemaType = z.infer<typeof GetItemResponseSchema>;

// Schema for update-item query parameters
export const UpdateItemQuerySchema = z.object({
  uuid: z.string().min(1, "El uuid es requerido"),
});

// Schema for update-item request body
export const UpdateItemBodySchema = InsertItemSchema.partial();

// Response schema for update-item
export const UpdateItemResponseSchema = z.union([
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
  z.object({
    error: z.literal(false),
  }),
]);

export type UpdateItemQuerySchemaType = z.infer<typeof UpdateItemQuerySchema>;
export type UpdateItemBodySchemaType = z.infer<typeof UpdateItemBodySchema>;
export type UpdateItemResponseSchemaType = z.infer<
  typeof UpdateItemResponseSchema
>;
