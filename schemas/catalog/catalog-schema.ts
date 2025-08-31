import { z } from "zod";
import { SuccessSchema } from "../standar-response-schema";

export const PropertiesItemSchema = z.object({
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
  imageUrl: z
    .string()
    .min(1, { message: "Image URL is required" })
    .url({ message: "Please enter a valid image URL" }),
});
export type PropertiesItemSchemaType = z.infer<typeof PropertiesItemSchema>;

export const ItemSchemaId = z.object({
  ...PropertiesItemSchema.shape,
  uuid: z.string().uuid({ message: "UUID is required" }),
});
export type ItemSchemaIdType = z.infer<typeof ItemSchemaId>;

export const ItemSchema = z.object({
  ...ItemSchemaId.shape,
  brandId: z.string().uuid({ message: "El id de la marca es requerido" }),
});
export type ItemSchemaType = z.infer<typeof ItemSchema>;

export const CatalogSchemaResponse = z.object({
  ...SuccessSchema.shape,
  items: z.array(ItemSchema),
});
export type CatalogSchemaResponseType = z.infer<typeof CatalogSchemaResponse>;

export const PaginationSchema = z.object({
  page: z.preprocess(val => parseInt(val as string) || 0, z.number().min(0)),
  limit: z.preprocess(val => parseInt(val as string) || 10, z.number().min(1)),
});

//--------------------------------------------

export const CatalogPropertiesSchema = z.object({
  ...PropertiesItemSchema.shape,
  brandId: z.string().min(1, "El id de la marca es requerido"),
});

export type CatalogPropertiesSchemaType = z.infer<
  typeof CatalogPropertiesSchema
>;

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
        uuid: z.string().min(1, "El uuid es requerido"),
      })
    )
    .min(1, "Debe tener al menos un item"),
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

export const CatalogItemArraySchemaQuery = z.object({
  ...SuccessSchema.shape,
  items: z.array(ItemSchema),
});
export type CatalogItemArraySchemaQueryType = z.infer<
  typeof CatalogItemArraySchemaQuery
>;

// Schema for JSON catalog upload
export const jsonCatalogUploadSchema = z.object({
  items: z.array(PropertiesItemSchema).min(1, "Debe tener al menos un item"),
});

export const jsonCatalogUploadSchema2 = z.object({
  items: z.array(PropertiesItemSchema).min(1, "Debe tener al menos un item"),
  brandEmail: z.string().min(1, "La marca es requerida"),
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
    item: ItemSchema,
  }),
]);

export type GetItemQuerySchemaType = z.infer<typeof GetItemQuerySchema>;
export type GetItemResponseSchemaType = z.infer<typeof GetItemResponseSchema>;

export const UpdateItemQuerySchema = z.object({
  uuid: z.string().min(1, "El uuid es requerido"),
});
export const UpdateItemBodySchema = ItemSchema.partial();

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

// Schema for is-my-item query parameters
export const IsMyItemQuerySchema = z.object({
  uuid: z.string().min(1, "El uuid es requerido"),
});

// Response schema for is-my-item
export const IsMyItemSchema = z.union([
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
  z.object({
    error: z.literal(false),
    isMyItem: z.boolean(),
  }),
]);

export type IsMyItemQuerySchemaType = z.infer<typeof IsMyItemQuerySchema>;
export type IsMyItemSchemaType = z.infer<typeof IsMyItemSchema>;
