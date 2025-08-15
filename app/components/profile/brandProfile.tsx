import { useState } from "react";
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import useUpdateBrand from "@/app/utils/update";
import getClothingItems, {
  getClothingItemsBrand,
  useFetchBrandProfile,
  useFetchBrandProfileItem,
} from "@/app/utils/fetch";
import { UserInfo } from "@/app/(tabs)/profile";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import LoadingPage from "../LoadingPage";
import ListItems from "../ListClotheItems";
import DeleteCatalogItemsModal from "./DeleteCatalogItemsModal";
import EditBrandProfile from "./editBrandProfile";
import splitDescriptionByLinesOrWords, {
  AddAndDeleteItems,
} from "./brandComponents";
import { FormData, InsertNewItemsModal } from "./insertNewItems";
import { CustomBottomLogout } from "./bottomSheets";
import { BrandSchemaPropertiesType } from "@/schemas/auth/brand-schema";
import { router } from "expo-router";

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
  const openUsernameSheetAddItem = () => {
    bottomSheetRefLogout.current?.close();
    bottomSheetRefDeleteItem.current?.close();
    bottomSheetRefEdit.current?.close();
    bottomSheetRefAddItem.current?.snapToIndex(0);
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
    return <LoadingPage />;
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
              openUsernameSheetAddItem={openUsernameSheetAddItem}
              openUsernameSheetDeleteItem={openUsernameSheetDeleteItem}
              openUsernameSheetEdit={openUsernameSheetEdit}
            />
          </View>
          <ListItems
            brandId={data.brand.id}
            brandEmail={user.email}
            getClothingItems={getClothingItems}
            limit={100}
            columnCount={3}
          />

          <InsertNewItemsModal
            bottomSheetRef={bottomSheetRefAddItem}
            onSubmit={handleSubmitAddItem}
            brandEmail={data.brand.email}
            formDataLastValue={{
              name: "",
              price: "",
              url: "",
              image_url: "",
              description: "",
            }}
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

const handleSubmitAddItem = (data: FormData) => {
  // console.log("Form submitted with data:", data);
};

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
          <ListItems
            brandId={data.brand.id}
            getClothingItems={getClothingItemsBrand}
            limit={100}
            columnCount={3}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export { BrandProfilePage };

const DescriptionBrand = ({ description }: { description: string }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isLongDescription = description.length > 80;
  const maxTotalLength = 80;
  const lines =
    showFullDescription || !isLongDescription
      ? description.split("\n")
      : splitDescriptionByLinesOrWords(description, maxTotalLength);
  // Mostrar botón si no se muestran todas las líneas
  const showSeeMore =
    !showFullDescription && lines.join("\n").length < description.length;
  return (
    <View className="pt-2">
      {lines.map((line, idx) => (
        <Text key={idx} className="text-white font-plight text-lg text-start">
          {line}
        </Text>
      ))}
      {showSeeMore && (
        <TouchableOpacity onPress={() => setShowFullDescription(true)}>
          <Text className="text-gray-400 font-plight text-base pt-1">
            Ver más
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
  brand: BrandSchemaPropertiesType;
  openUsernameSheetLogout?: () => void;
}) => {
  return (
    <View className="flex flex-col w-full">
      <View className="flex flex-row  w-full py-4 gap-5">
        {brand.logo_url ? (
          <Image
            source={{
              uri: brand.logo_url,
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
