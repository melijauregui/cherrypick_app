import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { getClothingItemsHome } from "../utils/fetch";
import List2 from "@/app/components/List2";
import { useSession } from "@/lib/auth-client";

const Home = () => {
  const queryClient = useQueryClient();
  const [hasData, setHasData] = useState(false);
  const { user } = useSession();
  const params = useLocalSearchParams();

  // Puedes acceder al parámetro prefetch así:
  const alreadyPrefetched = params.prefetch === "true";

  useEffect(() => {
    // Check immediately first
    const existingData = queryClient.getQueryData(["home-items", user?.email]);
    if (existingData) {
      setHasData(true);
      return;
    }

    const interval = setInterval(() => {
      const data = queryClient.getQueryData(["home-items", user?.email]);
      if (data) {
        setHasData(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [queryClient]);

  if (!hasData) {
    return <LoadingPage alreadyPrefetched={alreadyPrefetched} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brown-strong w-full flex-1 ">
        <List2
          queryKey={["home-items", user?.email]}
          getClothingItems={getClothingItemsHome}
          limit={10}
          columnCount={2}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Home;
