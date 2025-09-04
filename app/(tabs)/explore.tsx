import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import PageExplore from "../components/explore/pageExplore";

const Explore = () => {
  return (
    <SafeAreaProvider>
      <PageExplore query={""} isExplorePage={true} />
    </SafeAreaProvider>
  );
};
export default Explore;
