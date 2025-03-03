import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

import { useEffect } from "react";
import React, { useState } from "react";
import { LogoSmallPink } from "@/components/LogoSmallPink";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";

const SignIn = () => {
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
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full justify-center items-center ">
      <ScrollView className="my-1 ">
        {/* <View className="flex flex-col justify-center items-center w-[360px]">
          <LogoSmallPink classname="w-[60] h-[60] mb-2 top-5" />
          <Text className="text-white text-[25px] font-pbold relative top-28">
            Instantly match any outfit to real shopping options
          </Text> */}

        <TouchableOpacity
          className="bg-pink-600 "
          onPress={() =>
            promptAsync().catch((e) => {
              console.error("Error al iniciar sesión:", e);
            })
          }
        >
          <Text>LOGIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
