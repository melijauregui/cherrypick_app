import React from "react";
import { Html, Button, Text } from "@react-email/components";

export const EmailBrand = () => {
  return (
    <Html lang="es" dir="ltr">
      <Text style={{ color: "#000000" }}>¡Gracias por tu interés en registrar tu marca en <strong>CherryPick</strong>!</Text>
      <Text style={{ color: "#000000" }}>Para avanzar con la verificación, por favor completá el siguiente formulario:<br/>
      <a href="https://forms.gle/13WA248W6chvGCm7A" target="_blank">https://forms.gle/13WA248W6chvGCm7A</a></Text>
      <Text style={{ color: "#000000" }}>El equipo de CherryPick revisará tu documentación y validará que la marca esté registrada a nombre de la sociedad informada.<br/>
      Nos contactaremos contigo en caso de requerir información adicional o para coordinar la verificación facial.</Text>
      <Text style={{ color: "#000000" }}>¡Gracias!<br/>Equipo <strong>CherryPick</strong></Text>
    </Html>
  );
};

export const EmailResetPassword = ({
  code,
  userName,
}: {
  code: string | number;
  userName: string | null;
}) => {
  const codeStr = String(code);
  const escapedCode = codeStr.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return (
    <Html lang="es" dir="ltr">
      <Text style={{ color: "#000000" }}>¡Buenas {userName ? userName : ""}!</Text>
      <Text style={{ color: "#000000" }}>Para resetear tu contraseña, por favor ingresá el siguiente código de verificación en nuestra app:<br/>
      <strong>{codeStr}</strong></Text>
      <Text style={{ color: "#000000" }}>¡Gracias!<br/>Equipo <strong>CherryPick</strong></Text>
    </Html>
  );
};

export const EmailVerification = ({
  code,
  userName,
}: {
  code: string | number;
  userName: string | null;
}) => {
  const codeStr = String(code);
  const escapedCode = codeStr.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return (
    <Html lang="es" dir="ltr">
      <Text style={{ color: "#000000" }}>¡Buenas {userName ? userName : ""}!</Text>
      <Text style={{ color: "#000000" }}>Para verificar tu email, por favor ingresá el siguiente código de verificación en nuestra app:<br/>
      <strong>{codeStr}</strong></Text>
    </Html>
  );
};

