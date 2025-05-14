import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import { makeRedirectUri } from "expo-auth-session";
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { safeFetch } from "@/utils/safe-fetch";
import { VerifyUserResponseSchema } from "@/schemas/auth/sign-up-schema";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <ScrollView
        className="flex-1 w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-grow flex-col w-full px-14 py-3">
          <LogoCircle classname="w-[60] h-[60] mb-2 self-center" />
          <View className="w-full mt-40">
            <Text className="text-white text-[25px] font-pbold relative text-justify">
              Instantly match any outfit to real shopping options.
            </Text>
            <View className="w-full mt-40 flex flex-col gap-4">
              <GoogleSignInButton />
              <OrLine />
              <SignUpButton />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const GoogleSignInButton = () => {
  const isExpoGo = Constants.executionEnvironment === 'storeClient';
  const googleRedirectUri = isExpoGo
    ? "https://auth.expo.io/@cherrypickapp/cherrypick"
    : undefined;
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: isExpoGo ? undefined : process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    clientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
    redirectUri: googleRedirectUri,

  },
  );
  //console.log("response", response);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (response?.type === "success" && response.authentication?.accessToken) {
        try {
          const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: `Bearer ${response.authentication.accessToken}`,
            },
          });

          const userInfo = await userInfoResponse.json();
          console.log("User Info:", userInfo);
          const IP = process.env.EXPO_PUBLIC_IP || "localhost";
          const { data } = await safeFetch({
            url: `http://${IP}:3000/verify-user`,
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userInfo.email }),
            schema: VerifyUserResponseSchema,
          });


          if (data.exists) {
            console.log("User verification result:", data.user);
            await SecureStore.setItemAsync("accessToken", response.authentication.accessToken);
            router.push("/home");
          }

        } catch (error) {
          console.error("Error fetching user info or verifying:", error);
        }
      }
    };

    fetchUserInfo();
  }, [response]);


  return (
    <TouchableOpacity
      className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full"
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
    className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full"
    onPress={() => router.push("/sign-up")}
  >
    <Text className="text-black font-psemibold text-[15px]">
      Create account
    </Text>
  </TouchableOpacity>
);

const OrLine = () => (
  <View className="flex flex-row items-center justify-center">
    <View className="w-40 h-px bg-gray-500 opacity-70" />
    <Text className="text-gray-500 text-[13px] font-plight mx-2 opacity-70">
      or
    </Text>
    <View className="w-40 h-px bg-gray-500 opacity-70" />
  </View>
);
