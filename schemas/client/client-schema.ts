import { z } from "zod";
import { SuccessSchema } from "../standar-response-schema";
import { PasswordSchema } from "../formUser-schema";

export const UpdatePreferencesSchema = z.object({
  preferences: z
    .array(z.string().min(1), {
      required_error: "Preferences are required",
      invalid_type_error: "Preferences must be an array of strings",
    })
    .min(1, {
      message: "At least one preference is required",
    }),
});

export const UpdateClientSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  dateOfBirth: z
    .string()
    .transform(val => {
      if (val === "" || val === null || val === undefined) {
        return null;
      }
      return new Date(val);
    })
    .nullable(),
  preferences: z.array(z.string().min(1), {
    required_error: "Preferences are required",
    invalid_type_error: "Preferences must be an array of strings",
  }),
});

export const ClientSchema = z.object({
  ...UpdateClientSchema.shape,
});

export type ClientSchemaType = z.infer<typeof ClientSchema>;

const ClientSchemaResponse = z.object({
  ...SuccessSchema.shape,
  user: ClientSchema,
});
export { ClientSchemaResponse };
export type ClientSchemaResponseType = z.infer<typeof ClientSchemaResponse>;

const ClientFormSchemaSignUp = z.object({
  name: z
    .string({
      required_error: "Name must ve valid",
    })
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  ...PasswordSchema.shape,
});
export { ClientFormSchemaSignUp };
