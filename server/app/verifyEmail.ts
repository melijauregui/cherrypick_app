import { db } from "../db";
import {
  ResCodeVerificationPostSchemaType,
  VerifyAvailabilitySchemaType,
} from "../../schemas/auth/sign-up-schema";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import {
  VerifyCodeSchemaType,
  queryDbSchemaRegisterInProgress,
} from "../../schemas/auth/code-verification-schema";

async function verifyEmail(
  email: string
): Promise<VerifyAvailabilitySchemaType> {
  let res: VerifyAvailabilitySchemaType;
  const [rows]: any[] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (rows.length === 0) {
    // Email no registrado
    //verificar si es marca
    const [brandRows]: any[] = await db.query(
      "SELECT * FROM brands WHERE email = ?",
      [email]
    );
    if (brandRows.length === 0) {
      res = {
        error: false,
      };
    } else {
      res = {
        error: true,
        details: "Email already registered as brand",
      };
    }
  } else {
    // Email ya registrado
    res = {
      error: true,
      details: "Email already registered as client",
    };
  }
  return res;
}

export { verifyEmail };

async function SendVerificationCode(
  email: string,
  code: string
): Promise<ResCodeVerificationPostSchemaType> {
  let res: ResCodeVerificationPostSchemaType;
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 3); // Expira en 3 minutos
  const expirationString = expirationTime.toISOString(); // "2025-05-14T18:30:00.000Z"
  await db.query(
    `
        INSERT INTO registerInProgress (email, verification_code, verification_code_expiration)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE verification_code = VALUES(verification_code), verification_code_expiration = VALUES(verification_code_expiration)
        `,
    [email, code, expirationString]
  );
  res = {
    error: false,
  };
  return res;
}

export { SendVerificationCode };

export async function sendEmail(email: string, code: string): Promise<boolean> {
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
      subject: "Verify your email address",
      text: `Thank you for signing up for CherryPick!\n\nTo complete your account setup, please enter the following verification code on our app:\n\n${code}\n\nThanks,\nthe CherryPick Team.`,
      html: `
          <p>Thank you for signing up for <strong>CherryPick</strong>!</p>
          <p>To complete your account setup, please enter the following verification code on our app:</p>
          <p><strong>${code}</strong></p>
          <p>Thanks,<br>The <strong>CherryPick</strong> Team</p>
        `,
    });

    console.log("Correo enviado:", info.messageId);
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
): Promise<VerifyCodeSchemaType> {
  let res: VerifyCodeSchemaType;
  const [rows]: any[] = await db.query(
    `SELECT verification_code, verification_code_expiration FROM registerInProgress WHERE email = ?`,
    [email]
  );

  if (rows.length === 0) {
    res = {
      error: true,
      details: "Email not found",
    };
    return res;
  }

  const parsedRows = queryDbSchemaRegisterInProgress.parse(rows);
  const { verification_code, verification_code_expiration } = parsedRows[0];

  if (!verification_code || verification_code !== code) {
    res = {
      error: false,
      isCorrect: false,
    };
    return res;
  }

  if (new Date() > new Date(verification_code_expiration)) {
    res = {
      error: true,
      details: "Verification code expired",
    };
    return res;
  }

  await db.query("DELETE FROM registerInProgress WHERE email = ?", [email]);

  console.log("Código de verificación correcto");
  res = {
    error: false,
    isCorrect: true,
  };
  return res;
}
