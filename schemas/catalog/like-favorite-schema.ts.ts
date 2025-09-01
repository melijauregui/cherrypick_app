import { z } from "zod";

export const CheckLikeFavoriteResponseSchema = z.object({
  error: z.literal(false),
  isSelected: z.boolean(),
});

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
