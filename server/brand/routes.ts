import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import { AppEnv } from "../app";
import {
  BrandSchemaPropertiesResponse,
  BrandSchemaPropertiesResponseType,
  BrandSchemaResponse,
  BrandSchemaResponseType,
  UpdateBrandSchema,
  GetBrandsByIdsSchema,
  BrandsResponseSchema,
  BrandsResponseSchemaType,
} from "@/schemas/brand/brand-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import {
  GetBrandById,
  GetBrandId,
  UpdateBrand,
  GetBrandInspoItems,
  GetBrandsByIds,
  InsertItems,
} from "./functions";
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
  UuidItemsSchemaResponse,
  InsertBatchItems,
  ItemWithoutImageSchema,
  InsertBatchItemsMultipartSchema,
} from "@/schemas/catalog/catalog-schema";
import {
  GetCatalog,
  extractFeatures,
  getCollection,
} from "../catalog/functions";
import { UpdateCatalog } from "../catalog/insert";
import { DeleteFromCatalog } from "../catalog/delete";
import { QueryEmailSchema } from "@/schemas/standar-query-schema";
import { uploadFromFile } from "../file-uploader";
import { prisma } from "../db";

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
  var { description, url, logoId } = c.req.valid("json");
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
  logger.info(
    "Updating brand: %s description: %s url: %s logoId: %s",
    brandId,
    description,
    url,
    logoId
  );
  res = await UpdateBrand(brandId, description, url, logoId);
  if (res.error) {
    return c.json(res, 404);
  }
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
    query: PaginationFilterSchema,
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
  const { page, limit, filter } = c.req.valid("query");
  logger.info(
    "/GET brand/all-items page: %s limit: %s filter: %s",
    page,
    limit,
    filter
  );
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

  const result = await GetCatalog(page, limit, brandId, filter);

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

// endpoint que obtiene todos los items de inspo semanal de una marca
const getInspoItemsRoute = createRoute({
  method: "get",
  path: "/inspo-items",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UuidItemsSchemaResponse,
        },
      },
      description: "Devuelve los IDs de los items que están en inspo semanal",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "No tienes permisos para obtener los items de inspo",
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

BrandApp.openapi(getInspoItemsRoute, async c => {
  logger.info("/GET brand/inspo-items");
  const user = c.get("user");
  const brandId = user?.id;

  if (!brandId) {
    return c.json(
      {
        error: true,
        details: "No tienes permisos para obtener los items de inspo",
      },
      401
    );
  }

  const items = await GetBrandInspoItems(brandId);

  return c.json({ error: false, items: items }, 200);
});

// endpoint que obtiene múltiples marcas por sus IDs
const getBrandsSomeRoute = createRoute({
  method: "post",
  path: "/some",
  request: {
    body: {
      content: {
        "application/json": {
          schema: GetBrandsByIdsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Obtiene las marcas por sus IDs",
      content: {
        "application/json": {
          schema: BrandsResponseSchema,
        },
      },
    },
    400: {
      description: "Error en los datos enviados",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    500: {
      description: "Error interno del servidor",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

BrandApp.openapi(getBrandsSomeRoute, async c => {
  const { ids } = await c.req.valid("json");
  logger.info("/POST brand/some ids: %s", ids);

  try {
    const brands = await GetBrandsByIds(ids);

    const res: BrandsResponseSchemaType = {
      error: false,
      brands: brands,
    };

    return c.json(res, 200);
  } catch (error) {
    logger.error("Error getting brands by IDs:", error);
    const resError: ErrorSchemaType = {
      error: true,
      details: "Error interno del servidor",
    };
    return c.json(resError, 500);
  }
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

  const items = await GetCatalog(page, limit, id);

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

// endpoint que inserta un item en el catálogo con imagen en multipart/form-data
const insertItemWithImageMultipartRoute = createRoute({
  method: "post",
  path: "/insert-items-complete",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          // Schema que valida items como JSON string y las imágenes por separado
          schema: InsertBatchItemsMultipartSchema.passthrough(), // Permite campos adicionales como image_0, image_1, etc.
        },
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
      description: "Item insertado exitosamente con imagen",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "No tienes permisos para insertar items",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Error en los datos proporcionados",
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

BrandApp.openapi(insertItemWithImageMultipartRoute, async c => {
  let res: SuccessSchemaType | ErrorSchemaType;

  // const user = c.get("user");
  // const brandId = user?.id;
  // if (!brandId) {
  //   res = {
  //     error: true,
  //     details: "No tienes permisos para insertar items",
  //   };
  //   return c.json(res, 401);
  // }

  // Validar FormData con el schema (valida brandId e items como JSON string)
  const validatedData = await c.req.valid("form");
  const { brandId, items: itemsWithoutImages } = validatedData;

  // Parsear FormData para obtener las imágenes
  const formData = await c.req.formData();

  // Validar que existan todas las imágenes requeridas
  const missingImages: number[] = [];
  for (let index = 0; index < itemsWithoutImages.length; index++) {
    const imageFile = formData.get(`image_${index}`);
    if (!imageFile || !(imageFile instanceof File)) {
      missingImages.push(index);
    }
  }

  if (missingImages.length > 0) {
    res = {
      error: true,
      details: `Missing images for items at indices: ${missingImages.join(", ")}`,
    };
    return c.json(res, 400);
  }

  // Agregar las imágenes a cada item
  const items = itemsWithoutImages.map((item: any, index: number) => {
    const imageFile = formData.get(`image_${index}`) as File;
    return {
      ...item,
      image: imageFile,
    };
  });

  // Validar con Zod usando el schema InsertBatchItems (con imágenes)
  const validationResult = InsertBatchItems.safeParse({ brandId, items });
  if (!validationResult.success) {
    res = {
      error: true,
      details: `Validation error: ${validationResult.error.message}`,
    };
    return c.json(res, 400);
  }

  res = await InsertItems(validationResult.data.items, brandId);

  res = {
    error: false,
  };
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
  const brandId = user?.id;
  let res: DeleteItemsResponseSchemaType | ErrorSchemaType;
  if (!brandId) {
    res = {
      error: true,
      details: "No tienes permisos para actualizar este item",
    };
    return c.json(res, 401);
  }

  // Extraer los ids de los items del array de objetos
  const itemsUuids = items.map(item => item.id);

  res = await DeleteFromCatalog(itemsUuids, brandId);
  if (res.error) {
    return c.json(res, 500);
  }
  return c.json(res, 200);
});
