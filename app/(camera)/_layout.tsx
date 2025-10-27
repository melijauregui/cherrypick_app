import { Stack } from "expo-router";
import React from "react";
import { OnlyAuthenticated } from "@/lib/auth-client";
import { View } from "react-native";
import { CustomTabBar } from "../(tabs)/_layout";

const AuthLayout = () => {
  return (
    <OnlyAuthenticated>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}></Stack>
      </View>
    </OnlyAuthenticated>
  );
};

export default AuthLayout;
