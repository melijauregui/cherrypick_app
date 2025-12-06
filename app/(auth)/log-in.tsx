import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import SignPage, {
  Input,
  NextButton,
  SignPageContent,
  SignPageFooter,
  SignPageHeader,
  SignPageItems,
} from "@/app/components/(auth)/signPage";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SignPage>
      <SignPageContent>
        <SignPageHeader onBackButton={() => router.back()}>
          Iniciar Sesión
        </SignPageHeader>
        <SignPageItems>
          <Input
            placeholder="Correo electrónico"
            value={email}
            onChange={text => setEmail(text)}
            type="email-address"
          />
          <Input
            placeholder="Contraseña"
            value={password}
            onChange={text => setPassword(text)}
            isPassword={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <ForgotPasswordButton />
        </SignPageItems>
      </SignPageContent>
      <SignPageFooter>
        <NextButton
          onPress={async () => {
            setIsLoading(true);
            try {
              await handleSubmit(email, password);
            } finally {
              setIsLoading(false);
            }
          }}
          isLoading={isLoading}
          isDisabled={isLoading || !email || !password}
        />
      </SignPageFooter>
    </SignPage>
  );
}

const ForgotPasswordButton = () => (
  <TouchableOpacity
    className="flex flex-row justify-center items-center bottom-6"
    // onPress={() => router.push("/forgot-password")}
    onPress={() => router.push("/forgot-password")}
  >
    <Text className="text-beige-strong font-pmedium text-[15px]">
      ¿Olvidaste tu contraseña?
    </Text>
  </TouchableOpacity>
);

async function handleSubmit(email: string, password: string) {
  const { error, data } = await authClient.signIn.email({
    email,
    password,
  });
  if (error) {
    console.error(error);

    let message: string;
    if (error.status === 401 || error.status === 400 || error.status === 403) {
      message = "Correo o contraseña incorrectos";
    } else {
      message = "Error al iniciar sesión";
    }
    Toast.show({
      type: "error",
      text1: message,
    });
    return;
  }
  if (data?.user.emailVerified) {
    router.replace("/home");
  } else {
    router.push("/verify-email");
  }
}
