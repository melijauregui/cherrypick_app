import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllLikedItems, getAllFavoritedItems } from "../utils/fetch";
import { useSession } from "@/lib/auth-client";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import List2 from "@/app/components/List2";

const { width } = Dimensions.get("window");
const numColumns = 3;

const LikesFavoritesPage = () => {
  const [activeTab, setActiveTab] = useState<"likes" | "favorites">("likes");
  const { user } = useSession();

  // // Query for liked items
  // const {
  //   data: likedItems = [],
  //   isLoading: isLoadingLikes,
  //   error: errorLikes,
  // } = useQuery({
  //   queryKey: ["liked-items"],
  //   queryFn: () => getAllLikedItems(0, 10),
  //   enabled: !!user?.email,
  // });

  // // Query for favorited items
  // const {
  //   data: favoritedItems = [],
  //   isLoading: isLoadingFavorites,
  //   error: errorFavorites,
  // } = useQuery({
  //   queryKey: ["favorited-items"],
  //   queryFn: () => getAllFavoritedItems(0, 100),
  //   enabled: !!user?.email,
  // });

  // const currentItems = activeTab === "likes" ? likedItems : favoritedItems;
  // const isLoading = activeTab === "likes" ? isLoadingLikes : isLoadingFavorites;
  // const error = activeTab === "likes" ? errorLikes : errorFavorites;

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Text className="text-gray-500 text-center text-lg">
        {activeTab === "likes"
          ? "No tienes items que te gusten aún"
          : "No tienes items favoritos aún"}
      </Text>
      <Text className="text-gray-400 text-center text-sm mt-2">
        {activeTab === "likes"
          ? "Los items que te gusten aparecerán aquí"
          : "Los items que marques como favoritos aparecerán aquí"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-brown-strong">
      {/* Tab Navigation */}
      <View className="flex-row bg-brown-strong mb-1">
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={() => setActiveTab("likes")}
          tab="likes"
          icon={
            <Ionicons
              name={activeTab === "likes" ? "heart" : "heart-outline"}
              size={24}
              color={activeTab === "likes" ? "#bd8e75" : "white"}
            />
          }
        />
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={() => setActiveTab("favorites")}
          tab="favorites"
          icon={
            <FontAwesome
              name={activeTab === "favorites" ? "bookmark" : "bookmark-o"}
              size={24}
              color={activeTab === "favorites" ? "#bd8e75" : "white"}
            />
          }
        />
      </View>

      {/* Content */}
      <List2
        queryKey={
          activeTab === "likes"
            ? ["all-liked-items", user?.email]
            : ["all-favorited-items", user?.email]
        }
        getClothingItems={
          activeTab === "likes" ? getAllLikedItems : getAllFavoritedItems
        }
        limit={10}
        columnCount={numColumns}
        itemWhenNothingFound={renderEmptyState}
      />
    </SafeAreaView>
  );
};

export default LikesFavoritesPage;

const TabNavigation = ({
  activeTab,
  setActiveTab,
  tab,
  icon,
}: {
  activeTab: "likes" | "favorites";
  setActiveTab: () => void;
  tab: "likes" | "favorites";
  icon: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      className={`flex-1 py-4 px-6 ${
        activeTab === tab ? "border-b-2 border-brown-extraLight" : ""
      }`}
      onPress={() => setActiveTab()}
    >
      <View className="flex-row items-center justify-center gap-1">{icon}</View>
    </TouchableOpacity>
  );
};
