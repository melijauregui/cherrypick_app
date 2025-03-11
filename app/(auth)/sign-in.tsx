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
import { LogoSmallPink } from "@/components/LogoSmallPink";
import * as Google from "expo-auth-session/providers/google";
import { Link, router } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full justify-center items-center ">
      <ScrollView className="my-1 ">
        <View className="flex flex-col justify-center items-center w-[360px]">
          <LogoSmallPink classname="w-[60] h-[60] mb-2 top-5" />
          <View className="w-[340px]">
            <Text className="text-white text-[25px] font-pbold relative top-[140px] text-justify">
              Instantly match any outfit to real shopping options.
            </Text>
            {googleSignInButton()}
            {orLine()}
            {signUpButton()}
            <Link
              className="text-brown-light left-24 top-[400px]"
              href="/sign-up"
            >
              Go to sign-up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const googleSignInButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "321366117154-pjul3132tfs37empssra1ll9mogl8ski.apps.googleusercontent.com",
    iosClientId:
      "321366117154-gq34d2c6r30i8tl8r45dpte4i0ba8nk9.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        console.log(response.authentication?.accessToken || "No access token");
        router.push("/");
      } else {
        console.log("No response");
      }
    }
  });

  return (
    <TouchableOpacity
      className="flex flex-row bg-white top-[300px]  h-[50px] justify-center items-center rounded-full"
      onPress={() =>
        promptAsync().catch((e) => {
          console.error("Error al iniciar sesión:", e);
        })
      }
    >
      {/* Google Logo */}
      <Image
        source={require("../../assets/icons/logo-google.png")} // Path to your logo
        className="w-[25px] h-[25px] mr-3"
        resizeMode="contain"
      />

      <Text className="text-black font-psemibold text-[15px]">
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

const signUpButton = () => {
  return (
    <TouchableOpacity
      className="flex flex-row bg-white top-[330px] h-[50px] justify-center items-center rounded-full"
      onPress={() => console.log("Sign Up NOT DONE")}
    >
      <Text className="text-black font-psemibold text-[15px]">
        Create account
      </Text>
    </TouchableOpacity>
  );
};

const orLine = () => {
  return (
    <View className="flex flex-row items-center justify-center top-[315px]">
      <View className="w-40 h-px bg-gray-600  opacity-70 "></View>
      <Text className="text-gray-600 text-[13px] font-plight mx-2 opacity-70">
        or
      </Text>
      <View className="w-40 h-px bg-gray-600 opacity-70"></View>
    </View>
  );
};
