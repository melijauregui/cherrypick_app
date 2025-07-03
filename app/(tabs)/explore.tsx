import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ClothingItemComponent from "@/app/components/ClothingItemComponent";
import { TextInput, View, Image } from "react-native";
import icons from "../../constants/icons";
import { LOCAL_IP } from "@/config/api";
import ListItems from "../components/ListClotheItems";
import {
  CatalogItemArraySchema,
  CatalogItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import safeFetch from "../utils/safe-fetch";

const Explore = () => {
  const [clothingItems, setClothingItems] = useState<CatalogItemSchemaType[]>(
    []
  );
  const [searchText, onChangeTextSearch] = React.useState("");

  useEffect(() => {
    const fetchClothingItems = async () => {
      const items = await getClothingItems(0, 100, undefined); //todo
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
export default Explore;

async function getClothingItems(
  page: number,
  limit: number,
  brand: string | undefined
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
