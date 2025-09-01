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
import { FlashList } from "@shopify/flash-list";
import { ButtonSubmit } from "./insertNewItems";
import { useDelete } from "@/app/utils/update";
import { getItemsUuidNames } from "@/app/utils/fetch";
import { ItemUuidNameSchemaType } from "@/schemas/catalog/catalog-schema";

const DeleteCatalogItemsModal = ({
  bottomSheetRef,
  brandId,
  onDelete,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  brandId: string;
  onDelete: () => void;
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
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
        const res = await getItemsUuidNames(search, pageParam);
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
    setSelected(new Set());
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

  const toggleSelect = (item: ItemUuidNameSchemaType) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.uuid)) newSet.delete(item.uuid);
      else newSet.add(item.uuid);
      return newSet;
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={() => {}}
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
          {"Delete Items"}
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
      <FormContent
        search={search}
        setSearch={setSearch}
        resetInfiniteQueryPagination={resetInfiniteQueryPagination}
        loading={isStillLoading}
        filteredItems={data?.pages.flat() || []}
        selected={selected}
        toggleSelect={toggleSelect}
        handleDelete={() => {
          deleteMutation.mutate(selected);
        }}
        deleting={deleting}
        fetchNextPage={fetchNextPage}
      />
    </BottomSheet>
  );
};

const FormContent = ({
  search,
  setSearch,
  loading,
  filteredItems,
  selected,
  toggleSelect,
  handleDelete,
  deleting,
  fetchNextPage,
  resetInfiniteQueryPagination,
}: {
  search: string;
  setSearch: (text: string) => void;
  loading: boolean;
  filteredItems: ItemUuidNameSchemaType[];
  selected: Set<string>;
  toggleSelect: (item: ItemUuidNameSchemaType) => void;
  handleDelete: () => void;
  deleting: boolean;
  fetchNextPage: () => void;
  resetInfiniteQueryPagination: () => void;
}) => {
  return (
    <View className="bg-white px-6 pt-4 flex flex-col justify-between flex-1">
      <View className="flex-1">
        <TextInput
          className="border border-gray-300 rounded-3xl px-3 py-3 mb-3 text-lg font-pregular"
          placeholder="Buscar producto..."
          value={search}
          onChangeText={text => {
            setSearch(text);
            resetInfiniteQueryPagination();
          }}
        />
        {loading ? (
          <View className="justify-center items-center flex-1">
            <Text className="text-lg text-black font-pregular opacity-50">
              Cargando productos...
            </Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View className="justify-center items-center flex-1">
            <Text className="text-lg text-black font-pregular opacity-50">
              No hay productos
            </Text>
          </View>
        ) : (
          <FlashList
            data={filteredItems}
            renderItem={({ item }) => (
              <ItemStyle
                key={item.name}
                item={item}
                toggleSelect={toggleSelect}
                selected={selected}
              />
            )}
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.1}
            estimatedItemSize={30}
          />
        )}
      </View>
      <ButtonSubmit
        isSubmitting={deleting}
        isFormValid={selected.size > 0}
        handleSubmit={handleDelete}
        text="Eliminar Items"
        loadingText="Eliminando..."
      />
    </View>
  );
};

export default DeleteCatalogItemsModal;

const ItemStyle = ({
  item,
  toggleSelect,
  selected,
}: {
  item: ItemUuidNameSchemaType;
  toggleSelect: (item: ItemUuidNameSchemaType) => void;
  selected: Set<string>;
}) => {
  return (
    <TouchableOpacity
      key={item.uuid}
      className="flex-row items-center py-2 gap-3"
      onPress={() => toggleSelect(item)}
    >
      <View
        className={`w-7 h-7 rounded border border-gray-400  ${selected.has(item.uuid) ? "bg-brown-light opacity-70" : "bg-white"}`}
      ></View>
      <Text className="text-lg text-black font-pregular">{item.name}</Text>
    </TouchableOpacity>
  );
};
