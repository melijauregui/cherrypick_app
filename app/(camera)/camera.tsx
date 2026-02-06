import { Asset } from "expo-asset";
import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  Text,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useMediaLibraryPermissions } from "expo-image-picker";
import ImageComplete from "../components/ImageComplete";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import List2 from "../components/List2";
import {
  convertUriToBase64,
  getClothingItemsSimilarBase64,
  getEmbedding,
} from "../../utils/fetch";
import FilterSearchBottomSheet from "../components/explore/filterSearch";
import { IdNameImageSchemaType } from "@/schemas/catalog/catalog-schema";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoadingItem } from "../components/LoadingPage";
import IoniconsIcon from "@expo/vector-icons/Ionicons";
import { ImageSearchGuidelinesModal } from "./ImageSearchGuidelinesModal";
import { Platform } from "react-native";

const CameraPage = () => {
  const [uri, setUri] = useState<string | null>(null);

  return (
    <>
      <StatusBar hidden={true} />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
        <View className="flex-1 bg-black w-full">
          {uri ? (
            <RenderPicture key={uri} uri={uri} setUri={setUri} />
          ) : (
            <RenderCamera setImage={setUri} />
          )}
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default CameraPage;

const DEFUALT_IMAGE = require("@/assets/images/defaultCamera.png");
const DEFAULT_VIDEO = require("@/assets/videos/defaultCamera.mp4");

const DefaultCameraVideo = () => {
  const player = useVideoPlayer(DEFAULT_VIDEO, p => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  return (
    <VideoView
      player={player}
      style={{ position: "absolute", width: "100%", height: "100%" }}
      contentFit="cover"
      nativeControls={false}
    />
  );
};

const RenderCamera = ({
  setImage,
}: {
  setImage: (image: string | null) => void;
}) => {
  const refCamera = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const toggleFacing = () => {
    setFacing(prev => (prev === "back" ? "front" : "back"));
  };
  const takePicture = async () => {
    if (!isCameraReady) {
      const asset = Asset.fromModule(DEFUALT_IMAGE);
      await asset.downloadAsync();
      setImage(asset.localUri ?? null);
      return;
    }
    const photo = await refCamera.current?.takePictureAsync();
    setImage(photo?.uri || null);
  };
  return (
    <View className="flex-1 w-full">
      <CamaraView
        refCamera={refCamera}
        facing={facing}
        flash={flash}
        setUri={setImage}
        onCameraReadyChange={setIsCameraReady}
      />
      <ControlsCamera flash={flash} setFlash={setFlash} />
      <View className="absolute bottom-14 items-center left-0 w-full flex-row justify-between px-16">
        <ImagePickerButton setImage={setImage}>
          <Entypo name="images" size={30} color="white" />
        </ImagePickerButton>
        <Pressable onPress={takePicture}>
          {({ pressed }) => (
            <View
              className={`bg-neutral-500 border-2 border-white w-[95px] h-[95px] rounded-full items-center justify-center bottom-0 ${pressed ? "opacity-70" : "opacity-100"}`}
            >
              <View className="w-[85px] h-[85px] rounded-full bg-white bottom-0" />
            </View>
          )}
        </Pressable>
        <Pressable onPress={toggleFacing}>
          <FontAwesome6 name="camera-rotate" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const ControlsCamera = ({
  flash,
  setFlash,
}: {
  flash: FlashMode;
  setFlash: (flash: FlashMode) => void;
}) => {
  const router = useRouter();
  return (
    <View className="absolute flex-row justify-between items-center w-full px-12 top-20">
      <Pressable onPress={() => router.back()} className="items-center ">
        <Entypo name="chevron-thin-left" size={22} color="white" />
      </Pressable>

      <Pressable
        onPress={() =>
          setFlash(flash === "off" ? "auto" : flash === "auto" ? "on" : "off")
        }
      >
        <MaterialIcons
          name={
            flash === "off"
              ? "flash-off"
              : flash === "auto"
                ? "flash-auto"
                : "flash-on"
          }
          size={27}
          color="white"
        />
      </Pressable>
    </View>
  );
};

const ControlsRenderPicture = ({
  setUri,
  onPressTune,
  onPressInfo,
  filterCount,
}: {
  setUri: (uri: string | null) => void;
  onPressTune: () => void;
  onPressInfo?: () => void;
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

        <Pressable
          className="bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80"
          onPress={() => setUri(null)}
        >
          <SimpleLineIcons name="camera" size={20} color="white" />
        </Pressable>

        <ImagePickerButton setImage={setUri}>
          <View className="bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80">
            <Entypo name="images" size={20} color="white" />
          </View>
        </ImagePickerButton>

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
              <View className="absolute -bottom-1.5 -right-1 bg-beige-strong rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-[12px] font-bold">
                  {filterCount}
                </Text>
              </View>
            ) : null;
          })()}
        </Pressable>
        <Pressable
          className="bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80"
          onPress={onPressInfo || (() => null)}
        >
          <IoniconsIcon
            name="information-circle-outline"
            size={23}
            color="#ffffff"
          />
        </Pressable>
      </View>
    </View>
  );
};

export const ImagePickerButton = ({
  setImage,
  children,
}: {
  setImage: (image: string | null) => void;
  children: React.ReactNode;
}) => {
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    useMediaLibraryPermissions();

  if (!mediaLibraryPermission) {
    return null;
  }

  const pickImage = async () => {
    if (!mediaLibraryPermission?.granted) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    // Launch image picker with proper configuration for iOS
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: false,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]?.uri || null);
    }
  };

  return <Pressable onPress={pickImage}>{children}</Pressable>;
};

