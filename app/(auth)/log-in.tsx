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
          Log In
        </SignPageHeader>
        <SignPageItems>
          <Input
            placeholder="Email"
            value={email}
            onChange={text => setEmail(text)}
            type="email-address"
          />
          <Input
            placeholder="Password"
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
    <Text className="text-beige font-pmedium text-[15px]">
      Forgot your password?
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

    let message = error.message ?? "Error al iniciar sesión";
    if (error.status === 403) {
      message = "Please verify your email address";
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
