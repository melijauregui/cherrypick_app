import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppName } from "../components/AppName";
import { LogoSquareBeige } from "@/components/LogoSquareBeige";
import "../global.css";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/context/AuthContext";
import { safeFetch } from "@/utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { VerifyUserResponseSchema } from "@/schemas/auth/sign-in-schema";

export default function App() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const checkSession = async () => {
      if (user) {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/verify-user`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
          schema: VerifyUserResponseSchema,
        });
        if ("exists" in data && data.exists) {
          router.replace("/home");
        } else {
          router.replace("/sign-in");
        }
      } else {
        router.replace("/sign-in");
      }
    };

    checkSession();
  }, [user, loading]);

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

// export default function App() {
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push("/profile"); // Redirect to /sign-in after 1 second
//     }, 1000);

//     return () => clearTimeout(timer); // Cleanup in case component unmounts
//   }, []);
//   return (
//     <SafeAreaView className="flex-1 h-full bg-brown-strong">
//       <ScrollView className="my-1 ">
//         <View className="w-full justify-center items-center min-h-[85vh]">
//           <LogoSquareBeige classname="w-[90] h-[90] mb-2" />
//           <AppName classname="text-2xl text-[#d6bfa0] tracking-[7] font-giregular " />
//         </View>
//       </ScrollView>
//       <StatusBar backgroundColor="#000000" style="light" />
//     </SafeAreaView>
//   );
// }
