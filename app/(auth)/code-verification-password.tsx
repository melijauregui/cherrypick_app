import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import safeFetch from "@/utils/safe-fetch";
import { BASE_URL } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { getExpirationCodeResetPassword } from "../../utils/fetch";
import { useResendCodeResetPassword } from "../../utils/update";
import CodeVerification from "../components/(auth)/codeVerificationPage";
import { VerifyCodeResponseSchemaResetPassword } from "@/schemas/formUser-schema";

const CodeVerificationPassword = () => {
  const localSearchParams = useLocalSearchParams();
  const email = localSearchParams.email as string;
  const router = useRouter();
  const resendCode = useResendCodeResetPassword();
  const verifyCode = useVerifyCode(email);

  console.log("ON CODE VERIFICATION PASSWORD", email);

  async function onResendCode() {
    if (!email) {
      console.error("No user email available for resending code");
      return;
    }
    await resendCode.mutateAsync(email);
  }

  async function onSubmit(code: string) {
    const { isCorrect, token } = await verifyCode.mutateAsync({
      code: code,
    });
    if (!isCorrect) {
      return false;
    }
    router.replace({
      pathname: "/reset-password",
      params: { token: token },
    });
    return true;
  }
  return (
    <CodeVerification
      email={email}
      queryKey={["reset-password-code"]}
      queryFn={async () => {
        const res = await getExpirationCodeResetPassword(email);
        console.log("res!!!!", res);
        // console.log("getExpirationCodeResetPassword", res?.toString());
        return res;
      }}
      onResendCode={onResendCode}
      onSubmit={onSubmit}
    />
  );
};

export default CodeVerificationPassword;

export function useVerifyCode(email: string) {
  const mutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await safeFetch({
        url: `${BASE_URL}/code-verification/verify-reset-password`,
        method: "POST",
        body: JSON.stringify({ code, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.error) {
        throw new Error(data.details);
      }
      //parse the data to the type VerifyCodeResponseSchemaTypeResetPassword
      const dataParsed = VerifyCodeResponseSchemaResetPassword.parse(data);
      return dataParsed;
    },
    onError: error => {
      console.error("Error verifying code:", error);
      Toast.show({
        type: "error",
        text1: "Error al verificar el código",
        visibilityTime: 6000,
      });
    },
  });

  return mutation;
}
