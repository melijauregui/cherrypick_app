import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AppName from "@/app/components/AppName";
import LogoSquareBeige from "@/app/components/logo/LogoSquareBeige";
import "../global.css";
import { Redirect } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import prefetchHome, {
  prefetchExplorePage,
  prefetchLikeAndFavoritePage,
  prefetchProfile,
} from "@/app/utils/prefetchs";
import Toast from "react-native-toast-message";
import LoadingPage from "./components/LoadingPage";
import { useFetchClientProfile } from "./utils/use-query";

export default function App() {
  // verificar si hay un usuario autenticado
  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;
  const loading = isPending;
  const queryClient = useQueryClient();
  const [timeout, setHasTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasTimedOut(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const dataUser = useFetchClientProfile(
    user ? { email: user.email, name: user.name ?? "" } : { email: "", name: "" }
  );

  useEffect(() => {
    if (user && !user.new) {
      prefetchHome(queryClient, user.email);
      prefetchProfile(user, queryClient);
      prefetchLikeAndFavoritePage(queryClient, user.email);
    }
  }, [user, queryClient]);

  if (error) {
    Toast.show({
      text1: "Error al iniciar sesión",
      type: "error",
    });
    return <Redirect href="/sign-in" />;
  }

  if (loading || !timeout) {
    if (user && !user.new) {
      // Solo ejecutar prefetch para usuarios existentes
      setTimeout(() => {
        prefetchHome(queryClient, user.email);
        prefetchProfile(user, queryClient);
        prefetchLikeAndFavoritePage(queryClient, user.email);
        prefetchExplorePage(queryClient);
      }, 100);
    }

    return (
      <SafeAreaView className="flex-1 h-full bg-brown-strong">
        <ScrollView className="my-1">
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
    if (user.new) {
      // Usuario nuevo - redirigir a sign-in para que el useEffect maneje el redirect a preferences
      return <LoadingPage alreadyPrefetched={true} />;
    } else {
      // Usuario existente - redirigir directamente a home
      return <Redirect href="/home?prefetch=true" />;
    }
  } else {
    return <Redirect href="/sign-in" />;
  }
}
