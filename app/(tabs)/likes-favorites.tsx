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
import ClothingItemComponent from "../components/ClothingItemComponent";
import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { useSession } from "@/lib/auth-client";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ListClotheItems from "../components/ListClotheItems";

const { width } = Dimensions.get("window");
const numColumns = 3;

const LikesFavoritesPage = () => {
  const [activeTab, setActiveTab] = useState<"likes" | "favorites">("likes");
  const { user } = useSession();

  // Query for liked items
  const {
    data: likedItems = [],
    isLoading: isLoadingLikes,
    error: errorLikes,
  } = useQuery({
    queryKey: ["liked-items"],
    queryFn: () => getAllLikedItems(0, 100),
    enabled: !!user?.email,
  });

  // Query for favorited items
  const {
    data: favoritedItems = [],
    isLoading: isLoadingFavorites,
    error: errorFavorites,
  } = useQuery({
    queryKey: ["favorited-items"],
    queryFn: () => getAllFavoritedItems(0, 100),
    enabled: !!user?.email,
  });

  const currentItems = activeTab === "likes" ? likedItems : favoritedItems;
  const isLoading = activeTab === "likes" ? isLoadingLikes : isLoadingFavorites;
  const error = activeTab === "likes" ? errorLikes : errorFavorites;

  const renderItem = ({
    item,
    index,
  }: {
    item: CatalogItemSchemaType;
    index: number;
  }) => <ClothingItemComponent i={index} item={item} numColumns={numColumns} />;

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
      <View className="flex-row bg-brown-strong ">
        <TouchableOpacity
          className={`flex-1 py-4 px-6 ${
            activeTab === "likes" ? "border-b-2 border-brown-extraLight" : ""
          }`}
          onPress={() => setActiveTab("likes")}
        >
          <View className="flex-row items-center justify-center gap-1">
            <Ionicons
              name={activeTab === "likes" ? "heart" : "heart-outline"}
              size={20}
              color={activeTab === "likes" ? "#bd8e75" : "white"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-4 px-6 ${
            activeTab === "favorites"
              ? "border-b-2 border-brown-extraLight"
              : ""
          }`}
          onPress={() => setActiveTab("favorites")}
        >
          <View className="flex-row items-center justify-center gap-2">
            <FontAwesome
              name={activeTab === "favorites" ? "bookmark" : "bookmark-o"}
              size={20}
              color={activeTab === "favorites" ? "#bd8e75" : "white"}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 bg-brown-strong">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">Cargando...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center px-8">
            <Text className="text-red-500 text-center text-lg">
              Error al cargar los items
            </Text>
          </View>
        ) : (
          <ListClotheItems
            brandId={null}
            brandEmail={undefined}
            getClothingItems={
              activeTab === "likes" ? getAllLikedItems : getAllFavoritedItems
            }
            limit={100}
            columnCount={numColumns}
            itemWhenNothingFound={renderEmptyState}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LikesFavoritesPage;
