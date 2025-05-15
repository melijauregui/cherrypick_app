import { z } from "zod";
const FormSchemaCodeVerification = z.object({
  code: z
    .string({
      required_error: "Code must ve string",
    })
    .length(6, { message: "Code must have 6 digits" }),
});
export { FormSchemaCodeVerification };

const VerifyCodeSchema = z.union([
  z.object({
    error: z.literal(false),
    isCorrect: z.boolean(),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { VerifyCodeSchema };

const QueryVerifyCodeSchema = z.object({
  code: z.preprocess((val) => val?.toString(), z.string()),
  email: z.preprocess((val) => val?.toString(), z.string()),
});
export { QueryVerifyCodeSchema };
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;

const queryDbSchema = z.tuple([
  z.object({
    verification_code: z.string(),
    verification_code_expiration: z.string(),
  }),
]);
export { queryDbSchema };
