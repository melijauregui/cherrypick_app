import { z } from "zod";

export const CheckLikeFavoriteResponseSchema = z.object({
  error: z.literal(false),
  isSelected: z.boolean(),
});

export type CheckLikeFavoriteResponseSchemaType = z.infer<
  typeof CheckLikeFavoriteResponseSchema
>;
