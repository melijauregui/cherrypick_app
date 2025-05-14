import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useRef } from "react";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import {
  FormSchemaCodeVerification,
  VerifyCodeSchema,
} from "@/schemas/auth/code-verification-schema";
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useRouter } from "expo-router";
import { safeFetch } from "@/utils/safe-fetch";
import { useLocalSearchParams } from "expo-router";
import { ResCodeVerificationPostSchema } from "@/schemas/auth/sign-up-schema";

const CodeVerification = () => {
  const router = useRouter();
  const { name, email, dateBirth } = useLocalSearchParams();
  console.log(
    "Proceeding with name in code-verification:",
    name,
    "and email:",
    email,
    "and date:",
    dateBirth
  );
  // const name = "John Doe";
  // const email = "j@gmail.com";
  // const dateBirth = "2023-10-01";

  const [code, setCode] = useState("");
  const [codeReady, setCodeReady] = useState(false);
  const [codeError, setCodeError] = useState<string | undefined>(undefined);
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
      const diff = Math.max(0, Math.floor((expirationTime.getTime() - now.getTime()) / 1000));
      setSecondsLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, expirationTime]);

  async function handleResendCode() {
    try {
      // Reiniciar el tiempo
      const newExpiration = new Date();
      newExpiration.setMinutes(newExpiration.getMinutes() + 3);
      setExpirationTime(newExpiration);
      setSecondsLeft(180);
      setCodeError(undefined);
      setCode("");

      const IP = process.env.EXPO_PUBLIC_IP || "localhost";
      const { data } = await safeFetch({
        url: `http://${IP}:3000/code-verification`,
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
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
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <ScrollView
        className="flex-1 w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-grow flex-col w-full justify-between px-14 py-3">
          <View className="flex flex-col w-full">
            <LogoCircle classname="w-[60] h-[60] mb-2 self-center" />
            <Text className="text-white text-[27px] font-pbold text-justify pt-14">
              We sent you a code
            </Text>
            <Text className="text-gray-500 text-[15px] font-pregular pt-5">
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
              <Text className="text-red-500 pt-1 text-[14px]">The code has expired. Please request a new one.</Text>
            )}
            <TouchableOpacity onPress={handleResendCode} className="mt-2">
              <Text className="text-white underline text-[14px]">Resend Code</Text>
            </TouchableOpacity>

          </View>
          <NextButton onPress={handleSubmit} codeReady={codeReady} secondsLeft={secondsLeft} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    <View className="flex flex-row justify-end mb-2">
      <TouchableOpacity
        disabled={isDisabled}
        onPress={isDisabled ? undefined : onPress}
        className={`
          flex flex-row items-center px-5 py-2 rounded-3xl
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
};

export const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  onComplete,
  setCodeReady,
  disabled,
}) => {
  // estado como array de strings de longitud “length”
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  // refs para cada TextInput, poder .focus() en ellos
  const inputs = useRef<Array<TextInput | null>>(Array(length).fill(null));

  // al cambiar un dígito
  const handleChange = (char: string, idx: number) => {
    if (!/^\d$/.test(char)) return; // sólo dígitos 0–9
    const newCode = [...code];
    newCode[idx] = char;
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
  // console.log("code NEW:", code);
  return (
    <View className="flex flex-row justify-between w-full self-center">
      {code.map((digit, idx) => {
        const isFocused = focusedIdx === idx;
        // console.log(
        //   "isFocused:",
        //   isFocused,
        //   " idx:",
        //   idx,
        //   "focusedIdx:",
        //   focusedIdx
        // );
        return (
          <TextInput
            selectTextOnFocus={false}
            key={idx}
            pointerEvents={isFocused ? "auto" : "none"}
            ref={(ref) => (inputs.current[idx] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, idx)}
            onKeyPress={(e) => handleKeyPress(e, idx)}
            keyboardType="number-pad"
            maxLength={1}
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

async function verifyCode(code: string, email: string): Promise<{ isCorrect: boolean }> {
  try {
    const IP = process.env.EXPO_PUBLIC_IP || "localhost";
    const { data } = await safeFetch({
      url: `http://${IP}:3000/verify-code?code=${code}&email=${email}`,
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
