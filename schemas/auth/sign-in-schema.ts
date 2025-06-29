import { z } from "zod";
import { CreateAccountSchema } from "./preferences-schema";
const queryDbSchemaUser = z.tuple([
  z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    }),
    date_of_birth: z.date({
      required_error: "Date is required",
      invalid_type_error: "Date must be date",
    }),
    preferences: z
      .array(z.string().min(1), {
        required_error: "Preferences are required",
        invalid_type_error: "Preferences must be an array of strings",
      })
      .min(1, {
        message: "At least one preference is required",
      }),
  }),
]);

export { queryDbSchemaUser };

export const VerifyUserResponseSchema = z.union([
  z.object({
    error: z.literal(false),
    userType: z.enum(["client", "brand"]),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export type VerifyUserResponseSchemaType = z.infer<
  typeof VerifyUserResponseSchema
>;
