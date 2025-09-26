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
import { HeaderDoneAndCancel } from "../profile/bottomSheets";

const FilterSearchBottomSheet = ({
  bottomSheetRef,
  onSubmit,
  initialMinPrice,
  initialMaxPrice,
  initialBrandsSelected,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onSubmit: (
    minPrice: string | undefined,
    maxPrice: string | undefined,
    brandsSelected: Map<string, string>
  ) => void;

  initialMinPrice: string | undefined;
  initialMaxPrice: string | undefined;
  initialBrandsSelected: Map<string, string>;
}) => {
  const [search, setSearch] = useState("");

  const [minPrice, setMinPrice] = useState<string | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(initialMaxPrice);
  const [brandsSelected, setBrandsSelected] = useState<Map<string, string>>(
    () => new Map(initialBrandsSelected)
  );

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
    Keyboard.dismiss();
    setBrandsSelected(initialBrandsSelected);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    bottomSheetRef.current?.close();
  };

  const handleSubmit = () => {
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
    bottomSheetRef.current?.close();
    Keyboard.dismiss();
    onSubmit(minPrice, maxPrice, brandsSelected);
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
    setBrandsSelected(prev => {
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
      onChange={() => { }}
      index={-1}
      enableDynamicSizing={false}
      snapPoints={[450]}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableOverDrag={false}
    >
      <HeaderDoneAndCancel
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        isEnabledDone
      />

      <View className="flex-1 px-6 py-4 gap-4">
        <View>
          <Text className="text-lg font-pmedium text-black mb-2">Precio</Text>
          <View className="flex-row items-center gap-2">
            <TextInput
              className="flex-1 border border-gray-300 rounded-3xl px-3 py-2 text-center text-lg font-pregular"
              placeholder="Mínimo"
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
            />
            <Text className="text-gray-500 text-lg">-</Text>
            <TextInput
              className="flex-1 border border-gray-300 rounded-3xl px-3 py-2 text-center text-lg font-pregular"
              placeholder="Máximo"
              value={maxPrice}
              onChangeText={setMaxPrice}
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
            selected={brandsSelected}
            toggleSelect={toggleSelect}
            fetchNextPage={fetchNextPage}
          />
        </View>
      </View>
    </BottomSheet>
  );
};
export default FilterSearchBottomSheet;
