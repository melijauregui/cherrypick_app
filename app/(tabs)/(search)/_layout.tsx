import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { OnlyAuthenticated } from "@/lib/auth-client";
import { useIsFocused } from "@react-navigation/native";

const AuthLayout = () => {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <OnlyAuthenticated>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </OnlyAuthenticated>
  );
};

export default AuthLayout;
