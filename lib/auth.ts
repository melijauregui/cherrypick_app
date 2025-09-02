import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import { VerifyUserExists } from "../server/user/functions";

console.log("BETTER_AUTH_URL", process.env.BETTER_AUTH_URL);

export const auth = betterAuth({
  plugins: [expo()],
  database: new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 5432,
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
    "https://gibbon-amazing-neatly.ngrok-free.app",
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
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
          const { exists, userType } = await VerifyUserExists(user.email);
          if (!exists) {
            console.error("User does not exist");
            return;
          }
          return { data: { ...user, new: false, userType: userType } };
        },
      },
    },
  },
});
