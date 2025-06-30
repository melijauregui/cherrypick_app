import { ImageSourcePropType } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { LOCAL_IP } from "@/config/api";
import { TouchableOpacity, Text, Image } from "react-native";
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
import { ProfileAndLogOut } from "@/app/components/profile/profileAndLogOut";
import { BrandSchemaRes } from "@/schemas/auth/brand-schema";
import { LogoCircle } from "@/app/components/LogoCircle";

const Profile = () => {
  const { user, loading, logout, userType } = useAuth();

  return userType === "client" ? (
    <ClientProfile user={user} loading={loading} logout={logout} />
  ) : (
    <BrandProfile user={user} loading={loading} logout={logout} />
  );
};
export default Profile;

const fetchClientData = async (
  setProfileData: (data: any) => void,
  user: UserInfo
) => {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/get-user?email=${user.email}`,
      method: "GET",
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

const fetchBrandData = async (
  setProfileData: (data: any) => void,
  user: UserInfo
) => {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/get-brand?email=${user.email}`,
      method: "GET",
      schema: BrandSchemaRes,
    });
    if (data.error) {
      console.log("Error fetching user data:", data.details);
      return;
    }
    setProfileData({
      name: data.brand.name,
      description: data.brand.description,
      email: data.brand.email,
      url: data.brand.url,
      logo_url: data.brand.logo_url,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const BrandProfile = ({
  user,
  loading,
  logout,
}: {
  user: UserInfo | null;
  loading: boolean;
  logout: () => Promise<void>;
}) => {
  const [profileData, setProfileData] = useState<{
    name: string;
    description: string;
    email: string;
    url: string;
    logo_url: string;
  }>({
    name: "",
    description: "",
    email: "",
    url: "",
    logo_url: "",
  });

  // Estado para mostrar descripción completa o cortada
  const [showFullDescription, setShowFullDescription] = useState(false);

  React.useEffect(() => {
    if (!user || !user.email) {
      console.log("No user or email found");
      return;
    }
    fetchBrandData(setProfileData, user);
  }, [user]);

  const bottomSheetRefLogout = useRef<BottomSheet>(null);
  const openUsernameSheetLogout = () => {
    bottomSheetRefLogout.current?.snapToIndex(0);
  };

  const description = profileData.description || "";
  const isLongDescription = description.length > 80;
  const maxLineLength = 40;
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
      <SafeAreaView className="flex-1 flex-col px-14 pt-3 bg-brown-strong">
        <View className="flex flex-col w-full">
          {/* <ProfileAndLogOut openUsernameSheetLogout={openUsernameSheetLogout} /> */}
          <View className="flex flex-row  w-full py-4 gap-5">
            <Image
              source={{
                uri: profileData.logo_url,
              }}
              className="w-32 h-32 rounded-full"
              resizeMode="contain"
            />
            <Text className="text-right text-white font-plight text-3xl pt-10">
              {profileData.name}
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
            <Text className="text-lg font-plight text-start text-sky-500">
              {profileData.url}
            </Text>
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
        </View>
        <CustomBottomLogout
          bottomSheetRef={bottomSheetRefLogout}
          logout={logout}
          loading={loading}
          user={user}
        />
      </SafeAreaView>
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
  loading,
  logout,
}: {
  user: UserInfo | null;
  loading: boolean;
  logout: () => Promise<void>;
}) => {
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
    fetchClientData(setProfileData, user);
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
      <SafeAreaView className="flex-1 flex-col px-14 pt-3 bg-brown-strong">
        <View className="flex  flex-col w-full justify-between">
          <ProfileAndLogOut openUsernameSheetLogout={openUsernameSheetLogout} />
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
        <RenderProfileItemPreferences
          label="Preferences"
          value={profileData.preferences.map(item => ({
            title: item,
            image: DATA_MAP.get(item) ?? images.bohoChicImage, // TODO !!
          }))}
          onPress={openUsernameSheetPreferences}
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
      url: `http://${LOCAL_IP}:3000/update-client`,
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

// Lógica para cortar la descripción respetando los saltos de línea originales,
// pero si ninguna línea cabe, corta por palabras hasta 80 caracteres
function splitDescriptionByLinesOrWords(text: string, maxTotalLength: number) {
  const originalLines = text.split("\n");
  let lines: string[] = [];
  let totalLength = 0;
  let foundShortLine = false;
  for (let line of originalLines) {
    if (line.length <= maxTotalLength) {
      foundShortLine = true;
    }
    if (totalLength + line.length > maxTotalLength) {
      break;
    }
    lines.push(line);
    totalLength += line.length + 1; // +1 por el salto de línea
  }
  // Si no hay ninguna línea corta, cortar por palabras
  if (!foundShortLine && originalLines.length > 0) {
    const words = originalLines[0]?.split(/\s+/);
    let acc = "";
    for (let word of words || []) {
      if ((acc + (acc ? " " : "") + word).length > maxTotalLength) break;
      acc += (acc ? " " : "") + word;
    }
    return acc ? [acc] : [];
  }
  return lines;
}
