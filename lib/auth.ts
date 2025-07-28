import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { expo } from "@better-auth/expo";
import { createAuthMiddleware } from "better-auth/api";
import { verifyEmail } from "../server/app/verifyEmail";

console.log("BETTER_AUTH_URL", process.env.BETTER_AUTH_URL);
export const auth = betterAuth({
  plugins: [expo()],
  database: createPool({
    host: "localhost", // o el host de tu contenedor o servicio
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [
    "cherrypick://",
    "http://localhost:3000",
    "https://gibbon-amazing-neatly.ngrok-free.app",
  ],
  baseURL: process.env.BETTER_AUTH_URL,
  user: {
    additionalFields: {
      new: {
        type: "boolean",
      },
      userType: {
        type: "string",
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user: {
          email: string;
          new?: boolean;
          userType?: string;
        }) => {
          const res = await verifyEmail(user.email);
          if (!res.error) {
            return;
          }
          return { data: { ...user, new: false, userType: res.userType } };
        },
      },
    },
  },
});
