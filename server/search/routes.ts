import { createRoute } from "@hono/zod-openapi";
import { AppEnv } from "../app";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import {
  EmbbedingResponseSchema,
  EmbbedingResponseSchemaType,
  EmbbedingSchema,
  QuerySchema,
} from "@/schemas/search/search-schema";
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
import { GetEmbedding, SearchItems } from "./functions";
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
  method: "post",
  path: "/text",
  request: {
    query: PaginationSchema,
    body: {
      content: {
        "application/json": {
          schema: EmbbedingSchema,
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

SearchApp.openapi(textSearchRoute, async c => {
  const { embedding } = await c.req.json();
  const { page, limit } = c.req.valid("query");
  logger.info("GET /search/text - query: %s, page: %s, limit: %s", page, limit);

  const result = await SearchItems(page, limit, "text", embedding);

  if (result.error) {
    return c.json(result, 500);
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
  const { imageUrl, embedding } = await c.req.json();
  const { page, limit } = c.req.valid("query");
  logger.info(
    "POST /search/image - query: %s, page: %s, limit: %s",
    imageUrl,
    page,
    limit
  );

  const result = await SearchItems(page, limit, "image", embedding, imageUrl);

  if (result.error) {
    return c.json(result, 500);
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
          schema: EmbbedingSchema,
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
  const { embedding } = await c.req.json();
  const { page, limit } = c.req.valid("query");
  logger.info("POST /search/image-base64 - page: %s, limit: %s", page, limit);

  const result = await SearchItems(page, limit, "image", embedding);

  if (result.error) {
    return c.json(result, 500);
  }

  const successResponse: CatalogResponseSchemaType = {
    error: false,
    items: result.items,
  };

  return c.json(successResponse, 200);
});

// Text get embedding endpoint
const textEmbeddingRoute = createRoute({
  method: "post",
  path: "/embedding/text",
  request: {
    body: {
      content: {
        "application/json": {
          schema: QuerySchema,
          required: true,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: EmbbedingResponseSchema,
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

SearchApp.openapi(textEmbeddingRoute, async c => {
  const { query } = await c.req.json();
  logger.info("POST /search/embedding/text - query: %s", query);

  const result = await GetEmbedding("text", query);

  if (result.error) {
    return c.json(result, 500);
  }

  const successResponse: EmbbedingResponseSchemaType = {
    error: false,
    embedding: result.embedding,
  };

  return c.json(successResponse, 200);
});

// Image base64 get embedding endpoint
const imageBase64EmbeddingRoute = createRoute({
  method: "post",
  path: "/embedding/image",
  request: {
    body: {
      content: {
        "application/json": {
          schema: QuerySchema,
          required: true,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: EmbbedingResponseSchema,
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

SearchApp.openapi(imageBase64EmbeddingRoute, async c => {
  const { query } = await c.req.json();
  logger.info("POST /search/embedding/image");

  const result = await GetEmbedding("image", query);

  if (result.error) {
    return c.json(result, 500);
  }

  const successResponse: EmbbedingResponseSchemaType = {
    error: false,
    embedding: result.embedding,
  };

  return c.json(successResponse, 200);
});
