import { z } from "zod";

const QueryDbSchemaBrandUpdate = z.object({
  email: z.string(),
  description: z.string(),
  url: z.string().url(),
});
export { QueryDbSchemaBrandUpdate };
export type QueryDbSchemaBrandUpdateType = z.infer<
  typeof QueryDbSchemaBrandUpdate
>;
