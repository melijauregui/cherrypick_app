import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { router } from "expo-router";
import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";

// Función para generar un ID único basado en nombre y marca
const generateItemId = (name: string, brand: string): string => {
  const combined = `${name}-${brand}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const ClothingItemComponent = ({
  i,
  item,
  numColumns,
}: {
  i: number;
  item: CatalogItemSchemaType;
  numColumns: number;
}) => {
  const { image_url } = item;
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = Dimensions.get("window");
  const widthDetermined = width / numColumns - 10; //width hard coded

  const imageRef = useRef<View>(null);

  useEffect(() => {
    Image.getSize(
      image_url,
      (width, height) => {
        setImageDimensions({ width, height });
      },
      error => console.error("Failed to get dimensions for image 1:", error)
    );
  }, []);

  // Si los valores son inválidos, no renderizar nada
  if (
    !imageDimensions.width ||
    !imageDimensions.height ||
    imageDimensions.width <= 0
  ) {
    return null;
  }

  const imageHeight =
    (widthDetermined * imageDimensions.height) / imageDimensions.width;

  // Si el cálculo resulta en NaN o valores inválidos, no renderizar nada
  if (isNaN(imageHeight) || !isFinite(imageHeight) || imageHeight <= 0) {
    return null;
  }

  const handlePress = () => {
    const itemId = generateItemId(item.name, item.brand);
    router.push({
      pathname: "/(items)/[id]/item-detail",
      params: {
        id: itemId,
        itemName: item.name,
        itemBrand: item.brand,
        itemImageUrl: item.image_url,
        itemDescription: item.description,
        itemPrice: item.price.toString(),
        itemUrl: item.url,
      },
    });
  };

  return (
    <View
      ref={imageRef}
      className="mx-auto"
      style={{
        width: widthDetermined,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: i < numColumns ? 0 : 18,
      }}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        {image_url ? (
          <Image
            source={{ uri: image_url }}
            style={{ width: widthDetermined, height: imageHeight }}
            resizeMode="cover"
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default ClothingItemComponent;
