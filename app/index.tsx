import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppName from "@/app/components/AppName";
import LogoSquareBeige from "@/app/components/LogoSquareBeige";
import "../global.css";
import { Redirect } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import prefetchHome, { prefetchProfile } from "@/app/utils/prefetchs";
import Toast from "react-native-toast-message";

export default function App() {
  //verificar si hay un usuario autenticado
  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;
  const loading = isPending;
  const queryClient = useQueryClient();
  const [timeout, setHasTimedOut] = useState(false);

  // Set timeout after 2 seconds
  if (!timeout) {
    setTimeout(() => setHasTimedOut(true), 1000);
  }

  if (error) {
    Toast.show({
      text1: "Error al iniciar sesión",
      type: "error",
    });
    return <Redirect href="/sign-in" />;
  }

  if (loading || !timeout) {
    if (user) {
      prefetchHome(queryClient);
      prefetchProfile(user, queryClient);
    }
    return (
      <SafeAreaView className="flex-1 h-full bg-brown-strong">
        <ScrollView className="my-1 ">
          <View className="w-full justify-center items-center min-h-[85vh]">
            <LogoSquareBeige classname="w-[90] h-[90] mb-2" />
            <AppName classname="text-2xl text-[#d6bfa0] tracking-[7] font-giregular " />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#000000" style="light" />
      </SafeAreaView>
    );
  }

  // Redirect based on authentication status
  if (user) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/sign-in" />;
  }
}
