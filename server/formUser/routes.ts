import { createRoute } from "@hono/zod-openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import {
  GenerateVerificationCode,
  GetExpirationCode,
  SaveVerificationCode,
  SendEmail,
  VerifyVerificationCode,
} from "./functions";
import {
  ExpirationCodeResponseSchema,
  QueryVerifyCodeSchema,
  VerifyCodeResponseSchema,
  VerifyCodeResponseSchemaType,
} from "@/schemas/formUser-schema";
import {
  ErrorSchema,
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { AppEnv } from "../app";

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

// endpoint que publica un nuevo code-verification
const codeVerificationRoute = createRoute({
  method: "post",
  path: "/",
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
      description: "Error al enviar el código de verificación",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Unauthorized",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Error al enviar el código de verificación",
    },
  },
});
FormUserApp.openapi(codeVerificationRoute, async c => {
  const user = c.get("user");
  const email = user?.email;
  if (!email) {
    return c.json({ error: true, details: "Unauthorized" }, 401);
  }
  const code = GenerateVerificationCode();
  const emailSent = await SendEmail(email, code);
  let res: SuccessSchemaType | ErrorSchemaType;

  if (!emailSent) {
    res = {
      error: true,
      details: "Invalid email",
    };
    return c.json(res, 400);
  }
  // Guardar (o reemplazar) en DB
  res = await SaveVerificationCode(email, code);
  if (res.error) {
    return c.json(res, 500);
  }
  return c.json(res, 200);
});

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
  if (!email) {
    return c.json({ error: true, details: "Unauthorized" }, 401);
  }
  let res:
    | VerifyCodeResponseSchemaType
    | {
        error: true;
        errMsg: ErrorSchemaType;
        statusCode: ContentfulStatusCode;
      };

  res = await VerifyVerificationCode(email, code);
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
  },
});
FormUserApp.openapi(getExpirationCodeRoute, async c => {
  const user = c.get("user");
  const email = user?.email;
  if (!email) {
    return c.json({ error: true, details: "Unauthorized" }, 401);
  }

  const res = await GetExpirationCode(email);
  if (res.error) {
    return c.json(res, 404);
  }
  return c.json(res, 200);
});
