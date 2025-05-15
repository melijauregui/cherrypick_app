import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
            try {
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data.email) {
                    setUser({ ...data, token });
                }
            } catch (e) {
                console.log("Error Auth: ", e);
                await SecureStore.deleteItemAsync("accessToken");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
