import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import logger from "../logger";
import {
  ErrorResponseSchema,
  ErrorResponseSchemaType,
} from "@/schemas/standar-response";
import {
  ClientSchema,
  ClientSchemaResponse,
  ClientSchemaResponseType,
  UpdateClientSchema,
} from "@/schemas/client/client";
import { AppEnv } from "../app";
import { CreateClient, GetClient, UpdateClient } from "./functions";

const ClientApp = new OpenAPIHono<AppEnv>({
  defaultHook: (result, c) => {
    //https://github.com/honojs/middleware/tree/main/packages/zod-openapi
    if (!result.success) {
      throw result.error; // deja que onError formatee el JSON
    }
  },
});

// Middleware to handle validation errors
ClientApp.onError((err: Error, c: Context) => {
  //https://hono.dev/docs/api/hono#error-handling
  return errorHandler(err, c);
});

export default ClientApp;

// endpoint que crea un nuevo usuario en la base de datos
const createUserRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ClientSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Crea un nuevo usuario",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

ClientApp.openapi(createUserRoute, async c => {
  const { name, email, dateOfBirth, preferences } = await c.req.valid("json");
  let res: ErrorResponseSchemaType;
  logger.info("Creating client:", name, email, dateOfBirth, preferences);
  await CreateClient(email, name, dateOfBirth, preferences);
  res = {
    error: false,
  };
  return c.json(res, 200);
});

// endpoint que obtiene la información del cliente
const getClientRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Obtiene la información del usuario",
      content: {
        "application/json": {
          schema: ClientSchemaResponse,
        },
      },
    },
    401: {
      description: "No tienes permisos para obtener el cliente",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

ClientApp.openapi(getClientRoute, async c => {
  const user = c.get("user");
  const email = user?.email;
  if (!email) {
    logger.error("No tienes permisos para obtener el cliente");
    const resError: ErrorResponseSchemaType = {
      error: true,
      details: "No tienes permisos para obtener el cliente",
    };
    return c.json(resError, 401);
  }
  logger.info("Getting client:", email);
  const res: ClientSchemaResponseType = await GetClient(email);
  return c.json(res, 200);
});

// endpoint que actualiza la información del cliente
const updateClientRoute = createRoute({
  method: "put",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateClientSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Actualiza la información del usuario",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: "No tienes permisos para actualizar el cliente",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

ClientApp.openapi(updateClientRoute, async c => {
  logger.info("/PUT client");
  const { name, dateOfBirth, preferences } = await c.req.valid("json");
  let res: ErrorResponseSchemaType;
  const user = c.get("user");
  const email = user?.email;
  if (!email) {
    logger.error("No tienes permisos para actualizar el cliente");
    res = {
      error: true,
      details: "No tienes permisos para actualizar el cliente",
    };
    return c.json(res, 401);
  }
  logger.info("Updating client:", name, email, dateOfBirth, preferences);
  await UpdateClient(email, name, dateOfBirth, preferences);
  res = {
    error: false,
  };
  return c.json(res, 200);
});
