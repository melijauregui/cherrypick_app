import { View, Text, Image, StatusBar, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

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

export {ClothingItemComponent};