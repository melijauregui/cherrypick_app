import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { PaginationSchema } from "./app/allDatabase";
import {
  VerifyAvailabilitySchema,
  QueryVerifyAvalabilitySchema,
  VerifyAvailabilitySchemaType,
  ResCodeVerificationPostSchema,
  BodyCodeVerificationPostSchema,
  BodyUserVerificationPostSchema,
  ResCodeVerificationPostSchemaType,
  VerifyAccountDeletedSchema,
  VerifyAccountDeletedSchemaType,
} from "../schemas/auth/sign-up-schema";
import {
  QueryVerifyCodeSchema,
  VerifyCodeSchema,
  VerifyCodeSchemaType,
} from "../schemas/auth/code-verification-schema";
import {
  CreateAccountSchemaRes,
  CreateAccountSchemaResType,
  CreateAccountSchema,
  QueryGetUserSchema,
  UserSchemaRes,
  UserSchemaResType,
} from "../schemas/auth/preferences-schema";
import {
  VerifyUserResponseSchema,
  VerifyUserResponseSchemaType,
} from "../schemas/auth/sign-in-schema";
import {
  UpdateCatalog,
  GetBrand,
  VerifyBrand,
  DeleteFromCatalog,
} from "./app/catalogFunctions";
import {
  CatalogResponseSchema,
  CatalogResponseSchemaType,
  CatalogItemArraySchema,
  PaginationSchemaBrand,
  CatalogResponseSchemaDelete,
  CatalogResponseSchemaDeleteType,
  GetItemQuerySchema,
  GetItemResponseSchema,
  GetItemResponseSchemaType,
} from "../schemas/catalog/catalog-schema";
import {
  QueryWeaviateImage,
  QueryWeaviateAllItems,
  QueryWeaviateItem,
} from "./app/routeVector";
import {
  BrandSchemaRes,
  BrandSchemaResType,
  QueryGetBrandSchema,
  QueryAllBrandItemsSchema,
  AllBrandItemsSchemaRes,
  AllBrandItemsSchemaResType,
  UpdateBrandSchema,
} from "../schemas/auth/brand-schema";
import {
  verifyEmail,
  SaveVerificationCode,
  GenerateVerificationCode,
  SendEmail,
  VerifyVerificationCode,
  SendEmailBrand,
} from "./app/verifyEmail";
import {
  VerifyUserExists,
  CreateUser,
  DeleteUser,
  GetClient,
  UpdateClient,
  UpdateBrand,
} from "./app/userFunctions";
import {
  jsonCatalogUploadSchema,
  deleteItemsJsonSchema,
} from "../schemas/catalog/catalog-schema";
import { auth } from "../lib/auth";

const app = new OpenAPIHono();
export default app;

app.on(["POST", "GET"], "/api/auth/**", async c => {
  const res = await auth.handler(c.req.raw);
  return res;
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
app.openapi(verifiedEmailRoute, async c => {
  const { email } = c.req.valid("query");
  let res: VerifyAvailabilitySchemaType;
  console.log("Verifying email availability:", email);
  try {
    res = await verifyEmail(email);
  } catch (err) {
    console.error("Error checking email:", err);
    res = {
      error: true,
      details: "Error querying the database",
      userType: null,
    };
  }
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
  },
});
app.openapi(codeVerificationRoute, async c => {
  const { email } = await c.req.valid("json");
  const code = GenerateVerificationCode();
  const emailSent = await SendEmail(email, code);
  let res: ResCodeVerificationPostSchemaType;

  if (!emailSent) {
    // return c.json({ error: true as true, details: "Invalid email" }, 200);
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
  },
});
app.openapi(verifiedCodeRoute, async c => {
  const { code, email } = c.req.valid("query");
  let res: VerifyCodeSchemaType;

  try {
    res = await VerifyVerificationCode(email, code);
    return c.json(res, 200);
  } catch (err) {
    console.error("Error al verificar código:", err);
    return c.json({ error: true as true, details: "DB error" }, 200);
  }
});

// endpoint que verifica si el usuario existe en la base de datos
const verifyUserRoute = createRoute({
  method: "post",
  path: "/verify-user",
  request: {
    body: {
      content: {
        "application/json": { schema: BodyUserVerificationPostSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: VerifyUserResponseSchema,
        },
      },
      description: "Devuelve si el usuario existe o no",
    },
  },
});
app.openapi(verifyUserRoute, async c => {
  const { email } = c.req.valid("json");
  let res: VerifyUserResponseSchemaType;
  console.log("Verifying user3:", email);

  // Buscar primero en users
  res = await VerifyUserExists(email);
  console.log("Verifying user4:", res);
  return c.json(res, 200);
});

// endpoint que crea un nuevo usuario en la base de datos
const createUserRoute = createRoute({
  method: "post",
  path: "/create-account",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateAccountSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Crea un nuevo usuario",
      content: {
        "application/json": {
          schema: CreateAccountSchemaRes,
        },
      },
    },
  },
});

