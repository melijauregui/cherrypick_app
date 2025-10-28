import { serve } from "@hono/node-server";
import app from "./app";
import { config } from "../config";
const PORT = process.env.PORT || config.PORT || 3000; // 👈 toma el puerto de Railway si existe
const HOSTNAME = "0.0.0.0";

serve({
  fetch: app.fetch,
  port: Number(PORT),
  hostname: HOSTNAME,
});

console.log(`Server running on http://${HOSTNAME}:${PORT}`);
