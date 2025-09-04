import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useCallback, useRef, useState } from "react";
import {
  Button,
  Pressable,
  Text,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  Entypo,
  FontAwesome6,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useMediaLibraryPermissions } from "expo-image-picker";
import ImageComplete from "../components/ImageComplete";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import List2 from "../components/List2";
import { getClothingItemsSimilar } from "../utils/fetch";

const CameraPage = () => {
  const [uri, setUri] = useState<string | null>(null);

  return (
    <>
      <StatusBar hidden={true} />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
        <View className="flex-1 bg-black w-full">
          {uri ? (
            <RenderPicture uri={uri} setUri={setUri} />
          ) : (
            <RenderCamera setImage={setUri} />
          )}
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default CameraPage;

const RenderCamera = ({
  setImage,
}: {
  setImage: (image: string | null) => void;
}) => {
  const refCamera = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const toggleFacing = () => {
    setFacing(prev => (prev === "back" ? "front" : "back"));
  };
  const takePicture = async () => {
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
      />
      <Controls flash={flash} setFlash={setFlash} />
      <View className="absolute bottom-14 items-center left-0 w-full flex-row justify-between px-16">
        <ImagePickerButton setImage={setImage} />
        <Pressable onPress={takePicture}>
          {({ pressed }) => (
            <View
              className={`bg-black border-2 border-white w-[95px] h-[95px] rounded-full items-center justify-center bottom-0 ${pressed ? "opacity-70" : "opacity-100"}`}
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

const Controls = ({
  flash,
  setFlash,
  setUri,
}: {
  flash?: FlashMode;
  setFlash?: (flash: FlashMode) => void;
  setUri?: (uri: string | null) => void;
}) => {
  const router = useRouter();
  return (
    <View
      className={`absolute flex-row justify-between items-center w-full ${
        setUri ? "px-6 top-16" : "px-12 top-20"
      }`}
    >
      <View className="flex-col items-center gap-3">
        <Pressable
          className={`${
            !setFlash
              ? "bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80 "
              : ""
          }`}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-thin-left" size={22} color="white" />
        </Pressable>
        {setUri && (
          <Pressable
            className="bg-black items-center justify-center w-12 h-12 rounded-2xl opacity-80"
            onPress={() => setUri(null)}
          >
            <SimpleLineIcons name="camera" size={20} color="white" />
          </Pressable>
        )}
      </View>
      {setFlash && (
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
      )}
    </View>
  );
};

export const ImagePickerButton = ({
  setImage,
}: {
  setImage: (image: string | null) => void;
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

  return (
    <Pressable onPress={pickImage}>
      <Entypo name="images" size={30} color="white" />
    </Pressable>
  );
};

const CamaraView = ({
  refCamera,
  facing,
  flash,
  setUri,
}: {
  refCamera: React.RefObject<CameraView>;
  facing: CameraType;
  flash: FlashMode;
  setUri: (uri: string | null) => void;
}) => {
  const [permission, requestPermission] = useCameraPermissions();

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
    <CameraView
      className="flex-1 w-full"
      ref={refCamera}
      mode={"picture"}
      facing={facing}
      mute={true}
      responsiveOrientationWhenOrientationLocked
      flash={flash}
    />
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
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const { height: screenHeight } = Dimensions.get("window");
  const [imageHeight, setImageHeight] = useState(0);
  if (!uri) return null;

  const minHeight = Math.max(screenHeight - imageHeight, 400);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 w-full bg-brown-strong">
        <ImageComplete
          imageUrl={uri}
          setImageHeighteExternal={setImageHeight}
        />
        <Controls setUri={setUri} />
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={0}
          enableDynamicSizing={false}
          snapPoints={[minHeight, "100%"]}
          enableOverDrag={false}
          backgroundStyle={{ backgroundColor: "#301c11" }}
          handleIndicatorStyle={{
            backgroundColor: "gray",
            padding: 2,
            marginTop: 4,
          }}
          enablePanDownToClose={false}
        >
          <View className="flex flex-row justify-center py-3 px-6">
            <Text className="text-white text-lg font-psemibold">
              Items Similares
            </Text>
          </View>
          <List2
            queryKey={["similar-items", uri]}
            getClothingItems={getClothingItemsSimilar}
            limit={6}
            columnCount={2}
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
