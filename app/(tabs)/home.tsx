import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { getClothingItemsHome } from "../../utils/fetch";
import List2 from "@/app/components/List2";
import { useSession } from "@/lib/auth-client";

const Home = () => {
  const { user } = useSession();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brown-strong w-full flex-1 ">
        <List2
          queryKey={["home-items", user?.email]}
          getClothingItems={getClothingItemsHome}
          limit={10}
          columnCount={2}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Home;
