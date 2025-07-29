import BottomSheet from "@gorhom/bottom-sheet";
import { useState } from "react";
import { View } from "react-native";
import BottomSheetSame from "./bottomSheets";
import InputBoxWithName from "./inputBox";

export default function EditBrandProfile({
  bottomSheetRef,
  lastValueLink,
  lastValueDescription,
  onSubmit,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  lastValueLink: string;
  lastValueDescription: string;
  onSubmit: (editLinkValue: string, editDescriptionValue: string) => void;
}) {
  const [editLinkValue, setEditLinkValue] = useState<string>(lastValueLink);
  const [editDescriptionValue, setEditDescriptionValue] =
    useState<string>(lastValueDescription);

  const isReady =
    (editLinkValue.length > 0 && editLinkValue !== lastValueLink) ||
    editDescriptionValue !== lastValueDescription;

  const userNameInput = (
    <View className="flex flex-col justify-center items-center px-5 py-4 gap-4">
      <InputBoxWithName
        name="página oficial url"
        value={editLinkValue}
        setValue={setEditLinkValue}
        lastValue={editLinkValue}
        isScrollable={false}
        placeholder="Escribe la url de la página oficial de la marca"
      />

      <InputBoxWithName
        name="descripción"
        value={editDescriptionValue}
        setValue={setEditDescriptionValue}
        lastValue={editDescriptionValue}
        isScrollable={true}
        length={200}
        placeholder="Escribe una descripción de tu marca"
        height={120}
      />
    </View>
  );
  return (
    <BottomSheetSame
      bottomSheetRef={bottomSheetRef}
      onSubmit={() => onSubmit(editLinkValue, editDescriptionValue)}
      isReady={isReady}
      hasDone={true}
      componentView={userNameInput}
    />
  );
}
