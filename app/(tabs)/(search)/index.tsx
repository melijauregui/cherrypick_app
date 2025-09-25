import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import PageExplore, {
  PageExploreStandard,
} from "@/app/components/explore/pageExplore";

const ExploreAsRoot = () => {
  return (
    <SafeAreaProvider>
      <PageExplore>
        <PageExploreStandard query={""} />
      </PageExplore>
    </SafeAreaProvider>
  );
};

export default ExploreAsRoot;
