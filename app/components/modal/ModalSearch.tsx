import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { Octicons } from "@expo/vector-icons";
import z from "zod";
import { imageDefault } from "@/lib/constants";
import { StandardBar } from "../standar-page/standarPage";

export const ModalSearchSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  imageUrl: z
    .object({
      url: z.string().url(),
      updatedAt: z.string(),
    })
    .nullable(),
});

export type ModalSearchSchemaType = z.infer<typeof ModalSearchSchema>;

export function ModalStandar({
  isModalOpen,
  section,
  description,
  children,
  onCancel,
  onSave,
  onLoading,
  maxHeight = 460,
  disableSave = false,
}: {
  isModalOpen: boolean;
  section: string;
  description?: string;
  onCancel: () => void;
  onSave: () => void;
  onLoading: boolean;
  children?: React.ReactNode;
  maxHeight?: number;
  disableSave?: boolean;
}) {
  return (
    <Modal
      visible={isModalOpen}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center">
        <View
          className="w-11/12 h-full bg-white rounded-2xl p-5 gap-4"
          style={{ maxHeight: maxHeight }}
        >
          <StandardBar
            onSave={onSave}
            onCancel={onCancel}
            onLoading={onLoading}
            section={section}
            disableSave={disableSave}
          />
          <View className="flex flex-col justify-center">
            <Text className="text-neutral-600 text-base font-plight text-center  px-3">
              {description}
            </Text>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

export function ItemStylePhotoAndName({
  item,
  toggleSelect,
  isSelected,
  disable,
  imageRounded = false,
  textDisabled,
}: {
  item: ModalSearchSchemaType;
  toggleSelect: (item: ModalSearchSchemaType) => void;
  isSelected: boolean;
  disable?: boolean;
  imageRounded?: boolean;
  textDisabled?: string;
}) {
  const shouldDim = disable && !isSelected;
  return (
    <TouchableOpacity
      key={item.id}
      className={`flex-row items-center py-3 px-2 gap-2 ${shouldDim ? "opacity-40" : "opacity-100"}`}
      disabled={shouldDim}
      onPress={() => toggleSelect(item)}
    >
      <View
        className={`w-20 h-20 ${imageRounded ? "rounded-full" : "rounded-lg"} overflow-hidden mr-3`}
      >
        <Image
          source={{
            uri: item.imageUrl?.url ?? imageDefault,
            cache: "force-cache",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-1">
          {/* Title and details */}
          <Text
            className="text-black text-lg font-pmedium mb-1"
            numberOfLines={1}
          >
            {item.name}
          </Text>

          {/* Show message if item is in inspo */}
          {textDisabled && (
            <Text
              className="text-red-500 text-sm font-plight"
              numberOfLines={1}
            >
              {textDisabled}
            </Text>
          )}
        </View>

        <View className="w-8 h-8 items-center justify-center">
          {isSelected ? (
            <Octicons name="check-circle-fill" size={16} color="#22c55e" />
          ) : (
            <Octicons name="circle" size={16} color="#242424" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// export function ColabsModal({
//   isColabsModalOpen,
//   setIsColabsModalOpen,
//   colabsSelected,
//   setColabsSelected,
// }: {
//   isColabsModalOpen: boolean;
//   setIsColabsModalOpen: (isColabsModalOpen: boolean) => void;
//   colabsSelected: Map<string, ModalSearchSchemaType>;
//   setColabsSelected: React.Dispatch<
//     React.SetStateAction<Map<string, ModalSearchSchemaType>>
//   >;
// }) {
//   const [forceKey, setForceKey] = useState(0);
//   const onClose = () => {
//     setForceKey(forceKey + 1);
//     setIsColabsModalOpen(false);
//   };
//   return (
//     <ModalStandar
//       isModalOpen={isColabsModalOpen}
//       onClose={onClose}
//       type="colabs"
//       description="Select the artists who collaborated on this song. Collaborators will be credited on the track. Search by artist name and select up to 5 collaborators."
//     >
//       <View style={{ flex: 1 }}>
//         <ListSearch
//           placeholder={"colabs"}
//           selected={colabsSelected}
//           setSelected={setColabsSelected}
//           fetchFunction={fetchColabs}
//           queryKey={["colabs"]}
//           maxAllowSelect={5}
//           forceKey={forceKey?.toString()}
//           renderItem={(item, index, isSelected, toggleSelect, disable) => (
//             <ItemStylePhotoAndName
//               item={{
//                 id: item.id,
//                 name: item.name,
//                 urlImage: item.imageProfileUrl?.url || imageProfileDefault,
//               }}
//               toggleSelect={() => toggleSelect(item)}
//               isSelected={isSelected}
//               disable={disable}
//               imageRounded
//             />
//           )}
//         />
//       </View>
//     </ModalStandar>
//   );
// }
