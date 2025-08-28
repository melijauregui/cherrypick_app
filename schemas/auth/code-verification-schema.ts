import { z } from "zod";
const FormSchemaCodeVerification = z.object({
  code: z
    .string({
      required_error: "Code must ve string",
    })
    .length(6, { message: "Code must have 6 digits" }),
});
export { FormSchemaCodeVerification };

const queryDbSchemaRegisterInProgress = z.tuple([
  z.object({
    verification_code: z.string({ required_error: "Code must ve string" }),
    verification_code_expiration: z.string({
      required_error: "Code must ve string",
    }),
  }),
]);
export { queryDbSchemaRegisterInProgress };
