import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import { CreateClient } from "@/server/client/functions";

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
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
  },
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
        after: async (user: {
          userType?: string;
          id: string;
          name: string;
        }) => {
          setTimeout(async () => {
            console.log("After user create", user);
            if (user.userType === "client") {
              await CreateClient(user.id, user.name);
            } else if (user.userType === "brand") {
              console.error("User type is artist");
            } else {
              console.error("User type not found");
            }
          }, 1000);
        },
      },
    },
  },
});
