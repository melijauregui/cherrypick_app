import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import BottomSheetSame from "./bottomSheets";

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

const InputBox = ({
  value,
  setValue,
  placeholder,
  length,
  height,
}: {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  length?: number;
  height?: number;
}) => {
  return (
    <BottomSheetTextInput
      className={`text-black font-plight text-[16px]`}
      style={{ height: height ? height : undefined }}
      value={value}
      onChangeText={text => {
        if (length) {
          if (text.length <= length) {
            setValue(text);
          }
        } else {
          setValue(text);
        }
      }}
      placeholder={placeholder}
      placeholderTextColor="#666"
      selectionColor="#3478F6"
      multiline={true}
      textAlignVertical="top"
    />
  );
};

const InputBoxWithName = ({
  name,
  value,
  setValue,
  lastValue,
  isScrollable,
  length,
  placeholder,
  height,
}: {
  name: string;
  value: string;
  setValue: (text: string) => void;
  lastValue: string;
  isScrollable: boolean;
  length?: number;
  placeholder: string;
  height?: number;
}) => {
  return (
    <View className="flex flex-col px-[16px] bg-white rounded-2xl border-[2px] border-gray-300 w-full py-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-black font-pmedium">{name}</Text>
        {length && (
          <Text className="text-gray-500 font-plight text-sm">
            {value.length}/{length}
          </Text>
        )}
      </View>
      {isScrollable ? (
        <ScrollView>
          <InputBox
            value={value}
            setValue={setValue}
            placeholder={placeholder}
            length={length}
            height={height}
          />
        </ScrollView>
      ) : (
        <InputBox
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          length={length}
          height={height}
        />
      )}
    </View>
  );
};
export { InputBoxWithName };
