import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Linking } from "react-native";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up-brand"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="code-verification"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="preferences"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="error"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#000000" style="light" />
    </>
  );
};

export default AuthLayout;
