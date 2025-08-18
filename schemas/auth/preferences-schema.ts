import { z } from "zod";
export const UpdateClientSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  dateString: z.string().nullable(),
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
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
  dateOfBirth: z.coerce.date().nullable(),
  preferences: z.array(z.string().min(1), {
    required_error: "Preferences are required",
    invalid_type_error: "Preferences must be an array of strings",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),
});

export type ClientSchemaType = z.infer<typeof ClientSchema>;

const CreateAccountSchema = z.object({
  ...UpdateClientSchema.shape,
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),
});
export { CreateAccountSchema };

const CreateAccountSchemaRes = z.union([
  z.object({
    error: z.literal(false),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { CreateAccountSchemaRes };
export type CreateAccountSchemaResType = z.infer<typeof CreateAccountSchemaRes>;

const UserSchemaRes = z.union([
  z.object({
    error: z.literal(false),
    user: ClientSchema,
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { UserSchemaRes };
export type UserSchemaResType = z.infer<typeof UserSchemaRes>;

const UserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),
});

export { UserSchema };

const QueryGetUserSchema = z.object({
  email: z.preprocess(val => val?.toString(), z.string()),
});
export { QueryGetUserSchema };
