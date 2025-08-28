import { z } from "zod";
import { ErrorSchema } from "../standar-response";

export const VerifyUserExistsResponseSchema = z.union([
  z.object({
    error: z.literal(false),
    exists: z.boolean(),
    userType: z.enum(["client", "brand"]).nullable(),
  }),
  z.object({
    ...ErrorSchema.shape,
  }),
]);
export type VerifyUserExistsResponseSchemaType = z.infer<
  typeof VerifyUserExistsResponseSchema
>;
