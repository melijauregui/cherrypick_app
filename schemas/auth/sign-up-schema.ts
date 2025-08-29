import { z } from "zod";

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
