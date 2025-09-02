import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { getClothingItemsHome } from "@/app/utils/fetch";
import PageExplore from "../components/explore/pageExplore";

const Explore = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brown-strong w-full flex-1 ">
        <PageExplore query={""} isExplorePage={true} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Explore;
