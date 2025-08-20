import React, { useRef } from "react";
import { View, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import prefetchHome, {
  prefetchLikeAndFavoritePage,
  prefetchProfile,
} from "@/app/utils/prefetchs";
import { useSession } from "@/lib/auth-client";

const LoadingPage: React.FC<{ alreadyPrefetched?: boolean }> = ({
  alreadyPrefetched,
}) => {
  const queryClient = useQueryClient();
  const { user } = useSession();

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
  }, []);

  // Do prefetch if user is available
  if (user && !alreadyPrefetched) {
    prefetchHome(queryClient, user.email);
    prefetchProfile(user, queryClient);
    prefetchLikeAndFavoritePage(queryClient, user.email);
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView className="flex-1 bg-brown-strong flex flex-col justify-center items-center">
      <View className="items-center">
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
      </View>
    </SafeAreaView>
  );
};

export default LoadingPage;
