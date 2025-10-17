import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";
import { addMinutes, isAfter } from "date-fns";
import { imageDefault } from "@/lib/constants";
import { Skeleton } from "moti/skeleton";

const ImageComplete = ({
  imageUrl,
  url,
  imageUrlUpdatedAt,
  maxHeight,
  setImageHeighteExternal,
  imageWidth,
  imageHeight: storedImageHeight,
}: {
  imageUrl: string;
  url?: string;
  imageUrlUpdatedAt?: Date;
  maxHeight?: number;
  setImageHeighteExternal?: (height: number) => void;
  imageWidth?: number;
  imageHeight?: number;
}) => {
  const { width: screenWidth } = Dimensions.get("window");
  const [imageHeight, setImageHeight] = useState(
    storedImageHeight && imageWidth
      ? calculateImageHeight({
          imageWidth,
          imageHeight: storedImageHeight,
          screenWidth,
        })
      : 0
  );
  const [timestamp, setTimestamp] = useState<{
    timestamp: number;
    retries: number;
  }>({ timestamp: Date.now(), retries: 0 });

  const src = useMemo(() => {
    if (timestamp.retries >= 50) {
      return { uri: imageDefault };
    }
    let src = imageUrl ? { uri: imageUrl } : { uri: imageDefault };
    if (imageUrlUpdatedAt && imageUrl) {
      const updatedAtDate = new Date(imageUrlUpdatedAt);
      const fourMinutesAgo = addMinutes(new Date(), -4);
      if (isAfter(updatedAtDate, fourMinutesAgo) && imageUrl) {
        src = { uri: imageUrl + `?timestamp=${timestamp.timestamp}` };
      }
    }
    return src;
  }, [imageUrl, imageUrlUpdatedAt, timestamp]);

  useEffect(() => {
    setTimestamp({ timestamp: Date.now(), retries: 0 });
  }, [imageUrl]);

  useEffect(() => {
    // If we already have stored dimensions, use them
    if (storedImageHeight && imageWidth) {
      const calculatedHeight = calculateImageHeight({
        imageWidth,
        imageHeight: storedImageHeight,
        screenWidth,
      });
      const finalHeight =
        maxHeight && calculatedHeight > maxHeight
          ? maxHeight
          : calculatedHeight;
      setImageHeight(finalHeight);
      setImageHeighteExternal?.(finalHeight);
      return;
    }

    // Otherwise, calculate dimensions from the image
    if (src?.uri) {
      getImageSize(src.uri, screenWidth)
        .then(height => {
          if (maxHeight && height > maxHeight) {
            height = maxHeight;
          }
          setImageHeight(height);
          setImageHeighteExternal?.(height);
        })
        .catch(() => {
          setTimestamp(prev => {
            if (prev.retries >= 50) {
              return prev;
            }
            return {
              timestamp: Date.now(),
              retries: prev.retries + 1,
            };
          });
        });
    }
  }, [
    imageUrl,
    screenWidth,
    src,
    timestamp,
    setImageHeighteExternal,
    storedImageHeight,
    imageWidth,
    maxHeight,
  ]);

  return (
    <>
      {imageHeight === 0 ? (
        <View style={{ width: screenWidth, height: 400 }}>
          {/* <Skeleton colorMode={"dark"} width={screenWidth - 5} height={450} /> */}
        </View>
      ) : url ? (
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <Image
            className="rounded-3xl"
            source={src}
            style={{ width: screenWidth, height: imageHeight }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <Image
          className=""
          source={src}
          style={{ width: screenWidth, height: imageHeight }}
          resizeMode="cover"
        />
      )}
    </>
  );
};

export default ImageComplete;

const calculateImageHeight = ({
  imageWidth,
  imageHeight,
  screenWidth,
}: {
  imageWidth: number;
  imageHeight: number;
  screenWidth: number;
}) => {
  const aspectRatio = imageHeight / imageWidth;
  return screenWidth * aspectRatio;
};

function getImageSize(imageUrl: string, screenWidth: number): Promise<number> {
  return new Promise((resolve, reject) => {
    Image.getSizeWithHeaders(
      imageUrl,
      {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        Timestamp: Date.now().toString(),
      },
      (width, height) => {
        const calculatedHeight = calculateImageHeight({
          imageWidth: width,
          imageHeight: height,
          screenWidth,
        });
        resolve(calculatedHeight);
      },
      error => {
        // console.error("Error loading image size:", error);
        reject(error);
      }
    );
  });
}
