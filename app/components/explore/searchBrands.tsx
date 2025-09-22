import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBrands } from "@/app/utils/fetch";
import { UuidNameSchemaType } from "@/schemas/catalog/catalog-schema";
import ListSearch from "./listSearch";

const FilterSearchBottomSheet = ({
  bottomSheetRef,
  onDelete,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onDelete: () => void;
}) => {
  const [selected, setSelected] = useState<Map<string, string>>(new Map());
  const [search, setSearch] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const { data, fetchNextPage, isLoading, error, isPending, isRefetching } =
    useInfiniteQuery({
      queryKey: ["all-brands", search],
      queryFn: async ({ pageParam }) => {
        const res = await getAllBrands(search, pageParam);
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
    return queryClient.setQueryData(["all-brands", search], (oldData: any) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        pages: [],
        pageParams: [],
      };
    });
  };

  const handleCancel = () => {
    setSelected(new Map());
    setSearch("");
    setMinValue("");
    setMaxValue("");
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error al cargar marcas: " + error?.message,
      });
    }
  }, [error]);

  const toggleSelect = (item: UuidNameSchemaType) => {
    setSelected(prev => {
      const newMap = new Map(prev);
      if (newMap.has(item.uuid)) {
        newMap.delete(item.uuid);
      } else {
        newMap.set(item.uuid, item.name);
      }
      return newMap;
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={() => {}}
      index={-1}
      enableDynamicSizing={false}
      snapPoints={[450]}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableOverDrag={false}
    >
      <View className="flex flex-row justify-between items-center  relative py-3 border-b border-gray-300 px-6">
        <Text className="text-black font-pmedium text-xl absolute right-0 left-0 text-center">
          {"Filtrar búsqueda"}
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

      <View className="flex-1 px-6 py-4 gap-4">
        <View>
          <Text className="text-lg font-pmedium text-black mb-2">Precio</Text>
          <View className="flex-row items-center gap-2">
            <TextInput
              className="flex-1 border border-gray-300 rounded-3xl px-3 py-2 text-center text-lg font-pregular"
              placeholder="Mínimo"
              value={minValue}
              onChangeText={setMinValue}
              keyboardType="numeric"
            />
            <Text className="text-gray-500 text-lg">-</Text>
            <TextInput
              className="flex-1 border border-gray-300 rounded-3xl px-3 py-2 text-center text-lg font-pregular"
              placeholder="Máximo"
              value={maxValue}
              onChangeText={setMaxValue}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-pmedium text-black mb-2">Marcas</Text>
          <ListSearch
            placeholder="marcas"
            search={search}
            setSearch={setSearch}
            resetInfiniteQueryPagination={resetInfiniteQueryPagination}
            loading={isStillLoading}
            filteredItems={data?.pages.flat() || []}
            selected={selected}
            toggleSelect={toggleSelect}
            fetchNextPage={fetchNextPage}
          />
        </View>
      </View>
    </BottomSheet>
  );
};
export default FilterSearchBottomSheet;
