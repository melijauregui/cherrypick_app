import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  ScrollView,
  KeyboardTypeOptions,
  TextInput,
} from "react-native";

const InputBoxBottomSheet = ({
  value,
  setValue,
  placeholder,
  length,
  height,
  autoCapitalize,
  keyboardType,
}: {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  length?: number;
  height?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <BottomSheetTextInput
      className={`text-black font-plight text-[16px]`}
      style={{ height: height ? height : undefined }}
      value={value}
      onChangeText={text => {
        if (length) {
          if (text.length <= length) {
            setValue(text);
          }
        } else {
          setValue(text);
        }
      }}
      placeholder={placeholder}
      placeholderTextColor="#666"
      selectionColor="#3478F6"
      multiline={true}
      textAlignVertical="top"
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      textContentType="none"
      autoCorrect={false}
    />
  );
};

const InputBox = ({
  value,
  setValue,
  placeholder,
  length,
  height,
  autoCapitalize,
  keyboardType,
}: {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  length?: number;
  height?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <TextInput
      className={`text-black font-plight text-[16px]`}
      style={{ height: height ? height : undefined }}
      value={value}
      onChangeText={text => {
        if (length) {
          if (text.length <= length) {
            setValue(text);
          }
        } else {
          setValue(text);
        }
      }}
      placeholder={placeholder}
      placeholderTextColor="#666"
      selectionColor="#3478F6"
      multiline={true}
      textAlignVertical="top"
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      textContentType="none"
      autoCorrect={false}
    />
  );
};

const InputBoxWithName = ({
  name,
  value,
  setValue,
  lastValue,
  isScrollable,
  length,
  placeholder,
  height,
  error,
  autoCapitalize,
  keyboardType,
}: {
  name: string;
  value: string;
  setValue: (text: string) => void;
  lastValue: string;
  isScrollable: boolean;
  length?: number;
  placeholder: string;
  height?: number;
  error?: string | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <View className="flex flex-col px-[16px] bg-white rounded-2xl border-[1.4px] border-gray-300 w-full py-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-black font-pmedium">{name}</Text>
        {length && (
          <Text className="text-gray-500 font-plight text-sm">
            {value.length}/{length}
          </Text>
        )}
      </View>
      {isScrollable ? (
        <ScrollView>
          <InputBox
            value={value}
            setValue={setValue}
            placeholder={placeholder}
            length={length}
            height={height}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
        </ScrollView>
      ) : (
        <InputBox
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          length={length}
          height={height}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
      )}
      {error && (
        <Text className="text-red-500 text-[14px] mt-1 font-plight">
          {error}
        </Text>
      )}
    </View>
  );
};
export default InputBoxWithName;

const InputBoxWithNameBottomSheet = ({
  name,
  value,
  setValue,
  lastValue,
  isScrollable,
  length,
  placeholder,
  height,
  error,
  autoCapitalize,
  keyboardType,
}: {
  name: string;
  value: string;
  setValue: (text: string) => void;
  lastValue: string;
  isScrollable: boolean;
  length?: number;
  placeholder: string;
  height?: number;
  error?: string | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <View className="flex flex-col px-[16px] bg-white rounded-2xl border-[2px] border-gray-300 w-full py-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-black font-pmedium">{name}</Text>
        {length && (
          <Text className="text-gray-500 font-plight text-sm">
            {value.length}/{length}
          </Text>
        )}
      </View>
      {isScrollable ? (
        <ScrollView>
          <InputBoxBottomSheet
            value={value}
            setValue={setValue}
            placeholder={placeholder}
            length={length}
            height={height}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
        </ScrollView>
      ) : (
        <InputBoxBottomSheet
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          length={length}
          height={height}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
      )}
      {error && (
        <Text className="text-red-500 text-[14px] mt-1 font-plight">
          {error}
        </Text>
      )}
    </View>
  );
};
export { InputBoxWithNameBottomSheet };
