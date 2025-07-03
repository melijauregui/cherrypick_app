import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { LOCAL_IP } from "@/config/api";
import BottomSheetSame from "./bottomSheets";
import safeFetch from "@/app/utils/safe-fetch";
import { AllBrandItemsSchemaRes } from "@/schemas/auth/brand-schema";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { z } from "zod";
import { CatalogResponseSchemaDelete } from "@/schemas/catalog/catalog-schema";

const screenHeight = Dimensions.get("window").height;

const DeleteCatalogItemsModal = ({
  bottomSheetRef,
  brand,
  onDelete,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
  brand: string;
  onDelete: () => void;
}) => {
  const [items, setItems] = useState<{ name: string }[]>([]);
  const [filteredItems, setFilteredItems] = useState<{ name: string }[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (bottomSheetRef.current && brand) {
      fetchItems(brand, setItems, setFilteredItems, setLoading);
    }
    // eslint-disable-next-line
  }, [bottomSheetRef, brand]);

  useEffect(() => {
    if (!search) {
      setFilteredItems(items);
    } else {
      console.log("search", search);
      setFilteredItems(
        items.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      console.log("filteredItems", filteredItems);
    }
  }, [search, items]);

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
      snapPoints={["53%"]}
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
          }}
        >
          <Text className="text-xl  font-plight">Cancel</Text>
        </TouchableOpacity>
      </View>
      <FormContent
        search={search}
        setSearch={setSearch}
        loading={loading}
        filteredItems={filteredItems}
        selected={selected}
        toggleSelect={toggleSelect}
        handleDelete={() => {
          handleDelete(
            selected,
            setSelected,
            onDelete,
            bottomSheetRef,
            brand,
            setDeleting,
            setItems,
            setFilteredItems,
            setLoading
          );
        }}
        deleting={deleting}
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
}: {
  search: string;
  setSearch: (text: string) => void;
  loading: boolean;
  filteredItems: { name: string }[];
  selected: Set<string>;
  toggleSelect: (name: string) => void;
  handleDelete: () => void;
  deleting: boolean;
}) => {
  return (
    <View className="bg-white px-6 pt-4 flex flex-col justify-between flex-1">
      <View className="flex-1">
        <TextInput
          className="border border-gray-300 rounded-3xl px-3 py-3 mb-3 text-lg font-pregular"
          placeholder="Buscar producto..."
          value={search}
          onChangeText={setSearch}
        />
        {loading ? (
          <View className="justify-center items-center">
            <Text className="text-lg text-black font-pregular">
              Cargando productos...
            </Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View className="justify-center items-center flex-1">
            <Text className="text-lg text-black font-pregular">
              No hay productos
            </Text>
          </View>
        ) : (
          <BottomSheetScrollView
            keyboardShouldPersistTaps="handled"
            className="flex-1"
            removeClippedSubviews={false}
          >
            {filteredItems.map(item => (
              <ItemStyle
                key={item.name}
                item={item}
                toggleSelect={toggleSelect}
                selected={selected}
              />
            ))}
          </BottomSheetScrollView>
        )}
      </View>
      <ButtonDelete
        selected={selected}
        deleting={deleting}
        handleDelete={handleDelete}
      />
    </View>
  );
};

export default DeleteCatalogItemsModal;

const fetchItems = async (
  brand: string,
  setItems: (items: { name: string }[]) => void,
  setFilteredItems: (items: { name: string }[]) => void,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    const res = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all-brand-items?brand=${brand}`,
      schema: AllBrandItemsSchemaRes,
    });
    if (res.data.error) {
      console.log(res.data.details);
      Toast.show({ type: "error", text1: res.data.details });
    } else {
      setItems(res.data.data || []);
      setFilteredItems(res.data.data || []);
    }
  } catch (e: any) {
    Toast.show({
      type: "error",
      text1: "Error al cargar productos: " + e.message,
    });
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (
  selected: Set<string>,
  setSelected: (selected: Set<string>) => void,
  onDelete: () => void,
  bottomSheetRef: React.RefObject<BottomSheet>,
  brand: string,
  setDeleting: (deleting: boolean) => void,
  setItems: (items: { name: string }[]) => void,
  setFilteredItems: (items: { name: string }[]) => void,
  setLoading: (loading: boolean) => void
) => {
  if (selected.size === 0) return;
  setDeleting(true);
  bottomSheetRef.current?.close();
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/delete-catalog-brand`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: Array.from(selected).map(name => ({ name })),
        brand,
      }),
      schema: CatalogResponseSchemaDelete,
    });

    if (data.error) {
      Toast.show({ type: "error", text1: data.details });
    } else {
      Toast.show({
        type: "success",
        text1: `${data.numberDeleted} productos eliminados correctamente`,
      });
      setSelected(new Set());
      onDelete();
      fetchItems(brand, setItems, setFilteredItems, setLoading);
    }
  } catch (e) {
    Toast.show({ type: "error", text1: "Error al eliminar" });
  } finally {
    setDeleting(false);
  }
};

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
const ButtonDelete = ({
  selected,
  deleting,
  handleDelete,
}: {
  selected: Set<string>;
  deleting: boolean;
  handleDelete: () => void;
}) => {
  return (
    <TouchableOpacity
      className={`py-3 rounded-3xl items-center my-3 ${selected.size === 0 || deleting ? "opacity-50" : ""}`}
      style={{
        backgroundColor: "rgba(107, 114, 128, 0.5)",
      }}
      disabled={selected.size === 0 || deleting}
      onPress={() => {
        handleDelete();
      }}
    >
      <Text className="text-white text-lg font-psemibold">Eliminar Items</Text>
    </TouchableOpacity>
  );
};
