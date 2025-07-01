import { View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

const ClothingItemComponent = ({
  i,
  url: image_url,
  numColumns,
}: {
  i: number;
  url: string;
  numColumns: number;
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = Dimensions.get("window");
  const widthDetermined = width / numColumns - 10; //width hard coded

  useEffect(() => {
    Image.getSize(
      image_url,
      (width, height) => {
        setImageDimensions({ width, height });
      },
      error => console.error("Failed to get dimensions for image 1:", error)
    );
  }, []);

  const imageHeight = imageDimensions.width
    ? (widthDetermined * imageDimensions.height) / imageDimensions.width
    : widthDetermined;

  return (
    <View
      className="mx-auto"
      style={{
        width: widthDetermined,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: i < numColumns ? 0 : 18,
      }}
    >
      {image_url ? (
        <Image
          source={{ uri: image_url }}
          style={{ width: widthDetermined, height: imageHeight }}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );
};

export default ClothingItemComponent;
