import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import PageExplore from "../components/explore/pageExplore";

const SearchResults = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaProvider>
      <PageExplore query={query as string} isExplorePage={false} />
    </SafeAreaProvider>
  );
};

export default SearchResults;
