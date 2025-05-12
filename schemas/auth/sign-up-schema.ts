import { z } from "zod";
const formSchema = z.object({
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
export { formSchema };

const verifyAvailabilitySchema = z.union([
  z.object({
    error: z.literal(false),
    isAvailable: z.boolean(),
  }),
  z.object({
    error: z.literal(true),
    details: z.string(),
  }),
]);
export { verifyAvailabilitySchema };
export type VerifyAvailabilitySchemaType = z.infer<
  typeof verifyAvailabilitySchema
>;

const queryVerifyAvalabilitySchema = z.object({
  email: z.preprocess((val) => val?.toString(), z.string()),
});
export { queryVerifyAvalabilitySchema };
