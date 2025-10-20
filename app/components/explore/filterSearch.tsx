import React, { useState } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";
import Toast from "react-native-toast-message";
import ListSearch from "@/app/components/modal/list-search";
import { ItemStylePhotoAndName, ModalStandar } from "../modal/ModalSearch";
import { getAllBrands } from "@/app/utils/fetch";
import { IdNameImageSchemaType } from "@/schemas/catalog/catalog-schema";

const FilterSearchBottomSheet = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  initialMinPrice,
  initialMaxPrice,
  initialBrandsSelected,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onSubmit: (
    minPrice: string | undefined,
    maxPrice: string | undefined,
    brandsSelected: Map<string, IdNameImageSchemaType>
  ) => void;

  initialMinPrice: string | undefined;
  initialMaxPrice: string | undefined;
  initialBrandsSelected: Map<string, IdNameImageSchemaType>;
}) => {
  const [minPrice, setMinPrice] = useState<string | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(initialMaxPrice);
  const [brandsSelected, setBrandsSelected] = useState<
    Map<string, IdNameImageSchemaType>
  >(new Map(initialBrandsSelected));
  const [forceKey, setForceKey] = useState(0);

  const onCancel = () => {
    Keyboard.dismiss();
    setForceKey(forceKey + 1);
    setBrandsSelected(initialBrandsSelected);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setIsModalOpen(false);
  };

  const onSave = async () => {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;

    if (min !== undefined && max !== undefined && min > max) {
      Toast.show({
        type: "error",
        text1: "El precio mínimo no puede ser mayor al máximo",
      });
      return;
    }
    if (max !== undefined && max === 0) {
      Toast.show({
        type: "error",
        text1: "El precio máximo debe ser mayor a 0",
      });
      return;
    }
    setIsModalOpen(false);
    Keyboard.dismiss();
    await onSubmit(minPrice, maxPrice, brandsSelected);
  };

  return (
    <ModalStandar
      isModalOpen={isModalOpen}
      onCancel={onCancel}
      onSave={onSave}
      onLoading={false}
      section="Filtros"
      description="Selecciona los filtros que deseas aplicar a tu búsqueda."
      maxHeight={680}
    >
      <View className="flex-1 px-1 gap-4">
        <View>
          <Text className="text-lg font-pmedium text-black mb-2">Precio</Text>
          <View className="flex-row items-center gap-2">
            <TextInput
              className="flex-1 border border-gray-300 rounded-3xl px-3 py-2 text-center text-lg font-pregular"
              placeholder="Mínimo"
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
              placeholderTextColor="grey"
            />
            <Text className="text-gray-500 text-lg">-</Text>
            <TextInput
              className="flex-1 border border-gray-300 rounded-3xl px-3 py-2 text-center text-lg font-pregular"
              placeholder="Máximo"
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
              placeholderTextColor="grey"
            />
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-pmedium text-black mb-2">Marcas</Text>
          <ListSearch
            placeholder={"marcas"}
            selected={brandsSelected}
            setSelected={setBrandsSelected}
            fetchFunction={fetchBrands}
            queryKey={["brands"]}
            maxAllowSelect={5}
            forceKey={forceKey?.toString()}
            renderItem={(item, index, isSelected, toggleSelect, disable) => (
              <ItemStylePhotoAndName
                item={{
                  id: item.id,
                  name: item.name,
                  image: item.image,
                }}
                toggleSelect={() => toggleSelect(item)}
                isSelected={isSelected}
                disable={disable}
                imageRounded
                size="small"
              />
            )}
          />
        </View>
      </View>
    </ModalStandar>
  );
};
export default FilterSearchBottomSheet;

async function fetchBrands(
  search: string,
  pageParam: number
): Promise<IdNameImageSchemaType[]> {
  const brands = await getAllBrands(search, pageParam);
  return brands.map(brand => ({
    id: brand.id,
    name: brand.name,
    image: {
      url: brand.image.url,
      updatedAt: brand.image.updatedAt,
    },
  }));
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
