import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import { randomUUID } from "crypto";
import { CreateClient } from "@/server/client/functions";
import {
  GenerateVerificationCode,
  SaveVerificationCode,
  SaveVerificationCodeResetPassword,
  SendEmail,
  SendEmailResetPassword,
} from "@/server/formUser/functions";
import { config } from "@/config";

// console.log("BETTER_AUTH_URL", config.BETTER_AUTH_URL);

export const auth = betterAuth({
  plugins: [expo()],
  database: new Pool({
    connectionString: config.DATABASE_URL,
  }),
  advanced: {
    generateId: () => randomUUID(),
    ...(config.ENVIRONMENT === "production"
      ? {
          cookies: {
            state: {
              attributes: {
                sameSite: "none",
                secure: true,
              },
            },
          },
        }
      : {}),
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("YEEES Sending reset password email to", user.email);
      const code = GenerateVerificationCode();
      const emailSent = await SendEmailResetPassword(user.email, code);
      if (!emailSent) {
        throw new Error(
          "No se pudo enviar el email de restablecimiento de contraseña"
        );
      }
      const res = await SaveVerificationCodeResetPassword(user.id, code, token);
      if (res.error) {
        throw new Error(
          "No se pudo guardar el código de restablecimiento de contraseña"
        );
      }
      console.log(
        "Email de restablecimiento de contraseña enviado correctamente!!!"
      );
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
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: [
    "cherrypick://",
    "https://gibbon-amazing-neatly.ngrok-free.app",
    config.BETTER_AUTH_URL,
  ],
  baseURL: config.BETTER_AUTH_URL,
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
