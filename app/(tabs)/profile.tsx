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
import DatePicker from "react-native-date-picker";
import { format, set } from "date-fns";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "Amanda Jane",
    email: "amanda@gmail.com",
    dateOfBirth: new Date("2002-11-11"),
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const bottomSheetRefDate = useRef<BottomSheet>(null);

  const openUsernameSheet = () => {
    bottomSheetRefDate.current?.close();
    bottomSheetRef.current?.snapToIndex(0); // abre al 20%
  };

  const openUsernameSheetDate = () => {
    bottomSheetRef.current?.close();
    bottomSheetRefDate.current?.snapToIndex(0); // abre al 20%
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
        </ScrollView>
        <CustomBottomSheet
          bottomSheetRef={bottomSheetRef}
          lastValue={profileData.username}
          onSubmit={({ editInputValue }: { editInputValue: string }) => {
            setProfileData((prev) => ({
              ...prev,
              username: editInputValue,
            }));
          }}
        />
        <CustomBottomSheet
          bottomSheetRef={bottomSheetRef}
          lastValue={profileData.username}
          onSubmit={({ editInputValue }: { editInputValue: string }) => {
            setProfileData((prev) => ({
              ...prev,
              username: editInputValue,
            }));
          }}
        />
        <CustomBottomSheetDate
          bottomSheetRef={bottomSheetRefDate}
          lastValue={profileData.dateOfBirth}
          onSubmit={(val: Date) => {
            setProfileData((prev) => ({
              ...prev,
              dateOfBirth: val,
            }));
          }}
        />
        {/* <DatePickerCustom
          open={open}
          setOpen={setOpen}
          onSubmit={(newDate: Date) => {
            setProfileData((prev) => ({
              ...prev,
              dateOfBirth: newDate,
            }));
          }}
          lastValue={profileData.dateOfBirth}
          modal={false}
        /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Profile;

function CustomBottomSheet({
  bottomSheetRef,
  lastValue,
  onSubmit,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  lastValue: string;
  onSubmit:
    | (({ editInputValue }: { editInputValue: string }) => void)
    | undefined;
}) {
  const [editInputValue, setEditInputValue] = useState<string>(lastValue);
  const snapPoints = useMemo(() => ["20%"], []);
  const isReady = editInputValue.length > 0 && editInputValue !== lastValue;

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
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
              onSubmit?.({ editInputValue });
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
            <Text className="text-black font-pregular">username</Text>
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

function CustomBottomSheetDate({
  bottomSheetRef,
  lastValue,
  onSubmit,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  lastValue: Date;
  onSubmit?: (editInputValue: Date) => void;
}) {
  const [editInputValue, setEditInputValue] = useState<Date>(lastValue);
  const snapPoints = useMemo(() => ["33%"], []);
  const isReady =
    editInputValue.getFullYear() !== lastValue.getFullYear() ||
    editInputValue.getMonth() !== lastValue.getMonth() ||
    editInputValue.getDate() !== lastValue.getDate();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={-1}
      snapPoints={snapPoints}
    >
      <BottomSheetView className="flex-1 bg-white w-full">
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
              onSubmit?.(editInputValue);
              bottomSheetRef.current?.close();
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
        <View className="flex flex-col justify-center items-center flex-1 px-3">
          <View className="flex flex-col justify-center items-center h-[90%] bg-white rounded-2xl border-[2px] border-gray-300 w-full">
            <DatePicker
              modal={false}
              open={true}
              date={editInputValue}
              mode="date"
              // @ts-ignore
              androidVariant="nativeAndroid"
              onDateChange={setEditInputValue}
            />
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

const RenderProfileItem = ({
  label,
  value,
  canEdit,
  onPress,
}: {
  label: string;
  value: string;
  canEdit: boolean;
  onPress?: () => void;
}) => {
  return (
    <View className="flex flex-row justify-between py-5 border-b-[0.5px] border-b-gray-500">
      <Text className="text-xl text-white">{label}</Text>
      <View className="flex flex-row ">
        <Text className="text-xl text-white ">{value}</Text>
        {canEdit && (
          <TouchableOpacity className="ml-4" onPress={onPress}>
            <Ionicons name="pencil-outline" size={18} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

function DatePickerCustom({
  open,
  date,
  setDate,
  modal,
}: {
  open: boolean;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  modal: boolean;
}) {
  return (
    <DatePicker
      modal={modal}
      open={open}
      date={date}
      mode="date"
      // @ts-ignore
      androidVariant="nativeAndroid"
      onDateChange={setDate}
    />
  );
}
