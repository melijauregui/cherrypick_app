import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect } from "react";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import { Alert } from "react-native";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <ScrollView
        className="flex-1 w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-col justify-center mx-auto items-center w-[360px]">
          <LogoCircle classname="w-[60] h-[60] mb-2 top-5" />
          <View className="w-[340px]">
            <Text className="text-white text-[25px] font-pbold relative top-[140px] text-justify">
              Instantly match any outfit to real shopping options.
            </Text>
            <GoogleSignInButton />
            <OrLine />
            <SignUpButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const GoogleSignInButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        console.log(response.authentication?.accessToken || "No access token");
        router.push("/home");
      } else {
        console.log("No response");
      }
    }
  }, [response]);

  return (
    <TouchableOpacity
      className="flex flex-row bg-white top-[300px] h-[50px] justify-center items-center rounded-full"
      onPress={() =>
        promptAsync().catch((e) => {
          console.error("Error al iniciar sesión:", e);
        })
      }
    >
      <Image
        source={require("../../assets/icons/logo-google.png")}
        className="w-[25px] h-[25px] mr-3"
        resizeMode="contain"
      />
      <Text className="text-black font-psemibold text-[15px]">
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

const SignUpButton = () => (
  <TouchableOpacity
    className="flex flex-row bg-white top-[330px] h-[50px] justify-center items-center rounded-full"
    onPress={() => Alert.alert("Sign Up", "NOT DONE")}
  >
    <Text className="text-black font-psemibold text-[15px]">
      Create account
    </Text>
  </TouchableOpacity>
);

const OrLine = () => (
  <View className="flex flex-row items-center justify-center top-[315px]">
    <View className="w-40 h-px bg-gray-500 opacity-70" />
    <Text className="text-gray-500 text-[13px] font-plight mx-2 opacity-70">
      or
    </Text>
    <View className="w-40 h-px bg-gray-500 opacity-70" />
  </View>
);
