import { ImageSourcePropType } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { LOCAL_IP } from "@/config/api";
import { TouchableOpacity, Text } from "react-native";
import { safeFetch } from "@/app/utils/safe-fetch";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import images from "../../constants/images";
import { View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import {
  CreateAccountSchemaRes,
  UserSchemaRes,
} from "@/schemas/auth/preferences-schema";
import { UserInfo } from "@/context/AuthContext";
import {
  CustomBottomSheet,
  CustomBottomSheetDate,
  CustomBottomSheetPreferences,
  CustomBottomLogout,
} from "@/app/components/profile/bottomSheets";
import {
  RenderProfileItem,
  RenderProfileItemPreferences,
} from "@/app/components/profile/bottomSheets";
import { LogOutButton } from "@/app/components/profile/buttons";

const Profile = () => {
  const { user, loading, logout, userType } = useAuth();

  console.log("userType2", userType);

  return userType === "client" ? (
    <ClientProfile user={user} loading={loading} logout={logout} />
  ) : (
    <BrandProfile
      user={user}
      loading={loading}
      logout={logout}
      userType={userType}
    />
  );
};
export default Profile;

const BrandProfile = ({
  user,
  loading,
  logout,
  userType,
}: {
  user: UserInfo | null;
  loading: boolean;
  logout: () => Promise<void>;
  userType: "client" | "brand" | null;
}) => {
  return (
    <View>
      <Text>Brand Profile</Text>
      <LogOutButton logout={logout} />
    </View>
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
  loading,
  logout,
}: {
  user: UserInfo | null;
  loading: boolean;
  logout: () => Promise<void>;
}) => {
  // const { user, loading, logout } = useAuth();

  const [profileData, setProfileData] = useState<{
    username: string;
    email: string;
    dateOfBirth: Date;
    preferences: string[];
  }>({
    username: "",
    email: "",
    dateOfBirth: new Date(),
    preferences: [],
  });

  React.useEffect(() => {
    if (!user || !user.email) {
      console.log("No user or email found");
      return;
    }
    const fetchUserData = async () => {
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-user?email=${user.email}`,
          method: "GET",
          //headers: { "Content-Type": "application/json" },
          schema: UserSchemaRes,
        });
        if (data.error) {
          console.log("Error fetching user data:", data.details);
          return;
        }
        setProfileData({
          username: data.user.username,
          email: data.user.email,
          preferences: data.user.preferences,
          dateOfBirth: new Date(data.user.dateOfBirth),
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user]);

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <View className="bg-brown-strong flex-1"> */}
      <SafeAreaView className="flex-1 flex-col px-14 pt-3 bg-brown-strong">
        <View className="w-full">
          <View className="flex  flex-col w-full justify-between">
            <View className="flex flex-col w-full">
              <View className="flex flex-row w-full items-center relative py-6">
                <Text className="text-white text-[27px] font-pregular  absolute left-0 right-0 text-center">
                  Profile
                </Text>
                <View className="flex flex-row mr-auto">
                  <TouchableOpacity onPress={openUsernameSheetLogout}>
                    <Ionicons
                      name="settings-outline"
                      size={25}
                      color="#6b7280"
                    />
                    {/* <MaterialIcons name="logout" size={25} color="#6b7280" /> */}
                  </TouchableOpacity>
                </View>
              </View>
              <RenderProfileItem
                label="Username"
                value={profileData.username}
                canEdit={true}
                onPress={openUsernameSheet}
              />
              <RenderProfileItem
                label="Email"
                value={profileData.email}
                canEdit={false}
              />
              <RenderProfileItem
                label="Date of Birth"
                value={format(profileData.dateOfBirth, "dd/MM/yyyy")}
                canEdit={true}
                onPress={openUsernameSheetDate}
              />
            </View>
          </View>
        </View>
        {/* <View className="flex flex-col w-full"> */}
        <RenderProfileItemPreferences
          label="Preferences"
          value={profileData.preferences.map(item => ({
            title: item,
            image: DATA_MAP.get(item) ?? images.bohoChicImage, // TODO !!
          }))}
          onPress={openUsernameSheetPreferences}
        />
        {/* </View> */}
        <CustomBottomSheet
          bottomSheetRef={bottomSheetRef}
          lastValue={profileData.username}
          onSubmit={async (editInputValue: string) => {
            try {
              await updateUser({
                username: editInputValue,
                email: profileData.email,
                dateOfBirth: profileData.dateOfBirth,
                preferences: profileData.preferences,
              });
              setProfileData(prev => ({
                ...prev,
                username: editInputValue,
              }));
            } catch (error) {
              console.error("Error updating username:", error);
            }
          }}
        />
        <CustomBottomSheet
          bottomSheetRef={bottomSheetRef}
          lastValue={profileData.username}
          onSubmit={async (editInputValue: string) => {
            try {
              await updateUser({
                username: editInputValue,
                email: profileData.email,
                dateOfBirth: profileData.dateOfBirth,
                preferences: profileData.preferences,
              });
              setProfileData(prev => ({
                ...prev,
                username: editInputValue,
              }));
            } catch (error) {
              console.error("Error updating username:", error);
            }
          }}
        />
        <CustomBottomSheetDate
          bottomSheetRef={bottomSheetRefDate}
          lastValue={profileData.dateOfBirth}
          onSubmit={async (editInputValue: Date) => {
            try {
              await updateUser({
                dateOfBirth: editInputValue,
                username: profileData.username,
                email: profileData.email,
                preferences: profileData.preferences,
              });
              setProfileData(prev => ({
                ...prev,
                dateOfBirth: editInputValue,
              }));
            } catch (error) {
              console.error("Error updating date of birth:", error);
            }
          }}
        />
        <CustomBottomSheetPreferences
          bottomSheetRef={bottomSheetRefPreferences}
          lastValue={profileData.preferences}
          totalItems={DATA}
          onSubmit={async (val: string[]) => {
            try {
              await updateUser({
                preferences: val,
                username: profileData.username,
                email: profileData.email,
                dateOfBirth: profileData.dateOfBirth,
              });
              setProfileData(prev => ({
                ...prev,
                preferences: val,
              }));
            } catch (error) {
              console.error("Error updating preferences:", error);
            }
          }}
        />
        <CustomBottomLogout
          bottomSheetRef={bottomSheetRefLogout}
          logout={logout}
          loading={loading}
          user={user}
        />
      </SafeAreaView>
      {/* </View> */}
    </GestureHandlerRootView>
  );
};

async function updateUser(data: {
  username?: string;
  email?: string;
  dateOfBirth?: Date;
  preferences?: string[];
}) {
  try {
    const response = await safeFetch({
      url: `http://${LOCAL_IP}:3000/update-user`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.username,
        email: data.email,
        dateString: data.dateOfBirth?.toISOString(),
        preferences: data.preferences,
      }),
      schema: CreateAccountSchemaRes,
    });

    if (response.data.error) {
      console.error("Error updating user:", response.data.details);
      return;
    }
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
}
