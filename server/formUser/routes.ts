import { createRoute } from "@hono/zod-openapi";

import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { errorHandler } from "../errorHandler";
import {
  BodyCodeVerificationPostSchema,
  ResCodeVerificationPostSchema,
  ResCodeVerificationPostSchemaType,
} from "@/schemas/auth/sign-up-schema";
import {
  GenerateVerificationCode,
  SaveVerificationCode,
  SendEmail,
  VerifyVerificationCode,
} from "./functions";
import {
  QueryVerifyCodeSchema,
  VerifyCodeResponseSchema,
  VerifyCodeResponseSchemaType,
} from "@/schemas/formUser";

const FormUserApp = new OpenAPIHono({
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
          schema: ResCodeVerificationPostSchema,
        },
      },
      description:
        "Devuelve un booleano que indica si se pudo enviar el código de verificación",
    },
  },
});
FormUserApp.openapi(codeVerificationRoute, async c => {
  const { email } = await c.req.valid("json");
  const code = GenerateVerificationCode();
  const emailSent = await SendEmail(email, code);
  let res: ResCodeVerificationPostSchemaType;

  if (!emailSent) {
    res = {
      error: true,
      details: "Invalid email",
    };
    return c.json(res, 200);
  }

  // Guardar (o reemplazar) en DB
  try {
    res = await SaveVerificationCode(email, code);
  } catch (err) {
    console.error("Error al guardar código:", err);
    res = {
      error: true,
      details: "Error al guardar en la base",
    };
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
  },
});
FormUserApp.openapi(verifiedCodeRoute, async c => {
  const { code, email } = await c.req.valid("json");
  let res: VerifyCodeResponseSchemaType;

  res = await VerifyVerificationCode(email, code);
  return c.json(res, 200);
});
