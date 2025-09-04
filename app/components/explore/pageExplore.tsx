import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import List2 from "@/app/components/List2";
import { getClothingItemsTextSearch } from "@/app/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../LoadingPage";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { SafeAreaView } from "react-native-safe-area-context";

const PageExplore = ({
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
    <SafeAreaView className="flex-1 bg-brown">
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
          <TouchableOpacity onPress={() => router.push("/camera")}>
            <Ionicons name="camera-outline" size={21} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {isExplorePage && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FashionIdeasSection query={"Minimalist"} />
          <FashionIdeasSection query={"Coquette"} />
          <FashionIdeasSection query={"Streetwear"} />
          <FashionIdeasSection query={"Sporty"} />
          <FashionIdeasSection query={"Old money"} />
          <FashionIdeasSection query={"Boho-chic"} />
        </ScrollView>
      )}

      {!isExplorePage && (
        <List2
          queryKey={["search-results", query]}
          getClothingItems={(page, limit) =>
            getClothingItemsTextSearch(query, page, limit)
          }
          limit={10}
          columnCount={2}
        />
      )}
    </SafeAreaView >
  );
};

export default PageExplore;

const FashionIdeasSection = ({ query }: { query: string }) => {
  const router = useRouter();

  const handleNavigateToSearch = () => {
    router.push({
      pathname: "/(search)/[query]",
      params: {
        query: query,
      },
    });
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <View>
          <Text className="text-white text-sm font-pregular opacity-80">
            Ideas para ti
          </Text>
          <Text className="text-white text-xl font-pbold">{query}</Text>
        </View>
        <TouchableOpacity
          onPress={handleNavigateToSearch}
          className="rounded-full p-2"
        >
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <GridImages query={query} />
    </View>
  );
};

const GridImages = ({ query }: { query: string }) => {
  const { data } = useQuery({
    queryKey: ["explore-items", query],
    queryFn: () => getClothingItemsTextSearch(query, 0, 4),
  });
  if (!data) {
    return <LoadingPage alreadyPrefetched={true} />;
  }
  return (
    <View className="flex-row px-1 gap-0.5">
      {data.map((item: ItemSchemaType, index: number) => (
        <View key={item.uuid || index} className="flex-1">
          <Image
            source={{ uri: item.imageUrl }}
            className={`w-full h-60 ${index === 0 ? "rounded-l-xl" : index === data.length - 1 ? "rounded-r-xl" : ""}`}
            resizeMode="cover"
          />
        </View>
      ))}
    </View>
  );
};
