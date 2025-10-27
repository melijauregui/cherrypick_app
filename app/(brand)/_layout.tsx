import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { OnlyAuthenticated } from "@/lib/auth-client";
import { CustomTabBar } from "../(tabs)/_layout";

const AuthLayout = () => {
  return (
    <OnlyAuthenticated>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}></Stack>
        <CustomTabBar />
      </View>
    </OnlyAuthenticated>
  );
};

export default AuthLayout;
