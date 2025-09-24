import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { router, useRouter } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import List2 from "@/app/components/List2";
import { getClothingItemsTextSearch } from "@/app/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../LoadingPage";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFetchEmbedding } from "@/app/utils/use-query";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import FilterSearchBottomSheet from "./filterSearch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function PageExplore({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-brown-strong">
          {children}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export function PageExploreStandard({ query }: { query: string }) {
  const [searchText, setSearchText] = useState((query as string) || "");
  const [minPrice, setMinPrice] = useState<string | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [brandsSelected, setBrandsSelected] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const insets = useSafeAreaInsets();
  const [overHeaderImage, setOverHeaderImage] = useState(true);
  const HEADER_IMAGE_HEIGHT = 320; // keep in sync with ImageBackgroundComponent

  const onChangeTextSearch = (text: string) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    if (searchText.trim() === "") {
      return;
    }

    router.push({
      pathname: "/(search)/[query]",
      params: {
        query: searchText.trim(),
        ...(minPrice ? { minPrice } : {}),
        ...(maxPrice ? { maxPrice } : {}),
        ...(brandsSelected.size > 0
          ? {
              brands: Array.from(brandsSelected.entries())
                .map(([uuid, name]) => `${uuid},${name}`)
                .join(";"),
            }
          : {}),
      },
    });
    onChangeTextSearch(query as string);
  };
  // !overHeaderImage
  return (
    <>
      <View
        className={`absolute left-0 right-0 top-0 z-20 ${!overHeaderImage ? "bg-brown-strong opacity-95" : "bg-transparent"} pt-20 pb-2 px-4`}
      >
        <SearchInput
          onChangeTextSearch={onChangeTextSearch}
          searchText={searchText}
          handleSearch={handleSearch}
          bottomSheetRef={bottomSheetRef}
          minPrice={minPrice}
          maxPrice={maxPrice}
          brandsSelected={brandsSelected}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="absolute top-0 left-0 right-0 bottom-0"
        onScroll={e => {
          const y = e.nativeEvent.contentOffset.y;
          const isOver = y < HEADER_IMAGE_HEIGHT - (insets.top + 48);
          if (isOver !== overHeaderImage) setOverHeaderImage(isOver);
        }}
        scrollEventThrottle={16}
      >
        <ImageBackgroundComponent />
        <FashionIdeasSection query={"Minimalist"} />
        <FashionIdeasSection query={"Coquette"} />
        <FashionIdeasSection query={"Streetwear"} />
        <FashionIdeasSection query={"Sporty"} />
        <FashionIdeasSection query={"Old money"} />
        <FashionIdeasSection query={"Boho-chic"} />
      </ScrollView>

      <FilterSearchBottomSheet
        bottomSheetRef={bottomSheetRef}
        onSubmit={(minPrice, maxPrice, brandsSelected) => {
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          setBrandsSelected(brandsSelected);
        }}
        initialMinPrice={minPrice}
        initialMaxPrice={maxPrice}
        initialBrandsSelected={brandsSelected}
      />
    </>
  );
}

export const PageExploreQuery = ({
  query,
  initialMinPrice,
  initialMaxPrice,
  initialBrandPairsCsv,
}: {
  query: string;
  initialMinPrice?: string | undefined;
  initialMaxPrice?: string | undefined;
  initialBrandPairsCsv?: string | undefined;
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState((query as string) || "");
  const embeddingData = useFetchEmbedding("text", query);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [minPrice, setMinPrice] = useState<string | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(initialMaxPrice);
  const [brandsSelected, setBrandsSelected] = useState<Map<string, string>>(
    () => {
      const initial = new Map<string, string>();
      if (initialBrandPairsCsv) {
        initialBrandPairsCsv
          .split(";")
          .map(s => s.trim())
          .filter(s => s.length > 0)
          .forEach(pair => {
            const [uuid, name] = pair.split(",");
            if (uuid) {
              initial.set(uuid, name ?? uuid);
            }
          });
      }
      return initial;
    }
  );

  const onChangeTextSearch = (text: string) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    if (searchText.trim() === "") {
      return;
    }

    router.push({
      pathname: "/(search)/[query]",
      params: {
        query: searchText.trim(),
        ...(minPrice ? { minPrice } : {}),
        ...(maxPrice ? { maxPrice } : {}),
        ...(brandsSelected.size > 0
          ? {
              brands: Array.from(brandsSelected.entries())
                .map(([uuid, name]) => `${uuid},${name}`)
                .join(";"),
            }
          : {}),
      },
    });
    onChangeTextSearch(query as string);
  };

  return (
    <>
      <View className="flex-row items-center px-4 py-2">
        <Entypo
          name="chevron-thin-left"
          size={22}
          color="#ffffff"
          onPress={() => router.back()}
          style={{ marginRight: 12 }}
        />
        <SearchInput
          onChangeTextSearch={onChangeTextSearch}
          searchText={searchText}
          handleSearch={handleSearch}
          bottomSheetRef={bottomSheetRef}
          minPrice={minPrice}
          maxPrice={maxPrice}
          brandsSelected={brandsSelected}
        />
      </View>
      <List2
        queryKey={[
          "search-results",
          query,
          embeddingData?.embedding?.length || 0,
          minPrice,
          maxPrice,
          brandsSelected.size > 0
            ? Array.from(brandsSelected.keys())
            : undefined,
        ]}
        getClothingItems={(page, limit) =>
          getClothingItemsTextSearch(
            page,
            limit,
            embeddingData?.embedding || [],
            minPrice ? parseFloat(minPrice) : undefined,
            maxPrice ? parseFloat(maxPrice) : undefined,
            brandsSelected.size > 0
              ? Array.from(brandsSelected.keys())
              : undefined
          )
        }
        limit={10}
        columnCount={2}
      />
      <FilterSearchBottomSheet
        bottomSheetRef={bottomSheetRef}
        onSubmit={(minPrice, maxPrice, brandsSelected) => {
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          setBrandsSelected(brandsSelected);
        }}
        initialMinPrice={minPrice}
        initialMaxPrice={maxPrice}
        initialBrandsSelected={brandsSelected}
      />
    </>
  );
};

