import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import {
  CatalogItemArraySchemaQuery,
  CatalogItemArraySchemaQueryType,
  PaginationSchema,
} from "../schemas/catalog/catalog-schema";
import {
  UpdateCatalog,
  DeleteFromCatalog,
  UpdateItem,
  GetBrandEmail,
} from "./app/catalogFunctions";
import {
  CatalogResponseSchema,
  CatalogResponseSchemaType,
  PaginationSchemaBrand,
  CatalogResponseSchemaDelete,
  CatalogResponseSchemaDeleteType,
  GetItemQuerySchema,
  GetItemResponseSchema,
  GetItemResponseSchemaType,
  UpdateItemQuerySchema,
  UpdateItemBodySchema,
  UpdateItemResponseSchema,
  UpdateItemResponseSchemaType,
  CatalogItemArraySchemaResponse,
  CatalogItemArraySchemaResponseType,
  jsonCatalogUploadSchema2,
  IsMyItemQuerySchema,
  IsMyItemSchema,
  IsMyItemSchemaType,
  PaginationSchemaBrandWithId,
} from "../schemas/catalog/catalog-schema";
import {
  QueryWeaviateImage,
  QueryWeaviateAllItems,
  QueryWeaviateItem,
} from "./app/routeVector";
import {
  QueryAllBrandItemsSchema,
  AllBrandItemsSchemaRes,
  AllBrandItemsSchemaResType,
} from "../schemas/auth/brand-schema";
import {
  jsonCatalogUploadSchema,
  deleteItemsJsonSchema,
} from "../schemas/catalog/catalog-schema";
import { auth } from "../lib/auth";
import {
  LikeItemSchema,
  FavoriteItemSchema,
  LikeFavoriteResponseSchema,
  LikeFavoriteResponseSchemaType,
  CheckLikeFavoriteResponseSchema,
  CheckLikeFavoriteResponseSchemaType,
} from "../schemas/activity/activity";
import {
  toggleLike,
  toggleFavorite,
  checkIfLiked,
  checkIfFavorited,
  getAllLikedFavoritedItems,
} from "./app/allDatabase";
import FormUserApp from "./formUser/routes";
import UserApp from "./user/routes";
import ClientApp from "./client/routes";
import { GetBrandId } from "./brand/functions";
import BrandApp from "./brand/routes";
import logger from "./logger";

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
      c.req.path.startsWith("/code-verification") ||
      (c.req.path === "/client" && c.req.method === "POST") ||
      c.req.path.startsWith("/insert-catalog-brand2") //TODO NO DEBERIA ESTAR SOLO PARA ENDPOINTS
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

// endpoint que devuelve los 10 resultados mas personalizados del usuario WIP
const paginatedRoute = createRoute({
  method: "get",
  path: "/all",
  request: {
    query: PaginationSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogItemArraySchemaQuery,
        },
      },
      description: "Devuelve los datos de la base de datos de forma paginada",
    },
  },
});
app.openapi(paginatedRoute, async c => {
  const { page, limit } = c.req.valid("query");
  const embedding = Array(768).fill(0.5);
  let res: CatalogItemArraySchemaQueryType;

  const items = await QueryWeaviateImage(embedding, page, limit, undefined);

  res = {
    error: false,
    items: items,
  };
  return c.json(res, 200);
});

// endpoint que devuelve los resultados de los items de una marca
const paginatedRouteBrand = createRoute({
  method: "get",
  path: "/all-self-brand",
  request: {
    query: PaginationSchemaBrand,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogItemArraySchemaResponse,
        },
      },
      description: "Devuelve los datos de la base de datos de forma paginada",
    },
  },
});
app.openapi(paginatedRouteBrand, async c => {
  const { page, limit } = c.req.valid("query");
  let res: CatalogItemArraySchemaResponseType;
  const user = c.get("user");
  const brandEmail = user?.email;
  if (!brandEmail) {
    res = {
      error: true,
      details: "No tienes permisos para obtener los items de la marca",
    };
    return c.json(res, 200);
  }

  const brandId = await GetBrandId(brandEmail);

  if (!brandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 200);
  }

  const embedding = Array(768).fill(0.5);

  const items = await QueryWeaviateImage(embedding, page, limit, brandId);

  res = {
    error: false,
    items: items,
  };
  return c.json(res, 200);
});

