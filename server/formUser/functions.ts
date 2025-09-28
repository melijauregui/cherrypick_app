import { db } from "../db.config";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import {
  ExpirationCodeResponseSchemaType,
  VerifyCodeResponseSchemaType,
} from "@/schemas/formUser-schema";
import { SuccessSchemaType } from "@/schemas/standar-response-schema";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import { ContentfulStatusCode } from "hono/utils/http-status";

export async function SaveVerificationCode(
  email: string,
  code: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;

  try {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 3); // Expira en 3 minutos
    const expirationString = expirationTime.toISOString();

    await db.registerInProgress.upsert({
      where: { email },
      update: {
        verificationCode: code,
        verificationCodeExpiration: expirationString,
      },
      create: {
        email,
        verificationCode: code,
        verificationCodeExpiration: expirationString,
      },
    });

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

export async function SendEmail(email: string, code: string): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Enviando correo a:", email);
    const info = await transporter.sendMail({
      from: `"Cherrypick" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verificá tu dirección de correo electrónico",
      text: `¡Gracias por registrarte en CherryPick!\n\nPara completar la creación de tu cuenta, por favor ingresá el siguiente código de verificación en nuestra app:\n\n${code}\n\n¡Gracias!\nEl equipo de CherryPick.`,
      html: `
            <p>¡Gracias por registrarte en <strong>CherryPick</strong>!</p>
            <p>Para completar la creación de tu cuenta, por favor ingresá el siguiente código de verificación en nuestra app:</p>
            <p><strong>${code}</strong></p>
            <p>¡Gracias!<br/>Equipo <strong>CherryPick</strong></p>
          `,
    });
    return true;
  } catch (error) {
    console.error("Error enviando correo:", error);
    return false;
  }
}

function GenerateVerificationCode(): string {
  return String(randomInt(100000, 999999));
}

export { GenerateVerificationCode };

export async function VerifyVerificationCode(
  email: string,
  code: string
): Promise<
  | VerifyCodeResponseSchemaType
  | { error: true; errMsg: ErrorSchemaType; statusCode: ContentfulStatusCode }
> {
  let res: VerifyCodeResponseSchemaType | ErrorSchemaType;

  try {
    const registerInProgress = await db.registerInProgress.findUnique({
      where: { email },
    });

    if (!registerInProgress) {
      res = {
        error: true,
        details: "Email not found",
      };
      return { error: true, errMsg: res, statusCode: 404 };
    }

    const { verificationCode, verificationCodeExpiration } = registerInProgress;

    if (!verificationCode || verificationCode !== code) {
      res = {
        error: false,
        isCorrect: false,
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
    await db.registerInProgress.delete({
      where: { email },
    });
    // Update the user to be verified
    await db.user.update({
      where: { email },
      data: {
        emailVerified: true,
      },
    });
    res = {
      error: false,
      isCorrect: true,
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Enviando correo a:", email);
    const info = await transporter.sendMail({
      from: `"Cherrypick" <${process.env.SMTP_USER}>`,
      to: email,
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

export async function GetExpirationCode(
  email: string
): Promise<ExpirationCodeResponseSchemaType | ErrorSchemaType> {
  const registerInProgress = await db.registerInProgress.findUnique({
    where: { email },
  });
  if (!registerInProgress) {
    return {
      error: true,
      details: "Email not found",
    };
  }
  return {
    error: false,
    expirationTime: new Date(registerInProgress.verificationCodeExpiration),
  };
}