app.openapi(createUserRoute, async c => {
  const { name, email, dateString, preferences } = c.req.valid("json");
  let res: CreateAccountSchemaResType;
  console.log("Creating client:", name, email, dateString, preferences);

  try {
    let date = dateString;
    if (dateString === "") {
      date = null;
    }
    res = await CreateUser(email, name, date, preferences);
  } catch (err) {
    console.error(err);
    res = {
      error: true,
      details: "Server error",
    };
  }
  return c.json(res, 200);
});

// endpoint que elimina un usuario de la base de datos
const deleteAccountRoute = createRoute({
  method: "post",
  path: "/delete-account",
  request: {
    body: {
      content: {
        "application/json": {
          schema: BodyUserVerificationPostSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Elimina la cuenta del usuario",
      content: {
        "application/json": {
          schema: VerifyAccountDeletedSchema,
        },
      },
    },
  },
});

app.openapi(deleteAccountRoute, async c => {
  const { email } = c.req.valid("json");
  let res: VerifyAccountDeletedSchemaType;

  try {
    res = await DeleteUser(email);
  } catch (error) {
    console.error(error);
    return c.json({ error: true as true, details: "Server error" }, 200);
  }
  return c.json(res, 200);
});

// endpoint que obtiene la información del cliente
const getClientRoute = createRoute({
  method: "get",
  path: "/get-client",
  request: {
    query: QueryGetUserSchema,
  },
  responses: {
    200: {
      description: "Obtiene la información del usuario",
      content: {
        "application/json": {
          schema: UserSchemaRes,
        },
      },
    },
  },
});

app.openapi(getClientRoute, async c => {
  const { email } = c.req.valid("query");
  let res: UserSchemaResType;

  try {
    res = await GetClient(email);
  } catch (error) {
    console.error(error);
    return c.json({ error: true as true, details: "Server error" }, 200);
  }
  return c.json(res, 200);
});

// endpoint que actualiza la información del cliente
const updateClientRoute = createRoute({
  method: "post",
  path: "/update-client",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateAccountSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Actualiza la información del usuario",
      content: {
        "application/json": {
          schema: CreateAccountSchemaRes,
        },
      },
    },
  },
});

app.openapi(updateClientRoute, async c => {
  var { name, email, dateString, preferences } = c.req.valid("json");
  let res: CreateAccountSchemaResType;
  console.log("Updating client:", name, email, dateString, preferences);
  try {
    res = await UpdateClient(email, name, dateString, preferences);
  } catch (error) {
    console.error(error);
    return c.json({ error: true as true, details: "Server error" }, 200);
  }
  return c.json(res, 200);
});

// endpoint que obtiene la información de la marca
const getBrandRoute = createRoute({
  method: "get",
  path: "/get-brand",
  request: {
    query: QueryGetBrandSchema,
  },
  responses: {
    200: {
      description: "Obtiene la información de la marca",
      content: {
        "application/json": {
          schema: BrandSchemaRes,
        },
      },
    },
  },
});

app.openapi(getBrandRoute, async c => {
  const { email } = c.req.valid("query");
  let res: BrandSchemaResType;

  try {
    res = await GetBrand(email);
  } catch (error) {
    console.error(error);
    return c.json({ error: true as true, details: "Server error" }, 200);
  }
  return c.json(res, 200);
});

// endpoint que actualiza la información de la marca
const updateBrandRoute = createRoute({
  method: "post",
  path: "/update-brand",
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
          schema: CreateAccountSchemaRes,
        },
      },
    },
  },
});

