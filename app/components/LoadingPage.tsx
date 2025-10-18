import React, { useRef } from "react";
import { View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSession } from "@/lib/auth-client";

const LoadingPage: React.FC<{ alreadyPrefetched?: boolean }> = ({
  alreadyPrefetched = true,
}) => {
  const { user } = useSession();

  // Do prefetch if user is available
  if (user && !alreadyPrefetched) {
  }

  return (
    <SafeAreaView className="flex-1 bg-brown-strong flex flex-col justify-center items-center">
      <View className="items-center">
        <LoadingItem />
      </View>
    </SafeAreaView>
  );
};

export function LoadingItem() {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Start spinning animation immediately
  React.useEffect(() => {
    const startSpinning = () => {
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        })
      ).start();
    };

    startSpinning();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <Animated.View
      style={{
        transform: [{ rotate: spin }],
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#d6bfa0",
        borderTopColor: "transparent",
      }}
    />
  );
}

export default LoadingPage;
