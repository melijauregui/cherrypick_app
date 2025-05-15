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

const VerifyAvailabilitySchema = z.union([
  z.object({
    error: z.literal(false),
    isAvailable: z.boolean(),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { VerifyAvailabilitySchema };
export type VerifyAvailabilitySchemaType = z.infer<
  typeof VerifyAvailabilitySchema
>;

const QueryVerifyAvalabilitySchema = z.object({
  email: z.preprocess((val) => val?.toString(), z.string()),
});
export { QueryVerifyAvalabilitySchema };

const CodeVerificationPostSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});
export { CodeVerificationPostSchema };

const ResCodeVerificationPostSchema = z.union([
  z.object({
    error: z.literal(false),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);

const ErrorResponseSchema = z.object({
  error: z.literal(true),
  details: z.string(),
});

export { ResCodeVerificationPostSchema };
export type ResCodeVerificationPostSchemaType = z.infer<
  typeof ResCodeVerificationPostSchema
>;
export { ErrorResponseSchema };
export type ErrorResponseSchemaType = z.infer<typeof ErrorResponseSchema>;

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

export const VerifyUserResponseSchema = z.union([
  z.object({
    exists: z.boolean(),
    user: z
      .object({
        name: z.string(),
        email: z.string(),
        date_of_birth: z.string().nullable(),
      })
      .optional(),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
const queryDbSchemaUsers = z.array(
  z.object({
    name: z.string(),
    email: z.string(),
    date_of_birth: z.string(),
  })
);
export { queryDbSchemaUsers };

const queryDbSchemaEmail = z.array(
  z.object({
    email: z.string(),
  })
);
export { queryDbSchemaEmail };

export const BodyUserCreationPostSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  date_of_birth: z.string(), // formato: 'YYYY-MM-DD'
});

const VerifyAccountDeletedSchema = z.union([
  z.object({
    error: z.literal(false),
    success: z.boolean(),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { VerifyAccountDeletedSchema };