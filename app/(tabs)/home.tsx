import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { ClothingItemComponent } from "@/app/components/ClothingItemComponent";
import { LOCAL_IP } from "@/config/api";

const Home = () => {
  const [clothingItems, setClothingItems] = useState<Metadata[]>([]);

  useEffect(() => {
    const fetchClothingItems = async () => {
      const items = await getClothingItems();
      setClothingItems(items);
      //console.log("Datos paginados:", items);
    };

    fetchClothingItems();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brown-strong w-full flex-1 ">
        <MasonryFlashList
          data={clothingItems}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item, index }: { item: Metadata; index: number }) => (
            <ClothingItemComponent
              i={index}
              key={index}
              id={index.toString()}
              url={item.image_url}
            />
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Home;

interface Metadata {
  id: string;
  description: string;
  image_url: string;
  url: string;
  type: string;
}
export type { Metadata };
async function getClothingItems(): Promise<Metadata[]> {
  const page = "2";
  const limit = "10";

  try {
    const response: Response = await fetch(
      `http://${LOCAL_IP}:3000/all?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );
    // // console.log("Status:", response.status);
    // console.log("Response text:", await response.text());

    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const clothingItems: Metadata[] = await response.json();
    //console.log("Clothing items:", clothingItems);
    return clothingItems;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Error desconocido");
    }
    return [];
  }
}
