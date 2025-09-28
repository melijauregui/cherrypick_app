import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import { VerifyUserExists } from "./functions";
import { BodyUserVerificationPostSchema } from "@/schemas/auth/sign-up-schema";
import {
  VerifyUserExistsResponseSchema,
  VerifyUserExistsResponseSchemaType,
} from "@/schemas/user/user-schema";
import { DeleteUser } from "./functions";
import { AppEnv } from "../app";
import {
  ErrorSchema,
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import logger from "../logger";
import {
  CatalogResponseSchema,
  CatalogResponseSchemaType,
  PaginationSchema,
} from "@/schemas/catalog/catalog-schema";
import { getAllLikedFavoritedItems } from "../catalog/like-favorite";

const UserApp = new OpenAPIHono<AppEnv>({
  defaultHook: (result, c) => {
    //https://github.com/honojs/middleware/tree/main/packages/zod-openapi
    if (!result.success) {
      throw result.error; // deja que onError formatee el JSON
    }
  },
});

// Middleware to handle validation errors
UserApp.onError((err: Error, c: Context) => {
  //https://hono.dev/docs/api/hono#error-handling
  return errorHandler(err, c);
});

export default UserApp;

// endpoint que verifica si el usuario existe en la base de datos
const verifyUserRoute = createRoute({
  method: "post",
  path: "/verify",
  request: {
    body: {
      content: {
        "application/json": { schema: BodyUserVerificationPostSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: VerifyUserExistsResponseSchema,
        },
      },
      description: "Devuelve si el usuario existe o no",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Email no válido",
    },
  },
});
UserApp.openapi(verifyUserRoute, async c => {
  const { email } = c.req.valid("json");
  console.log("POST user/verify - Validated email:", email);
  let res: VerifyUserExistsResponseSchemaType | ErrorSchemaType;

  // Buscar primero en users
  const { exists } = await VerifyUserExists(email);
  console.log("exists????", exists);
  res = {
    error: false,
    exists: exists,
  };

  return c.json(res, 200);
});

// endpoint que elimina un usuario de la base de datos
const deleteAccountRoute = createRoute({
  method: "delete",
  path: "/",
  responses: {
    200: {
      description: "Elimina la cuenta del usuario",
      content: {
        "application/json": {
          schema: SuccessSchema,
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

UserApp.openapi(deleteAccountRoute, async c => {
  let res: SuccessSchemaType | ErrorSchemaType;
  const user = c.get("user");
  const email = user?.email;
  if (!email) {
    logger.error("No tienes permisos para eliminar la cuenta");
    res = {
      error: true,
      details: "No tienes permisos para eliminar la cuenta",
    };
    return c.json(res, 404);
  }
  await DeleteUser(email);
  res = {
    error: false,
  };
  return c.json(res, 200);
});

// Endpoint para obtener todos los items liked
const getAllLikedItemsRoute = createRoute({
  method: "get",
  path: "/all-liked",
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
      description: "Obtiene todos los items liked del usuario",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Usuario no autenticado",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Usuario no encontrado",
    },
  },
});

UserApp.openapi(getAllLikedItemsRoute, async c => {
  const { page, limit } = c.req.valid("query");
  const user = c.get("user");
  logger.info("GET /user/all-liked page: %s limit: %s", page, limit);
  let res: CatalogResponseSchemaType | ErrorSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }

  res = await getAllLikedFavoritedItems("likes", user.email, page, limit);
  if (res.error) {
    return c.json(res, 404);
  }
  logger.info("GET /user/all-liked result: %s", res.items);
  return c.json(res, 200);
});

// Endpoint para obtener todos los items favorited
const getAllFavoritedItemsRoute = createRoute({
  method: "get",
  path: "/all-favorited",
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
      description: "Obtiene todos los items favorited del usuario",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Usuario no autenticado",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Usuario no encontrado",
    },
  },
});

UserApp.openapi(getAllFavoritedItemsRoute, async c => {
  const { page, limit } = c.req.valid("query");
  const user = c.get("user");
  logger.info("GET /user/all-favorited page: %s limit: %s", page, limit);
  let res: CatalogResponseSchemaType | ErrorSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }

  res = await getAllLikedFavoritedItems("favorites", user.email, page, limit);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});