function ImageBackgroundComponent() {
  return (
    <TouchableOpacity
      onPress={() => router.push("/(inspiration)/weekly-inspo")}
    >
      <ImageBackground
        className="mb-4"
        source={{
          uri: "https://acdn-us.mitiendanube.com/stores/001/126/411/products/dsc03922-f0abe17095e0c9731c17260089277172-1024-1024.webp",
        }}
        resizeMode="cover"
        style={{ width: "100%", height: 320 }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
          className="flex-1 justify-center items-center  px-20 pt-24"
        >
          <Text className="text-white text-base font-pregular opacity-90">
            Estilo con frescor
          </Text>
          <Text className="text-white text-2xl font-pbold text-center mt-1">
            Tendencias de moda para primavera
          </Text>
          <View className="items-center mt-6 p-1.5 border border-white rounded-2xl">
            <Text className="text-white text-xs font-pregular opacity-90">
              Descubrir
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function SearchInput({
  onChangeTextSearch,
  searchText,
  handleSearch,
  bottomSheetRef,
  minPrice,
  maxPrice,
  brandsSelected,
  opacity = false,
}: {
  onChangeTextSearch: (text: string) => void;
  searchText: string;
  handleSearch: () => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
  minPrice: string | undefined;
  maxPrice: string | undefined;
  brandsSelected: Map<string, string>;
  opacity?: boolean;
}) {
  const router = useRouter();
  return (
    <View
      className={` border border-white rounded-full flex-1 px-4 py-5 flex-row  items-center  ${opacity ? " bg-black opacity-50" : "bg-transparent"}`}
    >
      <Ionicons name="search-outline" size={20} color="#ffffff" />
      <TextInput
        className="text-lg text-white font-pregular flex-1 mx-3"
        onChangeText={onChangeTextSearch}
        value={searchText}
        placeholder="Search Item"
        placeholderTextColor="#999999"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.expand()}
          className="relative"
        >
          <MaterialCommunityIcons
            name="tune-vertical-variant"
            size={20}
            color="#ffffff"
          />
          {(() => {
            const filterCount =
              (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + brandsSelected.size;
            return filterCount > 0 ? (
              <View className="absolute -bottom-2 -right-1 bg-brown-light rounded-full w-4 h-4 flex items-center justify-center">
                <Text className="text-white text-[10px] font-bold">
                  {filterCount}
                </Text>
              </View>
            ) : null;
          })()}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/camera")}>
          <Ionicons name="camera-outline" size={21} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const FashionIdeasSection = ({ query }: { query: string }) => {
  const router = useRouter();

  const handleNavigateToSearch = () => {
    router.push({
      pathname: "/(search)/[query]",
      params: {
        query: query,
      },
    });
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <View>
          <Text className="text-white text-sm font-pregular opacity-80">
            Ideas para ti
          </Text>
          <Text className="text-white text-xl font-pbold">{query}</Text>
        </View>
        <TouchableOpacity
          onPress={handleNavigateToSearch}
          className="rounded-full p-2"
        >
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <GridImages query={query} />
    </View>
  );
};

const GridImages = ({ query }: { query: string }) => {
  const embeddingData = useFetchEmbedding("text", query);
  const { data } = useQuery({
    queryKey: [
      "explore-items",
      query,
      String(embeddingData?.embedding?.length || 0),
    ],
    queryFn: () =>
      getClothingItemsTextSearch(0, 4, embeddingData?.embedding || []),
    staleTime: 5 * 60 * 1000,
  });
  if (!data || data.length === 0) {
    return <LoadingPage alreadyPrefetched={true} />;
  }
  return (
    <View className="flex-row px-1 gap-0.5">
      {data.map((item: ItemSchemaType, index: number) => (
        <View key={item.uuid || index} className="flex-1">
          <Image
            source={{ uri: item.imageUrl }}
            className={`w-full h-60 ${index === 0 ? "rounded-l-xl" : index === data.length - 1 ? "rounded-r-xl" : ""}`}
            resizeMode="cover"
          />
        </View>
      ))}
    </View>
  );
};
