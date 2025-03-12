import { View, Text, Image, StatusBar, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import ScrollViewFullHeight from "../../components/ScrollViewFullHeight";
import { MasonryFlashList } from "@shopify/flash-list";

const Home = () => {
  const clothingItems: { id: string; url: string }[] = getClothingItems();

  return (
      <SafeAreaProvider>
    <SafeAreaView className="bg-brown-strong w-full" style={{
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }}>
      <MasonryFlashList
  data={clothingItems}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ }}
  renderItem={({item, index}: {item: {id: string, url: string}, index: number}) => <ClothingItemComponent
    i={index}
    key={index}
    id={(index).toString()}
    url={item.url}
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
  const widthDetermined = 190; //width hard coded

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
    <View style={{ width: widthDetermined, borderRadius: 8, overflow: "hidden" ,marginTop: i < 2 ? 0 : 18 , marginLeft: i % 2 === 0 ? 0 : 4 }}>
      <Image
        source={{ uri: url }}
        style={{ width: widthDetermined, height: imageHeight }}
        resizeMode="contain"
      />
    </View>
  );
};
function getClothingItems(): { id: string; url: string }[]  {
  const clothingItems: { id: string; url: string }[] = Array.from({ length: 0 }, () => ({ id: "", url: "" }));
  clothingItems.push({ id: "1", url: "https://i.pinimg.com/474x/72/ec/8e/72ec8eb21c671a640a92c0a24c76bad8.jpg" });
  clothingItems.push({ id: "2", url: "https://i.pinimg.com/474x/e3/87/4b/e3874b60b2bd8c354b80f74b768ff45a.jpg" });
  clothingItems.push({ id: "3", url: "https://i.pinimg.com/736x/32/be/3e/32be3e7fa9aa0f103599845cf1778d46.jpg" });
  clothingItems.push({ id: "4", url: "https://i.pinimg.com/474x/1f/21/16/1f2116d0a2d253fea8853cbcc7c6820b.jpg" });
  clothingItems.push({ id: "5", url: "https://i.pinimg.com/736x/32/be/3e/32be3e7fa9aa0f103599845cf1778d46.jpg" });

  return clothingItems;
}

