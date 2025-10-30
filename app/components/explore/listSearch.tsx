import { IdNameImageSchemaType } from "@/schemas/catalog/catalog-schema";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function ListSearch({
  placeholder,
  search,
  setSearch,
  loading,
  filteredItems,
  selected,
  toggleSelect,
  fetchNextPage,
  resetInfiniteQueryPagination,
}: {
  placeholder: string;
  search: string;
  setSearch: (text: string) => void;
  loading: boolean;
  filteredItems: IdNameImageSchemaType[];
  selected: Map<string, string>;
  toggleSelect: (item: IdNameImageSchemaType) => void;
  fetchNextPage: () => void;
  resetInfiniteQueryPagination: () => void;
}) {
  // Función para obtener los items a mostrar
  const getDisplayItems = () => {
    return filteredItems;
  };

  const displayItems = getDisplayItems();
  return (
    <View className="bg-white  flex flex-col flex-1">
      <TextInput
        className="border border-gray-300 rounded-3xl px-3 py-3 mb-3 text-lg font-pregular"
        placeholder={"Buscar " + placeholder + "..."}
        value={search}
        onChangeText={text => {
          setSearch(text);
          resetInfiniteQueryPagination();
        }}
      />
      {loading ? (
        <View className="justify-center items-center flex-1">
          <Text className="text-lg text-black font-pregular opacity-50">
            Cargando {placeholder}...
          </Text>
        </View>
      ) : displayItems.length === 0 ? (
        <View className="justify-center items-center flex-1">
          <Text className="text-lg text-black font-pregular opacity-50">
            No hay {placeholder} que coincidan con ese nombre
          </Text>
        </View>
      ) : (
        <View className="flex-1">
          <FlashList
            data={displayItems}
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
        </View>
      )}
    </View>
  );
}

function ItemStyle({
  item,
  toggleSelect,
  selected,
}: {
  item: IdNameImageSchemaType;
  toggleSelect: (item: IdNameImageSchemaType) => void;
  selected: Map<string, string>;
}) {
  return (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center py-2 gap-3"
      onPress={() => toggleSelect(item)}
    >
      <View
        className={`w-7 h-7 rounded border border-gray-300  ${selected.has(item.id) ? "bg-beige-strong opacity-70" : "bg-white"}`}
      ></View>
      <Text className="text-lg text-black font-pregular">{item.name}</Text>
    </TouchableOpacity>
  );
}
