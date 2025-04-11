import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { ClothingItemComponent } from "@/components/ClothingItemComponent";

const Home = () => {
  const [clothingItems, setClothingItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchClothingItems = async () => {
      const items = await getClothingItems();
      setClothingItems(items);
      console.log("Datos paginados:", items);
    };

    fetchClothingItems();
  }, []);

  return (
    <SafeAreaProvider>
    <SafeAreaView className="bg-brown-strong w-full flex-1 "  >
      <MasonryFlashList
        data={clothingItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10}}
        renderItem={({item, index}: {item: string, index: number}) => <ClothingItemComponent
          i={index}
          key={index}
          id={(index).toString()}
          url={item}
        />}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  </SafeAreaProvider>
  );
};
export default Home;


async function getClothingItems(): Promise<string[]>  {
  const page = "2";
  const limit = "10";

  try {
    const response: Response = await fetch(
      `http://localhost:3000/database?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const jsonResponse: any = await response.json();
    const clothingItems: string[] = jsonResponse.data;
    console.log("Clothing items:", clothingItems);
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

