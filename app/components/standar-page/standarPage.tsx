import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableOpacity, View, Text } from "react-native";
import LoadingDots from "./animated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function StandardPageBottomSheet({
  onSave,
  onCancel,
  onLoading,
  children,
  section,
  disableSave = false,
}: {
  onSave: () => void;
  onCancel: () => void;
  onLoading: boolean;
  children: React.ReactNode;
  section: string;
  disableSave?: boolean;
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-col flex-1 bg-white">
        <View className="flex flex-col flex-1 ">
          <View
            className="absolute top-0 left-0 right-0 px-5  "
            style={{ zIndex: 100 }}
          >
            <StandardBar
              onSave={onSave}
              onCancel={onCancel}
              onLoading={onLoading}
              section={section}
              disableSave={disableSave}
            />
          </View>
          <View className="flex-1 pt-10 pb-4">{children}</View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export function StandardBar({
  onCancel,
  onSave,
  onLoading = false,
  section,
  disableSave = false,
}: {
  onSave: () => void;
  onCancel: () => void;
  section: string;
  onLoading?: boolean;
  disableSave?: boolean;
}) {
  return (
    <View className="flex flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          onCancel();
        }}
      >
        <Text className="text-xl text-black font-plight">Cancel</Text>
      </TouchableOpacity>
      <Text className=" text-black text-lg font-pmedium">{section}</Text>
      {onLoading && <LoadingDots color="#9297a1" size="medium" />}
      {!onLoading && (
        <TouchableOpacity onPress={onSave} disabled={disableSave}>
          <Text
            className={`text-xl  font-plight ${disableSave ? "text-neutral-400" : "text-black"}`}
          >
            Save
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
