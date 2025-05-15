import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface UserInfo {
    email: string;
    name: string;
}

interface AuthContextType {
    user: UserInfo | null;
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        setUser(null);
    };

    const refreshAccessToken = async (): Promise<string | null> => {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken || refreshToken == "") return null;

        try {
            console.log("Refreshing access token...");
            const body = new URLSearchParams({
                client_id: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID!,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }).toString();

            const res = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body,
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Failed to refresh token, response:", errorText);
                throw new Error("Failed to refresh token");
            }

            const data = await res.json();
            const newAccessToken = data.access_token;
            await SecureStore.setItemAsync("accessToken", newAccessToken);
            return newAccessToken;
        } catch (err) {
            console.error("Refresh token error:", err);
            await logout();
            return null;
        }
    };

    const checkSession = async () => {
        //await SecureStore.deleteItemAsync("accessToken");
        let token = await SecureStore.getItemAsync("accessToken");

        if (!token) {
            token = await refreshAccessToken();
            if (!token) {
                setLoading(false);
                return;
            }
        }

        try {
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401 || res.status === 403) {
                console.log("Access token expired. Trying refresh...");
                token = await refreshAccessToken();
                if (!token) {
                    setLoading(false);
                    return;
                }

                const retryRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const retryData = await retryRes.json();
                if (retryData.email) {
                    setUser({ ...retryData });
                } else {
                    await logout();
                }
                setLoading(false);
                return;
            }

            const data = await res.json();
            if (data.email) {
                setUser({ ...data, token });
            } else {
                await SecureStore.deleteItemAsync("accessToken");
            }
        } catch (e) {
            console.log("Error fetching user info:", e);
            await SecureStore.deleteItemAsync("accessToken");
        }

        setLoading(false);
    };

    useEffect(() => {
        const runCheck = async () => {
            return await checkSession();
        };
        runCheck();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
