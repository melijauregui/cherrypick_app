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
  FormSchemaSignUp,
  VerifyAvailabilitySchema,
  ResCodeVerificationPostSchema,
} from "@/schemas/auth/sign-up-schema";
import DatePicker from "react-native-date-picker";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [dateString, setDateString] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [dateError, setDateError] = useState<string | undefined>(undefined);

  async function handleSubmit() {
    const result = FormSchemaSignUp.safeParse({
      name,
      email: email?.toLowerCase(),
      dateString,
    });
    if (!result.success) {
      const nameError = result.error.issues.find(
        (issue) => issue.path[0] === "name"
      );
      const emailError = result.error.issues.find(
        (issue) => issue.path[0] === "email"
      );
      const dateError = result.error.issues.find(
        (issue) => issue.path[0] === "date"
      );
      setNameError(nameError?.message);
      setEmailError(emailError?.message);
      setDateError(dateError?.message);
      return;
    }

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
      console.log(
        "Proceeding with name:",
        nameValue,
        "and email:",
        emailValue,
        "and date:",
        dateString
      );

      try {
        await postCodeVerification({ email: emailValue });
      } catch (error) {
        if (error instanceof Error) {
          setEmailError(error.message);
        } else {
          setEmailError("Unexpected error occurred");
        }
      }

      router.push({
        pathname: "/code-verification",
        params: {
          name,
          email,
          dateBirth: date.toISOString(),
        },
      });
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
            <Text className="text-white text-[27px] font-pbold text-justify pt-14">
              Create your account
            </Text>
            <View className="flex flex-col w-full gap-10 mt-4">
              <Input
                placeholder="Name"
                value={name}
                onChange={(text) => {
                  setNameError(undefined);
                  setName(text);
                }}
                type="default"
                error={nameError}
              />
              <Input
                type="email-address"
                placeholder="Email"
                value={email}
                onChange={(text) => {
                  setEmailError(undefined);
                  setEmail(text.toLowerCase());
                }}
                error={emailError}
              />
              <DateOfBirthInput
                placeholder="Date of birth"
                value={dateString}
                onPress={() => setOpen(true)}
                error={dateError}
              />
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                  setDateError(undefined);
                  setOpen(false);
                  setDate(date);
                  setDateString(
                    date.toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  );
                }}
                onCancel={() => {
                  setOpen(false);
                  setDateString(undefined);
                }}
              />
            </View>
          </View>
          <NextButton
            onPress={handleSubmit}
            name={name}
            email={email}
            date={dateString}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const NextButton = ({
  onPress,
  name,
  email,
  date,
}: {
  onPress?: () => Promise<void> | undefined;
  name?: string;
  email?: string;
  date?: string;
}) => {
  const isDisabled = !name || !email || !date;

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
  type?: KeyboardTypeOptions;
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
    />
    {error && <Text className="text-red-500 pt-0.5">{error}</Text>}
  </View>
);

async function verifyMailAvailability(
  email: string
): Promise<{ isAvailable: boolean }> {
  try {
    const { data } = await safeFetch({
      url: `http://localhost:3000/verify-email?email=${email}`,
      schema: VerifyAvailabilitySchema,
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

async function postCodeVerification({ email }: { email: string }) {
  try {
    const { data } = await safeFetch({
      url: `http://localhost:3000/code-verification`,
      method: "POST",
      body: JSON.stringify({ email }),
      schema: ResCodeVerificationPostSchema,
    });
    if (data.error) {
      console.log("Error:", data.details);
      throw new Error(data.details);
    }
    console.log("Code success");
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Unexpected error");
    }
  }
}

const DateOfBirthInput = ({
  placeholder,
  onPress,
  value,
  error,
}: {
  placeholder: string;
  onPress: () => void;
  value: string | undefined;
  error?: string;
}) => (
  <View className="flex flex-col">
    <TouchableOpacity
      className="h-[50px] border-b border-gray-500 justify-center"
      onPress={onPress}
    >
      {value && <Text className="text-[16px] text-white">{value}</Text>}
      {!value && (
        <Text className="text-[16px] text-[#6b7280] ">{placeholder}</Text>
      )}
    </TouchableOpacity>
    {error && <Text className="text-red-500 pt-0.5">{error}</Text>}
  </View>
);
