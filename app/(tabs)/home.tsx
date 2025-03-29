import { View, Text, Image, StatusBar, FlatList, Dimensions } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";

const Home = () => {
  const [clothingItems, setClothingItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchClothingItems = async () => {
      const items = await getClothingItems();
      setClothingItems(items);
      console.log("Datos paginados:", items);
    };

    fetchClothingItems();
  }, []);

  return (
      <SafeAreaProvider>
    <SafeAreaView className="bg-brown-strong w-full flex-1 "  >
      <MasonryFlashList
        data={clothingItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10}}
        renderItem={({item, index}: {item: string, index: number}) => <ClothingItemComponent
          i={index}
          key={index}
          id={(index).toString()}
          url={item}
        />}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  </SafeAreaProvider>
  );
};
export default Home;

const ClothingItemComponent = ({ i, id, url }: { i:number, id: string; url: string }) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = Dimensions.get("window");
  const widthDetermined = (width/2)-10; //width hard coded

  useEffect(() => {
    Image.getSize(
      url,
      (width, height) => {
        setImageDimensions({ width, height });
      },
      (error) => console.error("Failed to get dimensions for image 1:", error)
    );
  }, []);

  const imageHeight = imageDimensions.width
    ? (widthDetermined * imageDimensions.height) / imageDimensions.width
    : widthDetermined;

  return (
    <View className="mx-auto" style={{ width: widthDetermined, borderRadius: 8, overflow: "hidden", marginTop: i < 2 ? 0 : 18 }}>
      <Image
        source={{ uri: url }}
        style={{ width: widthDetermined, height: imageHeight }}
        resizeMode="contain"
      />
    </View>
  );
};

async function getClothingItems(): Promise<string[]>  {
  const page = "2";
  const limit = "10";

  try {
    const response: Response = await fetch(
      `http://localhost:3000/database?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const jsonResponse: any = await response.json();
    const clothingItems: string[] = jsonResponse.data;
    console.log("Clothing items:", clothingItems);
    return clothingItems;

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Error desconocido");
    }
    return [];
  }
}

