import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import { AppEnv } from "../app";

const BrandApp = new OpenAPIHono<AppEnv>({
  defaultHook: (result, c) => {
    //https://github.com/honojs/middleware/tree/main/packages/zod-openapi
    if (!result.success) {
      throw result.error; // deja que onError formatee el JSON
    }
  },
});

// Middleware to handle validation errors
BrandApp.onError((err: Error, c: Context) => {
  //https://hono.dev/docs/api/hono#error-handling
  return errorHandler(err, c);
});

export default BrandApp;
