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
      setEmailError("Email is invalid");
      return false;
    }

    const resVerify = await verifyMailAvailability(email);
    if (resVerify.error) {
      console.error("Error verifying email availability", resVerify.details);
      Toast.show({
        type: "error",
        text1: "An error occurred while verifying email availability",
      });
      return false;
    }
    if (!resVerify.exists) {
      setEmailError("Email does not exist");
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
            Reset your password
          </Text>
        </SignPageHeader>
        <SignPageItems>
          <Text className="text-gray-400 text-[14px] font-plight text-center mb-8 leading-6">
            Please insert the email address associated with your account.
          </Text>

          <Input
            type="email-address"
            placeholder="Email"
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
