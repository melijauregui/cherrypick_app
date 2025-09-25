import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
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
}: {
  i: number;
  item: ItemSchemaType;
  numColumns: number;
  renderedHeight: number;
  renderedWidth: number;
}) => {
  const { imageUrl } = item;
  if (
    isNaN(renderedHeight) ||
    !isFinite(renderedHeight) ||
    renderedHeight <= 0
  ) {
    return null;
  }

  const handlePress = () => {
    router.push({
      pathname: "/(items)/[uuid]",
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
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: renderedWidth, height: renderedHeight }}
            resizeMode="cover"
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default ClothingItemComponent;
