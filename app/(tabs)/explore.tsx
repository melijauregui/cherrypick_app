import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { TextInput, View, Image } from "react-native";
import icons from "../../constants/icons";
import List2 from "@/app/components/List2";
import {
  CatalogItemArraySchema,
  CatalogItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { getClothingItemsHome } from "@/app/utils/fetch";

const Explore = () => {
  const [clothingItems, setClothingItems] = useState<CatalogItemSchemaType[]>(
    []
  );
  const [searchText, onChangeTextSearch] = React.useState("");

  useEffect(() => {
    const fetchClothingItems = async () => {
      const items = await getClothingItemsHome(0, 100); //todo
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

        <List2
          queryKey={["explore-items"]}
          getClothingItems={getClothingItemsHome}
          limit={10}
          columnCount={2}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Explore;
