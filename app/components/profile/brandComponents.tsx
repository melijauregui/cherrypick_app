import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons/";

// Lógica para cortar la descripción respetando los saltos de línea originales,
// pero si ninguna línea cabe, corta por palabras hasta 80 caracteres
export default function splitDescriptionByLinesOrWords(
  text: string,
  maxTotalLength: number
) {
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

export const AddAndDeleteItems = ({
  openUsernameSheetAddItem,
  openUsernameSheetDeleteItem,
  openUsernameSheetEdit,
}: {
  openUsernameSheetAddItem: () => void;
  openUsernameSheetDeleteItem: () => void;
  openUsernameSheetEdit: () => void;
}) => {
  return (
    <View className="flex flex-row w-full gap-3 py-4">
      <ButtonLarge onPress={openUsernameSheetAddItem} text="Agregar Item" />
      <ButtonLarge onPress={openUsernameSheetDeleteItem} text="Eliminar Item" />
      <ButtonEdit onPress={openUsernameSheetEdit} />
    </View>
  );
};

export const ButtonLarge = ({
  onPress,
  text,
}: {
  onPress: () => void;
  text: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "rgba(107, 114, 128, 0.5)",
      }}
      className="flex-1 px-0 py-2 rounded-xl items-center"
    >
      <Text className="text-white text-base font-semibold">{text}</Text>
    </TouchableOpacity>
  );
};

export const ButtonSmall = ({
  onPress,
  text,
}: {
  onPress: () => void;
  text: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "rgba(107, 114, 128, 0.5)",
      }}
      className="px-4 py-2 rounded-xl items-center justify-center"
    >
      <Text className="text-white text-sm font-semibold">{text}</Text>
    </TouchableOpacity>
  );
};

export const ButtonEdit = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "rgba(107, 114, 128, 0.5)",
      }}
      className="w-10 h-10 rounded-xl items-center justify-center"
    >
      <Ionicons name="pencil-outline" size={20} color="white" />
    </TouchableOpacity>
  );
};
