import { Keyboard, View } from "react-native";
import { useState } from "react";
import ListSearch from "@/app/components/modal/list-search";
import { getSelfBrandItems, getSelfBrandInspoItems } from "@/utils/fetch";
import StandardPageBottomSheet, {
  StandardDescription,
} from "@/app/components/standar-page/standarPage";
import { ItemStylePhotoAndName } from "@/app/components/modal/ModalSearch";
import { router } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import safeFetch from "../../utils/safe-fetch";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BASE_URL } from "@/config/api";
import { IdNameImageSchemaType } from "@/schemas/catalog/catalog-schema";
import CustomModal from "@/app/components/Modal";

export default function DeleteItemsPage() {
  const [itemsSelected, setItemsSelected] = useState<
    Map<string, IdNameImageSchemaType>
  >(new Map());
  const [forceKey, setForceKey] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const onCancel = () => {
    setForceKey(forceKey + 1);
    router.back();
  };
  const [deleting, setDeleting] = useState(false);
  const deleteMutation = useDelete();

  // Query para obtener los items de inspo semanal
  const { data: inspoItems = [] } = useQuery({
    queryKey: ["self-inspo-items"],
    queryFn: getSelfBrandInspoItems,
  });

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deleteMutation.mutateAsync(new Set(itemsSelected.keys()));
    } finally {
      setDeleting(false);
      setVisibleModal(false);
      router.back();
    }
  };

  return (
    <StandardPageBottomSheet
      onSave={() => setVisibleModal(true)}
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
          renderItem={(item, index, isSelected, toggleSelect, disable) => {
            const isInInspo = inspoItems.some(
              inspoItem => inspoItem.id === item.id
            );
            return (
              <ItemStylePhotoAndName
                item={item}
                toggleSelect={toggleSelect}
                isSelected={isSelected}
                disable={disable || isInInspo}
                textDisabled={
                  isInInspo
                    ? "Este item se encuentra en Inspo Semanal"
                    : undefined
                }
              />
            );
          }}
        />
      </View>
      <CustomModal
        title="Eliminar productos"
        text={`¿Estás seguro de querer eliminar ${itemsSelected.size} ${itemsSelected.size === 1 ? "producto" : "productos"
          }? Este proceso es irreversible.`}
        onSubmit={handleDeleteConfirm}
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />
    </StandardPageBottomSheet>

  );
}

async function fetchItems(
  search: string,
  pageParam: number
): Promise<IdNameImageSchemaType[]> {
  const items = await getSelfBrandItems(pageParam, 20, search);
  return items.map(item => ({
    id: item.uuid,
    name: item.name,
    image: {
      url: item.image.url,
      updatedAt: item.image.updatedAt,
    },
  }));
}

function useDelete() {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const mutation = useMutation({
    mutationFn: async (selected: Set<string>) => {
      const { data } = await safeFetch({
        url: `${BASE_URL}/brand/delete-items`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: Array.from(selected).map(uuid => ({ id: uuid })),
        }),
      });
      if (data.error) {
        throw new Error(data.details + "\n" + data.info);
      }
      return data;
    },
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: ["delete-catalog-items", user?.email],
      });

      Toast.show({
        type: "success",
        text1: `${data.numberDeleted} ${data.numberDeleted === 1 ? "producto" : "productos"
          } eliminados correctamente`,
      });
    },
    onError: error => {
      console.log("error", error.message);
      Toast.show({ type: "error", text1: error.message });
    },
    onSettled: () => {
      Keyboard.dismiss();
    },
  });

  return mutation;
}
