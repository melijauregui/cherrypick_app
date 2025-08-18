import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import ListItems from "../components/ListClotheItems";
import LoadingPage from "../components/LoadingPage";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { getClothingItemsHome } from "../utils/fetch";

const Home = () => {
  const queryClient = useQueryClient();
  const [hasData, setHasData] = useState(false);
  const params = useLocalSearchParams();

  // Puedes acceder al parámetro prefetch así:
  const alreadyPrefetched = params.prefetch === "true";

  useEffect(() => {
    // Check immediately first
    const existingData = queryClient.getQueryData(["clothing-items", null]);
    if (existingData) {
      setHasData(true);
      return;
    }

    const interval = setInterval(() => {
      const data = queryClient.getQueryData(["clothing-items", null]);
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
        <ListItems
          brandId={null}
          getClothingItems={getClothingItemsHome}
          limit={100}
          columnCount={2}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Home;
