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

const FormSchemaCodeVerification = z.object({
  code: z
    .string({
      required_error: "Code must ve string",
    })
    .length(6, { message: "Code must have 6 digits" }),
});
export { FormSchemaCodeVerification };
