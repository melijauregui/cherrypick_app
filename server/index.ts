import { serve } from "@hono/node-server";
import app from "./app";
import { config } from "../config";
const PORT = config.PORT ?? 3000;
const HOSTNAME = config.HOSTNAME ?? "0.0.0.0";

serve({
  fetch: app.fetch,
  port: Number(PORT),
  hostname: HOSTNAME,
});

console.log(`Server running on http://${HOSTNAME}:${PORT}`);
