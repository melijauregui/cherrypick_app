import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import { AppEnv } from "../app";
import {
  BrandSchemaPropertiesResponse,
  BrandSchemaPropertiesResponseType,
  BrandSchemaResponse,
  BrandSchemaResponseType,
  UpdateBrandSchema,
} from "@/schemas/brand/brand-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { GetBrandById, GetBrandId, UpdateBrand } from "./functions";
import { QueryIdSchema } from "@/schemas/standar-query-schema";
import logger from "../logger";
import { VerifyUserExists } from "../user/functions";
import { SendEmailBrand } from "../formUser/functions";
import {
  CatalogResponseSchema,
  DeleteItemsResponseSchema,
  CatalogResponseSchemaType,
  UuidItemsSchema,
  jsonCatalogUploadSchema,
  jsonCatalogUploadSchema2,
  PaginationSchema,
  DeleteItemsResponseSchemaType,
  PaginationFilterSchema,
  UuidNameResponseSchema,
  UuidNameResponseSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { GetCatalog, GetItemsUuidNamesFromBrand } from "../catalog/functions";
import { UpdateCatalog } from "../catalog/insert";
import { DeleteFromCatalog } from "../catalog/delete";
import { QueryEmailSchema } from "@/schemas/standar-query-schema";

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

// endpoint que obtiene la información de la marca
const getBrandRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Obtiene la información de la marca",
      content: {
        "application/json": {
          schema: BrandSchemaResponse,
        },
      },
    },
    401: {
      description: "No tienes permisos para obtener la marca",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "Marca no encontrada",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

BrandApp.openapi(getBrandRoute, async c => {
  const user = c.get("user");
  const userId = user?.id;
  logger.info("/GET BRAND userId:", userId);
  let res: BrandSchemaResponseType;
  if (!userId) {
    const resError: ErrorSchemaType = {
      error: true,
      details: "No tienes permisos para obtener la marca",
    };
    return c.json(resError, 401);
  }
  const brand = await GetBrandById(userId);
  if (!brand) {
    const resError: ErrorSchemaType = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(resError, 404);
  }
  res = { error: false, brand: brand };
  return c.json(res, 200);
});

// endpoint que actualiza la información de la marca
const updateBrandRoute = createRoute({
  method: "put",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateBrandSchema,
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
      description: "No tienes permisos para actualizar la marca",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "Marca no encontrada",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

BrandApp.openapi(updateBrandRoute, async c => {
  var { description, url } = c.req.valid("json");
  const user = c.get("user");
  const brandId = user?.id;
  let res: SuccessSchemaType | ErrorSchemaType;
  if (!brandId) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar la marca",
    };
    return c.json(res, 401);
  }
  logger.info("Updating brand:", description, url);
  res = await UpdateBrand(brandId, description, url);
  if (res.error) {
    return c.json(res, 404);
  }
  res = {
    error: false,
  };
  return c.json(res, 200);
});

// endpoint que publica un nuevo code-verification
const sendFormBrandRoute = createRoute({
  method: "post",
  path: "/form",
  request: {
    body: {
      content: {
        "application/json": { schema: QueryEmailSchema },
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
      description:
        "Devuelve un booleano que indica si se pudo enviar el código de verificación",
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
BrandApp.openapi(sendFormBrandRoute, async c => {
  const { email } = await c.req.valid("json");
  logger.info("POST brand/form email:", email);
  //verifico que no exista ya en la base de datos con verifyEmail
  const { exists } = await VerifyUserExists(email);
  if (exists) {
    logger.warn("Email already exists");
    const res: ErrorSchemaType = {
      error: true,
      details: "Email ya registrado",
    };
    return c.json(res, 400);
  }

  const emailSent = await SendEmailBrand(email);
  if (emailSent.error) {
    return c.json(emailSent, 400);
  }
  logger.info("Email sent:", emailSent);
  return c.json(emailSent, 200);
});

// endpoint que devuelve los resultados de los items de una marca
const paginatedRouteBrand = createRoute({
  method: "get",
  path: "/all-items",
  request: {
    query: PaginationSchema,
    required: true,
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
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "No tienes permisos para obtener los items de la marca",
    },

    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Marca no encontrada",
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
BrandApp.openapi(paginatedRouteBrand, async c => {
  const { page, limit } = c.req.valid("query");
  console.log("page", page);
  console.log("limit", limit);
  logger.info("/GET brand/all-items page: %s limit: %s", page, limit);
  let res: CatalogResponseSchemaType | ErrorSchemaType;
  const user = c.get("user");
  const brandId = user?.id;
  if (!brandId) {
    res = {
      error: true,
      details: "No tienes permisos para obtener los items de la marca",
    };
    return c.json(res, 401);
  }

  const embedding = Array(768).fill(0.5);

  const result = await GetCatalog(embedding, page, limit, brandId);

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

// endpoint que devuelve todos los nombres de los items de una marca
const allBrandItemsRoute = createRoute({
  method: "get",
  path: "/all-names-items",
  request: {
    query: PaginationFilterSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UuidNameResponseSchema,
        },
      },
      description: "Devuelve los nombres de los items de una marca",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description:
        "No tienes permisos para obtener los nombres de los items de una marca",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Marca no encontrada",
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
BrandApp.openapi(allBrandItemsRoute, async c => {
  const { filter, page = 0, limit = 10 } = c.req.valid("query");
  logger.info(
    "/GET brand/all-names-items filter: %s page: %s limit: %s",
    filter,
    page,
    limit
  );
  let res: UuidNameResponseSchemaType | ErrorSchemaType;
  const user = c.get("user");
  const brandId = user?.id;

  if (!brandId) {
    res = {
      error: true,
      details:
        "No tienes permisos para obtener los nombres de los items de una marca",
    };
    return c.json(res, 401);
  }

  res = await GetItemsUuidNamesFromBrand(brandId, filter, page, limit);
  if (res.error) {
    return c.json(res, 500);
  }
  return c.json(res, 200);
});

// endpoint que obtiene la información de la marca con su id
const getBrandRouteId = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: QueryIdSchema,
    required: true,
  },
  responses: {
    200: {
      description: "Obtiene la información de la marca",
      content: {
        "application/json": {
          schema: BrandSchemaPropertiesResponse,
        },
      },
    },
    404: {
      description: "Marca no encontrada",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

BrandApp.openapi(getBrandRouteId, async c => {
  const { id } = c.req.valid("param");
  logger.info("/GET brand/{id} id: %s", id);
  let res: BrandSchemaPropertiesResponseType;

  const brand = await GetBrandById(id);
  if (!brand) {
    const resError: ErrorSchemaType = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(resError, 404);
  }
  res = { error: false, brand: brand };
  return c.json(res, 200);
});

// endpoint que devuelve los resultados de los items de una marca dado su id
const paginatedRouteBrandWithId = createRoute({
  method: "get",
  path: "/{id}/all-items",
  request: {
    query: PaginationSchema,
    params: QueryIdSchema,
    required: true,
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
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Marca no encontrada",
    },
  },
});
BrandApp.openapi(paginatedRouteBrandWithId, async c => {
  const { page, limit } = c.req.valid("query");
  const { id } = c.req.valid("param");
  logger.info(
    "/GET brand/{id}/all-items id: %s page: %s limit: %s",
    id,
    page,
    limit
  );
  let res: CatalogResponseSchemaType | ErrorSchemaType;
  const brand = await GetBrandById(id);
  if (!brand) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 404);
  }

  const embedding = Array(768).fill(0.5);

  const items = await GetCatalog(embedding, page, limit, id);

  res = {
    error: false,
    items: items.items,
  };
  return c.json(res, 200);
});

// endpoint que inserta items en el catálogo de una marca con datos JSON
const updateCatalogRoute = createRoute({
  method: "post",
  path: "/insert-items",
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
          schema: SuccessSchema,
        },
      },
      description: "Valida y actualiza el catálogo con datos JSON",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "No tienes permisos para insertar items",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Marca no encontrada",
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

BrandApp.openapi(updateCatalogRoute, async c => {
  const { items } = await c.req.valid("json");

  //verifico que la marca exista en la base de datos
  let res: SuccessSchemaType | ErrorSchemaType;

  const user = c.get("user");
  const brandId = user?.id;

  if (!brandId) {
    res = {
      error: true,
      details: "No tienes permisos para insertar items",
    };
    return c.json(res, 401);
  }

  res = await UpdateCatalog(items, brandId);
  if (res.error) {
    return c.json(res, 500);
  }
  return c.json(res, 200);
});

// endpoint que inserta items en el catálogo de una marca con datos JSON
const updateCatalogRoute2 = createRoute({
  method: "post",
  path: "/insert-items2",
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
          schema: SuccessSchema,
        },
      },
      description: "Valida y actualiza el catálogo con datos JSON",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Marca no encontrada",
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

BrandApp.openapi(updateCatalogRoute2, async c => {
  const { items, brandEmail } = await c.req.valid("json");

  //verifico que la marca exista en la base de datos
  let res: SuccessSchemaType | ErrorSchemaType;

  const brandId = await GetBrandId(brandEmail);
  if (!brandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 404);
  }

  res = await UpdateCatalog(items, brandId);
  if (res.error) {
    return c.json(res, 500);
  }
  return c.json(res, 200);
});

// endpoint que elimina items en el catálogo de una marca con datos JSON
const deleteCatalogRoute = createRoute({
  method: "post",
  path: "/delete-items",
  request: {
    body: {
      content: {
        "application/json": { schema: UuidItemsSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteItemsResponseSchema,
        },
      },
      description: "Valida y elimina items del catálogo con datos JSON",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "No tienes permisos para eliminar items",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Marca no encontrada",
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

BrandApp.openapi(deleteCatalogRoute, async c => {
  const { items } = c.req.valid("json");
  logger.info("/POST brand/delete-items items: %s", items);
  const user = c.get("user");
  const brandEmail = user?.email;
  let res: DeleteItemsResponseSchemaType | ErrorSchemaType;
  if (!brandEmail) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
    };
    return c.json(res, 401);
  }

  // Extraer los ids de los items del array de objetos
  const itemsUuids = items.map(item => item.id);

  //verifico que la marca exista en la base de datos
  const brandId = await GetBrandId(brandEmail);
  if (!brandId) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 404);
  }
  res = await DeleteFromCatalog(itemsUuids, brandId);
  if (res.error) {
    return c.json(res, 500);
  }
  return c.json(res, 200);
});
