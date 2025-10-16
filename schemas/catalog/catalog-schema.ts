import { z } from "zod";
import { SuccessSchema } from "../standar-response-schema";
import { QueryIdSchema } from "../standar-query-schema";
import { EmbbedingSchema } from "../search/search-schema";

export const MinimumPropertiesItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required" })
    .refine(val => /[a-zA-Z0-9]/.test(val), {
      message: "Product name must contain at least one letter or number",
    }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.preprocess(
    val => {
      if (typeof val === "string") {
        const normalized = val.replace(",", ".").trim();
        const num = Number(normalized);
        return isNaN(num) ? undefined : num;
      }
      return val;
    },
    z
      .number({
        required_error: "Price must be a positive number",
        invalid_type_error: "Price must be a positive number",
      })
      .positive({ message: "Price must be a positive number" })
  ),
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url({ message: "Please enter a valid URL" }),
});
export type MinimumPropertiesItemSchemaType = z.infer<
  typeof MinimumPropertiesItemSchema
>;

export const CreateItemSchema = MinimumPropertiesItemSchema.extend({
  imageId: z.string().uuid({ message: "UUID is required" }),
  uuid: z.string().uuid({ message: "UUID is required" }).optional(),
});
export type CreateItemSchemaType = z.infer<typeof CreateItemSchema>;

export const ItemSchema = MinimumPropertiesItemSchema.extend({
  image: z.object({
    url: z.string().url({ message: "Please enter a valid URL" }),
    updatedAt: z.string(),
  }),
  brandId: z.string().uuid({ message: "El id de la marca es requerido" }),
  uuid: z.string().uuid({ message: "UUID is required" }),
});
export type ItemSchemaType = z.infer<typeof ItemSchema>;

export const ItemResponseSchema = z.object({
  ...SuccessSchema.shape,
  item: ItemSchema,
});
export type ItemResponseSchemaType = z.infer<typeof ItemResponseSchema>;

export const CatalogResponseSchema = z.object({
  ...SuccessSchema.shape,
  items: z.array(ItemSchema),
});
export type CatalogResponseSchemaType = z.infer<typeof CatalogResponseSchema>;

export const PaginationSchema = z.object({
  page: z.preprocess(val => parseInt(val as string) || 0, z.number().min(0)),
  limit: z.preprocess(val => parseInt(val as string) || 10, z.number().min(1)),
});

export const ImageBase64Schema = z.object({
  ...PaginationSchema.shape,
  imageBase64: z.string().min(1, "La imagen es requerida"),
});
export const ImageUrlSchema = z.object({
  ...EmbbedingSchema.shape,
  imageUrl: z.string().min(1, "La imagen es requerida"),
});

export const PaginationFilterSchema = z.object({
  ...PaginationSchema.shape,
  filter: z.string().optional(),
});

export const UuidItemsSchema = z.object({
  items: z.array(QueryIdSchema).min(1, "Debe tener al menos un item"),
});

export const DeleteItemsResponseSchema = z.object({
  ...SuccessSchema.shape,
  numberDeleted: z.number().min(0),
});
export type DeleteItemsResponseSchemaType = z.infer<
  typeof DeleteItemsResponseSchema
>;

export const UuidNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required" })
    .refine(val => /[a-zA-Z0-9]/.test(val), {
      message: "Product name must contain at least one letter or number",
    }),
  uuid: z.string().uuid({ message: "UUID is required" }),
});
export type UuidNameSchemaType = z.infer<typeof UuidNameSchema>;

export const UuidNameResponseSchema = z.object({
  ...SuccessSchema.shape,
  data: z.array(UuidNameSchema),
});
export type UuidNameResponseSchemaType = z.infer<typeof UuidNameResponseSchema>;

export const IsMyItemSchema = z.object({
  ...SuccessSchema.shape,
  isMyItem: z.boolean(),
});

export type IsMyItemSchemaType = z.infer<typeof IsMyItemSchema>;

export const UpdateItemBodySchema = CreateItemSchema.partial();
export type UpdateItemBodySchemaType = z.infer<typeof UpdateItemBodySchema>;

// Schema for JSON catalog upload
export const jsonCatalogUploadSchema = z.object({
  items: z.array(CreateItemSchema).min(1, "Debe tener al menos un item"),
});

export const jsonCatalogUploadSchema2 = z.object({
  items: z
    .array(
      CreateItemSchema.extend({
        uuid: z.string().uuid({ message: "UUID is required" }),
      })
    )
    .min(1, "Debe tener al menos un item"),
  brandEmail: z.string().min(1, "La marca es requerida"),
});

export const UploadItemImageSchema = z.object({
  contentType: z.string().min(1, "El contentType es requerido"),
});
export type UploadItemImageSchemaType = z.infer<typeof UploadItemImageSchema>;

export const UploadItemImageResponseSchema = z.object({
  ...SuccessSchema.shape,
  id: z.string().uuid({ message: "UUID is required" }),
  uploadUrl: z.string().min(1, "El uploadUrl es requerido"),
});
export type UploadItemImageResponseSchemaType = z.infer<
  typeof UploadItemImageResponseSchema
>;
