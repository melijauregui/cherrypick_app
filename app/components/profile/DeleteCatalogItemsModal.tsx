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
import { LOCAL_IP } from "@/config/api";
import safeFetch from "@/app/utils/safe-fetch";
import { AllBrandItemsSchemaRes } from "@/schemas/auth/brand-schema";
import { CatalogResponseSchemaDelete } from "@/schemas/catalog/catalog-schema";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { ButtonSubmit } from "./insertNewItems";

const screenHeight = Dimensions.get("window").height;

const DeleteCatalogItemsModal = ({
  bottomSheetRef,
  brandEmail,
  onDelete,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  brandEmail: string;
  onDelete: () => void;
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);
  const deleteMutation = useDelete(
    setSelected,
    onDelete,
    bottomSheetRef,
    brandEmail,
    setDeleting
  );

  const { data, fetchNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ["delete-catalog-items", brandEmail, search],
    queryFn: ({ pageParam }) => fetchItems(brandEmail, search, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const queryClient = useQueryClient();
  const resetInfiniteQueryPagination = () => {
    return queryClient.setQueryData(
      ["delete-catalog-items", brandEmail, search],
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

  const toggleSelect = (name: string) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(name)) newSet.delete(name);
      else newSet.add(name);
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
        loading={isLoading}
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
  filteredItems: { name: string }[];
  selected: Set<string>;
  toggleSelect: (name: string) => void;
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

const fetchItems = async (brandEmail: string, search: string, page: number) => {
  const limit = 20;
  const res = await safeFetch({
    url: `http://${LOCAL_IP}:3000/all-brand-items?brandEmail=${brandEmail}&filter=${search}&page=${page}&limit=${limit}`,
    schema: AllBrandItemsSchemaRes,
  });
  if (res.data.error) {
    throw new Error(res.data.details);
  } else {
    return res.data.data || [];
  }
};

function useDelete(
  setSelected: (selected: Set<string>) => void,
  onDelete: () => void,
  bottomSheetRef: React.RefObject<BottomSheet>,
  brandEmail: string,
  setDeleting: (deleting: boolean) => void
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (selected: Set<string>) => {
      setDeleting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      bottomSheetRef.current?.close();
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/delete-catalog-brand`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: Array.from(selected).map(name => ({ name })),
          brandEmail,
        }),
        schema: CatalogResponseSchemaDelete,
      });
      if (data.error) {
        throw new Error(data.details);
      }
      return data;
    },
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: ["delete-catalog-items", brandEmail],
      });

      Toast.show({
        type: "success",
        text1: `${data.numberDeleted} productos eliminados correctamente`,
      });
      setSelected(new Set());
      onDelete();
    },
    onError: error => {
      Toast.show({ type: "error", text1: error.message });
    },
    onSettled: () => {
      setDeleting(false);
      Keyboard.dismiss();
    },
  });

  return mutation;
}

const ItemStyle = ({
  item,
  toggleSelect,
  selected,
}: {
  item: { name: string };
  toggleSelect: (name: string) => void;
  selected: Set<string>;
}) => {
  return (
    <TouchableOpacity
      key={item.name}
      className="flex-row items-center py-2 gap-3"
      onPress={() => toggleSelect(item.name)}
    >
      <View
        className={`w-7 h-7 rounded border border-gray-400  ${selected.has(item.name) ? "bg-brown-light opacity-70" : "bg-white"}`}
      ></View>
      <Text className="text-lg text-black font-pregular">{item.name}</Text>
    </TouchableOpacity>
  );
};
