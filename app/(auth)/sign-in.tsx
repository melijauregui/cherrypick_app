import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import LogoCircle from "@/app/components/LogoCircle";
import { router } from "expo-router";
import { authClient, useSession } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import safeFetch from "@/app/utils/safe-fetch";
import { VerifyAvailabilitySchema } from "@/schemas/auth/sign-up-schema";
import { LOCAL_IP } from "@/config/api";

const SignIn = () => {
  const { user, status } = useSession();
  const result = useFetchTypeUser(user?.email);

  useEffect(() => {
    if (user && status === "authenticated") {
      if (result === null) {
        //TODO PUSH TOAST
        console.log("Server error, typeUser is undefined");
        return;
      }
      const { exists, type } = result;
      console.log("exists", exists);
      console.log("type", type);
      if (user.new) {
        if (!exists) {
          console.log("User not found, creating client");
          const name = user?.name || "";
          const email = user?.email || "";
          if (!name || !email) {
            //TODO PUSH TOAST
            console.log(
              "Missing user data for creation, redirecting to sign-in"
            );
            router.replace("/sign-in");
            return;
          }

          //get if is already a brand

          router.replace({
            pathname: "cherrypick:///preferences",
            params: {
              name,
              email,
              dateBirth: "",
            },
          });
        } else {
          console.log("User already exists, redirecting to home");
          authClient.updateUser({
            new: false,
            userType: type,
          });
          router.replace("cherrypick:///home");
        }
      } else {
        router.replace("cherrypick:///home");
      }
    }
  }, [status, user, result]);

  return (
    <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-grow flex-col w-full px-14 py-3">
          <LogoCircle classname="w-[60] h-[60] mb-1 self-center" />
          <View className="w-full mt-40 ">
            <Text className="text-white text-[25px] font-pbold relative">
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
      <SignInBrandButton />
    </SafeAreaView>
  );
};

export default SignIn;

const GoogleSignInButton: React.FC<{}> = () => {
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

const SignInBrandButton = () => (
  <TouchableOpacity
    className="flex flex-row justify-center items-center bottom-6"
    onPress={() => router.push("/sign-up-brand")}
  >
    <Text className="text-white font-pmedium text-[15px]">
      Are you a brand? Sign up here
    </Text>
  </TouchableOpacity>
);

const handlePress = async () => {
  console.log("handlePress - iniciando Google sign-in");
  try {
    console.log("signing in with google");

    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "cherrypick:///home",
      errorCallbackURL: "cherrypick:///error",
      newUserCallbackURL: "cherrypick:///preferences",
    });

    console.log("Google sign-in result:", result);
  } catch (error) {
    console.error("Error in Google sign-in:", error);
  }
};

function useFetchTypeUser(
  email: string | undefined
):
  | { exists: true; type: "client" | "brand" }
  | { exists: false; type: null }
  | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch-type-user", email],
    queryFn: async () => {
      let result:
        | { exists: true; type: "client" | "brand" }
        | { exists: false; type: null }
        | null = null;
      if (!email) {
        console.log("email is undefined");
        return result;
      }
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/verify-email?email=${email}`,
          method: "GET",
          schema: VerifyAvailabilitySchema,
        });
        console.log("DATAAA", data);
        if (!data.error) {
          console.log("User not found");
          result = { exists: false, type: null };
          return result;
        }
        if (data.userType === null) {
          console.log("userType is null");
          throw new Error(data.details ?? "Server error");
        }
        result = { exists: true, type: data.userType };
        return result;
      } catch (error) {
        console.error("Error fetching user data2:", error);
        return result;
      }
    },
  });

  if (isLoading) {
    console.log("Loading...");
    return null;
  }
  if (!data) {
    console.log("data is null", error);
    return null;
  }
  return data;
}
