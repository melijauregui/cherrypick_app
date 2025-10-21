import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AppName from "@/app/components/AppName";
import LogoSquareBeige from "@/app/components/logo/LogoSquareBeige";
import "../global.css";
import { Redirect, usePathname } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import prefetchHome, {
  prefetchExplorePage,
  prefetchLikeAndFavoritePage,
  prefetchProfile,
} from "@/utils/prefetchs";
import Toast from "react-native-toast-message";

export default function App() {
  //verificar si hay un usuario autenticado
  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;
  const loading = isPending;
  const queryClient = useQueryClient();
  const [timeout, setHasTimedOut] = useState(false);
  const [hasPrefetched, setHasPrefetched] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setHasTimedOut(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user && user.emailVerified && !hasPrefetched) {
      const prefetchTimer = setTimeout(() => {
        prefetchHome(queryClient, user.email);
        setHasPrefetched(true);
      }, 100);
      return () => clearTimeout(prefetchTimer);
    }
  }, [user, queryClient, hasPrefetched]);

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: "Error al iniciar sesión",
        type: "error",
      });
    }
  }, [error]);

  if (error) {
    return <Redirect href="/sign-in" />;
  }


  if (loading || !timeout) {
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
    if (!user.emailVerified && pathname !== "/code-verification") {
      // Usuario nuevo - redirigir a sign-in para que el useEffect maneje el redirect a preferences
      return <Redirect href="/code-verification-register" />;
    } else {
      // Usuario existente - redirigir directamente a home
      return <Redirect href={`/home?prefetch=${hasPrefetched}`} />;
    }
  } else {
    console.log("Index: No user found, redirecting to sign-in");
    return <Redirect href="/sign-in" />;
  }
}
