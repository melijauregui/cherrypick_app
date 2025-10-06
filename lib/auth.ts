import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import { CreateClient } from "@/server/client/functions";
import {
  GenerateVerificationCode,
  SaveVerificationCode,
  SaveVerificationCodeResetPassword,
  SendEmail,
  SendEmailResetPassword,
} from "@/server/formUser/functions";

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
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("YEEES Sending reset password email to", user.email);
      const code = GenerateVerificationCode();
      const emailSent = await SendEmailResetPassword(user.email, code);
      if (!emailSent) {
        throw new Error("Failed to send verification email");
      }
      const res = await SaveVerificationCodeResetPassword(user.id, code, token);
      if (res.error) {
        throw new Error("Failed to save verification code reset password");
      }
      console.log("Reset password email sent successfully!!!");
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url, token }, request) {
      const code = GenerateVerificationCode();
      const emailSent = await SendEmail(user.email, code);
      if (!emailSent) {
        throw new Error("Failed to send verification email");
      }
      const res = await SaveVerificationCode(user.id, code, token);
      if (res.error) {
        throw new Error("Failed to save verification code");
      }
    },
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
          // Wait for the timeout and then execute the logic
          await new Promise(resolve => setTimeout(resolve, 500));

          console.log("After user create", user);
          if (user.userType === "client") {
            await CreateClient(user.id, user.name);
          } else if (user.userType === "brand") {
            console.error("User type is artist");
          } else {
            console.error("User type not found");
          }
        },
      },
    },
  },
});
