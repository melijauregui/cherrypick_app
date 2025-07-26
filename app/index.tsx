import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import AppName from "@/app/components/AppName";
import LogoSquareBeige from "@/app/components/LogoSquareBeige";
import "../global.css";
import { useRouter } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function App() {
  const router = useRouter();
  //verificar si hay un usuario autenticado
  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;
  const loading = isPending;

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/sign-in");
      }
    }
  }, [user, error, loading, router]);

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
