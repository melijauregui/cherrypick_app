import { ImageSourcePropType } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import { format } from "date-fns";
import images from "../../constants/images";
import { View } from "react-native";
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
import { authClient, useSession } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { CustomBottomLogout } from "@/app/components/profile/bottomSheets";
import LoadingPage from "../components/LoadingPage";
import { useUpdateClient } from "@/utils/update";
import { useFetchClientProfile, UserInfo } from "@/utils/use-query";
import BrandProfile from "../components/profile/brandProfile";

const Profile = () => {
  const { user } = useSession();
  const { signOut } = authClient;
  const queryClient = useQueryClient();

  const logout = async () => {
    // Cancelar todas las peticiones activas y limpiar la caché de React Query antes de hacer logout
    await queryClient.cancelQueries();
    await queryClient.clear();
    await signOut();
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
  const mutateUser = useUpdateClient(user.email);
  const [resetKey, setResetKey] = useState(false);

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
    return <LoadingPage alreadyPrefetched={true} />;
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
              label="Nombre de usuario"
              value={data.user.name}
              canEdit={true}
              onPress={openUsernameSheet}
            />
            <RenderProfileItem
              label="Email"
              value={user.email}
              canEdit={false}
            />
            <RenderProfileItem
              label="Fecha de nacimiento"
              value={
                data.user.dateOfBirth
                  ? format(data.user.dateOfBirth, "dd/MM/yyyy")
                  : "No has ingresado aún"
              }
              canEdit={true}
              onPress={openUsernameSheetDate}
            />
          </View>
          <RenderProfileItemPreferences
            label="Preferencias"
            value={data.user.preferences.map(item => ({
              title: item,
              image: DATA_MAP.get(item) ?? images.bohoChicImage, // TODO !!
            }))}
            onPress={openUsernameSheetPreferences}
          />
          <CustomBottomSheet
            bottomSheetRef={bottomSheetRef}
            lastValue={data.user.name}
            onSubmit={async (editInputValue: string) => {
              mutateUser.mutate({
                username: editInputValue,
                dateOfBirth: data.user.dateOfBirth,
                preferences: data.user.preferences,
              });
              setResetKey(!resetKey);
            }}
            resetKey={resetKey}
          />
          <CustomBottomSheetDate
            bottomSheetRef={bottomSheetRefDate}
            lastValue={data.user.dateOfBirth ?? new Date()}
            onSubmit={async (editInputValue: Date) => {
              mutateUser.mutate({
                username: data.user.name,
                dateOfBirth: editInputValue,
                preferences: data.user.preferences,
              });
              setResetKey(!resetKey);
            }}
            resetKey={resetKey}
          />
          <CustomBottomSheetPreferences
            bottomSheetRef={bottomSheetRefPreferences}
            lastValue={data.user.preferences}
            totalItems={DATA}
            onSubmit={async (val: string[]) => {
              mutateUser.mutate({
                username: data.user.name,
                dateOfBirth: data.user.dateOfBirth,
                preferences: val,
              });
              setResetKey(!resetKey);
            }}
            resetKey={resetKey}
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
