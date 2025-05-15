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
    .array(z.string(), {
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
