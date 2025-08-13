import { Modal, View, Text, TouchableOpacity } from "react-native";

const CustomModal = ({
  title,
  text,
  onSubmit,
  onCancel,
  visible,
}: {
  title: string;
  text: string;
  onSubmit: () => void;
  onCancel: () => void;
  visible: boolean;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-[#282828] rounded-2xl mx-6 p-6 w-full max-w-sm">
          <ConfirmationContent
            title={title}
            text={text}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const ConfirmationContent = ({
  title,
  text,
  onCancel,
  onSubmit,
}: {
  title: string;
  text: string;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <View className="flex flex-col items-center w-full">
      <Text className="text-white text-2xl font-bold mb-3 text-center">
        {title}
      </Text>
      <Text className="text-gray-300 text-xl text-center mb-6 px-4">
        {text}
      </Text>

      <View className="flex flex-row w-full gap-3">
        <TouchableOpacity
          className="flex-1 bg-neutral-500 rounded-3xl py-4 px-6"
          onPress={onCancel}
        >
          <Text className="text-white text-center font-medium text-base">
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-brown-light rounded-3xl py-4 px-6"
          onPress={onSubmit}
        >
          <Text className="text-white text-center font-medium text-base">
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
