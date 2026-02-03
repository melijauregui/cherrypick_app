import { View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";

// Componente de placeholder para items que están cargando
export const ItemPlaceholder = ({
  width,
  height,
  marginTop,
}: {
  width: number;
  height: number;
  marginTop: number;
}) => (
  <View
    className="mx-auto bg-neutral-400"
    style={{
      width,
      height,
      marginTop,
      borderRadius: 8,
    }}
  />
);

const ClothingItemComponent = ({
  i,
  item,
  numColumns,
  renderedHeight,
  renderedWidth,
  onImageLoaded,
}: {
  i: number;
  item: ItemSchemaType;
  numColumns: number;
  renderedHeight: number;
  renderedWidth: number;
  onImageLoaded?: (uuid: string) => void;
}) => {
  const { image } = item;
  // const [imageDimensions, setImageDimensions] = useState({
  //   width: 0,
  //   height: 0,
  // });

  // const { width, height } = Dimensions.get("window");
  // const widthDetermined = width / numColumns - 6; //width hard coded

  // const imageRef = useRef<View>(null);

  // useEffect(() => {
  //   Image.getSize(
  //     image_url,
  //     (width, height) => {
  //       setImageDimensions({ width, height });
  //     },
  //     error => console.error("Failed to get dimensions for image:", error)
  //   );
  // }, [item.uuid]);

  // // Si los valores son inválidos, no renderizar nada
  // if (
  //   !imageDimensions.width ||
  //   !imageDimensions.height ||
  //   imageDimensions.width <= 0
  // ) {
  //   return null;
  // }

  // const imageHeight =
  //   (widthDetermined * imageDimensions.height) / imageDimensions.width;

  // Si el cálculo resulta en NaN o valores inválidos, no renderizar nada
  if (
    isNaN(renderedHeight) ||
    !isFinite(renderedHeight) ||
    renderedHeight <= 0
  ) {
    return null;
  }

  const handlePress = () => {
    router.push({
      pathname: "/(items)/item-page",
      params: {
        uuid: item.uuid,
      },
    });
  };

  return (
    <View
      className="mx-auto"
      style={{
        width: renderedWidth,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: i < numColumns ? 0 : 12,
      }}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        {image.url ? (
          <ExpoImage
            source={{ uri: image.url }}
            placeholder={
              // neutral placeholder while real bitmap arrives
              { blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }
            }
            style={{ width: renderedWidth, height: renderedHeight }}
            contentFit="cover"
            cachePolicy="none"
            recyclingKey={item.uuid}
            transition={0}
            // allowDownscaling={false}
            onLoadEnd={() => onImageLoaded?.(item.uuid)}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default ClothingItemComponent;
