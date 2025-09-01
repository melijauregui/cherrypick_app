import { createRoute } from "@hono/zod-openapi";

import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import {
  IsMyItemSchema,
  IsMyItemSchemaType,
  ItemResponseSchema,
  ItemResponseSchemaType,
  UpdateItemBodySchema,
} from "@/schemas/catalog/catalog-schema";
import { QueryIdSchema } from "@/schemas/standar-query-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { GetItem } from "./functions";
import logger from "../logger";
import { GetBrandId } from "../brand/functions";
import { AppEnv } from "../app";
import { UpdateItem } from "./functions";
import {
  checkIfFavorited,
  checkIfLiked,
  toggleFavorite,
  toggleLike,
} from "../catalog/like-favorite";
import {
  CheckLikeFavoriteResponseSchema,
  CheckLikeFavoriteResponseSchemaType,
} from "@/schemas/catalog/like-favorite-schema.ts";

const ItemApp = new OpenAPIHono<AppEnv>({
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

// endpoint que verifica si un item pertenece al usuario autenticado
const isMyItemRoute = createRoute({
  method: "get",
  path: "/{id}/is-mine",
  request: {
    params: QueryIdSchema,
    required: true,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: IsMyItemSchema,
        },
      },
      description: "Verifica si un item pertenece al usuario autenticado",
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
      description: "Item o marca no encontrada",
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

ItemApp.openapi(isMyItemRoute, async c => {
  const { id } = c.req.valid("param");
  const user = c.get("user");
  logger.info("/GET item/is-mine id: %s user: %s", id, user?.email);
  let res: IsMyItemSchemaType | ErrorSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }

  const itemResult = await GetItem(id);
  if (itemResult.error) {
    res = {
      error: true,
      details: itemResult.details,
    };
    return c.json(res, 404);
  }

  const item = itemResult.item;

  // Obtener el brandId del usuario autenticado
  const userBrandId = await GetBrandId(user.email);
  if (!userBrandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 404);
  }

  // Comparar si el brandId del item coincide con el brandId del usuario
  const isMyItem = item.brandId === userBrandId;

  res = {
    error: false,
    isMyItem,
  };

  return c.json(res, 200);
});

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

// endpoint que actualiza un item específico por name y brand
const updateItemRoute = createRoute({
  method: "patch",
  path: "/{id}",
  request: {
    params: QueryIdSchema,
    body: {
      content: {
        "application/json": { schema: UpdateItemBodySchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessSchema,
        },
      },
      description: "Actualiza un item específico por nombre y marca",
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
      description: "Item no encontrado",
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

ItemApp.openapi(updateItemRoute, async c => {
  const { id } = c.req.valid("param");
  const updatedItem = await c.req.valid("json");
  logger.info("/PATCH item/uuid: %s updatedItem: %s", id, updatedItem);
  let res: SuccessSchemaType | ErrorSchemaType;
  const user = c.get("user");
  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }
  const userBrandId = await GetBrandId(user.email);
  if (!userBrandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 404);
  }
  const itemResult = await GetItem(id);
  if (itemResult.error) {
    res = {
      error: true,
      details: "Item no encontrado" + itemResult.details,
    };
    return c.json(res, 404);
  }

  if (userBrandId !== itemResult.item.brandId) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
    };
    return c.json(res, 401);
  }

  const updateItemRes = await UpdateItem(id, updatedItem);
  if (updateItemRes.error) {
    res = {
      error: true,
      details: updateItemRes.details,
    };
    return c.json(res, 404);
  }

  res = {
    error: false,
  };
  return c.json(res, 200);
});

// Endpoint para toggle like
const toggleLikeRoute = createRoute({
  method: "post",
  path: "/{id}/toggle-like",
  request: {
    params: QueryIdSchema,
    required: true,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessSchema,
        },
      },
      description: "Toggle like de un item",
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
      description: "Item no encontrado",
    },
  },
});

ItemApp.openapi(toggleLikeRoute, async c => {
  const { id } = c.req.valid("param");
  const user = c.get("user");
  let res: SuccessSchemaType | ErrorSchemaType;
  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }

  res = await toggleLike(user.email, id);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});

// Endpoint para toggle favorite
const toggleFavoriteRoute = createRoute({
  method: "post",
  path: "/{id}/toggle-favorite",
  request: {
    params: QueryIdSchema,
    required: true,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessSchema,
        },
      },
      description: "Toggle favorite de un item",
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
      description: "Item no encontrado",
    },
  },
});

ItemApp.openapi(toggleFavoriteRoute, async c => {
  const { id } = c.req.valid("param");
  const user = c.get("user");
  let res: SuccessSchemaType | ErrorSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }
  res = await toggleFavorite(user.email, id);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});

// Endpoint para verificar si un item está liked
const checkLikeRoute = createRoute({
  method: "get",
  path: "/{id}/check-like",
  request: {
    params: QueryIdSchema,
    required: true,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CheckLikeFavoriteResponseSchema,
        },
      },
      description: "Verifica si un item está liked",
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
      description: "Item no encontrado",
    },
  },
});

ItemApp.openapi(checkLikeRoute, async c => {
  const { id } = c.req.valid("param");
  const user = c.get("user");
  let res: CheckLikeFavoriteResponseSchemaType | ErrorSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }
  res = await checkIfLiked(user.email, id);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});

// Endpoint para verificar si un item está favorited
const checkFavoriteRoute = createRoute({
  method: "get",
  path: "/{id}/check-favorite",
  request: {
    params: QueryIdSchema,
    required: true,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CheckLikeFavoriteResponseSchema,
        },
      },
      description: "Verifica si un item está favorited",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "No autorizado",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Item no encontrado",
    },
  },
});

ItemApp.openapi(checkFavoriteRoute, async c => {
  const { id } = c.req.valid("param");
  const user = c.get("user");
  let res: CheckLikeFavoriteResponseSchemaType | ErrorSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }
  res = await checkIfFavorited(user.email, id);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});
