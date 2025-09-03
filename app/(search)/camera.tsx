import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, Text, View, StatusBar } from "react-native";
import { Image } from "expo-image";
import { Entypo, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CameraPage = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [showCamera, setShowCamera] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [flash, setFlash] = useState<FlashMode>("off");

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

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri || null);
  };

  const toggleFacing = () => {
    setFacing(prev => (prev === "back" ? "front" : "back"));
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <View className="flex-1 bg-black w-full">
          {uri ? (
            <RenderPicture uri={uri} setUri={setUri} />
          ) : (
            <RenderCamera
              refCamera={ref}
              facing={facing}
              flash={flash}
              setShowCamera={setShowCamera}
              takePicture={takePicture}
              toggleFacing={toggleFacing}
              setFlash={setFlash}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default CameraPage;

const RenderCamera = ({
  refCamera,
  facing,
  flash,
  setShowCamera,
  takePicture,
  toggleFacing,
  setFlash,
}: {
  refCamera: React.RefObject<CameraView>;
  facing: CameraType;
  flash: FlashMode;
  setShowCamera: (show: boolean) => void;
  takePicture: () => void;
  toggleFacing: () => void;
  setFlash: (flash: FlashMode) => void;
}) => {
  return (
    <View className="flex-1 w-full">
      <CameraView
        className="flex-1 w-full"
        ref={refCamera}
        mode={"picture"}
        facing={facing}
        mute={true}
        responsiveOrientationWhenOrientationLocked
        flash={flash}
      />
      <Controls flash={flash} setFlash={setFlash} />
      <View className="absolute bottom-14 items-center left-0 w-full flex-row justify-between px-16">
        <Pressable onPress={() => setShowCamera(false)}>
          <Entypo name="images" size={30} color="white" />
        </Pressable>
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

const RenderPicture = ({
  uri,
  setUri,
}: {
  uri: string | null;
  setUri: (uri: string | null) => void;
}) => {
  if (!uri) return null;
  return (
    <View>
      <Image
        source={{ uri }}
        contentFit="contain"
        style={{ width: 300, aspectRatio: 1 }}
      />
      <Button onPress={() => setUri(null)} title="Take another picture" />
    </View>
  );
};

const Controls = ({
  flash,
  setFlash,
}: {
  flash: FlashMode;
  setFlash: (flash: FlashMode) => void;
}) => {
  const router = useRouter();
  return (
    <View className="absolute top-20 px-12 flex-row justify-between items-center w-full">
      <Pressable className="" onPress={() => router.back()}>
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
