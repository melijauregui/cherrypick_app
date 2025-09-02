import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { TextInput, View, Image } from "react-native";
import { useRouter } from "expo-router";
import List2 from "@/app/components/List2";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { getClothingItemsHome } from "@/app/utils/fetch";
import { Ionicons } from "@expo/vector-icons";

const Explore = () => {
  const [clothingItems, setClothingItems] = useState<ItemSchemaType[]>([]);
  const [searchText, onChangeTextSearch] = React.useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchText.trim() === "") {
      return;
    }
    router.push({
      pathname: "/(search)/[query]",
      params: {
        query: searchText.trim(),
      },
    });
    onChangeTextSearch("");
  };

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
        <View className="bg-transparent border border-white rounded-full mx-4 px-4 py-5 my-2 flex-row items-center">
          <Ionicons name="search-outline" size={20} color="#ffffff" />
          <TextInput
            className="text-lg text-white font-pregular flex-1 mx-3"
            onChangeText={onChangeTextSearch}
            value={searchText}
            placeholder="Search Item"
            placeholderTextColor="#999999"
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Ionicons name="camera-outline" size={21} color="#ffffff" />
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
