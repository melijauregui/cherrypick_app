import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// const queryClient = new QueryClient();
const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/poppins/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/poppins/Poppins-Thin.ttf"),
    "GlacialIndifference-Regular": require("../assets/fonts/glacial-indifference/GlacialIndifference-Regular.otf"),
    "GlacialIndifference-Bold": require("../assets/fonts/glacial-indifference/GlacialIndifference-Bold.otf"),
    "GlacialIndifference-Italic": require("../assets/fonts/glacial-indifference/GlacialIndifference-Italic.otf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(items)"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="(brand)"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
};

export default RootLayout;

const CustomToast = ({ type, text1, text2, onHide }: any) => {
  if (type === "error") {
    console.log("error: ", text1);
  }
  const isSuccess = type === "success";
  return (
    <View
      className="flex-row items-center bg-white rounded-2xl py-4 px-[18px] mx-2 min-h-[70px] border-l-brown-light"
      style={{
        borderLeftWidth: 6,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          className={`${isSuccess ? "text-green-600" : "text-red-500"} font-semibold text-xl mb-0.5`}
        >
          {isSuccess ? "Success" : "Error"}
        </Text>
        {text1 ? (
          <Text className="text-black font-pregular text-lg">{text1}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={onHide} style={{ marginLeft: 10 }}>
        <Ionicons name="close" size={22} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const NormalToast = ({ text1, onHide }: any) => {
  return (
    <View className="flex-row items-center bg-white rounded-2xl py-4 px-[18px] mx-2 min-h-[70px]">
      <View style={{ flex: 1 }}>
        <Text className={`text-black font-plight text-xl mb-0.5`}>{text1}</Text>
      </View>
      <TouchableOpacity onPress={onHide} style={{ marginLeft: 10 }}>
        <Ionicons name="close" size={22} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

export const toastConfig = {
  success: (props: any) => (
    <CustomToast {...props} type="success" onHide={() => Toast.hide()} />
  ),
  error: (props: any) => (
    <CustomToast {...props} type="error" onHide={() => Toast.hide()} />
  ),
  normal: (props: any) => (
    <NormalToast {...props} type="normal" onHide={() => Toast.hide()} />
  ),
};
