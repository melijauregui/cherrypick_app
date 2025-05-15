import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { safeFetch } from "@/utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { VerifyUserResponseSchema } from "@/schemas/auth/sign-up-schema";
import { useAuth } from "@/context/AuthContext";

export function useGoogleSignIn(onSuccess: () => void) {
    const isExpoGo = Constants.executionEnvironment === 'storeClient';
    const redirectUri = isExpoGo
        ? "https://auth.expo.io/@cherrypickapp/cherrypick"
        : undefined;

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: isExpoGo ? undefined : process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        clientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
        redirectUri,
        responseType: 'code',
        extraParams: {
            access_type: 'offline',
            prompt: 'consent',
        },
    });

    const { setUser } = useAuth();

    useEffect(() => {
        const fetchAndStoreTokens = async () => {
            if (response?.type === "success" && response.authentication?.accessToken) {
                try {
                    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                        headers: {
                            Authorization: `Bearer ${response.authentication?.accessToken}`,
                        },
                    });

                    const userInfo = await userInfoResponse.json();
                    const { data } = await safeFetch({
                        url: `http://${LOCAL_IP}:3000/verify-user`,
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: userInfo.email }),
                        schema: VerifyUserResponseSchema,
                    });

                    if ('exists' in data && data.exists) {
                        console.log("Setting tokens in SecureStore");
                        await SecureStore.setItemAsync("accessToken", response.authentication.accessToken);
                        await SecureStore.setItemAsync("refreshToken", response.authentication.refreshToken ?? "");
                        setUser(userInfo);
                        //onSuccess();
                    }
                } catch (err) {
                    console.error("Google sign-in failed:", err);
                }
            }
        };

        fetchAndStoreTokens();
    }, [response]);

    return {
        promptGoogleLogin: () => promptAsync(),
        isReady: !!request,
    };
}
