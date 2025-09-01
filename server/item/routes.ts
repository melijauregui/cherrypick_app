import { createRoute } from "@hono/zod-openapi";

import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import {
  ItemResponseSchema,
  ItemResponseSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { QueryIdSchema } from "@/schemas/standar-query-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
} from "@/schemas/standar-response-schema";
import { GetItem } from "./functions";
import logger from "../logger";

const ItemApp = new OpenAPIHono({
  defaultHook: (result, c) => {
    //https://github.com/honojs/middleware/tree/main/packages/zod-openapi
    if (!result.success) {
      throw result.error; // deja que onError formatee el JSON
    }
  },
});

// Middleware to handle validation errors
ItemApp.onError((err: Error, c: Context) => {
  //https://hono.dev/docs/api/hono#error-handling
  return errorHandler(err, c);
});

export default ItemApp;

// endpoint que busca un item específico por name y brand
const getItemRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: QueryIdSchema,
    required: true,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ItemResponseSchema,
        },
      },
      description: "Devuelve un item específico por nombre y marca",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Error interno del servidor",
    },
  },
});

ItemApp.openapi(getItemRoute, async c => {
  const { id } = c.req.valid("param");
  logger.info("/GET item/uuid: %s", id);
  let res: ItemResponseSchemaType | ErrorSchemaType;

  res = await GetItem(id);
  if (res.error) {
    return c.json(res, 500);
  }

  logger.info("/GET item/uuid: %s response: %s", res.item.uuid, res);

  return c.json(res, 200);
});
