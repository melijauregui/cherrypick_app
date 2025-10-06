import { createRoute } from "@hono/zod-openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import {
  GetExpirationCodeRegister,
  GetExpirationCodeResetPassword,
  VerifyVerificationCodeRegister,
  VerifyVerificationCodeResetPassword,
} from "./functions";
import {
  ExpirationCodeResponseSchema,
  QueryVerifyCodeResetPasswordSchema,
  QueryVerifyCodeSchema,
  VerifyCodeResponseSchema,
  VerifyCodeResponseSchemaResetPassword,
  VerifyCodeResponseSchemaType,
  VerifyCodeResponseSchemaTypeResetPassword,
} from "@/schemas/formUser-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
} from "@/schemas/standar-response-schema";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { AppEnv } from "../app";
import { GetUserIdByEmail } from "../user/functions";
import { QueryEmailSchema } from "@/schemas/standar-query-schema";

const FormUserApp = new OpenAPIHono<AppEnv>({
  defaultHook: (result, c) => {
    //https://github.com/honojs/middleware/tree/main/packages/zod-openapi
    if (!result.success) {
      throw result.error; // deja que onError formatee el JSON
    }
  },
});

// Middleware to handle validation errors
FormUserApp.onError((err: Error, c: Context) => {
  //https://hono.dev/docs/api/hono#error-handling
  return errorHandler(err, c);
});

export default FormUserApp;

// endpoint que verifica si el code de verificación es correcto
const verifiedCodeRoute = createRoute({
  method: "post",
  path: "/verify",
  request: {
    body: {
      content: {
        "application/json": { schema: QueryVerifyCodeSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: VerifyCodeResponseSchema,
        },
      },
      description:
        "Devuelve un booleano que indica si el codigo de verificación es correcto",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Unauthorized",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Email not found",
    },
    410: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Verification code expired",
    },
  },
});
FormUserApp.openapi(verifiedCodeRoute, async c => {
  const { code } = await c.req.valid("json");
  const user = c.get("user");
  const email = user?.email;
  const userId = user?.id;
  if (!email || !userId) {
    return c.json({ error: true, details: "Unauthorized" }, 401);
  }
  let res:
    | VerifyCodeResponseSchemaType
    | {
        error: true;
        errMsg: ErrorSchemaType;
        statusCode: ContentfulStatusCode;
      };

  res = await VerifyVerificationCodeRegister(userId, code);
  if (res.error) {
    const errorMsg: ErrorSchemaType = res.errMsg;
    return c.json(errorMsg, res.statusCode as 404 | 410);
  }
  return c.json(res, 200);
});

// endpoint que verifica si el code de verificación es correcto
const getExpirationCodeRoute = createRoute({
  method: "post",
  path: "/expiration",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ExpirationCodeResponseSchema,
        },
      },
      description:
        "Devuelve el tiempo de expiración del código de verificación",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Unauthorized",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Email not found",
    },
  },
});
FormUserApp.openapi(getExpirationCodeRoute, async c => {
  const user = c.get("user");
  const userId = user?.id;
  if (!userId) {
    return c.json({ error: true, details: "Unauthorized" }, 401);
  }
  console.log("Getting expiration code for email", userId);
  const res = await GetExpirationCodeRegister(userId);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});

// endpoint que verifica si el code de verificación es correcto
const verifiedCodeResetPasswordRoute = createRoute({
  method: "post",
  path: "/verify-reset-password",
  request: {
    body: {
      content: {
        "application/json": { schema: QueryVerifyCodeResetPasswordSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: VerifyCodeResponseSchemaResetPassword,
        },
      },
      description:
        "Devuelve un booleano que indica si el codigo de verificación de reset de contraseña es correcto",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Unauthorized",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Email not found",
    },
    410: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Verification code expired",
    },
  },
});
FormUserApp.openapi(verifiedCodeResetPasswordRoute, async c => {
  const { code, email } = await c.req.valid("json");

  const userId = await GetUserIdByEmail(email);
  if (!userId) {
    return c.json({ error: true, details: "Unauthorized" }, 401);
  }
  let res:
    | VerifyCodeResponseSchemaTypeResetPassword
    | {
        error: true;
        errMsg: ErrorSchemaType;
        statusCode: ContentfulStatusCode;
      };

  res = await VerifyVerificationCodeResetPassword(userId, code);
  if (res.error) {
    const errorMsg: ErrorSchemaType = res.errMsg;
    return c.json(errorMsg, res.statusCode as 404 | 410);
  }
  return c.json(res, 200);
});

// endpoint que verifica si el code de verificación es correcto
const getExpirationCodeResetPasswordRoute = createRoute({
  method: "post",
  path: "/expiration-reset-password",
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
          schema: ExpirationCodeResponseSchema,
        },
      },
      description:
        "Devuelve el tiempo de expiración del código de verificación",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Unauthorized",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Email not found",
    },
  },
});
FormUserApp.openapi(getExpirationCodeResetPasswordRoute, async c => {
  const { email } = await c.req.valid("json");
  console.log("/POST code-verification/expiration-reset-password", email);
  const userId = await GetUserIdByEmail(email);
  if (!userId) {
    return c.json({ error: true, details: "Unauthorized" }, 401);
  }
  const res = await GetExpirationCodeResetPassword(userId);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});
