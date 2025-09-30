import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardTypeOptions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoCircle from "../logo/LogoCircle";

export default function SignPage({ children }: { children?: React.ReactNode }) {
  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      {/* <ScrollView
        className="flex-1 w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      > */}
      <View className="flex-1 flex-col w-full justify-start px-14 pt-3">
        {children}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

export function SignPageHeader({
  children,
  onBackButton,
}: {
  children: React.ReactNode;
  onBackButton?: () => void;
}) {
  return (
    <View>
      <View className="flex flex-row items-center">
        {onBackButton && (
          <TouchableOpacity
            onPress={onBackButton}
            accessibilityLabel="Go back"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <View className="flex-1 items-center">
          <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />
        </View>
        <View style={{ width: 24 }} />
      </View>

      <Text className="text-white text-[27px] font-pbold pt-6">{children}</Text>
    </View>
  );
}

export function SignPageContent({ children }: { children: React.ReactNode }) {
  return <View className="flex-1 flex flex-col w-full">{children}</View>;
}

export function SignPageItems({ children }: { children: React.ReactNode }) {
  return <View className="flex flex-col w-full gap-10 mt-4">{children}</View>;
}

export function SignPageFooter({ children }: { children: React.ReactNode }) {
  return <View className="flex flex-row justify-end mb-4">{children}</View>;
}

export function NextButton({
  onPress,
  isLoading,
  isDisabled,
}: {
  onPress?: () => Promise<void> | undefined;
  isLoading: boolean;
  isDisabled?: boolean;
}) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={isDisabled ? undefined : onPress}
      className={`
            flex flex-row items-center px-5 py-2 mt-2 rounded-3xl bg-neutral-500
            ${isDisabled || isLoading ? "bg-gray-400 opacity-50" : "bg-white"}
          `}
    >
      <Text
        className={`
              text-[15px] font-psemibold text-black 
            `}
      >
        {isLoading ? "Loading..." : "Next"}
      </Text>
    </TouchableOpacity>
  );
}

export function Input({
  placeholder,
  value,
  onChange,
  type,
  error,
  isPassword,
  showPassword,
  onTogglePassword,
  autoCapitalize,
}: {
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
  type?: KeyboardTypeOptions;
  error?: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  return (
    <View className="flex flex-col">
      <View className="flex flex-row items-center">
        <TextInput
          className="flex-1 text-[16px] h-[50px] border-b border-zinc-500 text-white"
          placeholder={placeholder}
          placeholderTextColor="#71717a"
          value={value}
          onChangeText={onChange}
          keyboardType={type}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize={autoCapitalize ?? "none"}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={onTogglePassword}
            className="absolute right-0 px-2 py-2"
          >
            {showPassword ? (
              <Ionicons name="eye-off-outline" size={18} color="white" />
            ) : (
              <Ionicons name="eye-outline" size={18} color="white" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 pt-0.5">{error}</Text>}
    </View>
  );
}
