import { z } from "zod";

const ErrorSchema = z.object({
  error: z.literal(true),
  details: z.string(),
  info: z.string().optional(),
});
export { ErrorSchema };
export type ErrorSchemaType = z.infer<typeof ErrorSchema>;

const ErrorResponseSchema = z.union([
  z.object({
    error: z.literal(false),
  }),
  z.object({
    ...ErrorSchema.shape,
  }),
]);
export { ErrorResponseSchema };
export type ErrorResponseSchemaType = z.infer<typeof ErrorResponseSchema>;
