import { LOCAL_IP } from "@/config/api";
import { useRouter } from "expo-router";
import safeFetch from "@/app/utils/safe-fetch";
import { VerifyAccountDeletedSchema } from "@/schemas/auth/sign-up-schema";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity, Text } from "react-native";

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
      className="flex flex-row bg-white h-[50px] justify-center items-center rounded-full border-[1.15px] border-gray-400"
      onPress={handleLogout}
    >
      <Text className="text-black font-psemibold text-[15px]">Log Out</Text>
    </TouchableOpacity>
  );
};
export default LogOutButton;

const DeleteAccountButton: React.FC<{
  user: { email: string };
  logout: () => Promise<void>;
}> = ({ user, logout }) => {
  const router = useRouter();

  const handleDeleteAccount = async () => {
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
export { DeleteAccountButton };
