import { z } from "zod";

const ErrorSchema = z.object({
  error: z.literal(true),
  details: z.string(),
  info: z.string().optional(),
});
export { ErrorSchema };
export type ErrorSchemaType = z.infer<typeof ErrorSchema>;

const SuccessSchema = z.object({
  error: z.literal(false),
});
export { SuccessSchema };
export type SuccessSchemaType = z.infer<typeof SuccessSchema>;
