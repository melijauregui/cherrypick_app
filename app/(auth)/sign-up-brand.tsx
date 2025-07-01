import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import LogoCircle from "@/app/components/LogoCircle";
import safeFetch from "@/app/utils/safe-fetch";
import { ResCodeVerificationPostSchema } from "@/schemas/auth/sign-up-schema";
import { useRouter } from "expo-router";
import { LOCAL_IP } from "../../config/api";

const SignUpBrand = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSend() {
    setEmailError(undefined);
    setLoading(true);
    try {
      await postCodeVerification({ email: email.toLowerCase() });
      setSuccess(true);
      router.replace("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        setEmailError(error.message);
      } else {
        setEmailError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <ScrollView
        className="flex-1 w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-grow flex-col w-full justify-between px-14 pt-3">
          <View className="flex flex-col w-full">
            <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />
            <Text className="text-white text-[27px] font-pbold pt-6 text-center">
              Brand Verification
            </Text>
            <Text className="text-white text-[16px] pt-4 pb-8 text-center">
              Ingresá tu email. Te enviaremos un formulario para que puedas
              verificar tu identidad tanto jurídica como física.
            </Text>
            <Input
              type="email-address"
              placeholder="Email"
              value={email}
              onChange={text => {
                setEmailError(undefined);
                setEmail(text);
              }}
              error={emailError}
            />
          </View>
          <SendButton
            onPress={handleSend}
            disabled={!email || loading}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpBrand;

const SendButton = ({
  onPress,
  disabled,
  loading,
}: {
  onPress: () => void;
  disabled: boolean;
  loading: boolean;
}) => (
  <View className="flex flex-row justify-end mb-4">
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      className={`
            flex flex-row items-center px-5 py-2 rounded-3xl
            ${disabled ? "bg-gray-400 opacity-50" : "bg-white"}
          `}
    >
      <Text
        className={`
              text-[15px] font-psemibold
              ${disabled ? "text-gray-700" : "text-black"}
            `}
      >
        {loading ? "Sending..." : "Send"}
      </Text>
    </TouchableOpacity>
  </View>
);

const Input = ({
  placeholder,
  value,
  onChange,
  type,
  error,
}: {
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
  type?: any;
  error?: string;
}) => (
  <View className="flex flex-col">
    <TextInput
      className="text-[16px] h-[50px] border-b border-gray-500 text-white"
      placeholder={placeholder}
      placeholderTextColor="#6b7280"
      value={value}
      onChangeText={onChange}
      keyboardType={type}
      autoCapitalize="none"
      autoCorrect={false}
    />
    {error && <Text className="text-red-500 pt-0.5">{error}</Text>}
  </View>
);

async function postCodeVerification({ email }: { email: string }) {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/send-form-brand`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      schema: ResCodeVerificationPostSchema,
    });
    if (data.error) {
      throw new Error(data.details);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Unexpected error");
    }
  }
}