// endpoint que devuelve los resultados de los items de una marca dado su id
const paginatedRouteBrandWithId = createRoute({
  method: "get",
  path: "/all-brand",
  request: {
    query: PaginationSchemaBrandWithId,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogItemArraySchemaResponse,
        },
      },
      description: "Devuelve los datos de la base de datos de forma paginada",
    },
  },
});
app.openapi(paginatedRouteBrandWithId, async c => {
  const { page, limit, id } = c.req.valid("query");
  let res: CatalogItemArraySchemaResponseType;
  const brandEmail = await GetBrandEmail(id);
  if (!brandEmail) {
    res = {
      error: true,
      details: "No tienes permisos para obtener los items de la marca",
    };
    return c.json(res, 200);
  }
  const embedding = Array(768).fill(0.5);

  const items = await QueryWeaviateImage(embedding, page, limit, id);

  res = {
    error: false,
    items: items,
  };
  return c.json(res, 200);
});

// endpoint que inserta items en el catálogo de una marca con datos JSON
const updateCatalogRoute = createRoute({
  method: "post",
  path: "/insert-catalog-brand",
  request: {
    body: {
      content: {
        "application/json": { schema: jsonCatalogUploadSchema },
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
      description: "Valida y actualiza el catálogo con datos JSON",
    },
  },
});

app.openapi(updateCatalogRoute, async c => {
  const { items } = await c.req.valid("json");

  //verifico que la marca exista en la base de datos
  let res: CatalogResponseSchemaType;

  const user = c.get("user");
  const brandEmail = user?.email;

  if (!brandEmail) {
    res = {
      error: true,
      details: "No tienes permisos para insertar items",
    };
    return c.json(res, 200);
  }

  const brandId = await GetBrandId(brandEmail);
  if (!brandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 200);
  }
  try {
    res = await UpdateCatalog(items, brandId);
    return c.json(res, 200);
  } catch (error) {
    res = {
      error: true,
      details: `Error interno del servidor ${error}`,
    };
    return c.json(res, 200);
  }
});

// endpoint que inserta items en el catálogo de una marca con datos JSON
const updateCatalogRoute2 = createRoute({
  method: "post",
  path: "/insert-catalog-brand2",
  request: {
    body: {
      content: {
        "application/json": { schema: jsonCatalogUploadSchema2 },
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
      description: "Valida y actualiza el catálogo con datos JSON",
    },
  },
});

app.openapi(updateCatalogRoute2, async c => {
  const { items, brandEmail } = await c.req.valid("json");

  //verifico que la marca exista en la base de datos
  let res: CatalogResponseSchemaType;

  const brandId = await GetBrandId(brandEmail);
  console.log("brandId", brandId);
  if (!brandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 200);
  }
  try {
    res = await UpdateCatalog(items, brandId);
    return c.json(res, 200);
  } catch (error) {
    res = {
      error: true,
      details: `Error interno del servidor ${error}`,
    };
    return c.json(res, 200);
  }
});

// endpoint que elimina items en el catálogo de una marca con datos JSON
const deleteCatalogRoute = createRoute({
  method: "post",
  path: "/delete-catalog-brand",
  request: {
    body: {
      content: {
        "application/json": { schema: deleteItemsJsonSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogResponseSchemaDelete,
        },
      },
      description: "Valida y elimina items del catálogo con datos JSON",
    },
  },
});

app.openapi(deleteCatalogRoute, async c => {
  const { items } = c.req.valid("json");

  const user = c.get("user");
  const brandEmail = user?.email;
  let res: CatalogResponseSchemaDeleteType;
  if (!brandEmail) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
      numberDeleted: 0,
    };
    return c.json(res, 200);
  }

  // Extraer los nombres de los items del array de objetos
  const itemsUuids = items.map(item => item.uuid);

  //verifico que la marca exista en la base de datos
  const brandId = await GetBrandId(brandEmail);
  if (!brandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
      numberDeleted: 0,
    };
    return c.json(res, 200);
  }
  try {
    res = await DeleteFromCatalog(itemsUuids, brandId);
    return c.json(res, 200);
  } catch (error) {
    res = {
      error: true,
      details: `Error interno del servidor ${error}`,
      numberDeleted: 0,
    };
    return c.json(res, 200);
  }
});

