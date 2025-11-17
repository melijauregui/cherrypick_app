import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Text } from "react-native";
import Toast from "react-native-toast-message";
import SignPage, {
  Input,
  NextButton,
  SignPageContent,
  SignPageFooter,
  SignPageHeader,
  SignPageItems,
} from "@/app/components/(auth)/signPage";
import { router } from "expo-router";
import { verifyMailAvailability } from "../../utils/fetch";
import { QueryEmailSchema } from "@/schemas/standar-query-schema";
import { useResendCodeResetPassword } from "../../utils/update";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const resendCode = useResendCodeResetPassword();

  async function verifyEmail(): Promise<boolean> {
    const result = QueryEmailSchema.safeParse({
      email: email,
    });
    if (!result.success) {
      setEmailError("El correo electrónico no es válido");
      return false;
    }

    const resVerify = await verifyMailAvailability(email);
    if (resVerify.error) {
      console.error("Error verifying email availability", resVerify.details);
      Toast.show({
        type: "error",
        text1:
          "Ocurrió un error al verificar la disponibilidad del correo electrónico",
      });
      return false;
    }
    if (!resVerify.exists) {
      setEmailError("El correo electrónico no existe");
      return false;
    }
    return true;
  }

  const handleResendEmail = async (email: string) => {
    await resendCode.mutateAsync(email);
    router.replace({
      pathname: "/code-verification-password",
      params: { email: email },
    });
  };

  return (
    <SignPage>
      <SignPageContent>
        <SignPageHeader onBackButton={() => router.back()}>
          <Text className="text-white text-[27px] font-pbold text-center mb-4">
            Restablece tu contraseña
          </Text>
        </SignPageHeader>
        <SignPageItems>
          <Text className="text-gray-400 text-[14px] font-plight text-center mb-8 leading-6">
            Por favor, ingresa la dirección de correo electrónico asociada con
            tu cuenta.
          </Text>

          <Input
            type="email-address"
            placeholder="Correo electrónico"
            value={email}
            onChange={text => {
              setEmailError(undefined);
              setEmail(text.toLowerCase());
            }}
            error={emailError}
          />
        </SignPageItems>
      </SignPageContent>
      <SignPageFooter>
        <NextButton
          onPress={async () => {
            setIsLoading(true);
            const isValid = await verifyEmail();
            if (!isValid) {
              setIsLoading(false);
              return;
            }
            await handleResendEmail(email);
            setIsLoading(false);
          }}
          isLoading={isLoading}
        />
      </SignPageFooter>
    </SignPage>
  );
}
