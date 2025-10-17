import { useState } from "react";
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import useUpdateBrand from "@/app/utils/update";
import {
  useFetchBrandProfile,
  useFetchBrandProfileItem,
} from "@/app/utils/use-query";
import { UserInfo } from "@/app/utils/use-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import LoadingPage from "../LoadingPage";
import DeleteCatalogItemsModal from "./DeleteCatalogItemsModal";
import EditBrandProfile from "./editBrandProfile";
import { AddAndDeleteItems } from "./brandComponents";
import { CustomBottomLogout } from "./bottomSheets";
import { router } from "expo-router";
import { getBrandItems, getSelfBrandItems } from "@/app/utils/fetch";
import React from "react";
import List2 from "../../components/List2";
import { BrandSchemaType } from "@/schemas/brand/brand-schema";

const BrandProfile = ({
  user,
  logout,
}: {
  user: UserInfo;
  logout: () => Promise<void>;
}) => {
  const data = useFetchBrandProfile(user.email);
  const mutateBrand = useUpdateBrand(user.email);

  const bottomSheetRefLogout = useRef<BottomSheet>(null);
  const bottomSheetRefAddItem = useRef<BottomSheet>(null);
  const bottomSheetRefDeleteItem = useRef<BottomSheet>(null);
  const bottomSheetRefEdit = useRef<BottomSheet>(null);

  const openUsernameSheetLogout = () => {
    bottomSheetRefAddItem.current?.close();
    bottomSheetRefDeleteItem.current?.close();
    bottomSheetRefEdit.current?.close();
    bottomSheetRefLogout.current?.snapToIndex(0);
  };

  const openUsernameSheetDeleteItem = () => {
    bottomSheetRefLogout.current?.close();
    bottomSheetRefAddItem.current?.close();
    bottomSheetRefEdit.current?.close();
    bottomSheetRefDeleteItem.current?.snapToIndex(0);
  };

  const openUsernameSheetEdit = () => {
    bottomSheetRefLogout.current?.close();
    bottomSheetRefAddItem.current?.close();
    bottomSheetRefDeleteItem.current?.close();
    bottomSheetRefEdit.current?.snapToIndex(0);
  };

  if (!data) {
    return <LoadingPage alreadyPrefetched={true} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView className="bg-brown-strong w-full flex-1 ">
          <View className="flex flex-col w-full px-10 ">
            <BrandDetails
              brand={data.brand}
              openUsernameSheetLogout={openUsernameSheetLogout}
            />
            <AddAndDeleteItems
              onAddItem={() => router.push("/item-insert")}
              onDeleteItem={openUsernameSheetDeleteItem}
              onEdit={openUsernameSheetEdit}
            />
          </View>
          <List2
            queryKey={["self-brand-items", user.email]}
            getClothingItems={getSelfBrandItems}
            limit={18}
            columnCount={3}
          />

          <DeleteCatalogItemsModal
            bottomSheetRef={bottomSheetRefDeleteItem}
            brandId={data.brand.id}
            onDelete={() => {}}
          />

          <EditBrandProfile
            bottomSheetRef={bottomSheetRefEdit}
            onSubmit={(editLinkValue, editDescriptionValue) => {
              mutateBrand.mutate({
                description: editDescriptionValue,
                url: editLinkValue,
              });
            }}
            lastValueLink={data.brand.url}
            lastValueDescription={data.brand.description}
          />

          <CustomBottomLogout
            bottomSheetRef={bottomSheetRefLogout}
            logout={logout}
            user={user}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default BrandProfile;

const BrandProfilePage = ({ brandId }: { brandId: string }) => {
  const [isPressed, setIsPressed] = useState(false);
  const data = useFetchBrandProfileItem(brandId);
  if (!data) {
    return <LoadingPage />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView className="bg-brown-strong w-full flex-1 ">
          <TouchableOpacity
            onPress={() => router.back()}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            className={`absolute top-12 left-4 w-12 h-12 rounded-full bg-neutral-900 items-center justify-center z-50 ${
              isPressed ? "opacity-100" : "opacity-90"
            }`}
            activeOpacity={1}
          >
            <Entypo name="chevron-thin-left" size={22} color="white" />
          </TouchableOpacity>
          <View className="flex flex-col w-full px-10 pb-4">
            <BrandDetails brand={data.brand} />
          </View>
          <List2
            queryKey={["brand-items", data.brand.id]}
            getClothingItems={(pageParam, limit) =>
              getBrandItems(pageParam, limit, data.brand.id)
            }
            limit={12}
            columnCount={3}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export { BrandProfilePage };

const DescriptionBrand = ({ description }: { description: string }) => {
  const [measured, setMeasured] = React.useState(false); // ya medí?
  const [overflows, setOverflows] = React.useState(false); // tiene >1 línea?
  const [expanded, setExpanded] = React.useState(false);
  const [lastDescription, setLastDescription] = React.useState(description);
  const handleTextLayout = React.useCallback(
    (e: any) => {
      const lines = e?.nativeEvent?.lines ?? [];
      // Solo actualizar si la descripción cambió o si no hemos medido aún
      if (lastDescription !== description || !measured) {
        setOverflows(lines.length > 3);
        setMeasured(true);
        setLastDescription(description);
      }
    },
    [measured, description, lastDescription]
  );
  return (
    <View className="pt-2">
      {/* Text invisible para medir el número real de líneas */}
      <Text
        className="text-white text-xl font-pregular flex-1 absolute opacity-0"
        onTextLayout={handleTextLayout}
      >
        {description}
      </Text>

      <Text
        className="text-white font-plight text-lg text-start"
        numberOfLines={expanded ? undefined : 3}
        ellipsizeMode="tail"
      >
        {description}
      </Text>

      {overflows && !expanded && (
        <TouchableOpacity onPress={() => setExpanded(v => !v)}>
          <Text className="text-gray-400 font-plight text-base pt-1">
            {expanded ? "" : "Ver más"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const BrandDetails = ({
  brand,
  openUsernameSheetLogout,
}: {
  brand: BrandSchemaType;
  openUsernameSheetLogout?: () => void;
}) => {
  return (
    <View className="flex flex-col w-full">
      <View className="flex flex-row  w-full py-4 gap-5">
        {brand.logo.url ? (
          <Image
            source={{
              uri: brand.logo.url,
            }}
            className="w-32 h-32 rounded-full"
            resizeMode="contain"
          />
        ) : null}
        <Text className="text-right text-white font-plight text-3xl pt-10">
          {brand.name}
        </Text>
        {openUsernameSheetLogout && (
          <View className="flex flex-row pt-10">
            <TouchableOpacity onPress={openUsernameSheetLogout}>
              <Ionicons name="settings-outline" size={25} color="#6b7280" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="flex flex-row items-center pt-2">
        <Ionicons
          name="link-outline"
          size={20}
          color="#38bdf8"
          style={{ marginRight: 6 }}
        />
        <TouchableOpacity
          onPress={() => brand.url && Linking.openURL(brand.url)}
          activeOpacity={1}
        >
          <Text className="text-lg font-plight text-start text-sky-500">
            {brand.url}
          </Text>
        </TouchableOpacity>
      </View>
      <DescriptionBrand description={brand.description} />
    </View>
  );
};
