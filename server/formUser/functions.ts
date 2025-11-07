import { db } from "../db.config";
import { randomInt } from "crypto";
import {
  ExpirationCodeResponseSchemaType,
  VerifyCodeResponseSchemaType,
  VerifyCodeResponseSchemaTypeResetPassword,
  VerifyCodeSchemaType,
} from "@/schemas/formUser-schema";
import { SuccessSchemaType } from "@/schemas/standar-response-schema";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { auth } from "@/lib/auth";
import { Resend } from "resend";
import { config } from "@/config";

const resend = new Resend(config.RESEND_API_KEY);

export async function SaveVerificationCode(
  userId: string,
  code: string,
  token: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;

  try {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 3); // Expira en 3 minutos
    const expirationString = expirationTime.toISOString();

    await db.registerInProgress.upsert({
      where: { userId },
      update: {
        verificationCode: code,
        verificationCodeExpiration: expirationString,
        token,
      },
      create: {
        userId,
        verificationCode: code,
        verificationCodeExpiration: expirationString,
        token,
      },
    });
    console.log("Saved verification code for userId", userId, code);

    res = {
      error: false,
    };
  } catch (error) {
    console.error("Error saving verification code:", error);
    res = {
      error: true,
      details: "Error saving verification code",
    };
  }

  return res;
}