// endpoint que devuelve todos los nombres de los items de una marca
const allBrandItemsRoute = createRoute({
  method: "get",
  path: "/all-brand-items",
  request: {
    query: QueryAllBrandItemsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: AllBrandItemsSchemaRes,
        },
      },
      description: "Devuelve los nombres de los items de una marca",
    },
  },
});
app.openapi(allBrandItemsRoute, async c => {
  const { filter, page = 0, limit = 10 } = c.req.valid("query");
  let res: AllBrandItemsSchemaResType;
  const user = c.get("user");
  const brandEmail = user?.email;

  if (!brandEmail) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
    };
    return c.json(res, 200);
  }

  //verifico que el usuario tenga una marca
  const brandId = await GetBrandId(brandEmail);
  if (!brandId) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
    };
    return c.json(res, 200);
  }

  res = await QueryWeaviateAllItems(brandId, filter, page, limit);
  return c.json(res, 200);
});

// endpoint que busca un item específico por name y brand
const getItemRoute = createRoute({
  method: "get",
  path: "/get-item",
  request: {
    query: GetItemQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetItemResponseSchema,
        },
      },
      description: "Devuelve un item específico por nombre y marca",
    },
  },
});

app.openapi(getItemRoute, async c => {
  const { uuid } = c.req.valid("query");

  let res: GetItemResponseSchemaType;

  try {
    res = await QueryWeaviateItem(uuid);
  } catch (error) {
    console.error("Error getting item:", error);
    res = {
      error: true,
      details: "Error interno del servidor",
    };
  }

  return c.json(res, 200);
});

// endpoint que verifica si un item pertenece al usuario autenticado
const isMyItemRoute = createRoute({
  method: "get",
  path: "/is-my-item",
  request: {
    query: IsMyItemQuerySchema,
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
  },
});

app.openapi(isMyItemRoute, async c => {
  const { uuid } = c.req.valid("query");
  const user = c.get("user");
  let res: IsMyItemSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 200);
  }

  try {
    // Obtener el item de Weaviate para obtener su brandId
    const itemResult = await QueryWeaviateItem(uuid);
    if (itemResult.error) {
      res = {
        error: true,
        details: itemResult.details,
      };
      return c.json(res, 200);
    }

    const item = itemResult.item;

    // Obtener el brandId del usuario autenticado
    const userBrandId = await GetBrandId(user.email);
    if (!userBrandId) {
      res = {
        error: false,
        isMyItem: false,
      };
      return c.json(res, 200);
    }

    // Comparar si el brandId del item coincide con el brandId del usuario
    const isMyItem = item.brandId === userBrandId;

    res = {
      error: false,
      isMyItem,
    };
  } catch (error) {
    console.error("Error checking if item belongs to user:", error);
    res = {
      error: true,
      details: "Error interno del servidor",
    };
  }

  return c.json(res, 200);
});

// endpoint que actualiza un item específico por name y brand
const updateItemRoute = createRoute({
  method: "put",
  path: "/update-item",
  request: {
    query: UpdateItemQuerySchema,
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
          schema: UpdateItemResponseSchema,
        },
      },
      description: "Actualiza un item específico por nombre y marca",
    },
  },
});

app.openapi(updateItemRoute, async c => {
  const { uuid } = c.req.valid("query");
  const updatedItem = await c.req.valid("json");
  let res: UpdateItemResponseSchemaType;
  const user = c.get("user");
  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 200);
  }
  const userBrandId = await GetBrandId(user.email);
  if (!userBrandId) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
    };
    return c.json(res, 200);
  }
  const itemResult = await QueryWeaviateItem(uuid);
  if (itemResult.error) {
    res = {
      error: true,
      details: itemResult.details,
    };
    return c.json(res, 200);
  }

  if (userBrandId !== itemResult.item.brandId) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
    };
    return c.json(res, 200);
  }

  res = await UpdateItem(uuid, updatedItem);

  return c.json(res, 200);
});

// Endpoint para toggle like
const toggleLikeRoute = createRoute({
  method: "post",
  path: "/toggle-like",
  request: {
    body: {
      content: {
        "application/json": { schema: LikeItemSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LikeFavoriteResponseSchema,
        },
      },
      description: "Toggle like de un item",
    },
    401: {
      content: {
        "application/json": {
          schema: LikeFavoriteResponseSchema,
        },
      },
      description: "Usuario no autenticado",
    },
  },
});

