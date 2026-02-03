import { z } from "zod";
import { SuccessSchema } from "./standar-response-schema";

const QueryVerifyCodeSchema = z.object({
  code: z.string(),
});
export { QueryVerifyCodeSchema };

const QueryVerifyCodeResetPasswordSchema = z.object({
  code: z.string(),
  email: z.string(),
});
export { QueryVerifyCodeResetPasswordSchema };

const VerifyCodeResponseSchema = z.object({
  ...SuccessSchema.shape,
  isCorrect: z.boolean(),
});
export { VerifyCodeResponseSchema };
export type VerifyCodeResponseSchemaType = z.infer<
  typeof VerifyCodeResponseSchema
>;

const VerifyCodeResponseSchemaResetPassword = z.object({
  ...SuccessSchema.shape,
  isCorrect: z.boolean(),
  token: z.string(),
});
export { VerifyCodeResponseSchemaResetPassword };
export type VerifyCodeResponseSchemaTypeResetPassword = z.infer<
  typeof VerifyCodeResponseSchemaResetPassword
>;

const FormSchemaCodeVerification = z.object({
  code: z
    .string({
      error: "Code must ve string",
    })
    .length(6, { message: "Code must have 6 digits" }),
});
export { FormSchemaCodeVerification };

export const ExpirationCodeResponseSchema = z.object({
  ...SuccessSchema.shape,
  expirationTime: z.date(),
});
export type ExpirationCodeResponseSchemaType = z.infer<
  typeof ExpirationCodeResponseSchema
>;

export const PasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;

export const VerifyCodeSchema = z.object({
  token: z.string(),
  id: z.string(),
  userId: z.string(),
  verificationCode: z.string(),
  verificationCodeExpiration: z.string(),
});
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;
