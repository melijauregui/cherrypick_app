import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { LOCAL_IP } from "@/config/api";
import ListItems from "../components/ListClotheItems";
import {
  CatalogItemArraySchema,
  CatalogItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import safeFetch from "../utils/safe-fetch";
import LoadingPage from "../components/LoadingPage";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const queryClient = useQueryClient();
  const [hasData, setHasData] = useState(false);

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
    return <LoadingPage />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brown-strong w-full flex-1 ">
        <ListItems
          profileData={null}
          getClothingItems={getClothingItems}
          limit={100}
          columnCount={2}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Home;

async function getClothingItems(
  page: number,
  limit: number,
  brandEmail: string | undefined
): Promise<CatalogItemSchemaType[]> {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all?page=${page}&limit=${limit}`,
      method: "GET",
      schema: CatalogItemArraySchema,
    });
    return data;
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return [];
  }
}