export async function SaveVerificationCodeResetPassword(
  userId: string,
  code: string,
  token: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;

  try {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 3); // Expira en 3 minutos
    const expirationString = expirationTime.toISOString();

    await db.resetPasswordInProgress.upsert({
      where: { userId },
      update: {
        verificationCode: code,
        verificationCodeExpiration: expirationString,
        token,
      },
      create: {
        userId,
        verificationCode: code,
        verificationCodeExpiration: expirationString,
        token,
      },
    });
    console.log(
      "Saved verification code reset password for userId",
      userId,
      code
    );

    res = {
      error: false,
    };
  } catch (error) {
    console.error("Error saving verification code reset password:", error);
    res = {
      error: true,
      details: "Error saving verification code reset password",
    };
  }

  return res;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string[];
  subject: string;
  html: string;
  text: string;
}) {
  const { error } = await resend.emails.send({
    from: "cherrypick.noreply@cherrypick.com.ar",
    to,
    subject,
    html,
    text,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function SendEmail(email: string, code: string): Promise<boolean> {
  try {
    console.log("Enviando correo a:", email);
    const result = await sendEmail({
      to: [email],
      subject: "Verificá tu dirección de correo electrónico",
      text: `¡Gracias por registrarte en CherryPick!\n\nPara completar la creación de tu cuenta, por favor ingresá el siguiente código de verificación en nuestra app:\n\n${code}\n\n¡Gracias!\nEl equipo de CherryPick.`,
      html: `
            <p>¡Gracias por registrarte en <strong>CherryPick</strong>!</p>
            <p>Para completar la creación de tu cuenta, por favor ingresá el siguiente código de verificación en nuestra app:</p>
            <p><strong>${code}</strong></p>
            <p>¡Gracias!<br/>Equipo <strong>CherryPick</strong></p>
          `,
    });
    return result.success;
  } catch (error) {
    console.error("Error enviando correo:", error);
    return false;
  }
}

export async function SendEmailResetPassword(
  email: string,
  code: string
): Promise<boolean> {
  try {
    console.log("Enviando correo a:", email);
    const result = await sendEmail({
      to: [email],
      subject: "Resetear contraseña",
      text: `¡Gracias por registrarte en CherryPick!\n\nPara resetear tu contraseña, por favor ingresá el siguiente código de verificación en nuestra app:\n\n${code}\n\n¡Gracias!\nEl equipo de CherryPick.`,
      html: `
            <p>¡Gracias por registrarte en <strong>CherryPick</strong>!</p>
            <p>Para resetear tu contraseña, por favor ingresá el siguiente código de verificación en nuestra app:</p>
            <p><strong>${code}</strong></p>
            <p>¡Gracias!<br/>Equipo <strong>CherryPick</strong></p>
          `,
    });
    return result.success;
  } catch (error) {
    console.error("Error enviando correo:", error);
    return false;
  }
}

function GenerateVerificationCode(): string {
  return String(randomInt(100000, 999999));
}

export { GenerateVerificationCode };

export async function VerifyVerificationCodeRegister(
  userId: string,
  code: string
): Promise<
  | VerifyCodeResponseSchemaType
  | { error: true; errMsg: ErrorSchemaType; statusCode: ContentfulStatusCode }
> {
  const res = await VerifyVerificationCode(
    userId,
    code,
    async () => await db.registerInProgress.findUnique({ where: { userId } }),
    async () => {
      const resDelete = await db.registerInProgress.delete({
        where: { userId },
      });
      await auth.api.verifyEmail({
        query: {
          token: resDelete.token,
        },
      });
      return resDelete.token;
    }
  );
  if (res.error) {
    return res;
  }
  return { error: res.error, isCorrect: res.isCorrect };
}

export async function VerifyVerificationCodeResetPassword(
  userId: string,
  code: string
): Promise<
  | VerifyCodeResponseSchemaTypeResetPassword
  | { error: true; errMsg: ErrorSchemaType; statusCode: ContentfulStatusCode }
> {
  return await VerifyVerificationCode(
    userId,
    code,
    async () =>
      await db.resetPasswordInProgress.findUnique({ where: { userId } }),
    async () => {
      const resDelete = await db.resetPasswordInProgress.delete({
        where: { userId },
      });
      return resDelete.token;
    }
  );
}

async function VerifyVerificationCode(
  userId: string,
  code: string,
  searchInProgress: () => Promise<VerifyCodeSchemaType | null>,
  onVerificationSuccess: () => Promise<string>
): Promise<
  | VerifyCodeResponseSchemaTypeResetPassword
  | { error: true; errMsg: ErrorSchemaType; statusCode: ContentfulStatusCode }
> {
  let res: VerifyCodeResponseSchemaTypeResetPassword | ErrorSchemaType;

  try {
    const inProgress = await searchInProgress();

    if (!inProgress) {
      res = {
        error: true,
        details: "User not found",
      };
      return { error: true, errMsg: res, statusCode: 404 };
    }

    const { verificationCode, verificationCodeExpiration } = inProgress;

    if (!verificationCode || verificationCode !== code) {
      res = {
        error: false,
        isCorrect: false,
        token: "",
      };
      return res;
    }

    if (new Date() > new Date(verificationCodeExpiration)) {
      res = {
        error: true,
        details: "Verification code expired",
      };
      return { error: true, errMsg: res, statusCode: 410 };
    }

    // Delete the verification code after successful verification
    const token = await onVerificationSuccess();
    res = {
      error: false,
      isCorrect: true,
      token,
    };
  } catch (error) {
    console.error("Error verifying code:", error);
    res = {
      error: true,
      details: "Error verifying code",
      info: error instanceof Error ? error.message : "Unknown error",
    };
    return { error: true, errMsg: res, statusCode: 500 };
  }

  return res;
}

export async function SendEmailBrand(
  email: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  try {
    console.log("Enviando correo a:", email);
    const result = await sendEmail({
      to: [email],
      subject: "Verificación de marca en CherryPick",
      text: `¡Gracias por tu interés en registrar tu marca en CherryPick!\n\nPara avanzar con la verificación, por favor completá el siguiente formulario: https://forms.gle/13WA248W6chvGCm7A\n\nEl equipo de CherryPick revisará tu documentación y validará que la marca esté registrada a nombre de la sociedad informada. Nos contactaremos contigo en caso de requerir información adicional o para coordinar la verificación facial.\n\n¡Gracias!\nEl equipo de CherryPick`,
      html: `
          <p>¡Gracias por tu interés en registrar tu marca en <strong>CherryPick</strong>!</p>
          <p>Para avanzar con la verificación, por favor completá el siguiente formulario:<br/>
          <a href="https://forms.gle/13WA248W6chvGCm7A" target="_blank">https://forms.gle/13WA248W6chvGCm7A</a></p>
          <p>El equipo de CherryPick revisará tu documentación y validará que la marca esté registrada a nombre de la sociedad informada.<br/>
          Nos contactaremos contigo en caso de requerir información adicional o para coordinar la verificación facial.</p>
          <p>¡Gracias!<br/>Equipo <strong>CherryPick</strong></p>
        `,
    });

    if (!result.success) {
      return {
        error: true,
        details: result.error || "Error al enviar el correo",
      };
    }

    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      details: "Error al enviar el correo",
    };
  }
}

export async function GetExpirationCodeRegister(
  userId: string
): Promise<ExpirationCodeResponseSchemaType | ErrorSchemaType> {
  return await GetExpirationCode(userId, () =>
    db.registerInProgress.findUnique({ where: { userId } })
  );
}

export async function GetExpirationCodeResetPassword(
  userId: string
): Promise<ExpirationCodeResponseSchemaType | ErrorSchemaType> {
  return await GetExpirationCode(userId, () =>
    db.resetPasswordInProgress.findUnique({ where: { userId } })
  );
}

async function GetExpirationCode(
  userId: string,
  searchInProgress: () => Promise<VerifyCodeSchemaType | null>
): Promise<ExpirationCodeResponseSchemaType | ErrorSchemaType> {
  const registerInProgress = await searchInProgress();
  if (!registerInProgress) {
    console.log("Email not found", userId);
    return {
      error: true,
      details: "User not found",
    };
  }
  return {
    error: false,
    expirationTime: new Date(registerInProgress.verificationCodeExpiration),
  };
}
