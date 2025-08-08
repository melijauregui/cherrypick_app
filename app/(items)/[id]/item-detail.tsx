import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";
import Toast from "react-native-toast-message";
import safeFetch from "../../utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { CatalogItemArraySchema } from "@/schemas/catalog/catalog-schema";
import ListItems from "../../components/ListClotheItems";

const ItemDetail = () => {
  const params = useLocalSearchParams();
  const itemId = params.id as string;
  const item: CatalogItemSchemaType = {
    name: params.itemName as string,
    brand: params.itemBrand as string,
    image_url: params.itemImageUrl as string,
    description: params.itemDescription as string,
    price: parseFloat(params.itemPrice as string),
    url: params.itemUrl as string,
  };
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View className="flex-1 bg-brown-strong">
      {/* Fixed back button - always visible */}
      <TouchableOpacity
        onPress={() => router.back()}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={`absolute top-12 left-4 w-14 h-14 rounded-2xl bg-black items-center justify-center z-50 ${
          isPressed ? "opacity-100" : "opacity-80"
        }`}
        activeOpacity={1}
      >
        <Entypo name="chevron-thin-left" size={22} color="white" />
      </TouchableOpacity>

      <ScrollView className="flex-1">
        <View className="relative">
          <ImageComponent imageUrl={item.image_url} />
        </View>

        <View className="px-4 pb-6">
          <View className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity className="w-8 h-8 items-center justify-center">
                <Ionicons name="heart-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="w-8 h-8 items-center justify-center">
                <Ionicons name="chatbubble-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="w-8 h-8 items-center justify-center">
                <Ionicons name="arrow-up-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="w-8 h-8 items-center justify-center">
              <Ionicons name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ListItems
          profileData={null}
          getClothingItems={getClothingItems}
          limit={100}
          columnCount={2}
        />
      </ScrollView>
    </View>
  );
};

export default ItemDetail;

const ImageComponent = ({ imageUrl }: { imageUrl: string }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [imageHeight, setImageHeight] = useState(0);

  const calculateImageHeight = (imageWidth: number, imageHeight: number) => {
    const aspectRatio = imageHeight / imageWidth;
    return screenWidth * aspectRatio;
  };

  useEffect(() => {
    Image.getSize(
      imageUrl,
      (width, height) => {
        const calculatedHeight = calculateImageHeight(width, height);
        setImageHeight(calculatedHeight);
      },
      error => {
        Toast.show({
          type: "error",
          text1: "Error loading image size",
          text2: error.message,
          visibilityTime: 4000,
        });
        console.error("Error loading image size:", error);
      }
    );
  }, [imageUrl]);

  return (
    <Image
      source={{ uri: imageUrl }}
      style={{ width: screenWidth, height: imageHeight }}
      resizeMode="cover"
    />
  );
};

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
