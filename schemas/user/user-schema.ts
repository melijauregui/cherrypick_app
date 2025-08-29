import { z } from "zod";

export const VerifyUserExistsResponseSchema = z.object({
  error: z.literal(false),
  exists: z.boolean(),
  userType: z.enum(["client", "brand"]).nullable(),
});
export type VerifyUserExistsResponseSchemaType = z.infer<
  typeof VerifyUserExistsResponseSchema
>;
