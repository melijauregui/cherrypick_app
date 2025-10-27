import { Stack, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Linking, View } from "react-native";
import { OnlyAuthenticated } from "@/lib/auth-client";
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
