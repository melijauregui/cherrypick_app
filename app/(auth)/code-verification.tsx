import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useRef } from "react";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import {
  FormSchemaCodeVerification,
  VerifyCodeSchema,
} from "@/schemas/auth/code-verification-schema";
import { useRouter } from "expo-router";
import { safeFetch } from "@/utils/safe-fetch";
import { useLocalSearchParams } from "expo-router";
import { ResCodeVerificationPostSchema } from "@/schemas/auth/sign-up-schema";
import { LOCAL_IP } from "@/config/api";

const CodeVerification = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    email?: string;
    dateBirth?: string;
  }>();

  const { name, email, dateBirth } = params;

  // const name = "meli";
  // const email = "m@fi.uba.ar";
  // const dateBirth = "2023-10-10";
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof dateBirth !== "string"
  ) {
    // console.error("Missing or invalid parameters in CodeVerification:", params);
    router.replace("/sign-up");
    return null;
  }

  const [code, setCode] = useState("");
  const [codeReady, setCodeReady] = useState(false);
  const [codeError, setCodeError] = useState<string | undefined>(undefined);
  const [resetCodeInput, setResetCodeInput] = useState(false);
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 3); // Expira en 3 minutos
  const [expirationTime, setExpirationTime] = useState<Date>(expiration);
  const [secondsLeft, setSecondsLeft] = useState<number>(
    Math.max(0, Math.floor((expiration.getTime() - Date.now()) / 1000))
  );

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(
        0,
        Math.floor((expirationTime.getTime() - now.getTime()) / 1000)
      );
      setSecondsLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, expirationTime]);

  async function handleResendCode() {
    try {
      setResetCodeInput(true); // trigger reset
      setTimeout(() => setResetCodeInput(false), 0); // immediately turn off
      // Reiniciar el tiempo
      const newExpiration = new Date();
      newExpiration.setMinutes(newExpiration.getMinutes() + 3);
      setExpirationTime(newExpiration);
      setSecondsLeft(180);
      setCodeError(undefined);
      setCode("");

      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/code-verification`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        schema: ResCodeVerificationPostSchema,
      });

      if (data.error) {
        console.log("Error:", data.details);
        throw new Error(data.details);
      }

      console.log("Código reenviado");
    } catch (error) {
      console.error("Error al reenviar código:", error);
      setCodeError("Failed to resend code.");
    }
  }

  async function handleSubmit() {
    const result = FormSchemaCodeVerification.safeParse({
      code,
    });
    if (!result.success) {
      const codeError = result.error.issues.find(
        (issue) => issue.path[0] === "code"
      );
      setCodeError(codeError?.message);
      return;
    }
    try {
      const emailStr = email?.toString();
      if (!emailStr) {
        console.error("Email is not a string");
        setCodeError("Invalid email");
        return;
      }
      const { isCorrect } = await verifyCode(code, emailStr);
      if (isCorrect) {
        console.log("Code is correct");
      } else {
        console.log("Code is incorrect");
        setCodeError("Code is incorrect");
        return;
      }
      // Proceed with the next steps, e.g., navigate to the next screen
      console.log(
        "Proceeding with name:",
        name,
        "and email:",
        email,
        "and date:",
        dateBirth
      );
      router.push({
        pathname: "/preferences",
        params: {
          name,
          email,
          dateBirth: dateBirth,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setCodeError(error.message);
      } else {
        setCodeError("Unexpected error occurred");
      }
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 "
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
          <ScrollView
            className="flex-1 w-full h-full"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex flex-grow flex-col w-full justify-between px-14 pt-3">
              <View className="flex flex-col w-full">
                <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />
                <Text className="text-white text-[27px] font-pbold text-justify pt-6">
                  We sent you a code
                </Text>
                <Text className="text-gray-400 text-[15px] font-pregular pt-3">
                  Enter it below to verify your email: {email}.
                </Text>
                <View className="flex flex-col w-full mt-6 gap-3">
                  <CodeInput
                    length={6}
                    onComplete={(c) => {
                      setCode(c);
                    }}
                    setCodeReady={setCodeReady}
                    disabled={secondsLeft <= 0}
                    setCodeError={setCodeError}
                    reset={resetCodeInput}
                  />
                  {codeError && (
                    <Text className="text-red-500 pt-0.5">{codeError}</Text>
                  )}
                </View>
                <Text className="text-gray-400 text-[14px] font-pregular pt-2">
                  Code expires in {Math.floor(secondsLeft / 60)}:
                  {(secondsLeft % 60).toString().padStart(2, "0")}
                </Text>
                {secondsLeft <= 0 && (
                  <Text className="text-red-500 pt-1 text-[14px]">
                    The code has expired. Please request a new one.
                  </Text>
                )}
                <TouchableOpacity onPress={handleResendCode} className="mt-2">
                  <Text className="text-white underline text-[14px]">
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>

              <NextButton
                onPress={handleSubmit}
                codeReady={codeReady}
                secondsLeft={secondsLeft}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CodeVerification;

const NextButton = ({
  onPress,
  codeReady,
  secondsLeft,
}: {
  onPress?: () => Promise<void> | undefined;
  codeReady?: boolean;
  secondsLeft: number;
}) => {
  const isDisabled = !codeReady || secondsLeft <= 0;

  return (
    <View className="flex flex-row justify-end mb-0 ">
      <TouchableOpacity
        disabled={isDisabled}
        onPress={isDisabled ? undefined : onPress}
        className={`
          flex flex-row items-center px-5 py-2 rounded-3xl mb-4
          ${isDisabled ? "bg-gray-400 opacity-50" : "bg-white"}
        `}
      >
        <Text
          className={`
            text-[15px] font-psemibold
            ${isDisabled ? "text-gray-700" : "text-black"}
          `}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

type CodeInputProps = {
  length?: number; // cuántos dígitos
  onComplete?: (code: string) => void; // callback cuando se completa
  setCodeReady: (ready: boolean) => void; // callback para avisar que el código está listo
  disabled?: boolean;
  setCodeError: (error: string | undefined) => void; // callback para manejar errores
  reset?: boolean; // para resetear el input
};

export const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  onComplete,
  setCodeReady,
  disabled,
  setCodeError,
  reset,
}) => {
  // estado como array de strings de longitud “length”
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  // refs para cada TextInput, poder .focus() en ellos
  const inputs = useRef<Array<TextInput | null>>(Array(length).fill(null));

  useEffect(() => {
    if (reset) {
      setCode(Array(length).fill(""));
      setFocusedIdx(0);
      inputs.current[0]?.focus();
      setCodeReady(false);
    }
  }, [reset]);


  // al cambiar un dígito
  const handleChange = (
    text: string,
    idx: number,
    setCodeError: (error: string | undefined) => void
  ) => {
    if (text.length == 6) {
      // nos quedamos con los primeros `length` caracteres
      const chars = text.slice(0, length).split("");
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (char === undefined || !/^\d$/.test(char)) {
          setCodeError("Invalid paste code");
          return;
        }
      }
      setCode(chars);
      onComplete?.(chars.join(""));
      setCodeReady(true);
      inputs.current[length - 1]?.focus();
      setFocusedIdx(length - 1);
      return;
    }
    if (text.length > 1) {
      setCodeError(
        "Paste allow only with one character or six at the same time"
      );
      return;
    }
    if (!/^\d$/.test(text)) return; // sólo dígitos 0–9
    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);

    // pasamos al siguiente campo
    if (idx < length - 1) {
      inputs.current[idx + 1]?.focus();
      setFocusedIdx(idx + 1);
    } else {
      // si acabamos, juntamos y avisamos
      onComplete?.(newCode.join(""));
      setCodeReady(true);
    }
  };

  // para manejar backspace y volver atrás
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && code[idx] !== "") {
      const newCode = [...code];
      newCode[idx] = "";
      setCode(newCode);
      if (idx === length - 1) {
        setCodeReady(false);
      }
    }
    if (e.nativeEvent.key === "Backspace" && code[idx] === "") {
      if (idx > 0) {
        inputs.current[idx - 1]?.focus();
        setFocusedIdx(idx - 1);
      }
      const newCode = [...code];
      newCode[idx - 1] = "";
      setCode(newCode);
    }
  };
  return (
    <View className="flex flex-row justify-between w-full self-center">
      {code.map((digit, idx) => {
        const isFocused = focusedIdx === idx;
        return (
          <TextInput
            selectTextOnFocus={false}
            key={idx}
            pointerEvents={isFocused ? "auto" : "none"}
            ref={(ref) => (inputs.current[idx] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, idx, setCodeError)}
            onKeyPress={(e) => handleKeyPress(e, idx)}
            keyboardType="number-pad"
            maxLength={idx === 0 ? length : 1}
            caretHidden={true}
            selectionColor="transparent"
            editable={!disabled}
            className={`
              w-[40px] h-[50px] border-b-2 text-center text-white text-[24px]
              ${isFocused ? "border-white" : "border-gray-500"}
            `}
          />
        );
      })}
    </View>
  );
};

async function verifyCode(
  code: string,
  email: string
): Promise<{ isCorrect: boolean }> {
  try {
    console.log("Local IP:", LOCAL_IP);
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/verify-code?code=${code}&email=${email}`,
      schema: VerifyCodeSchema,
      method: "GET",
    });

    if (data.error) {
      console.log("Error:", data.details);
      throw new Error(data.details);
    }
    return {
      isCorrect: data.isCorrect,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
}
