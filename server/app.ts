import fs from "fs";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
  callVGGNet,
  ImageParamSchema,
  queryPinecone,
  TopMatchesSchema,
} from "./app/routeVector";
import { PaginationSchema } from "./app/allDatabase";
import {
  verifyAvailabilitySchema,
  queryVerifyAvalabilitySchema,
  VerifyAvailabilitySchemaType,
} from "../schemas/auth/sign-up-schema";

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
    query: queryVerifyAvalabilitySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: verifyAvailabilitySchema,
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
  }
  return c.json(res, 200);
});

function verifyGoogleMail(email: string): boolean {
  // Simulación de verificación de un email registrado en Google
  const googleEmails = ["m@gmail.com", "s@gmail.com", "p@gmail.com"];
  return googleEmails.includes(email);
}
