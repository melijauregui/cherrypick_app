import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import { AppEnv } from "../app";
import {
  CatalogResponseSchema,
  CatalogResponseSchemaType,
  PaginationSchema,
} from "@/schemas/catalog/catalog-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
} from "@/schemas/standar-response-schema";
import { GetCatalog } from "../catalog/functions";
import logger from "../logger";

const FeedApp = new OpenAPIHono<AppEnv>({
  defaultHook: (result, c) => {
    //https://github.com/honojs/middleware/tree/main/packages/zod-openapi
    if (!result.success) {
      throw result.error; // deja que onError formatee el JSON
    }
  },
});

// Middleware to handle validation errors
FeedApp.onError((err: Error, c: Context) => {
  //https://hono.dev/docs/api/hono#error-handling
  return errorHandler(err, c);
});

export default FeedApp;

const paginatedRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: PaginationSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogResponseSchema,
        },
      },
      description: "Devuelve los datos de la base de datos de forma paginada",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Error querying Weaviate",
    },
  },
});
FeedApp.openapi(paginatedRoute, async c => {
  const { page, limit } = c.req.valid("query");
  logger.info("/GET feed page: %s limit: %s", page, limit);
  let res: CatalogResponseSchemaType | ErrorSchemaType;

  const result = await GetCatalog(page, limit, undefined, undefined);

  if (result.error) {
    res = {
      error: true,
      details: "Error querying Weaviate",
    };
    return c.json(res, 500);
  }
  res = {
    error: false,
    items: result.items,
  };
  return c.json(res, 200);
});
