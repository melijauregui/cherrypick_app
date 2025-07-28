import { ImageSourcePropType } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { LOCAL_IP } from "@/config/api";
import { TouchableOpacity, Text, Image } from "react-native";
import safeFetch from "@/app/utils/safe-fetch";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import images from "../../constants/images";
import { View } from "react-native";
import {
  CreateAccountSchemaRes,
  UserSchemaRes,
} from "@/schemas/auth/preferences-schema";
import {
  CustomBottomSheet,
  CustomBottomSheetDate,
  CustomBottomSheetPreferences,
} from "@/app/components/profile/bottomSheets";
import {
  RenderProfileItem,
  RenderProfileItemPreferences,
} from "@/app/components/profile/bottomSheets";
import ProfileAndLogOut from "@/app/components/profile/profileAndLogOut";
import { BrandSchemaRes, BrandSchemaType } from "@/schemas/auth/brand-schema";
import { Linking } from "react-native";
import {
  CatalogItemArraySchema,
  CatalogItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import ListItems from "@/app/components/ListClotheItems";
import splitDescriptionByLinesOrWords from "@/app/components/profile/descriptionBrand";
import InsertNewItemsModal, {
  toastConfig,
} from "../components/profile/insertNewItems";
import Toast from "react-native-toast-message";
import DeleteCatalogItemsModal from "../components/profile/DeleteCatalogItemsModal";
import { authClient, useSession } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomBottomLogout } from "@/app/components/profile/bottomSheets";

interface UserInfo {
  email: string;
  name: string;
}
export type { UserInfo };

const Profile = () => {
  const { user } = useSession();
  const { signOut } = authClient;

  const logout = async () => {
    signOut();
  };

  if (!user) {
    console.log("No user found");
    //TODO PUSH TOAST
    return null;
  }

  const userType = user.userType;

  if (userType === "client") {
    return <ClientProfile user={user} logout={logout} />;
  } else if (userType === "brand") {
    return <BrandProfile user={user} logout={logout} />;
  } else {
    //TODO PUSH TOAST
    console.log("No user type found");
    return null;
  }
};
export default Profile;

