import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ItemSchemaIdType } from "@/schemas/catalog/catalog-schema";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WeeklyInspo() {
  const TITLE_HEIGHT = 160;

  return (
    <SafeAreaView className="flex-1 bg-brown-strong">
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <ImageBackgroundComponent>
          <View className="absolute top-0 left-0 right-0 z-10 bg-black/40 px-6 pt-20">
            <View className="flex-row items-center justify-between mb-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="items-center justify-center"
                activeOpacity={1}
              >
                <Entypo name="chevron-thin-left" size={22} color="white" />
              </TouchableOpacity>
              <Text className="text-3xl font-pbold text-white text-center flex-1">
                Inspo Semanal
              </Text>
            </View>
            <Text className="text-lg font-pmedium text-white/90 text-center">
              Polleras de encaje, tops minimalistas y esa brisa cálida que nos
              invita a renovar nuestro estilo
            </Text>
          </View>
          <ScrollView
            className="flex-1 w-full relative"
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            style={{
              marginTop: TITLE_HEIGHT,
            }}
          >
            <View className="flex-col gap-1 justify-center flex-1 px-4">
              {mockProducts.map(product => (
                <ProductCard
                  key={product.uuid}
                  product={product}
                  onColorSelect={() => {}}
                  onAddToCart={() => {}}
                />
              ))}
            </View>
          </ScrollView>
        </ImageBackgroundComponent>
      </View>
    </SafeAreaView>
  );
}

function ImageBackgroundComponent({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require("@/assets/images/inspo.jpeg")}
      style={{ width: screenWidth, height: screenHeight }}
      resizeMode="cover"
      imageStyle={{
        resizeMode: "cover",
        alignSelf: "flex-start",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        className="flex-1 justify-center items-center"
      >
        {children}
      </View>
    </ImageBackground>
  );
}

interface ProductCardProps {
  product: ItemSchemaIdType;
  onColorSelect: (productId: string, color: string) => void;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onColorSelect,
  onAddToCart,
}) => {
  return (
    <View className="flex-row bg-white/90 w-56 rounded-xl p-3 mb-4 gap-3">
      <Image
        source={{ uri: product.imageUrl }}
        className="w-24 h-36 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-pbold text-base text-gray-900 mb-1">
          {product.name}
        </Text>
        <Text className="font-pmedium text-sm text-gray-700 mb-1 flex-wrap">
          {product.description}
        </Text>
        <Text className="font-pbold text-sm text-gray-900 mt-2">
          ${product.price}
        </Text>
      </View>
    </View>
  );
};

const mockProducts: ItemSchemaIdType[] = [
  {
    uuid: "1",
    name: "Nora",
    description: "Non stretch denim",
    imageUrl:
      "https://i.pinimg.com/736x/5a/23/7c/5a237c320b9cd5c5bd9d9ed08ac3610b.jpg",
    price: 89,
    url: "https://ar.pinterest.com/pin/4601060432427917824/",
  },
  {
    uuid: "2",
    name: "Kana",
    description: "Non stretch denim",
    imageUrl:
      "https://i.pinimg.com/736x/7b/46/dd/7b46ddbde038b6ffe38341ba442480e6.jpg",
    url: "https://ar.pinterest.com/pin/687784174380430940/",
    price: 79,
  },
  {
    uuid: "3",
    name: "Vaia",
    url: "https://ar.pinterest.com/pin/4601060432427917824/",
    description: "Non stretch denim",
    imageUrl:
      "https://i.pinimg.com/1200x/b3/1d/82/b31d82283cb74a2e0a794a0e0f367b57.jpg",
    price: 95,
  },
  {
    uuid: "4",
    name: "Noelle",
    url: "https://ar.pinterest.com/pin/734297914286091569/",
    description: "Non stretch denim",
    imageUrl:
      "https://i.pinimg.com/1200x/1b/6b/d2/1b6bd23f88e7a472a8fc6214546f2c7d.jpg",
    price: 120,
  },
];
