import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import LogoCircle from "@/app/components/logo/LogoCircle";
import { Redirect, router } from "expo-router";
import { authClient, useSession } from "@/lib/auth-client";

const SignIn = () => {
  const { status } = useSession();
  if (status === "authenticated") {
    return <Redirect href="cherrypick:///home" />;
  }

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
              <LogInButton />
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

const LogInButton = () => (
  <TouchableOpacity
    className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full"
    onPress={() => router.push("/log-in")}
  >
    <Text className="text-black font-psemibold text-[15px]">
      Log in with email
    </Text>
  </TouchableOpacity>
);

const SignUpButton = () => (
  <TouchableOpacity
    className="flex flex-row bg-beige h-[50px] justify-center items-center rounded-full"
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
      //newUserCallbackURL: "cherrypick:///preferences",
    });
    await authClient.getSession();
    // console.log("result", result);
  } catch (error) {
    console.error("Error in Google sign-in:", error);
  }
};
