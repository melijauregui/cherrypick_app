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
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { set } from "zod";

const CodeVerification = () => {
  // const { name, email, dateBirth } = useLocalSearchParams();
  // console.log(
  //   "Proceeding with name in code-verification:",
  //   name,
  //   "and email:",
  //   email,
  //   "and date:",
  //   dateBirth
  // );
  const name = "John Doe";
  const email = "j@gmail.com";
  const dateBirth = "2023-10-01";

  const [code, setCode] = useState("");
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
            <View className="flex flex-col w-full gap-10 mt-4">
              <CodeInput
                length={6}
                onComplete={(c) => {
                  setCode(c);
                  console.log("código completo:", c);
                }}
              />
            </View>
          </View>
          {/* <NextButton onPress={handleSubmit} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CodeVerification;

const NextButton = ({
  onPress,
}: {
  onPress?: () => Promise<void> | undefined;
}) => {
  const isDisabled = false;

  return (
    <View className="flex flex-row justify-end">
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
};

export const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  onComplete,
}) => {
  // estado como array de strings de longitud “length”
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  // refs para cada TextInput, poder .focus() en ellos
  const inputs = useRef<Array<TextInput | null>>(Array(length).fill(null));

  // al cambiar un dígito
  const handleChange = (char: string, idx: number) => {
    if (!/^\d$/.test(char)) return; // sólo dígitos 0–9
    console.log("char:", char, " idx:", idx);
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
    }
  };

  // para manejar backspace y volver atrás
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    console.log("key pressed", e.nativeEvent.key, " idx:", idx);
    if (e.nativeEvent.key === "Backspace" && code[idx] !== "") {
      const newCode = [...code];
      newCode[idx] = "";
      setCode(newCode);
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
    if (!/^\d$/.test(e.nativeEvent.key)) {
      return;
    } else {
      const newCode = [...code];
      newCode[idx] = e.nativeEvent.key;
      setCode(newCode);
      if (idx < length - 1) {
        inputs.current[idx + 1]?.focus();
        setFocusedIdx(idx + 1);
      }
    }
  };
  console.log("code NEW:", code);
  return (
    <View className="flex flex-row justify-between w-full self-center">
      {code.map((digit, idx) => {
        const isFocused = focusedIdx === idx;
        console.log(
          "isFocused:",
          isFocused,
          " idx:",
          idx,
          "focusedIdx:",
          focusedIdx
        );
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
