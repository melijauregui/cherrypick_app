import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { ClothingItemComponent } from "@/components/ClothingItemComponent";
import { LOCAL_IP } from "@/config/api";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Button, TouchableOpacity, Text, View } from "react-native";

const Profile = () => {

    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-brown-strong w-full flex-1 "  >
                <View className="flex-1 justify-end p-4">
                    <LogOutButton />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
export default Profile;

const LogOutButton = () => {
    const router = useRouter();
    const { logout } = useAuth(); // ✅ Hook dentro de componente

    const handleLogout = async () => {
        await logout();
        router.replace("/sign-in");
    };

    return (
        <TouchableOpacity
            className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full"
            onPress={handleLogout}
        >
            <Text className="text-black font-psemibold text-[15px]">
                Log Out
            </Text>
        </TouchableOpacity>
    );
};
