import { z } from "zod";
import { ErrorSchema } from "./standar-response";

const QueryVerifyCodeSchema = z.object({
  code: z.string(),
  email: z.string().email(),
});
export { QueryVerifyCodeSchema };

const VerifyCodeResponseSchema = z.union([
  z.object({
    error: z.literal(false),
    isCorrect: z.boolean(),
  }),
  z.object({
    ...ErrorSchema.shape,
  }),
]);
export { VerifyCodeResponseSchema };
export type VerifyCodeResponseSchemaType = z.infer<
  typeof VerifyCodeResponseSchema
>;
