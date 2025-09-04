import { createRoute } from "@hono/zod-openapi";
import { AppEnv } from "../app";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import { QuerySchema } from "@/schemas/search/search-schema";
import {
  CatalogResponseSchema,
  CatalogResponseSchemaType,
  PaginationSchema,
  ImageBase64Schema,
  ImageUrlSchema,
} from "@/schemas/catalog/catalog-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
} from "@/schemas/standar-response-schema";
import { SearchItems } from "./functions";
import logger from "../logger";

const SearchApp = new OpenAPIHono<AppEnv>({
  defaultHook: (result, c) => {
    //https://github.com/honojs/middleware/tree/main/packages/zod-openapi
    if (!result.success) {
      throw result.error; // deja que onError formatee el JSON
    }
  },
});

// Middleware to handle validation errors
SearchApp.onError((err: Error, c: Context) => {
  //https://hono.dev/docs/api/hono#error-handling
  return errorHandler(err, c);
});
export default SearchApp;

// Text search endpoint
const textSearchRoute = createRoute({
  method: "get",
  path: "/text/{query}",
  request: {
    params: QuerySchema,
    query: PaginationSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogResponseSchema,
        },
      },
      description:
        "Devuelve items que coinciden con la búsqueda de texto usando embeddings vectoriales",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Error interno del servidor o en la búsqueda",
    },
  },
});

SearchApp.openapi(textSearchRoute, async c => {
  const { query } = c.req.valid("param");
  const { page, limit } = c.req.valid("query");
  logger.info(
    "GET /search/text - query: %s, page: %s, limit: %s",
    query,
    page,
    limit
  );

  const result = await SearchItems(page, limit, "text", query);

  if (result.error) {
    const errorResponse: ErrorSchemaType = {
      error: true,
      details: result.details || "Error en la búsqueda",
    };
    return c.json(errorResponse, 500);
  }

  const successResponse: CatalogResponseSchemaType = {
    error: false,
    items: result.items,
  };

  return c.json(successResponse, 200);
});

// Image search endpoint
const imageSearchRoute = createRoute({
  method: "post",
  path: "/image/url",
  request: {
    query: PaginationSchema,
    body: {
      content: {
        "application/json": {
          schema: ImageUrlSchema,
          required: true,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogResponseSchema,
        },
      },
      description:
        "Devuelve items que coinciden con la búsqueda de texto usando embeddings vectoriales",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Error interno del servidor o en la búsqueda",
    },
  },
});

SearchApp.openapi(imageSearchRoute, async c => {
  const { imageUrl } = await c.req.json();
  const { page, limit } = c.req.valid("query");
  logger.info(
    "POST /search/image - query: %s, page: %s, limit: %s",
    imageUrl,
    page,
    limit
  );

  const result = await SearchItems(page, limit, "image", imageUrl);

  if (result.error) {
    const errorResponse: ErrorSchemaType = {
      error: true,
      details: result.details || "Error en la búsqueda",
    };
    return c.json(errorResponse, 500);
  }

  const successResponse: CatalogResponseSchemaType = {
    error: false,
    items: result.items,
  };

  return c.json(successResponse, 200);
});

// Image search from base64 endpoint
const imageBase64SearchRoute = createRoute({
  method: "post",
  path: "/image/base64",
  request: {
    query: PaginationSchema,
    body: {
      content: {
        "application/json": {
          schema: ImageBase64Schema,
          required: true,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogResponseSchema,
        },
      },
      description:
        "Devuelve items similares usando embeddings vectoriales de una imagen en base64",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Error interno del servidor o en la búsqueda",
    },
  },
});

SearchApp.openapi(imageBase64SearchRoute, async c => {
  const { imageBase64 } = await c.req.json();
  const { page, limit } = c.req.valid("query");
  logger.info("POST /search/image-base64 - page: %s, limit: %s", page, limit);

  const result = await SearchItems(page, limit, "image-base64", imageBase64);

  if (result.error) {
    const errorResponse: ErrorSchemaType = {
      error: true,
      details: result.details || "Error en la búsqueda",
    };
    return c.json(errorResponse, 500);
  }

  const successResponse: CatalogResponseSchemaType = {
    error: false,
    items: result.items,
  };

  return c.json(successResponse, 200);
});
