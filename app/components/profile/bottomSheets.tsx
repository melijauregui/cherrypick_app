import { ImageSourcePropType } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import { View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CarouselWithFlatList from "./carousel";
import LogOutButton, { DeleteAccountButton } from "./buttons";

type ItemData = {
  title: string;
  image: ImageSourcePropType;
};

export { ItemData };

function CustomBottomSheet({
  bottomSheetRef,
  lastValue,
  onSubmit,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  lastValue: string;
  onSubmit: (editInputValue: string) => void;
}) {
  const [editInputValue, setEditInputValue] = useState<string>(lastValue);
  useEffect(() => {
    setEditInputValue(lastValue);
  }, [lastValue]);

  const isReady = editInputValue.length > 0 && editInputValue !== lastValue;

  const userNameInput = (
    <View className="flex flex-col justify-center items-center px-5 py-4">
      <View className="flex flex-col  px-[16px] bg-white rounded-2xl border-[2px] border-gray-300 w-full">
        <Text className="text-black font-pregular">username</Text>
        <BottomSheetTextInput
          className=" text-black font-plight text-[16px] p-1"
          value={editInputValue}
          onChangeText={setEditInputValue}
          placeholder={lastValue}
          placeholderTextColor="#666"
          selectionColor="#3478F6"
        />
      </View>
    </View>
  );
  return (
    <BottomSheetSame
      bottomSheetRef={bottomSheetRef}
      onSubmit={onSubmit ? () => onSubmit(editInputValue) : undefined}
      isReady={isReady}
      hasDone={true}
      componentView={userNameInput}
    />
  );
}

export { CustomBottomSheet };

function CustomBottomLogout({
  bottomSheetRef,
  logout,
  user,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  logout: () => Promise<void>;
  user: { email: string };
}) {
  const buttonsLogoutDelete = (
    <View className="flex flex-col justify-center items-center flex-1 px-5">
      <View className="flex flex-col px-[16px] bg-white rounded-2xl w-full py-2 gap-2">
        <LogOutButton logout={logout} />
        <DeleteAccountButton user={user} logout={logout} />
      </View>
    </View>
  );
  return (
    <BottomSheetSame
      bottomSheetRef={bottomSheetRef}
      hasDone={false}
      componentView={buttonsLogoutDelete}
      value={"Account Settings"}
    />
  );
}

export { CustomBottomLogout };

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
  useEffect(() => {
    setEditInputValue(lastValue);
  }, [lastValue]);

  const isReady =
    !setsEqual(editInputValue, lastValue) && editInputValue.length > 0;

  const carouselPreferences = (
    <View className="flex flex-col justify-center items-center">
      <View className="flex flex-col justify-center items-center  bg-white rounded-2xl w-full py-2">
        <CarouselWithFlatList
          data={totalItems}
          itemsSelected={editInputValue}
          setItemsSelected={setEditInputValue}
        />
      </View>
    </View>
  );
  return (
    <BottomSheetSame
      bottomSheetRef={bottomSheetRef}
      onSubmit={onSubmit ? () => onSubmit(editInputValue) : undefined}
      isReady={isReady}
      hasDone={true}
      componentView={carouselPreferences}
    />
  );
}

export { CustomBottomSheetPreferences };

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

  useEffect(() => {
    setEditInputValue(lastValue);
  }, [lastValue]);

  const isReady =
    editInputValue.getFullYear() !== lastValue.getFullYear() ||
    editInputValue.getMonth() !== lastValue.getMonth() ||
    editInputValue.getDate() !== lastValue.getDate();

  const datePicker = (
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
          theme="light"
        />
      </View>
    </View>
  );
  return (
    <BottomSheetSame
      bottomSheetRef={bottomSheetRef}
      onSubmit={onSubmit ? () => onSubmit(editInputValue) : undefined}
      isReady={isReady}
      hasDone={true}
      componentView={datePicker}
    />
  );
}

export { CustomBottomSheetDate };

function BottomSheetSame({
  bottomSheetRef,
  onSubmit,
  isReady,
  hasDone = true,
  componentView,
  value = "Edit Profile",
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSubmit?: () => void;
  isReady?: boolean;
  hasDone?: boolean;
  componentView: React.ReactNode;
  value?: string;
}) {
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={-1}
      enableDynamicSizing={true}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableOverDrag={false}
    >
      <BottomSheetView className="flex-1 bg-white w-full">
        <View className="flex flex-row justify-between items-center  relative py-3 border-b border-gray-300 px-6">
          {hasDone && (
            <TouchableOpacity
              className={`flex flex-row  mr-auto`}
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            >
              <Text
                className={`
                ${hasDone ? "text-xl  font-pmedium" : "text-xl  font-plight"}
              `}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}

          <Text
            className={`text-black font-pmedium text-xl ${
              hasDone ? "" : "absolute right-0 left-0 text-center"
            }`}
          >
            {value}
          </Text>

          {hasDone && (
            <TouchableOpacity
              className="flex flex-row ml-auto"
              onPress={() => {
                onSubmit?.();
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
          )}

          {!hasDone && (
            <TouchableOpacity
              className={`flex flex-row ${hasDone ? "mr-auto" : "ml-auto"}`}
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            >
              <Text
                className={`
                ${hasDone ? "text-xl  font-pmedium" : "text-xl  font-plight"}
              `}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {componentView}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default BottomSheetSame;

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
    <View className="flex flex-row py-5 border-b-[0.5px] border-b-gray-500 w-full ">
      <View className="flex w-5/12">
        <Text className="text-xl text-white font-pmedium">{label}</Text>
      </View>
      <View className="flex flex-row flex-1 justify-between">
        <Text className="text-xl text-white font-pregular mr-2">
          {value.length > 20 ? value.slice(0, 17) + "..." : value}
        </Text>
        {canEdit && (
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="pencil-outline" size={18} color="#9297a1" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export { RenderProfileItem };

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
    <View className="flex flex-col w-full flex-1">
      <View className="flex flex-row  py-5 items-center relative">
        <Text className="text-xl text-white absolute left-0 right-0 text-center font-pmedium">
          {label}
        </Text>
        <View className="flex flex-row ml-auto">
          <TouchableOpacity className="ml-4" onPress={onPress}>
            <Ionicons name="pencil-outline" size={18} color="#9297a1" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={value}
        renderItem={renderItem2}
        keyExtractor={item => item.title}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export { RenderProfileItemPreferences };

function setsEqual(a: string[], b: string[]): boolean {
  const sa = new Set(a),
    sb = new Set(b);
  if (sa.size !== sb.size) return false;
  for (const v of sa) if (!sb.has(v)) return false;
  return true;
}

const renderItem2 = ({ item }: { item: ItemData; index: number }) => {
  return (
    <View className="w-[49%] aspect-[0.85] pb-2 flex flex-col items-center">
      {item.image ? (
        <Image
          source={item.image}
          className={`
            w-full
            h-[80%]
            rounded-2xl
          `}
          resizeMode="cover"
        />
      ) : null}
      <Text className="mt-1 text-grey-lighter font-pregular">{item.title}</Text>
    </View>
  );
};
