import { z } from "zod";

const QueryEmailSchema = z.object({
  email: z.string().email().describe("Email del usuario"),
});
export { QueryEmailSchema };

const QueryIdSchema = z.object({
  id: z.string().uuid().describe("ID"),
});
export { QueryIdSchema };
