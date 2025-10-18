import { View } from "react-native";
import { useState } from "react";
import ListSearch from "@/app/components/modal/list-search";
import { getSelfBrandItems } from "@/app/utils/fetch";
import {
  StandardDescription,
  StandardPageBottomSheet,
} from "@/app/components/standar-page/standarPage";
import {
  ItemStylePhotoAndName,
  ModalSearchSchemaType,
} from "@/app/components/modal/ModalSearch";
import { router } from "expo-router";
import { useDelete } from "../utils/update";

export default function DeleteItemsPage() {
  const [itemsSelected, setItemsSelected] = useState<
    Map<string, ModalSearchSchemaType>
  >(new Map());
  const [forceKey, setForceKey] = useState(0);
  const onCancel = () => {
    setForceKey(forceKey + 1);
    router.back();
  };
  const [deleting, setDeleting] = useState(false);
  const deleteMutation = useDelete();

  return (
    <StandardPageBottomSheet
      onSave={async () => {
        try {
          setDeleting(true);
          await deleteMutation.mutateAsync(new Set(itemsSelected.keys()));
        } finally {
          setDeleting(false);
          router.back();
        }
      }}
      onCancel={onCancel}
      onLoading={deleting}
      section="Eliminar items"
      disableSave={itemsSelected.size === 0}
    >
      <StandardDescription
        description="Selecciona los items que deseas eliminar de tu catálogo."
        descriptionRed="Estos items serán eliminados permanentemente y no se podrán recuperar."
      />
      <View className="flex-1 px-4 pt-4">
        <ListSearch
          placeholder={"items"}
          selected={itemsSelected}
          setSelected={setItemsSelected}
          fetchFunction={fetchItems}
          queryKey={["items"]}
          forceKey={forceKey?.toString()}
          renderItem={(item, index, isSelected, toggleSelect, disable) => (
            <ItemStylePhotoAndName
              item={item}
              toggleSelect={toggleSelect}
              isSelected={isSelected}
              disable={disable}
            />
          )}
        />
      </View>
    </StandardPageBottomSheet>
  );
}

async function fetchItems(
  search: string,
  pageParam: number
): Promise<ModalSearchSchemaType[]> {
  const items = await getSelfBrandItems(pageParam, 20, search);
  return items.map(item => ({
    id: item.uuid,
    name: item.name,
    imageUrl: {
      url: item.image.url,
      updatedAt: item.image.updatedAt,
    },
  }));
}
