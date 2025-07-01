import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ClothingItemComponent from "@/app/components/ClothingItemComponent";
import { TextInput, View, Image } from "react-native";
import icons from "../../constants/icons";
import { Metadata } from "./home";
import { LOCAL_IP } from "@/config/api";

const Explore = () => {
  const [clothingItems, setClothingItems] = useState<Metadata[]>([]);
  const [searchText, onChangeTextSearch] = React.useState("");

  useEffect(() => {
    const fetchClothingItems = async () => {
      const items = await getClothingItems();
      setClothingItems(items);
    };

    fetchClothingItems();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brown-strong w-full flex-1 ">
        <View className="">
          <TextInput
            className="bg-[#212121] rounded-full p-2 mx-4 pl-10 py-5 text-white font-pregular my-2"
            onChangeText={onChangeTextSearch}
            value={searchText}
            placeholder="Search"
            placeholderTextColor="#999999"
          />
          <Image
            className="absolute  mx-7 my-7 w-5 h-5"
            tintColor="#999999"
            source={icons.search}
            resizeMode="contain"
          />
        </View>

        <MasonryFlashList
          data={clothingItems}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item, index }: { item: Metadata; index: number }) => (
            <ClothingItemComponent
              i={index}
              url={item.image_url}
              numColumns={2}
            />
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Explore;

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
