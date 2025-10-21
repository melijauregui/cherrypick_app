import { useEffect } from "react";
import React from "react";
import { useRouter } from "expo-router";
import safeFetch from "@/utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { useSession } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { getExpirationCode } from "../../utils/fetch";
import { useResendCode } from "../../utils/update";
import CodeVerification from "../components/(auth)/codeVerificationPage";

const CodeVerificationRegister = () => {
  const session = useSession();
  const router = useRouter();
  const resendCode = useResendCode();
  const verifyCode = useVerifyCode();
  // Effect to check email verification status
  useEffect(() => {
    if (session.user?.emailVerified) {
      console.log("Email verified, navigating to preferences");
      router.replace({
        pathname: "/preferences",
      });
    }
  }, [session.user?.emailVerified, router]);

  async function onResendCode() {
    if (!session.user) {
      console.error("No user email available for resending code");
      return;
    }
    await resendCode.mutateAsync(session.user.email);
  }

  async function onSubmit(code: string) {
    const { isCorrect } = await verifyCode.mutateAsync({
      code: code,
    });
    if (!isCorrect) {
      return false;
    }
    // Code verification successful - refetch session to check email verification status
    await session.refetch();
    return true;
  }
  return (
    <CodeVerification
      email={session.user?.email ?? ""}
      queryKey={["expiration-code"]}
      queryFn={getExpirationCode}
      onResendCode={onResendCode}
      onSubmit={onSubmit}
    />
  );
};

export default CodeVerificationRegister;

export function useVerifyCode() {
  const mutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/code-verification/verify`,
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("data VERIFY CODEEE", data);
      if (data.error) {
        throw new Error(data.details);
      }
      return data;
    },
    onError: error => {
      console.error("Error verifying code:", error);
      Toast.show({
        type: "error",
        text1: "Error verifying code",
        visibilityTime: 6000,
      });
    },
  });

  return mutation;
}