app.openapi(updateBrandRoute, async c => {
  var { description, url, email } = c.req.valid("json");
  let res: CreateAccountSchemaResType;
  console.log("Updating brand:", description, url);
  try {
    res = await UpdateBrand(email, description, url);
  } catch (error) {
    console.error(error);
    return c.json({ error: true as true, details: "Server error" }, 200);
  }
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
          schema: CatalogItemArraySchema,
        },
      },
      description: "Devuelve los datos de la base de datos de forma paginada",
    },
  },
});
app.openapi(paginatedRoute, async c => {
  const { page, limit } = c.req.valid("query");
  console.log("Received request with pageeee", page, "and limit", limit);
  const embedding = Array(768).fill(0.5);

  const res = await QueryWeaviateImage(embedding, page, limit, undefined);
  return c.json(res, 200);
});

// endpoint que devuelve los 10 resultados de los items de una marca
const paginatedRouteBrand = createRoute({
  method: "get",
  path: "/all-brand",
  request: {
    query: PaginationSchemaBrand,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CatalogItemArraySchema,
        },
      },
      description: "Devuelve los datos de la base de datos de forma paginada",
    },
  },
});
app.openapi(paginatedRouteBrand, async c => {
  const { page, limit, brandEmail } = c.req.valid("query");
  console.log("Brand email and page and limit", brandEmail, page, limit);

  const embedding = Array(768).fill(0.5);

  const res = await QueryWeaviateImage(embedding, page, limit, brandEmail);
  return c.json(res, 200);
});

// endpoint que publica un nuevo code-verification
const sendFormBrandRoute = createRoute({
  method: "post",
  path: "/send-form-brand",
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
app.openapi(sendFormBrandRoute, async c => {
  const { email } = await c.req.valid("json");
  //verifico que no exista ya en la base de datos con verifyEmail
  let res: ResCodeVerificationPostSchemaType;
  const emailExists = await verifyEmail(email);
  console.log("emailExists", emailExists);
  if (emailExists.error) {
    res = {
      error: true,
      details: "Email already registered",
    };
    return c.json(res, 200);
  }

  try {
    const emailSent = await SendEmailBrand(email);

    if (emailSent.error) {
      res = {
        error: true,
        details: "Error al enviar el correo",
      };
      return c.json(res, 200);
    }
    res = {
      error: false,
    };
  } catch (err) {
    res = {
      error: true,
      details: "Error al enviar el correo",
    };
  }
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
  const { items, brandEmail } = await c.req.valid("json");
  //verifico que la marca exista en la base de datos
  let res: CatalogResponseSchemaType;
  const brandExists = await VerifyBrand(brandEmail);
  if (!brandExists) {
    res = {
      error: true,
      details: "Marca no encontrada",
    };
    return c.json(res, 200);
  }
  try {
    res = await UpdateCatalog(items, brandEmail);
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
  const { items, brandEmail } = c.req.valid("json");
  // Extraer los nombres de los items del array de objetos
  const itemsNames = items.map(item => item.name);

  //verifico que la marca exista en la base de datos
  let res: CatalogResponseSchemaDeleteType;
  const brandExists = await VerifyBrand(brandEmail);
  if (!brandExists) {
    res = {
      error: true,
      details: "Marca no encontrada",
      numberDeleted: 0,
    };
    return c.json(res, 200);
  }
  try {
    res = await DeleteFromCatalog(itemsNames, brandEmail);
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
  const { brandEmail, filter, page = 0, limit = 10 } = c.req.valid("query");
  console.log(
    "Brand email for all items",
    brandEmail,
    "filter:",
    filter,
    "page:",
    page,
    "limit:",
    limit
  );
  let res: AllBrandItemsSchemaResType;
  res = await QueryWeaviateAllItems(brandEmail, filter, page, limit);
  console.log("res", res);
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
  const { name, brandEmail } = c.req.valid("query");
  console.log("Getting item:", name, "from brandEmail:", brandEmail);

  let res: GetItemResponseSchemaType;

  try {
    res = await QueryWeaviateItem(name, brandEmail);
  } catch (error) {
    console.error("Error getting item:", error);
    res = {
      error: true,
      details: "Error interno del servidor",
    };
  }

  return c.json(res, 200);
});
