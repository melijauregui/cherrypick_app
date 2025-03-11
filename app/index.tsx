import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppName } from "../components/AppName";
import { LogoBig } from "@/components/LogoBig";
import "../global.css";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home"); // Redirect to /sign-in after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Cleanup in case component unmounts
  }, []);
  return (
    <SafeAreaView className="flex-1 h-full bg-brown-strong">
      <ScrollView className="my-1 ">
        <View className="w-full justify-center items-center min-h-[85vh]">
          <LogoBig classname="w-[90] h-[90] mb-2" />
          <AppName classname="text-2xl text-pink-light tracking-[7] font-giregular " />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#000000" style="light" />
    </SafeAreaView>
  );
}