app.openapi(toggleLikeRoute, async c => {
  const { item_uuid } = await c.req.valid("json");
  const user = c.get("user");
  let res: LikeFavoriteResponseSchemaType;
  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }

  res = await toggleLike(user.email, item_uuid, user.userType);
  return c.json(res, 200);
});

// Endpoint para toggle favorite
const toggleFavoriteRoute = createRoute({
  method: "post",
  path: "/toggle-favorite",
  request: {
    body: {
      content: {
        "application/json": { schema: FavoriteItemSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LikeFavoriteResponseSchema,
        },
      },
      description: "Toggle favorite de un item",
    },
    401: {
      content: {
        "application/json": {
          schema: LikeFavoriteResponseSchema,
        },
      },
      description: "Usuario no autenticado",
    },
  },
});

app.openapi(toggleFavoriteRoute, async c => {
  const { item_uuid } = await c.req.valid("json");
  const user = c.get("user");
  let res: LikeFavoriteResponseSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }
  res = await toggleFavorite(user.email, item_uuid, user.userType);
  return c.json(res, 200);
});

// Endpoint para verificar si un item está liked
const checkLikeRoute = createRoute({
  method: "get",
  path: "/check-like",
  request: {
    query: LikeItemSchema,
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
          schema: CheckLikeFavoriteResponseSchema,
        },
      },
      description: "Usuario no autenticado",
    },
  },
});

app.openapi(checkLikeRoute, async c => {
  const { item_uuid } = c.req.valid("query");
  const user = c.get("user");
  let res: CheckLikeFavoriteResponseSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }
  res = await checkIfLiked(user.email, item_uuid, user.userType);
  return c.json(res, 200);
});

// Endpoint para verificar si un item está favorited
const checkFavoriteRoute = createRoute({
  method: "get",
  path: "/check-favorite",
  request: {
    query: FavoriteItemSchema,
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
          schema: CheckLikeFavoriteResponseSchema,
        },
      },
      description: "No autorizado",
    },
  },
});

app.openapi(checkFavoriteRoute, async c => {
  const { item_uuid } = c.req.valid("query");
  const user = c.get("user");
  let res: CheckLikeFavoriteResponseSchemaType;

  if (!user?.email) {
    res = {
      error: true,
      details: "Usuario no autenticado",
    };
    return c.json(res, 401);
  }
  res = await checkIfFavorited(user.email, item_uuid, user.userType);
  return c.json(res, 200);
});

// Endpoint para obtener todos los items liked
const getAllLikedItemsRoute = createRoute({
  method: "get",
  path: "/get-all-liked-items",
  request: {
    query: PaginationSchemaBrand,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogItemArraySchemaQuery,
        },
      },
      description: "Obtiene todos los items liked del usuario",
    },
    401: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.boolean(),
            details: z.string(),
          }),
        },
      },
      description: "Usuario no autenticado",
    },
  },
});

app.openapi(getAllLikedItemsRoute, async c => {
  const { page, limit } = c.req.valid("query");
  const user = c.get("user");

  if (!user?.email) {
    return c.json(
      {
        error: true,
        details: "Usuario no autenticado",
      },
      401
    );
  }

  const res = await getAllLikedFavoritedItems(
    "likes",
    user.email,
    user.userType,
    page,
    limit
  );
  return c.json(res, 200);
});

// Endpoint para obtener todos los items favorited
const getAllFavoritedItemsRoute = createRoute({
  method: "get",
  path: "/get-all-favorited-items",
  request: {
    query: PaginationSchemaBrand,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogItemArraySchemaQuery,
        },
      },
      description: "Obtiene todos los items favorited del usuario",
    },
    401: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.boolean(),
            details: z.string(),
          }),
        },
      },
      description: "Usuario no autenticado",
    },
  },
});

app.openapi(getAllFavoritedItemsRoute, async c => {
  const { page, limit } = c.req.valid("query");
  const user = c.get("user");

  if (!user?.email) {
    return c.json(
      {
        error: true,
        details: "Usuario no autenticado",
      },
      401
    );
  }

  const res = await getAllLikedFavoritedItems(
    "favorites",
    user.email,
    user.userType,
    page,
    limit
  );
  return c.json(res, 200);
});
