import { TouchableOpacity, Text } from "react-native";
import CustomModal from "../Modal";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDeleteAccount } from "@/utils/update";

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
      <Text className="text-black font-psemibold text-[15px]">
        Cerrar sesión
      </Text>
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
          className="flex flex-row bg-beige h-[50px] justify-center items-center rounded-full"
          onPress={() => setVisibleModal(true)}
        >
          <Text className="text-black font-psemibold text-[15px]">
            Eliminar cuenta
          </Text>
        </TouchableOpacity>
        <CustomModal
          title="Eliminar cuenta"
          text={`¿Estás seguro de querer eliminar tu cuenta? Este proceso es irreversible.`}
          onSubmit={() => {
            mutateDeleteAccount.mutate();
            bottomSheetRefLogout.current?.close();
            setVisibleModal(false);
          }}
          onCancel={() => setVisibleModal(false)}
          visible={visibleModal}
        />
      </>
    );
  };
export { DeleteAccountButton };
