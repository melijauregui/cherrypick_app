import React from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { PageExplore } from "../components/explore/pageExplore";

const SearchResults = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brown-strong w-full flex-1">
        <PageExplore query={query as string} isExplorePage={false} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SearchResults;
