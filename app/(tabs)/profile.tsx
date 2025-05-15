import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { ClothingItemComponent } from "@/components/ClothingItemComponent";
import { LOCAL_IP } from "@/config/api";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Button, TouchableOpacity, Text, View } from "react-native";
import { safeFetch } from "@/utils/safe-fetch";
import { VerifyAccountDeletedSchema } from "@/schemas/auth/sign-up-schema";
import * as SecureStore from 'expo-secure-store';

const Profile = () => {

    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-brown-strong w-full flex-1 "  >
                <View className="flex-1 justify-end p-4">
                    <View className="mb-4">
                        <LogOutButton />
                    </View>
                    <DeleteAccountButton />
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};
export default Profile;

const LogOutButton = () => {
    const router = useRouter();
    const { logout, setUser } = useAuth();

    const handleLogout = async () => {
        await logout();
        setUser(null);
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


const DeleteAccountButton = () => {
    const router = useRouter();
    const { user, loading, logout } = useAuth();

    const handleDeleteAccount = async () => {
        if (loading || !user?.email) {
            console.log("Still loading or no user:", { user, loading });
            return;
        }

        const { data } = await safeFetch({
            url: `http://${LOCAL_IP}:3000/delete-account`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
            schema: VerifyAccountDeletedSchema,
        });

        if ('success' in data && data.success) {
            console.log("Account deleted successfully");
            await logout();
            router.replace("/sign-in");
        } else if ('details' in data && data.details) {
            console.log("Error:", data.details);
        }
    };

    if (loading || !user?.email) {
        return (
            <TouchableOpacity
                className="flex flex-row bg-gray-400 h-[50px] justify-center items-center rounded-full"
                disabled
            >
                <Text className="text-white font-psemibold text-[15px]">Cargando...</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            className="flex flex-row bg-red-600 h-[50px] justify-center items-center rounded-full"
            onPress={handleDeleteAccount}
        >
            <Text className="text-white font-psemibold text-[15px]">Delete Account</Text>
        </TouchableOpacity>
    );
};

