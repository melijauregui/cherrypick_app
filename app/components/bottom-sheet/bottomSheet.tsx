import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableOpacity, View, Text } from "react-native";
import LoadingDots from "@/app/components/standar-page/animated";

export default function BottomSheetStandar({
  bottomSheetRef,
  onSave,
  onCancel,
  onLoading,
  children,
  section,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSave: () => void;
  onCancel: () => void;
  onLoading: boolean;
  children: React.ReactNode;
  section: string;
}) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableDynamicSizing={false}
      snapPoints={["93%"]}
      enableOverDrag={false}
      backgroundStyle={{ backgroundColor: "white" }}
      enablePanDownToClose={true}
      style={{ zIndex: 1000 }}
      onClose={() => {
        onCancel();
      }}
    >
      <View className="flex flex-col flex-1 pb-8">
        <View
          className="absolute top-0 left-0 right-0 px-5 pb-2 bg-white"
          style={{ zIndex: 100 }}
        >
          <StandardBar
            onSave={onSave}
            onCancel={onCancel}
            onLoading={onLoading}
            section={section}
          />
        </View>
        <View className="flex-1 pt-10">{children}</View>
      </View>
    </BottomSheet>
  );
}

export function StandardBar({
  onCancel,
  onSave,
  onLoading = false,
  section,
}: {
  onSave: () => void;
  onCancel: () => void;
  section: string;
  onLoading?: boolean;
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
        <TouchableOpacity onPress={onSave}>
          <Text className="text-xl text-black font-plight">Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
