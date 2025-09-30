import { authClient } from "@/lib/auth-client";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import SignPage, {
  Input,
  NextButton,
  SignPageContent,
  SignPageFooter,
  SignPageHeader,
  SignPageItems,
} from "@/app/components/(auth)/signPage";
import { PasswordSchema } from "@/schemas/formUser-schema";
export default function ResetPassword() {
  const params = useLocalSearchParams();
  const token = params.token as string;
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function verifyPassword(): Promise<boolean> {
    const result = PasswordSchema.safeParse({
      password: password,
    });
    if (!result.success) {
      setPasswordError(result.error.message);
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    return true;
  }

  const handleResetPassword = async (password: string) => {
    console.log("Starting password reset");
    const { error } = await authClient.resetPassword({
      newPassword: password, // required
      token, // required
    });

    if (error) {
      console.log("Password reset error", error.message);
      Toast.show({
        type: "error",
        text1: "An error occurred during password reset",
      });
      router.replace("/sign-in");
      return;
    }

    console.log("Password reset successful");
    Toast.show({
      type: "success",
      text1: "Password reset successful!",
    });
    router.replace("/sign-in");
  };

  return (
    <SignPage>
      <SignPageContent>
        <SignPageHeader>Insert your new password</SignPageHeader>
        <SignPageItems>
          <Input
            placeholder="New password"
            value={password}
            onChange={text => {
              setPasswordError(undefined);
              setPassword(text);
            }}
            error={passwordError}
            isPassword={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <Input
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={text => {
              setConfirmPasswordError(undefined);
              setConfirmPassword(text);
            }}
            error={confirmPasswordError}
            isPassword={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </SignPageItems>
      </SignPageContent>
      <SignPageFooter>
        <NextButton
          onPress={async () => {
            setIsLoading(true);
            const isValid = await verifyPassword();
            if (!isValid) {
              setIsLoading(false);
              return;
            }
            await handleResetPassword(password);
            setIsLoading(false);
          }}
          isLoading={isLoading}
        />
      </SignPageFooter>
    </SignPage>
  );
}
