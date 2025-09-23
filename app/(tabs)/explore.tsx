import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import PageExplore, {
  PageExploreStandard,
} from "../components/explore/pageExplore";

const Explore = () => {
  return (
    <SafeAreaProvider>
      <PageExplore>
        <PageExploreStandard query={""} />
      </PageExplore>
    </SafeAreaProvider>
  );
};
export default Explore;
