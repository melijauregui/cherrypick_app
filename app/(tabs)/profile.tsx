import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { ClothingItemComponent } from "@/components/ClothingItemComponent";
import { LOCAL_IP } from "@/config/api";

const Profile = () => {

    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-brown-strong w-full flex-1 "  >
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
export default Profile;
