import { useRef, useState } from "react";
import {
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useEffect } from "react";

type CodeInputProps = {
  length?: number; // cuántos dígitos
  onComplete?: (code: string) => void; // callback cuando se completa
  disabled?: boolean;
  setCodeError: (error: string | undefined) => void; // callback para manejar errores
  reset?: boolean; // para resetear el input
};

const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  onComplete,
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
    }
  };

  // para manejar backspace y volver atrás
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    setCodeError(undefined);
    if (e.nativeEvent.key === "Backspace" && code[idx] !== "") {
      const newCode = [...code];
      newCode[idx] = "";
      setCode(newCode);
      if (idx === length - 1) {
        // setCodeReady(false);
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
            ref={ref => (inputs.current[idx] = ref)}
            value={digit}
            onChangeText={text => handleChange(text, idx, setCodeError)}
            onKeyPress={e => handleKeyPress(e, idx)}
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

export default CodeInput;
