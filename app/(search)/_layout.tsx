import { Stack, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { OnlyAuthenticated } from "@/lib/auth-client";
import { View } from "react-native";
import { CustomTabBar } from "../(tabs)/_layout";

const AuthLayout = () => {
  const segment = useSegments();
  // get the current page from the segment
  const page = segment[segment.length - 1] || "";
  const pagesToHideTabBar = ["camera"];
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
