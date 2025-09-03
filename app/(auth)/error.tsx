import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import LogoCircle from "@/app/components/logo/LogoCircle";
import { router } from "expo-router";

const ErrorPage = () => {
  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-grow flex-col w-full px-14 pt-3">
          <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />

          <View className="flex-1 justify-center">
            <View className="mb-8">
              <Text className="text-white text-[32px] font-pbold text-center mb-4">
                Oops!
              </Text>
              <Text className="text-white text-[18px] font-pmedium text-center mb-2">
                Something went wrong
              </Text>
              <Text className="text-gray-300 text-[14px] font-plight text-center mb-8">
                We're sorry, but an error occurred. Please try again.
              </Text>

              <View className="w-full flex flex-col gap-4">
                <TouchableOpacity
                  className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full"
                  onPress={() => router.push("/sign-in")}
                >
                  <Text className="text-black font-psemibold text-[15px]">
                    Go back to Sign In
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex flex-row bg-transparent h-[50px] justify-center items-center rounded-full border border-white"
                  onPress={() => router.push("/sign-up")}
                >
                  <Text className="text-white font-psemibold text-[15px]">
                    Create new account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ErrorPage;