const BrandProfile = ({
  user,
  logout,
}: {
  user: UserInfo;
  logout: () => Promise<void>;
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const data = useFetchBrandProfile(user);

  const bottomSheetRefLogout = useRef<BottomSheet>(null);
  const bottomSheetRefAddItem = useRef<BottomSheet>(null);
  const bottomSheetRefDeleteItem = useRef<BottomSheet>(null);
  const openUsernameSheetLogout = () => {
    bottomSheetRefAddItem.current?.close();
    bottomSheetRefDeleteItem.current?.close();
    bottomSheetRefLogout.current?.snapToIndex(0);
  };
  const openUsernameSheetAddItem = () => {
    bottomSheetRefLogout.current?.close();
    bottomSheetRefDeleteItem.current?.close();
    bottomSheetRefAddItem.current?.snapToIndex(0);
  };

  const openUsernameSheetDeleteItem = () => {
    bottomSheetRefLogout.current?.close();
    bottomSheetRefAddItem.current?.close();
    bottomSheetRefDeleteItem.current?.snapToIndex(0);
  };
  if (!data) {
    console.log("No data found");
    return null;
  }

  const description = data.brand.description || "";
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView className="bg-brown-strong w-full flex-1 ">
          <View className="flex flex-col w-full px-10 ">
            <View className="flex flex-row  w-full py-4 gap-5">
              {data.brand.logo_url ? (
                <Image
                  source={{
                    uri: data.brand.logo_url,
                  }}
                  className="w-32 h-32 rounded-full"
                  resizeMode="contain"
                />
              ) : null}
              <Text className="text-right text-white font-plight text-3xl pt-10">
                {data.brand.name}
              </Text>
              <View className="flex flex-row pt-10">
                <TouchableOpacity onPress={openUsernameSheetLogout}>
                  <Ionicons name="settings-outline" size={25} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row items-center pt-2">
              <Ionicons
                name="link-outline"
                size={20}
                color="#38bdf8"
                style={{ marginRight: 6 }}
              />
              <TouchableOpacity
                onPress={() =>
                  data.brand.url && Linking.openURL(data.brand.url)
                }
                activeOpacity={1}
              >
                <Text className="text-lg font-plight text-start text-sky-500">
                  {data.brand.url}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="pt-2">
              {lines.map((line, idx) => (
                <Text
                  key={idx}
                  className="text-white font-plight text-lg text-start"
                >
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

            <View className="flex flex-row w-full gap-4 py-4">
              <TouchableOpacity
                onPress={openUsernameSheetAddItem}
                style={{
                  backgroundColor: "rgba(107, 114, 128, 0.5)",
                }}
                className="flex-1 px-0 py-2 rounded-xl items-center"
              >
                <Text className="text-white text-base font-semibold">
                  Agregar Item
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={openUsernameSheetDeleteItem}
                style={{
                  backgroundColor: "rgba(107, 114, 128, 0.5)",
                }}
                className="flex-1 px-0 py-2 rounded-xl items-center"
              >
                <Text className="text-white text-base font-semibold">
                  Eliminar Item
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ListItems
            profileData={data.brand}
            getClothingItems={getClothingItems}
            limit={100}
            columnCount={3}
          />

          <InsertNewItemsModal
            bottomSheetRef={bottomSheetRefAddItem}
            onSubmit={handleSubmitAddItem}
            brand={data.brand.name}
          />

          <DeleteCatalogItemsModal
            bottomSheetRef={bottomSheetRefDeleteItem}
            brand={data.brand.name}
            onDelete={() => {}}
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

const DATA_MAP = new Map<string, ImageSourcePropType>([
  ["Boho-chic", images.bohoChicImage],
  ["Streetwear", images.streetWearImage],
  ["Sporty", images.sportyImage],
  ["Old money", images.oldMoneyImage],
  ["Minimalist", images.minimalistImage],
  ["Coquette", images.coquetteImage],
]);

const DATA = Array.from(DATA_MAP.entries()).map(([title, image]) => ({
  title,
  image,
}));

const ClientProfile = ({
  user,
  logout,
}: {
  user: UserInfo;
  logout: () => Promise<void>;
}) => {
  const data = useFetchClientProfile(user);
  const mutateUser = useUpdateClient();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRefDate = useRef<BottomSheet>(null);
  const bottomSheetRefPreferences = useRef<BottomSheet>(null);
  const bottomSheetRefLogout = useRef<BottomSheet>(null);

  const openUsernameSheet = () => {
    bottomSheetRefDate.current?.close();
    bottomSheetRefPreferences.current?.close();
    bottomSheetRefLogout.current?.close();
    bottomSheetRef.current?.snapToIndex(0); // abre al 20%
  };

  const openUsernameSheetDate = () => {
    bottomSheetRef.current?.close();
    bottomSheetRefPreferences.current?.close();
    bottomSheetRefLogout.current?.close();
    bottomSheetRefDate.current?.snapToIndex(0);
  };

  const openUsernameSheetPreferences = () => {
    bottomSheetRef.current?.close();
    bottomSheetRefDate.current?.close();
    bottomSheetRefLogout.current?.close();
    bottomSheetRefPreferences.current?.snapToIndex(0);
  };

  const openUsernameSheetLogout = () => {
    bottomSheetRef.current?.close();
    bottomSheetRefDate.current?.close();
    bottomSheetRefPreferences.current?.close();
    bottomSheetRefLogout.current?.snapToIndex(0);
  };

  if (!data) {
    //TODO PUSH TOAST
    console.log("No data found");
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 flex-col px-14 pt-3 bg-brown-strong">
          <View className="flex  flex-col w-full justify-between">
            <ProfileAndLogOut
              openUsernameSheetLogout={openUsernameSheetLogout}
            />
            <RenderProfileItem
              label="Username"
              value={data.user.username}
              canEdit={true}
              onPress={openUsernameSheet}
            />
            <RenderProfileItem
              label="Email"
              value={data.user.email}
              canEdit={false}
            />
            <RenderProfileItem
              label="Date of Birth"
              value={
                data.user.dateOfBirth
                  ? format(data.user.dateOfBirth, "dd/MM/yyyy")
                  : "No date of birth yet"
              }
              canEdit={true}
              onPress={openUsernameSheetDate}
            />
          </View>
          <RenderProfileItemPreferences
            label="Preferences"
            value={data.user.preferences.map(item => ({
              title: item,
              image: DATA_MAP.get(item) ?? images.bohoChicImage, // TODO !!
            }))}
            onPress={openUsernameSheetPreferences}
          />
          <CustomBottomSheet
            bottomSheetRef={bottomSheetRef}
            lastValue={data.user.username}
            onSubmit={async (editInputValue: string) => {
              mutateUser.mutate({
                username: editInputValue,
                email: data.user.email,
                dateOfBirth: data.user.dateOfBirth,
                preferences: data.user.preferences,
              });
            }}
          />
          <CustomBottomSheetDate
            bottomSheetRef={bottomSheetRefDate}
            lastValue={data.user.dateOfBirth ?? new Date()}
            onSubmit={async (editInputValue: Date) => {
              mutateUser.mutate({
                username: data.user.username,
                email: data.user.email,
                dateOfBirth: editInputValue,
                preferences: data.user.preferences,
              });
            }}
          />
          <CustomBottomSheetPreferences
            bottomSheetRef={bottomSheetRefPreferences}
            lastValue={data.user.preferences}
            totalItems={DATA}
            onSubmit={async (val: string[]) => {
              mutateUser.mutate({
                username: data.user.username,
                email: data.user.email,
                dateOfBirth: data.user.dateOfBirth,
                preferences: val,
              });
            }}
          />
          <CustomBottomLogout
            bottomSheetRef={bottomSheetRefLogout}
            logout={logout}
            user={user}
          />
          <Toast config={toastConfig} />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

function useFetchClientProfile(user: UserInfo): {
  user: {
    username: string;
    email: string;
    preferences: string[];
    dateOfBirth: Date | null;
  };
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch-client-profile"],
    queryFn: async () => {
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-client?email=${user.email}`,
          method: "GET",
          schema: UserSchemaRes,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.error("Error fetching user data2:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    console.log("No data found", error);
    return null;
  }
  return data;
}

function useUpdateClient() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      dateOfBirth: Date | null;
      preferences: string[];
    }) => {
      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/update-client`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          dateString: data.dateOfBirth?.toISOString() ?? null,
          preferences: data.preferences,
        }),
        schema: CreateAccountSchemaRes,
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["fetch-client-profile"],
      });
    },
    onError: error => {
      // TODO PUSH TOAST
      console.log(`could not update user:`, error);
    },
  });

  return mutation;
}

function useFetchBrandProfile(user: UserInfo): {
  brand: {
    name: string;
    description: string;
    email: string;
    url: string;
    logo_url: string;
  };
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch-brand-profile"],
    queryFn: async () => {
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-brand?email=${user.email}`,
          method: "GET",
          schema: BrandSchemaRes,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.error("Error fetching user data2:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    console.log("No data found", error);
    return null;
  }
  return data;
}

async function getClothingItems(
  page: number,
  limit: number,
  brand: string | undefined
): Promise<CatalogItemSchemaType[]> {
  if (brand === undefined || brand === null) {
    console.log("No brand name found yet");
    return [];
  }
  console.log("Fetching items for brand3", brand);
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all-brand?page=${page}&limit=${limit}&brand=${brand}`,
      method: "GET",
      schema: CatalogItemArraySchema,
    });
    return data;
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return [];
  }
}

const handleSubmitAddItem = (data: {
  productName: string;
  price: string;
  url: string;
  imageUrl: string;
}) => {
  console.log("Form submitted with data:", data);
};
