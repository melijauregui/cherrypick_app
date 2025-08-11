import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  CatalogItemSchemaType,
  GetItemResponseSchema,
} from "@/schemas/catalog/catalog-schema";
import Toast from "react-native-toast-message";
import safeFetch from "../../../utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { CatalogItemArraySchema } from "@/schemas/catalog/catalog-schema";
import ListItems from "../../../components/ListClotheItems";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetchBrandProfile } from "@/app/(tabs)/profile";

const ItemDetail = () => {
  const params = useLocalSearchParams();

  // Decodificar los parámetros en caso de que vengan de un link compartido
  const decodedName = decodeURIComponent(params.name as string);
  const decodedBrandEmail = decodeURIComponent(params.brand as string);
  const brand = useFetchBrandProfile(decodedBrandEmail);

  const item = useFetchItem(
    decodedName,
    decodedBrandEmail,
    params.imageUrl as string | undefined,
    params.description as string | undefined,
    parseFloat(params.price as string) || undefined,
    params.url as string | undefined
  );

  const [isPressed, setIsPressed] = useState(false);

  if (!item) {
    return null;
  }

  return (
    <View className="flex-1 bg-brown-strong">
      <TouchableOpacity
        onPress={() => router.back()}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={`absolute top-12 left-4 w-14 h-14 rounded-2xl bg-black items-center justify-center z-50 ${
          isPressed ? "opacity-100" : "opacity-80"
        }`}
        activeOpacity={1}
      >
        <Entypo name="chevron-thin-left" size={22} color="white" />
      </TouchableOpacity>

      <ScrollView className="flex-1">
        <View className="relative">
          <ImageComponent imageUrl={item.item.image_url} />
        </View>

        <View className="px-5 flex flex-col gap-6">
          <IconComponent
            name={item.item.name}
            brand={brand?.brand?.name || ""}
          />

          <ItemDetailComponent item={item.item} brand={brand?.brand} />

          <Text className="text-white text-2xl font-psemibold">
            More to explore
          </Text>
        </View>

        <ListItems
          profileData={null}
          getClothingItems={getClothingItems}
          limit={100}
          columnCount={2}
        />
      </ScrollView>
    </View>
  );
};

export default ItemDetail;

const ImageComponent = ({ imageUrl }: { imageUrl: string }) => {
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
    <Image
      className="rounded-3xl"
      source={{ uri: imageUrl }}
      style={{ width: screenWidth, height: imageHeight }}
      resizeMode="cover"
    />
  );
};

const ItemDetailComponent = ({
  item,
  brand,
}: {
  item: CatalogItemSchemaType;
  brand:
    | {
        email: string;
        name: string;
        url: string;
        logo_url: string;
      }
    | undefined;
}) => {
  const [measured, setMeasured] = React.useState(false); // ya medí?
  const [overflows, setOverflows] = React.useState(false); // tiene >1 línea?
  const [expanded, setExpanded] = React.useState(false);

  const handleTextLayout = React.useCallback(
    (e: any) => {
      if (measured) return; // medir solo una vez
      const lines = e?.nativeEvent?.lines ?? [];
      setOverflows(lines.length > 1);
      setMeasured(true);
    },
    [measured]
  );

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: brand?.logo_url }}
          className="w-6 h-6 rounded-full"
        />
        <Text className="text-white text-xl font-plight">{brand?.name}</Text>
      </View>
      <Text className="text-white text-3xl font-pmedium">{item.name}</Text>
      <View className="">
        <Text className="text-white text-xl font-pregular">
          {"ARS $" + item.price}
        </Text>
        <View>
          <View className="flex-row flex-wrap">
            <Text
              className="text-white text-xl font-pregular flex-1"
              numberOfLines={measured && !expanded ? 1 : undefined}
              ellipsizeMode="tail"
              onTextLayout={handleTextLayout}
            >
              {item.description}
            </Text>
            {overflows && (
              <TouchableOpacity onPress={() => setExpanded(v => !v)}>
                <Text className="text-gray-400 font-plight text-lg ml-1">
                  {expanded ? "" : "Ver más"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const IconComponent = ({ name, brand }: { name: string; brand: string }) => {
  const handleShareItem = async () => {
    try {
      // Luego encodear los parámetros para manejar caracteres especiales y espacios
      const encodedBrand = encodeURIComponent(brand);
      const encodedName = encodeURIComponent(name);

      // Crear el link con solo los parámetros brand y name encodeados
      const itemLink = `cherrypick://item/${encodedBrand}/${encodedName}`;

      // Copiar al clipboard
      await Clipboard.setStringAsync(itemLink);

      // Mostrar toast de confirmación
      Toast.show({
        type: "normal",
        text1: "Link copiado!",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo copiar el link",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View className="pt-4 flex-row items-center gap-8">
      <TouchableOpacity className="w-8 h-8 items-center justify-center">
        <Ionicons name="heart-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity className="w-8 h-8 items-center justify-center">
        <FontAwesome name="bookmark-o" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        className="w-8 h-8 items-center justify-center"
        onPress={handleShareItem}
      >
        <Feather name="link" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity className="w-8 h-8 items-center justify-center">
        <Ionicons name="ellipsis-horizontal" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

async function getClothingItems(
  page: number,
  limit: number,
  brandEmail: string | undefined
): Promise<CatalogItemSchemaType[]> {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all?page=${page}&limit=${limit}`,
      method: "GET",
      schema: CatalogItemArraySchema,
    });
    return data;
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return [];
  }
}

function useFetchItem(
  itemName: string,
  brandEmail: string,
  imageUrl: string | undefined,
  description: string | undefined,
  price: number | undefined,
  url: string | undefined
): {
  item: {
    name: string;
    brandEmail: string;
    image_url: string;
    description: string;
    price: number;
    url: string;
  };
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item-detail", itemName, brandEmail],
    queryFn: async () => {
      if (!imageUrl || !description || !price || !url) {
        try {
          const { data } = await safeFetch({
            url: `http://${LOCAL_IP}:3000/get-item?brandEmail=${brandEmail}&name=${itemName}`,
            method: "GET",
            schema: GetItemResponseSchema,
          });
          if (data.error) {
            throw new Error(data.details);
          }
          return data;
        } catch (error) {
          console.error("Error fetching user data2:", error);
          return null;
        }
      } else {
        return {
          item: {
            name: itemName,
            brandEmail: brandEmail,
            image_url: imageUrl,
            description: description,
            price: price,
            url: url,
          },
        };
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }
  return data;
}
