import { Stack } from "expo-router";
import React from "react";
import { OnlyAuthenticated } from "@/lib/auth-client";

const AuthLayout = () => {
  return (
    <OnlyAuthenticated>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </OnlyAuthenticated>
  );
};

export default AuthLayout;
