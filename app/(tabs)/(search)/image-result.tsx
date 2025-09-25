import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, Text, View, StatusBar, Dimensions } from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ImageComplete from "@/app/components/ImageComplete";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import List2 from "@/app/components/List2";
import {
  convertUriToBase64,
  getClothingItemsSimilarBase64,
  getEmbedding,
} from "@/app/utils/fetch";
import FilterSearchBottomSheet from "@/app/components/explore/filterSearch";

const CameraPage = () => {
  const { uri_image } = useLocalSearchParams();
  console.log("uri_image", uri_image);
  return (
    <>
      <StatusBar hidden={true} />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
        <View className="flex-1 bg-black w-full">
          <RenderPicture uri={uri_image as string} />
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default CameraPage;

const ControlsRenderPicture = ({
  onPressTune,
  filterCount,
}: {
  onPressTune: () => void;
  filterCount: number;
}) => {
  const router = useRouter();
  return (
    <View className="absolute flex-row justify-between items-center w-full px-6 top-16">
      <View className="flex-col items-center gap-3">
        <Pressable
          className="bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80"
          onPress={() => router.back()}
        >
          <Entypo name="chevron-thin-left" size={22} color="white" />
        </Pressable>

        {/* <Pressable
          className="bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80"
          onPress={() => router.replace("/camera")}
        >
          <SimpleLineIcons name="camera" size={20} color="white" />
        </Pressable> */}
        <Pressable
          className="bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80"
          onPress={onPressTune}
        >
          <MaterialCommunityIcons
            name="tune-vertical-variant"
            size={20}
            color="#ffffff"
          />
          {(() => {
            return filterCount > 0 ? (
              <View className="absolute -bottom-1.5 -right-1 bg-brown-light rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-[12px] font-bold">
                  {filterCount}
                </Text>
              </View>
            ) : null;
          })()}
        </Pressable>
      </View>
    </View>
  );
};

const RenderPicture = ({ uri }: { uri: string }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("index", index);
    setSnapIndex(index);
  }, []);
  const { height: screenHeight } = Dimensions.get("window");
  const [imageHeight, setImageHeight] = useState(0);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isLoadingBase64, setIsLoadingBase64] = useState(true);
  const [embedding, setEmbedding] = useState<number[] | null>(null);
  const [snapIndex, setSnapIndex] = useState(0);

  const [minPrice, setMinPrice] = useState<string | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const [brandsSelected, setBrandsSelected] = useState<Map<string, string>>(
    new Map()
  );
  const bottomSheetRefFilter = useRef<BottomSheet>(null);

  const minHeight = Math.max(screenHeight - imageHeight, 400);
  const snapPoints = [minHeight, 400, 600, 800, 1000].filter(
    point => point >= minHeight
  );

  useEffect(() => {
    const fetchImageBase64 = async () => {
      setIsLoadingBase64(true);
      const base64 = await convertUriToBase64(uri);
      setImageBase64(base64);
      const embedding = await getEmbedding("image", base64 || "");
      setEmbedding(embedding ? embedding : null);
      setIsLoadingBase64(false);
    };
    fetchImageBase64();
  }, [uri]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 w-full bg-brown-strong">
        <ImageComplete
          imageUrl={uri}
          setImageHeighteExternal={setImageHeight}
        />
        <ControlsRenderPicture
          onPressTune={() => bottomSheetRefFilter.current?.expand()}
          filterCount={
            (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + brandsSelected.size
          }
        />
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={0}
          enableDynamicSizing={false}
          snapPoints={snapPoints}
          enableOverDrag={false}
          backgroundStyle={{ backgroundColor: "#301c11" }}
          handleIndicatorStyle={{
            backgroundColor: "#301c11",
            padding: 0,
            marginTop: 0,
          }}
          enablePanDownToClose={false}
        >
          <View className="flex flex-row justify-center pb-3 px-6">
            <Text className="text-white text-lg font-psemibold">
              Items Similares
            </Text>
          </View>
          {isLoadingBase64 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white">Procesando imagen...</Text>
            </View>
          ) : (
            <View
              style={{
                height: (snapPoints[snapIndex] ?? 1000) - 90,
              }}
            >
              <List2
                queryKey={[
                  "similar-items",
                  uri,
                  embedding?.length || 0,
                  minPrice,
                  maxPrice,
                  brandsSelected.size > 0
                    ? Array.from(brandsSelected.keys())
                    : undefined,
                ]}
                getClothingItems={(page, limit) =>
                  getClothingItemsSimilarBase64(
                    page,
                    limit,
                    embedding || [],
                    minPrice ? parseFloat(minPrice) : undefined,
                    maxPrice ? parseFloat(maxPrice) : undefined,
                    brandsSelected.size > 0
                      ? Array.from(brandsSelected.keys())
                      : undefined
                  )
                }
                limit={6}
                columnCount={2}
                canRefresh={false}
              />
            </View>
          )}
        </BottomSheet>
        <FilterSearchBottomSheet
          bottomSheetRef={bottomSheetRefFilter}
          onSubmit={(minPrice, maxPrice, brandsSelected) => {
            setMinPrice(minPrice);
            setMaxPrice(maxPrice);
            setBrandsSelected(brandsSelected);
          }}
          initialMinPrice={minPrice}
          initialMaxPrice={maxPrice}
          initialBrandsSelected={brandsSelected}
        />
      </View>
    </GestureHandlerRootView>
  );
};
