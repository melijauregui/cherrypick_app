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
import { useRouter } from "expo-router";
import { LOCAL_IP } from "../../config/api";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const SignUpBrand = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const codeVerification = useCodeVerification(setEmailError, setLoading);

  async function handleSend() {
    codeVerification.mutate({ email: email.toLowerCase() });
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
            <Text className="text-white text-xl pt-10 pb-8 text-center">
              Ingresá el email de tu marca. Te enviaremos un formulario para que
              puedas verificar tu identidad tanto jurídica como física.
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
      className="text-xl h-[50px] border-b border-gray-500 text-white"
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

function useCodeVerification(
  setEmailError: (error: string | undefined) => void,
  setLoading: (loading: boolean) => void
) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (user: { email: string }) => {
      setEmailError(undefined);
      setLoading(true);
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/form`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      console.log("POST brand/form data:", data);
      if (data.error) {
        throw new Error(data.details);
      }
    },
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Email sent successfully!\nPlease check your email to continue.",
        visibilityTime: 4000,
      });
      router.replace("/sign-in");
    },
    onError: error => {
      setEmailError(
        error instanceof Error ? error.message : "Unexpected error"
      );
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return mutation;
}
