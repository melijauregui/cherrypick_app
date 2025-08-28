import { z } from "zod";

const QueryEmailSchema = z.object({
  email: z.string().email(),
});
export { QueryEmailSchema };
