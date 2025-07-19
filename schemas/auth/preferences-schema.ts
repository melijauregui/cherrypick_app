import { z } from "zod";
const CreateAccountSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),
  dateString: z.string({ required_error: "Valid date is required" }),
  preferences: z
    .array(z.string().min(1), {
      required_error: "Preferences are required",
      invalid_type_error: "Preferences must be an array of strings",
    })
    .min(1, {
      message: "At least one preference is required",
    }),
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
    user: z.object({
      username: z.string(),
      email: z.string(),
      dateOfBirth: z.coerce.date().nullable().optional(),
      preferences: z.array(z.string()),
    }),
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
