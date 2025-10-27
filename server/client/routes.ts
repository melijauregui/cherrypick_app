import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import logger from "../logger";
import {
  ErrorSchema,
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import {
  ClientSchemaResponse,
  ClientSchemaResponseType,
  UpdateClientSchema,
  UpdatePreferencesSchema,
} from "@/schemas/client/client-schema";
import { AppEnv } from "../app";
import { GetClient, UpdateClient, UpdatePreferences } from "./functions";

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
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "Cliente no encontrado",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

ClientApp.openapi(getClientRoute, async c => {
  const user = c.get("user");
  const userId = user?.id;
  logger.info("/GET CLIENT userId: %s", userId);
  if (!userId) {
    logger.error("No tienes permisos para obtener el cliente");
    const resError: ErrorSchemaType = {
      error: true,
      details: "No tienes permisos para obtener el cliente",
    };
    return c.json(resError, 401);
  }
  const res: ClientSchemaResponseType | ErrorSchemaType =
    await GetClient(userId);
  logger.info("/GET CLIENT response: %s", res);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});

//endpoint que actualiza preferences
const updatePreferencesRoute = createRoute({
  method: "patch",
  path: "/preferences",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdatePreferencesSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Actualiza las preferences del usuario",
      content: {
        "application/json": {
          schema: SuccessSchema,
        },
      },
    },
    401: {
      description: "No tienes permisos para actualizar las preferences",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "Usuario no encontrado",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

ClientApp.openapi(updatePreferencesRoute, async c => {
  const { preferences } = await c.req.valid("json");
  const user = c.get("user");
  const idUser = user?.id;
  if (!idUser) {
    return c.json(
      {
        error: true,
        details: "No tienes permisos para actualizar las preferences",
      },
      401
    );
  }
  const res = await UpdatePreferences(idUser, preferences);
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
          schema: SuccessSchema,
        },
      },
    },
    401: {
      description: "No tienes permisos para actualizar el cliente",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "Cliente no encontrado",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

ClientApp.openapi(updateClientRoute, async c => {
  logger.info("/PUT client");
  const { name, dateOfBirth, preferences } = await c.req.valid("json");
  let res: SuccessSchemaType | ErrorSchemaType;
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
  res = await UpdateClient(email, name, dateOfBirth, preferences);
  if (res.error) {
    return c.json(res, 404);
  }
  res = {
    error: false,
  };
  return c.json(res, 200);
});
