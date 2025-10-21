import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useDelete } from "@/utils/update";
import { IdNameImageSchemaType } from "@/schemas/catalog/catalog-schema";
import ListSearch from "../explore/listSearch";
import { getSelfBrandItems } from "@/utils/fetch";

const DeleteCatalogItemsModal = ({
  bottomSheetRef,
  brandId,
  onDelete,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  brandId: string;
  onDelete: () => void;
}) => {
  const [selected, setSelected] = useState<Map<string, string>>(new Map());
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);
  const deleteMutation = useDelete(
    setSelected,
    onDelete,
    bottomSheetRef,
    brandId,
    setDeleting
  );

  const { data, fetchNextPage, isLoading, error, isPending, isRefetching } =
    useInfiniteQuery({
      queryKey: ["delete-catalog-items", brandId, search],
      queryFn: async ({ pageParam }) => {
        const res = await getSelfBrandItems(pageParam, 20, search);
        return res;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  const isStillLoading = isLoading || isPending || isRefetching;

  const queryClient = useQueryClient();
  const resetInfiniteQueryPagination = () => {
    return queryClient.setQueryData(
      ["delete-catalog-items", brandId, search],
      (oldData: any) => {
        if (!oldData) return undefined;

        return {
          ...oldData,
          pages: [],
          pageParams: [],
        };
      }
    );
  };

  const handleCancel = () => {
    setSelected(new Map());
    setSearch("");
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error al cargar productos: " + error?.message,
      });
    }
  }, [error]);

  const toggleSelect = (item: IdNameImageSchemaType) => {
    setSelected(prev => {
      const newMap = new Map(prev);
      if (newMap.has(item.id)) {
        newMap.delete(item.id);
      } else {
        newMap.set(item.id, item.name);
      }
      return newMap;
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={() => { }}
      index={-1}
      enableDynamicSizing={false}
      snapPoints={[520]}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableOverDrag={false}
    >
      <View className="flex flex-row justify-between items-center  relative py-3 border-b border-gray-300 px-6">
        <Text className="text-black font-pmedium text-xl absolute right-0 left-0 text-center">
          {"Eliminar Items"}
        </Text>

        <TouchableOpacity
          className="flex flex-row ml-auto"
          onPress={() => {
            bottomSheetRef.current?.close();
            handleCancel();
            Keyboard.dismiss();
          }}
        >
          <Text className="text-xl  font-plight">Cancel</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-6 pt-4 justify-between ">
        <ListSearch
          placeholder="items"
          search={search}
          setSearch={setSearch}
          resetInfiniteQueryPagination={resetInfiniteQueryPagination}
          loading={isStillLoading}
          filteredItems={data?.pages.flat() || []}
          selected={selected}
          toggleSelect={toggleSelect}
          fetchNextPage={fetchNextPage}
        />
        {/* <ButtonSubmit
          isSubmitting={deleting}
          isFormValid={selected.size > 0}
          handleSubmit={() => {
            deleteMutation.mutate(new Set(selected.keys()));
          }}
          text="Eliminar Items"
          loadingText="Eliminando..."
        /> */}
      </View>
    </BottomSheet>
  );
};

export default DeleteCatalogItemsModal;
