import { OpenAPIHono } from "@hono/zod-openapi";
import { auth } from "../lib/auth";
import FormUserApp from "./formUser/routes";
import UserApp from "./user/routes";
import ClientApp from "./client/routes";
import BrandApp from "./brand/routes";
import FeedApp from "./feed/routes";
import ItemApp from "./item/routes";

export type AppEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const app = new OpenAPIHono<AppEnv>();
export default app;

app.use("*", async (c, next) => {
  console.log("c.req.path", c.req.method, c.req.path);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    if (
      c.req.path.startsWith("/api/auth/") ||
      c.req.path === "/user/verify" ||
      c.req.path === "/brand/form" ||
      c.req.path === "/brand/insert-items2" || //TODO NO DEBERIA ESTAR SOLO PARA ENDPOINTS
      c.req.path.startsWith("/code-verification") ||
      (c.req.path === "/client" && c.req.method === "POST")
    ) {
      return next();
    }
    c.set("user", null);
    c.set("session", null);
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/api/auth/*", c => {
  return auth.handler(c.req.raw);
});

app.route("/code-verification", FormUserApp);
app.route("/user", UserApp);
app.route("/client", ClientApp);
app.route("/brand", BrandApp);
app.route("/feed", FeedApp);
app.route("/item", ItemApp);
