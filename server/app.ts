import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { auth } from "../lib/auth";
import {
  LikeItemSchema,
  FavoriteItemSchema,
  LikeFavoriteResponseSchema,
  LikeFavoriteResponseSchemaType,
  CheckLikeFavoriteResponseSchema,
  CheckLikeFavoriteResponseSchemaType,
} from "../schemas/activity/activity";
import { toggleLike, toggleFavorite, checkIfLiked } from "./app/allDatabase";
import FormUserApp from "./formUser/routes";
import UserApp from "./user/routes";
import ClientApp from "./client/routes";
import BrandApp from "./brand/routes";
import FeedApp from "./feed/routes";
import ItemApp from "./item/routes";

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
      c.req.path === "/brand/insert-items2" || //TODO NO DEBERIA ESTAR SOLO PARA ENDPOINTS
      c.req.path.startsWith("/code-verification") ||
      (c.req.path === "/client" && c.req.method === "POST")
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
app.route("/feed", FeedApp);
app.route("/item", ItemApp);

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

// app.openapi(checkFavoriteRoute, async c => {
//   const { item_uuid } = c.req.valid("query");
//   const user = c.get("user");
//   let res: CheckLikeFavoriteResponseSchemaType;

//   if (!user?.email) {
//     res = {
//       error: true,
//       details: "Usuario no autenticado",
//     };
//     return c.json(res, 401);
//   }
//   res = await checkIfFavorited(user.email, item_uuid, user.userType);
//   return c.json(res, 200);
// });

// // Endpoint para obtener todos los items liked
// const getAllLikedItemsRoute = createRoute({
//   method: "get",
//   path: "/get-all-liked-items",
//   request: {
//     query: PaginationSchema,
//   },
//   responses: {
//     200: {
//       content: {
//         "application/json": {
//           schema: CatalogResponseSchema,
//         },
//       },
//       description: "Obtiene todos los items liked del usuario",
//     },
//     401: {
//       content: {
//         "application/json": {
//           schema: z.object({
//             error: z.boolean(),
//             details: z.string(),
//           }),
//         },
//       },
//       description: "Usuario no autenticado",
//     },
//   },
// });

// app.openapi(getAllLikedItemsRoute, async c => {
//   const { page, limit } = c.req.valid("query");
//   const user = c.get("user");

//   if (!user?.email) {
//     return c.json(
//       {
//         error: true,
//         details: "Usuario no autenticado",
//       },
//       401
//     );
//   }

//   const res = await getAllLikedFavoritedItems(
//     "likes",
//     user.email,
//     user.userType,
//     page,
//     limit
//   );
//   return c.json(res, 200);
// });

// // Endpoint para obtener todos los items favorited
// const getAllFavoritedItemsRoute = createRoute({
//   method: "get",
//   path: "/get-all-favorited-items",
//   request: {
//     query: PaginationSchema,
//   },
//   responses: {
//     200: {
//       content: {
//         "application/json": {
//           schema: CatalogResponseSchema,
//         },
//       },
//       description: "Obtiene todos los items favorited del usuario",
//     },
//     401: {
//       content: {
//         "application/json": {
//           schema: z.object({
//             error: z.boolean(),
//             details: z.string(),
//           }),
//         },
//       },
//       description: "Usuario no autenticado",
//     },
//   },
// });

// app.openapi(getAllFavoritedItemsRoute, async c => {
//   const { page, limit } = c.req.valid("query");
//   const user = c.get("user");

//   if (!user?.email) {
//     return c.json(
//       {
//         error: true,
//         details: "Usuario no autenticado",
//       },
//       401
//     );
//   }

//   const res = await getAllLikedFavoritedItems(
//     "favorites",
//     user.email,
//     user.userType,
//     page,
//     limit
//   );
//   return c.json(res, 200);
// });