const CamaraView = ({
  refCamera,
  facing,
  flash,
  setUri,
  onCameraReadyChange,
}: {
  refCamera: React.RefObject<CameraView>;
  facing: CameraType;
  flash: FlashMode;
  setUri: (uri: string | null) => void;
  onCameraReadyChange?: (ready: boolean) => void;
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleCameraReady = () => {
    setIsCameraReady(true);
    onCameraReadyChange?.(true);
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={refCamera}
        style={{ flex: 1, width: "100%" }}
        mode={"picture"}
        facing={facing}
        flash={flash}
        mute={true}
        responsiveOrientationWhenOrientationLocked
        onCameraReady={handleCameraReady}
      />
      {!isCameraReady && (
        <View
          className="absolute inset-0 items-center justify-center"
          pointerEvents="none"
        >
          <DefaultCameraVideo />
        </View>
      )}
    </View>
  );
};

const RenderPicture = ({
  uri,
  setUri,
}: {
  uri: string | null;
  setUri: (uri: string | null) => void;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isFilterSearchModalOpen, setIsFilterSearchModalOpen] = useState(false);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("index", index);
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
  const [brandsSelected, setBrandsSelected] = useState<
    Map<string, IdNameImageSchemaType>
  >(new Map<string, IdNameImageSchemaType>());
  const [
    isImageSearchGuidelinesModalVisible,
    setIsImageSearchGuidelinesModalVisible,
  ] = useState(false);

  const insets = useSafeAreaInsets();

  const max = 400;
  const minHeight =
    Math.max(screenHeight - imageHeight, max) +
    (Platform.OS === "android" ? insets.bottom + insets.top : 0);

  let snapPoints = [minHeight, 400, 600, 800, 900].filter(
    point => point >= minHeight
  );

  useEffect(() => {
    if (!uri) return;
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

  if (!uri) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 w-full bg-brown-strong">
        <ImageComplete
          imageUrl={uri}
          setImageHeighteExternal={setImageHeight}
        />
        <ControlsRenderPicture
          setUri={setUri}
          onPressTune={() => setIsFilterSearchModalOpen(true)}
          onPressInfo={() => setIsImageSearchGuidelinesModalVisible(true)}
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
            <View
              className="flex-1 items-center justify-center "
              style={{
                maxHeight: (snapPoints[snapIndex] ?? snapPoints[0] ?? 0) - 50,
              }}
            >
              <LoadingItem />
            </View>
          ) : (
            <List2
              useBottomSheetScroll={Platform.OS === "android" ? true : false}
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
              itemWhenNothingFound={renderEmptyState}
              loadingItem={
                <View
                  className="flex-1 items-center justify-center "
                  style={{
                    maxHeight:
                      (snapPoints[snapIndex] ?? snapPoints[0] ?? 0) - 50,
                  }}
                >
                  <LoadingItem />
                </View>
              }
            />
          )}
        </BottomSheet>
        <View style={{ flex: 1 }}>
          <FilterSearchBottomSheet
            isModalOpen={isFilterSearchModalOpen}
            setIsModalOpen={setIsFilterSearchModalOpen}
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
        <View style={{ flex: 1 }}>
          <ImageSearchGuidelinesModal
            visible={isImageSearchGuidelinesModalVisible}
            onClose={() => setIsImageSearchGuidelinesModalVisible(false)}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const renderEmptyState = () => (
  <View className="flex-1 justify-center items-center px-8 ">
    <Text className="text-gray-500 text-center text-lg">
      No hay items similares que coincidan con la búsqueda
    </Text>
  </View>
);
