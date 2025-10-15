import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInspirationItems } from "../utils/fetch";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../(auth)/error";
import { useFetchBrandProfileItem, useFetchItem } from "../utils/use-query";
import { prefetchInspirationItems } from "../utils/prefetchs";
import { useSession } from "@/lib/auth-client";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WeeklyInspo() {
  const TITLE_HEIGHT = 160;
  //obtener la categoría de la ruta
  const { category } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const session = useSession();
  const [headerHeight, setHeaderHeight] = useState(0);

  // Prefetch inspiration items when component mounts
  useEffect(() => {
    if (category && session.user?.email) {
      console.log("Prefetching inspiration items for category:", category);
      prefetchInspirationItems(
        queryClient,
        session.user.email,
        category as string
      );
    }
  }, [category, session.user?.email, queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["inspiration-items", category],
    queryFn: () => getInspirationItems(category as string),
    staleTime: 5 * 60 * 1000,
  });

  // Simplemente usar los datos originales, los hooks se manejarán en el componente ItemWithBrand

  if (!category) {
    console.log("No category found");
    return <ErrorPage />;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <SafeAreaView className="flex-1 bg-brown-strong">
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <ImageBackgroundComponent>
          <View
            className="absolute top-0 left-0 right-0 z-10 bg-black/40 px-6 pt-20 pb-4"
            onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
          >
            <View className="flex-row items-center justify-between mb-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="items-center justify-center"
                activeOpacity={1}
              >
                <Entypo name="chevron-thin-left" size={22} color="white" />
              </TouchableOpacity>
              <Text className="text-3xl font-pbold text-white text-center flex-1">
                Inspo Semanal
              </Text>
            </View>
            <Text className="text-lg font-pmedium text-white/90 text-center">
              Polleras de encaje, tops minimalistas y esa brisa cálida que nos
              invita a renovar nuestro estilo
            </Text>
          </View>
          <ScrollView
            className="flex-1 w-full relative"
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: headerHeight,
            }}
          >
            <View className="flex-col gap-1 justify-center flex-1 px-4 mt-4">
              {data?.map(item => (
                <ProductCard key={item.id} itemId={item.id} />
              ))}
            </View>
          </ScrollView>
        </ImageBackgroundComponent>
      </View>
    </SafeAreaView>
  );
}

function ImageBackgroundComponent({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require("../../assets/images/inspo.jpeg")}
      style={{ width: screenWidth, height: screenHeight }}
      resizeMode="cover"
      imageStyle={{
        resizeMode: "cover",
        alignSelf: "flex-start",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        className="flex-1 justify-center items-center"
      >
        {children}
      </View>
    </ImageBackground>
  );
}

const ProductCard = ({ itemId }: { itemId: string }) => {
  const itemData = useFetchItem(itemId);
  const item = itemData?.item;
  const brandData = useFetchBrandProfileItem(item?.brandId || "");
  const brand = brandData?.brand;

  const [titleLines, setTitleLines] = useState(1);

  if (!item) {
    return null; // O un componente de loading
  }

  const handleTitleLayout = (e: any) => {
    const lines = e?.nativeEvent?.lines ?? [];
    setTitleLines(lines.length);
  };

  // Calculate description lines based on title lines
  // 1 line title = 5 lines description, 2 lines = 4, 3 lines = 3, etc.
  const descriptionLines = Math.max(3, 6 - titleLines);

  return (
    <TouchableOpacity
      className="flex-row bg-white/90 w-64 rounded-xl p-3 mb-4 gap-3"
      onPress={() => {
        router.push({
          pathname: "/(items)/[uuid]",
          params: {
            uuid: item.uuid,
          },
        });
      }}
    >
      <View className="flex-col items-center gap-2">
        <View className="relative">
          <Image
            source={{ uri: item.image.url }}
            className="w-24 h-36 rounded-lg"
            resizeMode="cover"
          />
          {/* <View className="absolute bottom-1 left-1 bg-black/60  rounded">
            <Text className="text-white font-pmedium text-xs">
              ${item.price}
            </Text>
          </View> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(brand)/[id]",
              params: {
                id: brand?.id || "",
              },
            });
          }}
        >
          <Text className="font-pmedium text-sm text-gray-700 flex-wrap">
            {brand?.name}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <Text
          className="font-pbold text-base text-gray-900 mb-1"
          onTextLayout={handleTitleLayout}
        >
          {item.name}
        </Text>
        <DescriptionItem
          description={item.description}
          numberOfLines={descriptionLines}
        />
      </View>
      <TouchableOpacity className="absolute right-3 bottom-3">
        <Entypo name="chevron-thin-right" size={14} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const DescriptionItem = ({
  description,
  numberOfLines,
}: {
  description: string;
  numberOfLines: number;
}) => {
  const [measured, setMeasured] = React.useState(false); // ya medí?
  const [overflows, setOverflows] = React.useState(false); // tiene >1 línea?
  const [lastDescription, setLastDescription] = React.useState(description);
  const handleTextLayout = React.useCallback(
    (e: any) => {
      const lines = e?.nativeEvent?.lines ?? [];
      // Solo actualizar si la descripción cambió o si no hemos medido aún
      if (lastDescription !== description || !measured) {
        setOverflows(lines.length > numberOfLines);
        setMeasured(true);
        setLastDescription(description);
      }
    },
    [measured, description, lastDescription]
  );
  return (
    <View className="">
      {/* Text invisible para medir el número real de líneas */}
      <Text
        className="text-neutral-700 text-base font-pregular flex-1 absolute opacity-0"
        onTextLayout={handleTextLayout}
      >
        {description}
      </Text>

      <Text
        className="text-neutral-700 font-plight text-base text-start"
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
      >
        {description}
      </Text>

      {overflows && (
        <Text className="text-neutral-700 font-pregular text-lg -mt-2">
          ...
        </Text>
      )}
    </View>
  );
};
