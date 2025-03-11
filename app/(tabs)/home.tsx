import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

// interface ClothingItem {
//   id: number;
//   url: string;
// }

const Home = () => {
  const itemsPage = 14;
  const clothingItems = getClothingItems();

  return (
    <SafeAreaView className="bg-brown-strong min-h-full w-full  ">
      <ScrollView className="min-h-full">
        <View className="flex flex-row gap-3">
          <Columnas itemsPage={itemsPage} />
          <Columnas itemsPage={itemsPage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const Columnas = ({ itemsPage }: { itemsPage: number }) => {
  const image1Url =
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg";

  return (
    <View className="flex flex-col gap-3">
      {Array.from({ length: 11 }).map((_, i) => (
        <ClothingItemComponent
          id={(i + 1).toString()}
          url={`https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${
            i + 1
          }.jpg`}
        />
      ))}
    </View>
  );
};

const ClothingItemComponent = ({ id, url }: { id: string; url: string }) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

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
    ? (200 * imageDimensions.height) / imageDimensions.width
    : 200;

  return (
    <View style={{ width: 200, borderRadius: 8, overflow: "hidden" }}>
      <Image
        source={{ uri: url }}
        style={{ width: 200, height: imageHeight }}
        resizeMode="contain"
      />
    </View>
  );
};
function getClothingItems() {
  const clothingItems = Array.from({ length: 11 });
  for (let i = 0; i < clothingItems.length; i++) {
    const uri = `https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${
      i + 1
    }.jpg`;
    clothingItems[i] = { id: i + 1, url: uri };
  }
  return clothingItems;
}
