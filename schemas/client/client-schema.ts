import { z } from "zod";
import { ErrorSchema, SuccessSchema } from "../standar-response-schema";

export const UpdateClientSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  dateOfBirth: z
    .string()
    .transform(val => {
      if (val === "" || val === null || val === undefined) {
        return null;
      }
      return new Date(val);
    })
    .nullable(),
  preferences: z
    .array(z.string().min(1), {
      required_error: "Preferences are required",
      invalid_type_error: "Preferences must be an array of strings",
    })
    .min(1, {
      message: "At least one preference is required",
    }),
});

export const ClientSchema = z.object({
  ...UpdateClientSchema.shape,
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),
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
    .min(1, { message: "Name is required" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password must be at least 8 characters long" }),
});
export { ClientFormSchemaSignUp };
