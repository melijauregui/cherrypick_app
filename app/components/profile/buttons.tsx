import { LOCAL_IP } from "@/config/api";
import safeFetch from "@/app/utils/safe-fetch";
import { VerifyAccountDeletedSchema } from "@/schemas/auth/sign-up-schema";
import { TouchableOpacity, Text } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import CustomModal from "../Modal";
import BottomSheet from "@gorhom/bottom-sheet";

const LogOutButton: React.FC<{ logout: () => Promise<void> }> = ({
  logout,
}) => {
  const handleLogout = async () => {
    await logout();
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
  setVisibleModal: (visible: boolean) => void;
  visibleModal: boolean;
  bottomSheetRefLogout: React.RefObject<BottomSheet>;
}> = ({
  user,
  logout,
  setVisibleModal,
  bottomSheetRefLogout,
  visibleModal,
}) => {
  const mutateDeleteAccount = useDeleteAccount(logout);
  return (
    <>
      <TouchableOpacity
        className="flex flex-row bg-brown-light h-[50px] justify-center items-center rounded-full"
        onPress={() => setVisibleModal(true)}
      >
        <Text className="text-white font-psemibold text-[15px]">
          Delete Account
        </Text>
      </TouchableOpacity>
      <CustomModal
        title="Eliminar cuenta"
        text={`¿Estás seguro de querer eliminar tu cuenta? Este proceso es irreversible.`}
        onSubmit={() => {
          mutateDeleteAccount.mutate();
          bottomSheetRefLogout.current?.close();
          logout();
          setVisibleModal(false);
        }}
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />
    </>
  );
};
export { DeleteAccountButton };

function useDeleteAccount(logout: () => Promise<void>) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/delete-account`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        schema: VerifyAccountDeletedSchema,
      });
      if (data.error) {
        throw new Error(data.details);
      }
    },
    onSuccess: async () => {
      await authClient.deleteUser();
      console.log("Account deleted successfully");
      await logout();
    },
    onError: error => {
      // TODO PUSH TOAST
      console.log(`could not update user:`, error);
    },
  });

  return mutation;
}
