import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { router, useSegments } from "expo-router";

const AuthRedirect = () => {
  const { user, loading, isCreating } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Esperar a que termine la verificación

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!user && !inAuthGroup) {
      // Si no hay usuario y no está en auth, redirigir a sign-in
      console.log("No user, redirecting to sign-in");
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      if (isCreating) {
        // Use stored user data if available, otherwise use user data
        const name = user?.name || "";
        const email = user?.email || "";

        // If we don't have the required data, redirect to sign-in
        if (!name || !email) {
          console.log("Missing user data for creation, redirecting to sign-in");
          router.replace("/sign-in");
          return;
        }

        router.replace({
          pathname: "/preferences",
          params: {
            name,
            email,
            dateBirth: "",
          },
        });
      } else {
        // Si hay usuario y está en auth, redirigir a home
        router.replace("/home");
      }
    }
  }, [user, loading, segments, isCreating]);

  return null; // Este componente no renderiza nada
};

export default AuthRedirect;
