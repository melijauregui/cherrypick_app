import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function SearchGuidelinesModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View
          className="bg-white rounded-2xl mx-6 w-full max-w-md"
          style={{ maxHeight: SCREEN_HEIGHT * 0.8 }}
        >
          {/* Header con título y botón de cierre */}
          <View className="flex flex-row justify-between items-center px-6 pt-6 pb-4 border-b border-neutral-200">
            <Text className="text-black text-xl font-pmedium">
              Mejorar búsqueda
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={true}
            style={{ flexShrink: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingVertical: 20,
            }}
          >
            <View className="flex flex-col gap-6">
              {/* Sección principal */}
              <View className="flex flex-col gap-3">
                <Text className="text-black text-lg font-pmedium">
                  Para mejorar la búsqueda
                </Text>
                <View className="flex flex-col gap-2.5 pl-3">
                  <Text className="text-neutral-600 text-base font-plight leading-5">
                    • Describe el item de manera precisa y específica
                  </Text>
                  <Text className="text-neutral-600 text-base font-plight leading-5">
                    • Incluye el color del producto
                  </Text>
                  <Text className="text-neutral-600 text-base font-plight leading-5">
                    • Menciona el material o tela
                  </Text>
                  <Text className="text-neutral-600 text-base font-plight leading-5">
                    • Especifica el estilo o tipo de prenda
                  </Text>
                  <Text className="text-neutral-600 text-base font-plight leading-5">
                    • Agrega detalles distintivos (manga, largo, estampado)
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
