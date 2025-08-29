import { z } from "zod";

const QueryEmailSchema = z.object({
  email: z.string().email(),
});
export { QueryEmailSchema };

const QueryIdSchema = z.object({
  id: z.string().uuid().describe("ID de la marca"),
});
export { QueryIdSchema };
