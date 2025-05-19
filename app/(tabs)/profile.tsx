import { ImageSourcePropType } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { LOCAL_IP } from "@/config/api";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, ScrollView } from "react-native";
import { safeFetch } from "@/utils/safe-fetch";
import { VerifyAccountDeletedSchema } from "@/schemas/auth/sign-up-schema";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import { format, set } from "date-fns";
import images from "../../constants/images";
import { FlatList, View, Image } from "react-native";
import { Dimensions } from "react-native";

type ItemData = {
  title: string;
  image: ImageSourcePropType;
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

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "Amanda Jane",
    email: "amanda@gmail.com",
    dateOfBirth: new Date("2002-11-11"),
    preferences: ["Boho-chic", "Sporty"],
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRefDate = useRef<BottomSheet>(null);
  const bottomSheetRefPreferences = useRef<BottomSheet>(null);

  const openUsernameSheet = () => {
    bottomSheetRefDate.current?.close();
    bottomSheetRefPreferences.current?.close();
    bottomSheetRef.current?.snapToIndex(0); // abre al 20%
  };

  const openUsernameSheetDate = () => {
    bottomSheetRef.current?.close();
    bottomSheetRefPreferences.current?.close();
    bottomSheetRefDate.current?.snapToIndex(0);
  };

  const openUsernameSheetPreferences = () => {
    bottomSheetRef.current?.close();
    bottomSheetRefDate.current?.close();
    bottomSheetRefPreferences.current?.snapToIndex(0);
  };

  return (
    <GestureHandlerRootView className="bg-brown-strong flex-1 h-full w-full">
      <SafeAreaView className="flex-1 flex-col px-14 pt-3 ">
        <View className="w-full">
          <View className="flex  flex-col w-full justify-between">
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
        </View>
        <View className="flex flex-col w-full h-full">
          <RenderProfileItemPreferences
            label="Preferences"
            value={profileData.preferences.map((item) => ({
              title: item,
              image: DATA_MAP.get(item) ?? images.bohoChicImage, // TODO !!
            }))}
            onPress={openUsernameSheetPreferences}
          />
        </View>
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
        <CustomBottomSheetPreferences
          bottomSheetRef={bottomSheetRefPreferences}
          lastValue={profileData.preferences}
          totalItems={DATA}
          onSubmit={(val: string[]) => {
            setProfileData((prev) => ({
              ...prev,
              preferences: val,
            }));
          }}
        />
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

function CustomBottomSheetPreferences({
  bottomSheetRef,
  lastValue,
  totalItems,
  onSubmit,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  lastValue: string[];
  onSubmit?: (editInputValue: string[]) => void;
  totalItems: ItemData[];
}) {
  const [editInputValue, setEditInputValue] = useState<string[]>(lastValue);
  const snapPoints = useMemo(() => ["33%"], []);
  const isReady = !setsEqual(editInputValue, lastValue);

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
        <View className="flex flex-col justify-center items-center flex-1">
          <View className="flex flex-col  justify-center items-center h-[90%] bg-white rounded-2xl w-full py-2">
            <CarouselWithFlatList
              data={totalItems}
              itemsSelected={editInputValue}
              setItemsSelected={setEditInputValue}
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

const RenderProfileItemPreferences = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: ItemData[];
  onPress?: () => void;
}) => {
  return (
    <View className="flex flex-1 flex-col w-full h-full">
      <View className="flex flex-row  py-5 items-center relative">
        <Text className="text-xl text-white absolute left-0 right-0 text-center">
          {label}
        </Text>
        <View className="flex flex-row ml-auto">
          <TouchableOpacity className="ml-4" onPress={onPress}>
            <Ionicons name="pencil-outline" size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full mt-1 flex-1">
        <FlatList
          data={value}
          renderItem={renderItem2}
          keyExtractor={(item) => item.title}
          // extraData={selectedIdxs}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      </View>
    </View>
  );
};

function setsEqual(a: string[], b: string[]): boolean {
  const sa = new Set(a),
    sb = new Set(b);
  if (sa.size !== sb.size) return false;
  for (const v of sa) if (!sb.has(v)) return false;
  return true;
}

const renderItem = ({
  item,
  index,
  itemsSelected,
  setItemsSelected,
}: {
  item: ItemData;
  index: number;
  itemsSelected: string[];
  setItemsSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const isSelected = itemsSelected.includes(item.title);
  const { width, height } = Dimensions.get("window");

  function handleOnpress(title: string) {
    const updated = itemsSelected.includes(title)
      ? itemsSelected.filter((item) => item !== title)
      : [...itemsSelected, title];
    setItemsSelected(updated);
  }

  return (
    // <View className="aspect-[1] px-1" style={{ width: width * 0.45 }}>
    <TouchableOpacity
      onPress={() => handleOnpress(item.title)}
      className="aspect-[1] px-1 pb-3"
      style={{ width: width * 0.45 }}
    >
      <Image
        source={item.image}
        className={`
            w-full
            h-full
            rounded-2xl
            ${isSelected ? "border-4 border-brown-strong" : ""}
          `}
        resizeMode="cover"
      />
    </TouchableOpacity>
    // </View>
  );
};

const renderItem2 = ({ item, index }: { item: ItemData; index: number }) => {
  return (
    <View className="w-[49%] aspect-[1] pb-2">
      <Image
        source={item.image}
        className={`
            w-full
            h-full
            rounded-2xl
            
          `}
        resizeMode="cover"
      />
    </View>
  );
};

export function CarouselWithFlatList({
  data,
  itemsSelected,
  setItemsSelected,
}: {
  data: ItemData[];
  itemsSelected: string[];
  setItemsSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item, index }) =>
        renderItem({
          item,
          index,
          itemsSelected,
          setItemsSelected,
        })
      }
      style={{ backgroundColor: "white" }}
    />
  );
}
