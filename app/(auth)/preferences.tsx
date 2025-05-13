import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";

import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const Preferences = () => {
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
  //   const name = "John Doe";
  //   const email = "j@gmail.com";
  //   const dateBirth = "2023-10-01";

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
            <Text className="text-white text-[27px] font-pbold text-justify pt-14">
              {`name: ${name}, email: ${email}, date: ${dateBirth}`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Preferences;

const NextButton = ({
  onPress,
  codeReady,
}: {
  onPress?: () => Promise<void> | undefined;
  codeReady?: boolean;
}) => {
  const isDisabled = !codeReady;

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
