import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppName } from "../components/AppName";
import { LogoSquareBeige } from "@/components/LogoSquareBeige";
import "../global.css";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in"); // Redirect to /sign-in after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Cleanup in case component unmounts
  }, []);
  return (
    <SafeAreaView className="flex-1 h-full bg-brown-strong">
      <ScrollView className="my-1 ">
        <View className="w-full justify-center items-center min-h-[85vh]">
          <LogoSquareBeige classname="w-[90] h-[90] mb-2" />
          <AppName classname="text-2xl text-[#b39c7d] tracking-[7] font-giregular " />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#000000" style="light" />
    </SafeAreaView>
  );
}

// import React, { useEffect, useState } from 'react'
// import { View, Text, ActivityIndicator } from 'react-native'

// const API_URL = 'http://localhost:3000/users/123' // Replace with your actual server URL

// const UserScreen = () => {
//   const [user, setUser] = useState<{ id: string; name: string; age: number } | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(API_URL)
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

//         const data = await response.json()
//         setUser(data)
//       } catch (err) {
//         setError((err as Error).message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUser()
//   }, [])

//   if (loading) return <ActivityIndicator size="large" />
//   if (error) return <Text>Error: {error}</Text>

//   return (
//     <View>
//       <Text>User ID: {user?.id}</Text>
//       <Text>Name: {user?.name}</Text>
//       <Text>Age: {user?.age}</Text>
//     </View>
//   )
// }

// export default UserScreen
