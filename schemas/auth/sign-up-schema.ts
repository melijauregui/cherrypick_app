import { z } from "zod";
const FormSchemaSignUp = z.object({
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
  dateString: z.string({ required_error: "Valid date is required" }),
});
export { FormSchemaSignUp };

const CodeVerificationPostSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});
export { CodeVerificationPostSchema };

const BodyCodeVerificationPostSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});
export { BodyCodeVerificationPostSchema };

const BodyUserVerificationPostSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});
export { BodyUserVerificationPostSchema };

const queryDbSchemaEmail = z.array(
  z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    }),
  })
);
export { queryDbSchemaEmail };
