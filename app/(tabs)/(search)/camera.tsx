import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, Text, View, StatusBar } from "react-native";
import { Entypo, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CameraPage = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
        <View className="flex-1 bg-black w-full">
          <RenderCamera />
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default CameraPage;

const RenderCamera = ({}: {}) => {
  const refCamera = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const toggleFacing = () => {
    setFacing(prev => (prev === "back" ? "front" : "back"));
  };
  const takePicture = async () => {
    const photo = await refCamera.current?.takePictureAsync();
    console.log("photo", photo?.uri);
    setTimeout(() => {
      router.push({
        pathname: "/(tabs)/(search)/image-result",
        params: { uri_image: photo?.uri || "" },
      });
    }, 100);
  };
  return (
    <>
      <View className="flex-1 w-full">
        <CamaraView refCamera={refCamera} facing={facing} flash={flash} />
        <ControlsCamera flash={flash} setFlash={setFlash} />
        <View className="absolute bottom-14 items-center left-0 w-full flex-row justify-between px-16">
          <ImagePickerButton />
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
    </>
  );
};

const CamaraView = ({
  refCamera,
  facing,
  flash,
}: {
  refCamera: React.RefObject<CameraView>;
  facing: CameraType;
  flash: FlashMode;
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
      ref={refCamera}
      style={{ flex: 1 }}
      mode={"picture"}
      facing={facing}
      flash={flash}
      mute={true}
      responsiveOrientationWhenOrientationLocked
    />
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

export const ImagePickerButton = () => {
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
      setTimeout(() => {
        router.push({
          pathname: "/(tabs)/(search)/image-result",
          params: { uri_image: result.assets[0]?.uri || "" },
        });
      }, 600);
    }
  };

  return (
    <Pressable onPress={pickImage}>
      <Entypo name="images" size={30} color="white" />
    </Pressable>
  );
};
