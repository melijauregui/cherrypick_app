import { z } from "zod";
import { SuccessSchema } from "../standar-response-schema";

export const VerifyUserExistsResponseSchema = z.object({
  ...SuccessSchema.shape,
  exists: z.boolean(),
});
export type VerifyUserExistsResponseSchemaType = z.infer<
  typeof VerifyUserExistsResponseSchema
>;
