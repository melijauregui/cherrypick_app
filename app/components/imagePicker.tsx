import * as ImagePicker from "expo-image-picker";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { TouchableOpacity } from "react-native";

export default function ImagePickerButton({
  setImage,
  children,
  disabled = false,
  onCancel,
}: {
  setImage: (image: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
  onCancel?: () => void;
}) {
  const [mediaLibraryPermission] = useMediaLibraryPermissions();

  if (!mediaLibraryPermission) {
    return null;
  }

  const pickImage = async () => {
    if (!mediaLibraryPermission?.granted) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    // Launch image picker with proper configuration for iOS
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: false,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
    });

    if (!result.canceled) {
      setImage(result.assets[0]?.uri ?? "");
    } else {
      onCancel?.();
    }
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={pickImage} className="">
      {children}
    </TouchableOpacity>
  );
}
