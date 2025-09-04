import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { getClothingItemsHome } from "@/app/utils/fetch";
import PageExplore from "../components/explore/pageExplore";

const Explore = () => {
  return (
    <SafeAreaProvider>
      <PageExplore query={""} isExplorePage={true} />
    </SafeAreaProvider>
  );
};
export default Explore;
