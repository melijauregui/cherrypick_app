import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileAndLogOut: React.FC<{
  openUsernameSheetLogout: () => void;
}> = ({ openUsernameSheetLogout }) => {
  return (
    <View className="flex flex-row w-full items-center relative py-6">
      <Text className="text-white text-[27px] font-pregular  absolute left-0 right-0 text-center">
        Profile
      </Text>
      <View className="flex flex-row mr-auto">
        <TouchableOpacity onPress={openUsernameSheetLogout}>
          <Ionicons name="settings-outline" size={25} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileAndLogOut;
