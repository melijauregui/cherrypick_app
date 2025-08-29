import { z } from "zod";
import { SuccessSchema } from "./standar-response-schema";

const QueryVerifyCodeSchema = z.object({
  code: z.string(),
  email: z.string().email(),
});
export { QueryVerifyCodeSchema };

const VerifyCodeResponseSchema = z.object({
  ...SuccessSchema.shape,
  isCorrect: z.boolean(),
});
export { VerifyCodeResponseSchema };
export type VerifyCodeResponseSchemaType = z.infer<
  typeof VerifyCodeResponseSchema
>;
