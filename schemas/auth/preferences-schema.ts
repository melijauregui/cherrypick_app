import { z } from "zod";
import { ClientSchema } from "@/schemas/client/client";

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
