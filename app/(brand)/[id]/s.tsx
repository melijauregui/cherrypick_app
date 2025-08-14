import React, { useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSession } from "@/lib/auth-client";

const ItemDetail = () => {
  const { user } = useSession();
  const params = useLocalSearchParams();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-brown-strong">
        <TouchableOpacity
          onPress={() => router.back()}
          className={`absolute top-12 left-4 w-14 h-14 rounded-2xl bg-black items-center justify-center z-50`}
          activeOpacity={1}
        >
          <Entypo name="chevron-thin-left" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default ItemDetail;
