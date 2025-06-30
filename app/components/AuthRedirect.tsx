import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { router, useSegments } from "expo-router";

export const AuthRedirect = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Esperar a que termine la verificación

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!user && !inAuthGroup) {
      // Si no hay usuario y no está en auth, redirigir a sign-in
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Si hay usuario y está en auth, redirigir a home
      router.replace("/home");
    }
  }, [user, loading, segments]);

  return null; // Este componente no renderiza nada
};
