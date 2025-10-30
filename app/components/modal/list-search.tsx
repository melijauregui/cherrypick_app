import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { LoadingItem } from "../LoadingPage";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UuidNameSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type UuidNameSchemaType = z.infer<typeof UuidNameSchema>;

export default function ListSearch<T extends { id: string; name: string }>({
  placeholder,
  selected,
  setSelected,
  fetchFunction,
  queryKey,
  maxAllowSelect,
  forceKey,
  disable = false,
  renderItem,
  children,
}: {
  placeholder: string;
  selected: Map<string, T>;
  setSelected: React.Dispatch<React.SetStateAction<Map<string, T>>>;
  fetchFunction: (search: string, pageParam: number) => Promise<T[]>;
  queryKey: string[];
  maxAllowSelect?: number;
  forceKey?: string; // cambia este valor al cerrar para forzar rerender
  disable?: boolean;
  renderItem: (
    item: T,
    index: number,
    isSelected: boolean,
    toggleSelect: (item: T) => void,
    disable: boolean
  ) => React.ReactElement;
  children?: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const queryKeyWithSearch: readonly string[] = [
    ...queryKey,
    search,
    forceKey ?? "",
  ];
  const { data, fetchNextPage, isLoading, error, isPending, isRefetching } =
    useInfiniteQuery({
      queryKey: queryKeyWithSearch,
      queryFn: async ({ pageParam }) => {
        const res = await fetchFunction(search, pageParam);
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
    console.log("resetInfiniteQueryPagination");
    return queryClient.setQueryData(queryKeyWithSearch, (oldData: any) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        pages: [],
        pageParams: [],
      };
    });
  };

  const filteredItems = data?.pages.flat() ?? [];
  const disableToggle =
    disable ||
    (typeof maxAllowSelect === "number" && selected.size >= maxAllowSelect);

  // Mantener el orden original para evitar reflow al seleccionar
  const getDisplayItems = () => filteredItems;

  const toggleSelect = (item: T) => {
    setSelected(prev => {
      const newMap = new Map(prev);
      if (newMap.has(item.id)) {
        newMap.delete(item.id);
      } else {
        newMap.set(item.id, item);
      }
      return newMap;
    });
  };

  const displayItems = useMemo(() => getDisplayItems(), [filteredItems]);
  const keyExtractor = useCallback((item: T) => item.id, []);
  return (
    <View className="flex flex-col flex-1">
      <TextInput
        className="text-black border border-gray-300 rounded-3xl px-3 py-3 mb-3 text-lg font-pregular"
        placeholder={"Buscar " + placeholder + "..."}
        placeholderTextColor="grey"
        value={search}
        onChangeText={text => {
          setSearch(text);
          resetInfiniteQueryPagination();
        }}
        keyboardType="default"
        autoCapitalize="none"
      />
      {selected.size > 0 ? (
        <View className="flex flex-row flex-wrap gap-2 mb-3 px-1">
          {Array.from(selected.values()).map(selItem => (
            <View
              key={selItem.id}
              className="flex-row items-center bg-neutral-200 rounded-full px-3 py-1"
            >
              <Text
                className="text-black text-sm font-plight mr-2"
                numberOfLines={1}
              >
                {selItem.name}
              </Text>
              <TouchableOpacity
                accessibilityLabel={`Quitar ${selItem.name}`}
                onPress={() => toggleSelect(selItem)}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Ionicons name="close" size={14} color="#000000" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : null}
      {children}
      {isStillLoading ? (
        <View className="justify-top mt-16 items-center flex-1">
          <LoadingItem />
        </View>
      ) : error ? (
        <View className="justify-top mt-16 items-center flex-1">
          <Text className="text-lg text-white font-pregular opacity-50 text-center mx-10">
            Error loading {placeholder}
          </Text>
        </View>
      ) : displayItems.length === 0 ? (
        <View className="justify-top mt-16 items-center flex-1">
          <Text className="text-lg text-white font-pregular opacity-50 text-center mx-10">
            There are no {placeholder} that match that name.
          </Text>
        </View>
      ) : (
        <View className="flex-1">
          <FlashList
            data={displayItems}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) =>
              renderItem(
                item,
                index,
                selected.has(item.id),
                toggleSelect,
                disableToggle
              )
            }
            estimatedItemSize={56}
            onEndReached={() => {
              console.log("onEndReached");
              fetchNextPage();
            }}
            onEndReachedThreshold={0.1}
          />
        </View>
      )}
    </View>
  );
}

export function ItemStyle({
  item,
  toggleSelect,
  isSelected,
  disable,
}: {
  item: UuidNameSchemaType;
  toggleSelect: (item: UuidNameSchemaType) => void;
  isSelected: boolean;
  disable?: boolean;
}) {
  const shouldDim = disable && !isSelected;
  return (
    <TouchableOpacity
      key={item.id}
      className={`flex-row items-center py-2 gap-3 ${shouldDim ? "opacity-40" : "opacity-100"}`}
      disabled={shouldDim}
      onPress={() => toggleSelect(item)}
    >
      <View
        className={`w-5 h-5 rounded  items-center justify-center ${isSelected ? "bg-green-600" : "bg-neutral-800"}`}
      >
        {isSelected ? (
          <Ionicons name="checkmark" size={16} color="#ffffff" />
        ) : null}
      </View>
      <Text className="text-lg text-white font-pregular">{item.name}</Text>
    </TouchableOpacity>
  );
}

/* 
Ejemplo de uso del componente genérico ListSearch:

const [selectedItems, setSelectedItems] = useState<Map<string, MyItemType>>(new Map());

<ListSearch
  placeholder="My Items"
  selected={selectedItems}
  setSelected={setSelectedItems}
  fetchFunction={async (search: string, pageParam: number) => {
    // Tu función de fetch que retorna MyItemType[]
  }}
  queryKey={["my-items"]}
  maxAllowSelect={5}
  renderItem={(item) => (
    <ItemStyle
      item={item}
      toggleSelect={(item) => {
        setSelectedItems(prev => {
          const newMap = new Map(prev);
          if (newMap.has(item.uuid)) {
            newMap.delete(item.uuid);
          } else {
            newMap.set(item.uuid, item);
          }
          return newMap;
        });
      }}
      isSelected={selectedItems.has(item.uuid)}
      disable={selectedItems.size >= 5}
    />
  )}
/>
*/
