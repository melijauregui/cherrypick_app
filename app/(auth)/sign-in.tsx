import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import React, { useState } from "react";
import { LogoCircle } from "@/components/LogoCircle";
import * as Google from "expo-auth-session/providers/google";
import { router, useLocalSearchParams } from "expo-router";
import { makeRedirectUri } from "expo-auth-session";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { safeFetch } from "@/utils/safe-fetch";
import { VerifyUserResponseSchema } from "@/schemas/auth/sign-up-schema";
import { LOCAL_IP } from "@/config/api";
import { set } from "zod";
import { useAuth } from "@/context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const params = useLocalSearchParams();
  const [showError, setShowError] = useState(params.error === "not-registered");
  const [loading, setLoading] = useState(params.loading === "true");
  /* if (loading) {
    return (
      <SafeAreaView className="bg-brown-strong flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  } else {
     */
  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <ScrollView
        className="flex-1 w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-grow flex-col w-full px-14 py-3">
          <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />
          <View className="w-full mt-40">
            <Text className="text-white text-[25px] font-pbold relative text-justify">
              Instantly match any outfit to real shopping options.
            </Text>
            <View className="w-full mt-40 flex flex-col gap-4">
              <GoogleSignInButton
                setShowError={setShowError}
                setLoading={setLoading}
              />
              <OrLine />
              <SignUpButton />
            </View>

            {showError && (
              <View className="rounded-md p-3 mt-4">
                <Text className="text-red-500 text-center font-psemibold">
                  Invalid account. Try signing up first.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const GoogleSignInButton: React.FC<{
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowError, setLoading }) => {
  const isExpoGo = Constants.executionEnvironment === "storeClient";
  const googleRedirectUri = isExpoGo
    ? "https://auth.expo.io/@cherrypickapp/cherrypick"
    : undefined;

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: isExpoGo
      ? undefined
      : process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    responseType: "code",
    extraParams: {
      access_type: "offline",
      prompt: "consent",
    },
  });

  const { setUser } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (
        response?.type === "error" ||
        response?.type === "dismiss" ||
        response?.type === "cancel"
      ) {
        router.replace({ pathname: "/sign-in", params: { loading: "false" } });
        return;
      }
      if (
        response?.type === "success" &&
        response.authentication?.accessToken
      ) {
        try {
          const userInfoResponse = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${response.authentication?.accessToken}`,
              },
            }
          );

          const userInfo = await userInfoResponse.json();

          const { data } = await safeFetch({
            url: `http://${LOCAL_IP}:3000/verify-user`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userInfo.email }),
            schema: VerifyUserResponseSchema,
          });

          if ("exists" in data && data.exists) {
            await SecureStore.setItemAsync(
              "accessToken",
              response.authentication?.accessToken
            );
            await SecureStore.setItemAsync(
              "refreshToken",
              response.authentication?.refreshToken ?? ""
            );
            setUser(userInfo);
            console.log("Redirecting to home...");
            router.push("/home");
          } else {
            setShowError(true);
            setLoading(false);
            console.log("User not registered, redirecting to sign-in...");
            router.replace({
              pathname: "/sign-in",
              params: { error: "not-registered", loading: "false" },
            });
          }
        } catch (error) {
          console.error("Error fetching user info or verifying:", error);
          setShowError(true);
          setLoading(false);
          router.replace({
            pathname: "/sign-in",
            params: { error: "not-registered", loading: "false" },
          });
        }
      }
    };

    fetchUserInfo();
  }, [response]);

  const handlePress = async () => {
    try {
      setLoading(true);
      await promptAsync();
    } catch (e) {
      console.error("Error al iniciar sesión:", e);
      setShowError(true);
      setLoading(false);
      router.replace({
        pathname: "/sign-in",
        params: { error: "not-registered", loading: "false" },
      });
    }
  };

  return (
    <TouchableOpacity
      className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full"
      onPress={handlePress}
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
