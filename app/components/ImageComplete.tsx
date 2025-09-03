import { Dimensions, Image, Linking, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

const ImageComplete = ({
  imageUrl,
  url,
  setImageHeighteExternal,
}: {
  imageUrl: string;
  url?: string;
  setImageHeighteExternal?: (height: number) => void;
}) => {
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
        setImageHeighteExternal?.(calculatedHeight);
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
    <>
      {url ? (
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <Image
            className="rounded-3xl"
            source={{ uri: imageUrl }}
            style={{ width: screenWidth, height: imageHeight }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <Image
          className="rounded-3xl"
          source={{ uri: imageUrl }}
          style={{ width: screenWidth, height: imageHeight }}
          resizeMode="cover"
        />
      )}
    </>
  );
};
export default ImageComplete;
