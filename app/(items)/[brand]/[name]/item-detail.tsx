import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  CatalogItemSchemaType,
  GetItemResponseSchema,
} from "@/schemas/catalog/catalog-schema";
import Toast from "react-native-toast-message";
import safeFetch from "../../../utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { CatalogItemArraySchema } from "@/schemas/catalog/catalog-schema";
import ListItems from "../../../components/ListClotheItems";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ItemDetail = () => {
  const params = useLocalSearchParams();
  const item = useFetchItem(
    params.name as string,
    params.brand as string,
    params.imageUrl as string | undefined,
    params.description as string | undefined,
    parseFloat(params.price as string),
    params.url as string | undefined
  );

  const [isPressed, setIsPressed] = useState(false);

  if (!item) {
    return null;
  }

  return (
    <View className="flex-1 bg-brown-strong">
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
          <ImageComponent imageUrl={item.item.image_url} />
        </View>

        <View className="px-4 pb-6 pt-4 flex-row items-center gap-8">
          {/* <View className="flex-row items-center space-x-4"> */}
          <TouchableOpacity className="w-8 h-8 items-center justify-center">
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="w-8 h-8 items-center justify-center">
            <FontAwesome name="bookmark-o" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="w-8 h-8 items-center justify-center">
            <Ionicons name="arrow-up-outline" size={24} color="white" />
          </TouchableOpacity>
          {/* </View> */}

          <TouchableOpacity className="w-8 h-8 items-center justify-center">
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
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

function useFetchItem(
  itemName: string,
  itemBrand: string,
  imageUrl: string | undefined,
  description: string | undefined,
  price: number | undefined,
  url: string | undefined
): {
  item: {
    name: string;
    brand: string;
    image_url: string;
    description: string;
    price: number;
    url: string;
  };
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item-detail", itemName, itemBrand],
    queryFn: async () => {
      if (!imageUrl || !description || !price || !url) {
        try {
          const { data } = await safeFetch({
            url: `http://${LOCAL_IP}:3000/get-item?brand=${itemBrand}&name=${itemName}`,
            method: "GET",
            schema: GetItemResponseSchema,
          });
          if (data.error) {
            throw new Error(data.details);
          }
          return data;
        } catch (error) {
          console.error("Error fetching user data2:", error);
          return null;
        }
      } else {
        return {
          item: {
            name: itemName,
            brand: itemBrand,
            image_url: imageUrl,
            description: description,
            price: price,
            url: url,
          },
        };
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    console.log("No data found", error);
    return null;
  }
  return data;
}
