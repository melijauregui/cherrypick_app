import BottomSheet from "@gorhom/bottom-sheet";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { z } from "zod";
import BottomSheetSame from "./bottomSheets";
import InputBoxWithName from "./inputBox";

// URL validation schema with Zod
const urlSchema = z.string().url("Por favor ingresa una URL válida");

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
  const [urlError, setUrlError] = useState<string | null>(null);
  const [lastSubmittedLink, setLastSubmittedLink] =
    useState<string>(lastValueLink);

  const isReady =
    (editLinkValue !== lastValueLink ||
      editDescriptionValue !== lastValueDescription) &&
    (urlError === null || editLinkValue !== lastSubmittedLink);

  const handleSubmit = (): boolean => {
    const urlValidation = urlSchema.safeParse(editLinkValue);
    const isUrlValid = urlValidation.success;
    if (!isUrlValid) {
      setUrlError(urlValidation.error.errors[0]?.message ?? null);
      setLastSubmittedLink(editLinkValue);
      bottomSheetRef.current?.snapToPosition(375);
      return false;
    }
    setUrlError(null);
    setLastSubmittedLink(editLinkValue);
    onSubmit(editLinkValue, editDescriptionValue);
    return true;
  };

  const userNameInput = (
    <ScrollView>
      <View className="flex flex-col justify-center items-center px-5 py-6 gap-5">
        <View className="w-full">
          <InputBoxWithName
            name="página oficial url"
            value={editLinkValue}
            setValue={text => {
              setEditLinkValue(text);
              setUrlError(null);
            }}
            lastValue={editLinkValue}
            isScrollable={false}
            placeholder="Escribe la url de la página oficial de la marca"
          />
          {urlError && (
            <Text className="text-red-500 text-sm mt-1 px-4">{urlError}</Text>
          )}
        </View>

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
    </ScrollView>
  );
  return (
    <BottomSheetSame
      bottomSheetRef={bottomSheetRef}
      onSubmit2={handleSubmit}
      onCancel={() => {
        setEditLinkValue(lastValueLink);
        setEditDescriptionValue(lastValueDescription);
        setUrlError(null);
        setLastSubmittedLink(lastValueLink);
      }}
      isReady={isReady}
      hasDone={true}
      componentView={userNameInput}
    />
  );
}
