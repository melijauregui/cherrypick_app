import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import React, { useState } from "react";
import { FormSchemaCodeVerification } from "@/schemas/formUser-schema";
import { Redirect, useRouter } from "expo-router";
import safeFetch from "@/app/utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { signOut, useSession } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { getExpirationCode } from "../utils/fetch";
import LoadingPage from "../components/LoadingPage";
import SignPage, {
  NextButton,
  SignPageContent,
  SignPageFooter,
  SignPageHeader,
  SignPageItems,
} from "../components/(auth)/signPage";
import { SuccessSchema } from "@/schemas/standar-response-schema";
import CodeInput from "../components/(auth)/inputCode";

const CodeVerification = () => {
  const router = useRouter();
  const session = useSession();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>(undefined);
  const verifyCode = useVerifyCode();
  const resendCode = useSendCode();
  const [resetCodeInput, setResetCodeInput] = useState(false);
  const queryClient = useQueryClient();
  const [isLoadingResendCode, setIsLoadingResendCode] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const {
    data: expirationTime,
    isLoading: isLoadingExpirationTime,
    error,
  } = useQuery({
    queryKey: ["expiration-code"],
    queryFn: () => getExpirationCode(),
    staleTime: Infinity, // Never refetch automatically
    refetchInterval: false, // Disable automatic refetching
  });

  const [secondsLeft, setSecondsLeft] = useState<number>(
    Math.max(
      0,
      Math.floor((expirationTime?.getTime() ?? Infinity) - Date.now()) / 1000
    )
  );

  useEffect(() => {
    if (expirationTime && expirationTime <= new Date()) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(
        0,
        Math.floor((expirationTime?.getTime() ?? 0) - now.getTime()) / 1000
      );
      setSecondsLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, expirationTime]);

  if (isLoadingExpirationTime) {
    return <LoadingPage alreadyPrefetched />;
  }
  if (error || !expirationTime) {
    return <Redirect href="/error" />;
  }

  async function handleResendCode() {
    setIsLoadingResendCode(true);
    setCodeError(undefined);
    setCode("");
    setResetCodeInput(true);
    await resendCode.mutateAsync();
    setIsLoadingResendCode(false);
  }

  async function handleSubmit() {
    const result = FormSchemaCodeVerification.safeParse({
      code,
    });
    if (!result.success) {
      const codeError = result.error.issues.find(
        issue => issue.path[0] === "code"
      );
      setCodeError(codeError?.message);
      return;
    }
    const { isCorrect } = await verifyCode.mutateAsync({
      code,
    });
    if (!isCorrect) {
      setCodeError("Code is incorrect");
      return;
    }
    router.push({
      pathname: "/preferences",
    });
  }
  return (
    <SignPage>
      <SignPageContent>
        <SignPageHeader
          onBackButton={() => {
            router.replace("cherrypick:///sign-in");
            async () => {
              // Cancelar todas las peticiones activas y limpiar la caché de React Query antes de hacer logout
              await queryClient.cancelQueries();
              await queryClient.clear();
              signOut();
            };
          }}
        >
          We sent you a code
        </SignPageHeader>
        <SignPageItems>
          <Text className="text-gray-400 text-[15px] font-pregular pt-3">
            Enter it below to verify your email: {session.user?.email}.
          </Text>
          <View className="flex flex-col w-full gap-3">
            <View className="flex flex-col w-full gap-3">
              <CodeInput
                length={6}
                onComplete={c => {
                  setCode(c);
                }}
                disabled={expirationTime <= new Date()}
                setCodeError={setCodeError}
                reset={resetCodeInput}
              />
              {codeError && (
                <Text className="text-red-500 pt-0.5">{codeError}</Text>
              )}
            </View>
            <Text className="text-gray-400 text-[14px] font-pregular pt-2">
              Code expires in {Math.floor(secondsLeft / 60)}:
              {Math.floor(secondsLeft % 60)
                .toString()
                .padStart(2, "0")}
            </Text>
            {secondsLeft <= 0 && (
              <Text className="text-red-500 pt-1 text-[14px]">
                The code has expired. Please request a new one.
              </Text>
            )}
            <TouchableOpacity onPress={handleResendCode} className="mt-2">
              <Text className="text-white underline text-[14px]">
                {isLoadingResendCode ? "Resending..." : "Resend Code"}
              </Text>
            </TouchableOpacity>
          </View>
        </SignPageItems>
      </SignPageContent>
      <SignPageFooter>
        <NextButton
          onPress={async () => {
            setIsLoadingNext(true);
            await handleSubmit();
            setIsLoadingNext(false);
          }}
          isLoading={isLoadingNext}
          isDisabled={
            isLoadingNext ||
            secondsLeft <= 0 ||
            codeError !== undefined ||
            code.length !== 6
          }
        />
      </SignPageFooter>
    </SignPage>
  );
};

export default CodeVerification;

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

export function useSendCode() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/code-verification`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.error) {
        throw new Error(data.details);
      }
      console.log("data", data);
      SuccessSchema.parse(data);
      return data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Code sent successfully",
        visibilityTime: 3000,
      });
    },
    onError: error => {
      console.error("Error resending code:", error);
      Toast.show({
        type: "error",
        text1: "Failed to resend code",
        visibilityTime: 3000,
      });
    },
    onSettled: () => {
      //invalidate query
      void queryClient.invalidateQueries({
        queryKey: ["expiration-code"],
      });
    },
  });

  return mutation;
}
