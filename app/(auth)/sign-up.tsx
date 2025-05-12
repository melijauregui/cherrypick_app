import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import { TextInput } from "react-native";
import { safeFetch } from "@/utils/safe-fetch";
import {
  formSchema,
  verifyAvailabilitySchema,
} from "@/schemas/auth/sign-up-schema";

const SignIn = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  async function handleSubmit() {
    const result = formSchema.safeParse({ name, email: email?.toLowerCase() });
    if (!result.success) {
      const nameError = result.error.issues.find(
        (issue) => issue.path[0] === "name"
      );
      const emailError = result.error.issues.find(
        (issue) => issue.path[0] === "email"
      );
      setNameError(nameError?.message);
      setEmailError(emailError?.message);
      return;
    }
    console.log("Form is valid");

    const { name: nameValue, email: emailValue } = result.data;

    try {
      const { isAvailable } = await verifyMailAvailability(emailValue);
      if (isAvailable) {
        console.log("Email is available");
      } else {
        console.log("Email is not available");
        setEmailError("Email is already registered");
        return;
      }
      // Proceed with the next steps, e.g., navigate to the next screen
      console.log("Proceeding with name:", nameValue, "and email:", emailValue);
    } catch (error) {
      if (error instanceof Error) {
        setEmailError(error.message);
      } else {
        setEmailError("Unexpected error occurred");
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
            <Text className="text-white text-[27px] font-pbold text-justify pt-3">
              Create your account
            </Text>
            <Input
              placeholder="Name"
              value={name}
              onChange={(text) => {
                setNameError(undefined);
                setName(text);
              }}
              type="default"
            />
            {nameError && (
              <Text className="text-red-500 pt-0.5">{nameError}</Text>
            )}
            <Input
              type="email-address"
              placeholder="Email"
              value={email}
              onChange={(text) => {
                setEmailError(undefined);
                setEmail(text.toLowerCase());
              }}
            />
            {emailError && (
              <Text className="text-red-500 pt-0.5">{emailError}</Text>
            )}
            {/* <DateOfBirthInput placeholder="Date of birth" /> */}
          </View>
          <NextButton onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const NextButton = ({
  onPress,
}: {
  onPress?: () => Promise<void> | undefined;
}) => (
  <View className="flex flex-row justify-end ">
    <TouchableOpacity
      className="flex flex-row bg-white py-2 items-center px-5 rounded-3xl"
      onPress={onPress}
    >
      <Text className="text-black font-psemibold text-[15px]">Next</Text>
    </TouchableOpacity>
  </View>
);

const Input = ({
  placeholder,
  value,
  onChange,
  type,
}: {
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
  type?: KeyboardTypeOptions;
}) => (
  <TextInput
    className=" h-[50px] text-[16px] mt-8 border-b border-gray-500 text-white"
    placeholder={placeholder}
    placeholderTextColor="#6b7280"
    value={value}
    onChangeText={onChange}
    keyboardType={type}
  />
);

async function verifyMailAvailability(
  email: string
): Promise<{ isAvailable: boolean }> {
  try {
    const { data } = await safeFetch({
      url: `http://localhost:3000/verify-email?email=${email}`,
      schema: verifyAvailabilitySchema,
      method: "GET",
    });

    if (data.error) {
      console.log("Error:", data.details);
      throw new Error(data.details);
    }
    return {
      isAvailable: data.isAvailable,
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
