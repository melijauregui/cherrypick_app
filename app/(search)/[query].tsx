import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import PageExplore from "../components/explore/pageExplore";

const SearchResults = () => {
  const { query, minPrice, maxPrice, brands } = useLocalSearchParams();

  return (
    <SafeAreaProvider>
      <PageExplore
        query={query as string}
        isExplorePage={false}
        initialMinPrice={typeof minPrice === "string" ? minPrice : undefined}
        initialMaxPrice={typeof maxPrice === "string" ? maxPrice : undefined}
        initialBrandPairsCsv={typeof brands === "string" ? brands : undefined}
      />
    </SafeAreaProvider>
  );
};

export default SearchResults;
