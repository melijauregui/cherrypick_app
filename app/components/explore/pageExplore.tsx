import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { useRouter } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import List2 from "@/app/components/List2";
import { getClothingItemsHome } from "@/app/utils/fetch";

export const PageExplore = ({
  query,
  isExplorePage,
}: {
  query: string;
  isExplorePage: boolean;
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState((query as string) || "");

  const onChangeTextSearch = (text: string) => {
    setSearchText(text);
  };

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
    onChangeTextSearch(query as string);
  };
  return (
    <View>
      <View className="flex-row items-center px-4 py-2">
        {!isExplorePage && (
          <Entypo
            name="chevron-thin-left"
            size={22}
            color="#ffffff"
            onPress={() => router.back()}
            style={{ marginRight: 12 }}
          />
        )}
        <View className="bg-transparent border border-white rounded-full flex-1 px-4 py-5 flex-row  items-center ">
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
      </View>

      <List2
        queryKey={["search-results", query]}
        getClothingItems={getClothingItemsHome}
        limit={10}
        columnCount={2}
      />
    </View>
  );
};
