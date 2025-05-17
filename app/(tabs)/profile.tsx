import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { LOCAL_IP } from "@/config/api";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { safeFetch } from "@/utils/safe-fetch";
import { VerifyAccountDeletedSchema } from "@/schemas/auth/sign-up-schema";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { set } from "zod";
import { on } from "events";
// import { X } from "lucide-react-native";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "Amanda Jane",
    email: "amanda@gmail.com",
    dateOfBirth: "20/05/1990",
  });

  const [typeValue, setTypeValue] = useState("");
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [lastValue, setLastValue] = useState<string>("");
  const [onSubmit, setOnSubmit] = useState<() => void>();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = useMemo(() => ["20%"], []);
  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(0); // abre al 20%
  };

  return (
    <GestureHandlerRootView className="bg-brown-strong flex-1 h-full w-full">
      <SafeAreaView className="bg-brown-strong flex-1 h-full w-full">
        <ScrollView
          className="flex-1 w-full h-full"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex flex-grow flex-col w-full justify-between px-14 pt-3">
            <View className="flex flex-col w-full">
              <View className="items-center justify-center p-6">
                <Text className="text-white text-[27px] font-psemibold text-justify">
                  Profile
                </Text>
              </View>
              {userNameInput(
                profileData,
                setTypeValue,
                setLastValue,
                setEditInputValue,
                setOnSubmit,
                () => {
                  console.log(
                    "Submit with Edit input value YESS2:",
                    editInputValue
                  );
                  setProfileData((prev) => ({
                    ...prev,
                    username: editInputValue,
                  }));
                },
                openSheet
              )}
              {renderProfileItem("Email", profileData.email, false)}
              {renderProfileItem(
                "Date of birth",
                profileData.dateOfBirth,
                true,
                () => {
                  setTypeValue("Date of birth");
                  setLastValue(profileData.dateOfBirth);
                  setEditInputValue(profileData.dateOfBirth);
                  setOnSubmit(() => () => {
                    setProfileData((prev) => ({
                      ...prev,
                      dateOfBirth: editInputValue,
                    }));
                  });
                  openSheet();
                }
              )}
            </View>
          </View>
        </ScrollView>
        {bottomSheet(
          bottomSheetRef,
          handleSheetChanges,
          snapPoints,
          typeValue,
          editInputValue,
          setEditInputValue,
          lastValue,
          onSubmit
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Profile;

function userNameInput(
  profileData: { username: string; email: string; dateOfBirth: string },
  setTypeValue: React.Dispatch<React.SetStateAction<string>>,
  setLastValue: React.Dispatch<React.SetStateAction<string>>,
  setEditInputValue: React.Dispatch<React.SetStateAction<string>>,
  setOnSubmit: React.Dispatch<React.SetStateAction<(() => void) | undefined>>,
  funcWhenSubmit: () => void,
  openSheet: () => void
): React.ReactNode {
  return renderProfileItem("Username", profileData.username, true, () => {
    setTypeValue("username");
    setLastValue(profileData.username);
    setEditInputValue(profileData.username);
    setOnSubmit(
      () =>
        // ← this outer arrow is React’s “updater” (called once),
        //     and it returns the inner function as the new state.
        () =>
          funcWhenSubmit()
    );
    openSheet();
  });
}

function bottomSheet(
  bottomSheetRef: React.RefObject<BottomSheet>,
  handleSheetChanges: (index: number) => void,
  snapPoints: string[],
  typeValue: string,
  editInputValue: string,
  setEditInputValue: React.Dispatch<React.SetStateAction<string>>,
  lastValue: string,
  onSubmit: (() => void) | undefined
) {
  const isReady = editInputValue.length > 0 && editInputValue !== lastValue;
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={-1}
      snapPoints={snapPoints}
    >
      <BottomSheetView className="flex-1 bg-white">
        <View className="flex flex-row justify-between items-center py-3 border-b border-gray-300 px-6">
          <TouchableOpacity
            className="justify-center"
            onPress={() => bottomSheetRef.current?.close()}
          >
            <Text className="text-xl text-black font-pmedium">Cancel</Text>
          </TouchableOpacity>

          <Text className="text-black font-pmedium text-xl ">Edit Profile</Text>

          <TouchableOpacity
            className="flex flex-row"
            onPress={() => {
              console.log(
                "Submit YESS:",
                editInputValue,
                "onSubmit",
                onSubmit == undefined
              );
              onSubmit?.();
              bottomSheetRef.current?.close();
              console.log("onSubmit done");
            }}
            disabled={!isReady}
          >
            <Text
              className={`
              text-xl  font-pmedium
              ${!isReady ? "text-black opacity-40" : "text-black"}
            `}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col justify-center items-center flex-1 px-5">
          <View className="flex flex-col h-[60px] px-[16px] bg-white rounded-2xl border-[2px] border-gray-300 w-full py-2">
            <Text className="text-black font-pregular">{typeValue}</Text>
            <TextInput
              className="flex-1 text-black font-plight text-[16px] h-full"
              value={editInputValue}
              onChangeText={setEditInputValue}
              placeholder={lastValue}
              placeholderTextColor="#666"
              selectionColor="#3478F6"
            />
            {/* {name.length > 0 && (

        )} */}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const LogOutButton: React.FC<{ logout: () => Promise<void> }> = ({
  logout,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };

  return (
    <TouchableOpacity
      className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full"
      onPress={handleLogout}
    >
      <Text className="text-black font-psemibold text-[15px]">Log Out</Text>
    </TouchableOpacity>
  );
};

const DeleteAccountButton: React.FC<{
  user: { email: string } | null;
  loading: boolean;
  logout: () => Promise<void>;
}> = ({ user, loading, logout }) => {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (loading || !user?.email) {
      console.log("Still loading or no user:", { user, loading });
      return;
    }

    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/delete-account`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
      schema: VerifyAccountDeletedSchema,
    });

    if ("success" in data && data.success) {
      console.log("Account deleted successfully");
      await logout();

      router.replace("/sign-in");
    } else if ("details" in data && data.details) {
      console.log("Error:", data.details);
    }
  };

  return (
    <TouchableOpacity
      className="flex flex-row bg-red-600 h-[50px] justify-center items-center rounded-full"
      onPress={handleDeleteAccount}
    >
      <Text className="text-white font-psemibold text-[15px]">
        Delete Account
      </Text>
    </TouchableOpacity>
  );
};

const renderProfileItem = (
  label: string,
  value: string,
  canEdit: boolean,
  onPress?: () => void
) => {
  return (
    <View className="flex flex-row justify-between py-5 border-b-[0.5px] border-b-gray-500">
      <Text className="text-xl text-white">{label}</Text>
      <View className="flex flex-row ">
        <Text className="text-xl text-white ">{value}</Text>
        {canEdit && (
          <TouchableOpacity className="ml-2 p-2 " onPress={onPress}>
            <Ionicons name="pencil-outline" size={18} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
