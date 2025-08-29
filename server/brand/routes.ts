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
import { GetBrandByEmail, GetBrandById, UpdateBrand } from "./functions";
import { QueryIdSchema } from "@/schemas/standar-query-schema";
import logger from "../logger";
import { BodyCodeVerificationPostSchema } from "@/schemas/auth/sign-up-schema";
import { VerifyUserExists } from "../user/functions";
import { SendEmailBrand } from "../formUser/functions";

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
  const email = user?.email;
  logger.info("/GET BRAND email:", email);
  let res: BrandSchemaResponseType;
  if (!email) {
    const resError: ErrorSchemaType = {
      error: true,
      details: "No tienes permisos para obtener la marca",
    };
    return c.json(resError, 401);
  }
  const brand = await GetBrandByEmail(email);
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
  },
});

BrandApp.openapi(updateBrandRoute, async c => {
  var { description, url } = c.req.valid("json");
  const user = c.get("user");
  const brandEmail = user?.email;
  if (!brandEmail) {
    const resError: ErrorSchemaType = {
      error: true,
      details: "No tienes permisos para actualizar la marca",
    };
    return c.json(resError, 401);
  }
  logger.info("Updating brand:", description, url);
  await UpdateBrand(brandEmail, description, url);
  const resSuccess: SuccessSchemaType = {
    error: false,
  };
  return c.json(resSuccess, 200);
});

// endpoint que publica un nuevo code-verification
const sendFormBrandRoute = createRoute({
  method: "post",
  path: "/form",
  request: {
    body: {
      content: {
        "application/json": { schema: BodyCodeVerificationPostSchema },
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
