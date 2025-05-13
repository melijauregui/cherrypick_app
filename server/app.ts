import fs from "fs";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
  callVGGNet,
  ImageParamSchema,
  queryPinecone,
  TopMatchesSchema,
} from "./app/routeVector";
import { PaginationSchema } from "./app/allDatabase";
import {
  VerifyAvailabilitySchema,
  QueryVerifyAvalabilitySchema,
  VerifyAvailabilitySchemaType,
  ResCodeVerificationPostSchema,
  BodyCodeVerificationPostSchema,
  ErrorResponseSchema,
} from "../schemas/auth/sign-up-schema";
import {
  QueryVerifyCodeSchema,
  VerifyCodeSchema,
  VerifyCodeSchemaType,
} from "../schemas/auth/code-verification-schema";
import { db } from "./db";
const app = new OpenAPIHono();
export default app;

// endpoint que recibe una imagen y devuelve los 10 resultados más similares paginados WIP
const routeVector = createRoute({
  method: "get",
  path: "/images/{image_path}",
  request: {
    params: ImageParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TopMatchesSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});
app.openapi(routeVector, async (c) => {
  const topK = 10;
  const { image_path } = c.req.valid("param");
  const image_path_complete = `./server/images/${image_path}`;
  const queryVector = await callVGGNet(image_path_complete);
  fs.writeFileSync("result.json", JSON.stringify(queryVector));
  const res = await queryPinecone(queryVector, topK);
  return c.json(res, 200);
});

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
          schema: TopMatchesSchema,
        },
      },
      description: "Devuelve los datos de la base de datos de forma paginada",
    },
  },
});
app.openapi(paginatedRoute, async (c) => {
  const { page, limit } = c.req.valid("query");
  const topK = 10;

  const embedding = Array.from({ length: 768 }, () => Math.random()); // Simulación de un vector de consulta personalizada

  const res = await queryPinecone(embedding, topK);
  return c.json(res, 200);
});

// endpoint que verifica si un mail esta registrado en la base de datos
const verifiedEmailRoute = createRoute({
  method: "get",
  path: "/verify-email",
  request: {
    query: QueryVerifyAvalabilitySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: VerifyAvailabilitySchema,
        },
      },
      description:
        "Devuelve un booleano que indica si el email está disponible",
    },
  },
});
app.openapi(verifiedEmailRoute, async (c) => {
  const { email } = c.req.valid("query");
  let res: VerifyAvailabilitySchemaType;

  try {
    const [rows]: any[] = await db.query('SELECT id FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      // Email ya registrado
      res = {
        error: false,
        isAvailable: false,
      };
    } else {
      // Email disponible para registrar
      res = {
        error: false,
        isAvailable: true,
      };
    }
  } catch (err) {
    console.error('Error checking email:', err);
    res = {
      error: true,
      details: 'Error querying the database',
    };
  }
  /* 
    if (!verifyGoogleMail(email)) {
      // Simulación de un email no registrado en google
      console.log("Email not registered in Google");
      res = {
        error: true,
        details: "Email not registered in Google",
      };
    } else {
      console.log("Email registered in Google");
      if (email === "p@gmail.com") {
        console.log("Email registered in the database");
        // Simulación de un email no registrado en la base de datos
        res = {
          error: false,
          isAvailable: false,
        };
      } else {
        console.log("Email not registered in the database");
        // Simulación de un email registrado en la base de datos
        res = {
          error: false,
          isAvailable: true,
        };
      }
    } */
  return c.json(res, 200);
});

// endpoint que publica un nuevo code-verification
const codeVerificationRoute = createRoute({
  method: "post",
  path: "/code-verification",
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
    404: {
      description: "Mail incorrecto",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Error del servidor",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});
app.openapi(codeVerificationRoute, async (c) => {
  const { email } = await c.req.valid("json");
  const code = generateVerificationCode();

  console.log("Email received:", email);

  const emailSent = await sendEmail(email, code);

  if (!emailSent) {
    return c.json({ error: true as true, details: "Invalid email" }, 404);
  }

  // Guardar (o reemplazar) en DB
  try {
    await db.query(
      `
      INSERT INTO registerInProgress (email, verification_code)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE verification_code = VALUES(verification_code)
      `,
      [email, code]
    );

    return c.json({ error: false as false }, 200);
  } catch (err) {
    console.error("Error al guardar código:", err);
    return c.json({ error: true as true, details: "Error al guardar en la base" }, 500);
  }
});


function generateVerificationCode(): string {
  return String(randomInt(100000, 999999));
}

export async function sendEmail(email: string, code: string): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Enviando correo:", process.env.SMTP_USER, process.env.SMTP_PASS);
    console.log("Enviando correo a:", email);
    const info = await transporter.sendMail({
      from: `"Cherrypick" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Tu código de verificación",
      text: `Tu código es: ${code}`,
      html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
    });

    console.log("Correo enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error enviando correo:", error);
    return false;
  }
}


// endpoint que verifica si el code de verificación es correcto
const verifiedCodeRoute = createRoute({
  method: "get",
  path: "/verify-code",
  request: {
    query: QueryVerifyCodeSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: VerifyCodeSchema,
        },
      },
      description:
        "Devuelve un booleano que indica si el codigo de verificación es correcto",
    },
    404: {
      description: "Código incorrecto",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Error del servidor",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});
app.openapi(verifiedCodeRoute, async (c) => {
  const { code } = c.req.valid("query");

  try {
    const [rows]: any[] = await db.query(
      "SELECT * FROM registerInProgress WHERE verification_code = ?",
      [code]
    );

    if (rows.length === 0) {
      return c.json({ error: true as true, details: "Code is incorrect" }, 404);
    }

    await db.query(
      "DELETE FROM registerInProgress WHERE verification_code = ?",
      [code]
    );

    return c.json({ error: false as false, isCorrect: true }, 200);
  } catch (err) {
    console.error("Error al verificar código:", err);
    return c.json({ error: true as true, details: "DB error" }, 500);
  }
});

