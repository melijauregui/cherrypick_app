import { z } from "zod";

// Esquemas para likes y favoritos
export const LikeItemSchema = z.object({
  item_uuid: z.string(),
});

export const FavoriteItemSchema = z.object({
  item_uuid: z.string(),
});

export const LikeFavoriteResponseSchema = z.union([
  z.object({
    error: z.literal(false),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);

export type LikeFavoriteResponseSchemaType = z.infer<
  typeof LikeFavoriteResponseSchema
>;

export const CheckLikeFavoriteResponseSchema = z.union([
  z.object({
    error: z.literal(false),
    isSelected: z.boolean(),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);

export type CheckLikeFavoriteResponseSchemaType = z.infer<
  typeof CheckLikeFavoriteResponseSchema
>;

// export const GetLikedFavoritedItemsResponseSchema = z.union([
//   z.object({
//     error: z.literal(false),
//     items: z.array(z.string()),
//   }),
//   z.object({
//     error: z.literal(true),
//     details: z.string(),
//   }),
// ]);
// export type GetLikedFavoritedItemsResponseSchemaType = z.infer<
//   typeof GetLikedFavoritedItemsResponseSchema
// >;
