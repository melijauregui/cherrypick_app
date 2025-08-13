import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Linking,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  EvilIcons,
  Feather,
  Entypo,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  CatalogItemSchemaType,
  CatalogResponseSchemaDelete,
  GetItemResponseSchema,
} from "@/schemas/catalog/catalog-schema";
import Toast from "react-native-toast-message";
import safeFetch from "../../utils/safe-fetch";
import { LOCAL_IP } from "@/config/api";
import { CatalogItemArraySchema } from "@/schemas/catalog/catalog-schema";
import ListItems from "../../components/ListClotheItems";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetchBrandProfile } from "@/app/(tabs)/profile";
import { UpdateItemModal } from "@/app/components/profile/insertNewItems";
import { FormData } from "@/app/components/profile/insertNewItems";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSession } from "@/lib/auth-client";
import CustomModal from "@/app/components/Modal";
import LoadingPage from "@/app/components/LoadingPage";

const ItemDetail = () => {
  const { user } = useSession();
  const params = useLocalSearchParams();
  const bottomSheetRefAddItem = useRef<BottomSheet>(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const decodedUuid = decodeURIComponent(params.uuid as string);
  const item = useFetchItem(decodedUuid);
  const brand = useFetchBrandProfile(item?.item.brandEmail || "");

  const [isPressed, setIsPressed] = useState(false);
  const deleteItem = useDeleteItem(
    item?.item.brandEmail || "",
    item?.item.name || ""
  );

  const openSheetUpdateItem = () => {
    bottomSheetRefAddItem.current?.snapToIndex(0);
  };

  const handleSubmitAddItem = (data: FormData) => {
    console.log("Form submitted with data:", data);
  };

  if (!item) {
    return <LoadingPage />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-brown-strong">
        <TouchableOpacity
          onPress={() => router.back()}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          className={`absolute top-12 left-4 w-14 h-14 rounded-2xl bg-black items-center justify-center z-50 ${
            isPressed ? "opacity-100" : "opacity-80"
          }`}
          activeOpacity={1}
        >
          <Entypo name="chevron-thin-left" size={22} color="white" />
        </TouchableOpacity>

        <ScrollView className="flex-1">
          <View className="relative">
            <ImageComponent
              imageUrl={item.item.image_url}
              url={item.item.url}
            />
          </View>

          <View className="px-5 flex flex-col gap-6">
            <IconComponent
              uuid={item.item.uuid}
              userEmail={user?.email || ""}
              itemEmail={item.item.brandEmail}
              openSheetUpdateItem={openSheetUpdateItem}
              itemName={item.item.name}
              setVisibleModal={setVisibleModal}
            />

            <ItemDetailComponent item={item.item} brand={brand?.brand} />

            <Text className="pt-3 text-white text-xl font-psemibold">
              Más para explorar
            </Text>
          </View>

          <ListItems
            profileData={null}
            getClothingItems={getClothingItems}
            limit={100}
            columnCount={2}
          />
        </ScrollView>

        <UpdateItemModal
          bottomSheetRef={bottomSheetRefAddItem}
          onSubmit={handleSubmitAddItem}
          brandEmail={item.item.brandEmail}
          formDataLastValue={{
            name: item.item.name,
            price: item.item.price.toString(),
            url: item.item.url,
            image_url: item.item.image_url,
            description: item.item.description,
          }}
          itemUuid={decodedUuid}
        />
      </View>
      <CustomModal
        title="Eliminar producto"
        text={`¿Estás seguro de querer eliminar este producto? Este proceso es irreversible.`}
        onSubmit={() => {
          deleteItem.mutate();
          setVisibleModal(false);
        }}
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />
    </GestureHandlerRootView>
  );
};

export default ItemDetail;

const ImageComponent = ({
  imageUrl,
  url,
}: {
  imageUrl: string;
  url: string;
}) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [imageHeight, setImageHeight] = useState(0);

  const calculateImageHeight = (imageWidth: number, imageHeight: number) => {
    const aspectRatio = imageHeight / imageWidth;
    return screenWidth * aspectRatio;
  };

  useEffect(() => {
    Image.getSize(
      imageUrl,
      (width, height) => {
        const calculatedHeight = calculateImageHeight(width, height);
        setImageHeight(calculatedHeight);
      },
      error => {
        Toast.show({
          type: "error",
          text1: "Error loading image size",
          text2: error.message,
          visibilityTime: 4000,
        });
        console.error("Error loading image size:", error);
      }
    );
  }, [imageUrl]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (url) {
          Linking.openURL(url);
        }
      }}
    >
      <Image
        className="rounded-3xl"
        source={{ uri: imageUrl }}
        style={{ width: screenWidth, height: imageHeight }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const ItemDetailComponent = ({
  item,
  brand,
}: {
  item: CatalogItemSchemaType;
  brand:
    | {
        email: string;
        name: string;
        url: string;
        logo_url: string;
      }
    | undefined;
}) => {
  const [measured, setMeasured] = React.useState(false); // ya medí?
  const [overflows, setOverflows] = React.useState(false); // tiene >1 línea?
  const [expanded, setExpanded] = React.useState(false);

  const handleTextLayout = React.useCallback(
    (e: any) => {
      if (measured) return; // medir solo una vez
      const lines = e?.nativeEvent?.lines ?? [];
      setOverflows(lines.length > 1);
      setMeasured(true);
    },
    [measured]
  );

  return (
    <View className="gap-2">
      <TouchableOpacity
        className="flex-row items-center gap-2"
        onPress={() => {
          //todo
        }}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: brand?.logo_url }}
          className="w-6 h-6 rounded-full"
        />
        <Text className="text-white text-xl font-plight">{brand?.name}</Text>
      </TouchableOpacity>
      <Text className="text-white text-3xl font-pmedium">{item.name}</Text>
      <View className="">
        <Text className="text-white text-xl font-pregular">
          {"ARS $" + item.price}
        </Text>
        <View>
          <View className="flex-row flex-wrap">
            <Text
              className="text-white text-xl font-pregular flex-1"
              numberOfLines={measured && !expanded ? 1 : undefined}
              ellipsizeMode="tail"
              onTextLayout={handleTextLayout}
            >
              {item.description}
            </Text>
            {overflows && (
              <TouchableOpacity onPress={() => setExpanded(v => !v)}>
                <Text className="text-gray-400 font-plight text-lg ml-1">
                  {expanded ? "" : "Ver más"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const IconComponent = ({
  userEmail,
  itemEmail,
  uuid,
  openSheetUpdateItem,
  itemName,
  setVisibleModal,
}: {
  uuid: string;
  userEmail: string;
  itemEmail: string;
  openSheetUpdateItem: () => void;
  itemName: string;
  setVisibleModal: (visible: boolean) => void;
}) => {
  const handleShareItem = async () => {
    try {
      const itemLink = `cherrypick://item/${uuid}`;

      // Copiar al clipboard
      await Clipboard.setStringAsync(itemLink);

      // Mostrar toast de confirmación
      Toast.show({
        type: "normal",
        text1: "Link copiado!",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo copiar el link",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View className="flex-row justify-between">
      <View className="pt-4 flex-row items-center gap-8">
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <FontAwesome name="bookmark-o" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={handleShareItem}
        >
          <Feather name="link" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {userEmail === itemEmail && (
        <View className="pt-4 flex-row items-center gap-4">
          <TouchableOpacity
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{
              backgroundColor: "rgba(107, 114, 128, 0.5)",
            }}
            onPress={openSheetUpdateItem}
          >
            <Ionicons name="pencil-outline" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-10 h-10 rounded-xl items-center justify-center"
            onPress={() => {
              setVisibleModal(true);
            }}
            style={{
              backgroundColor: "rgba(107, 114, 128, 0.5)",
            }}
          >
            <EvilIcons name="trash" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

function useDeleteItem(brandEmail: string, itemName: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await safeFetch({
        url: `http://${LOCAL_IP}:3000/delete-catalog-brand`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ name: itemName }],
        }),
        schema: CatalogResponseSchemaDelete,
      });
      if (response.data.error) {
        throw new Error(response.data.details);
      }
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["delete-catalog-items", brandEmail],
      });

      Toast.show({
        type: "normal",
        text1: `Producto eliminado correctamente`,
      });
      router.back();
    },
    onError: error => {
      console.log(`could not delete item:`, error);
      Toast.show({ type: "error", text1: error.message });
    },
  });

  return mutation;
}

async function getClothingItems(
  page: number,
  limit: number,
  brandEmail: string | undefined
): Promise<CatalogItemSchemaType[]> {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all?page=${page}&limit=${limit}`,
      method: "GET",
      schema: CatalogItemArraySchema,
    });
    return data;
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return [];
  }
}

function useFetchItem(itemUuid: string): {
  item: CatalogItemSchemaType;
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item-detail", itemUuid],
    queryFn: async () => {
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-item?uuid=${itemUuid}`,
          method: "GET",
          schema: GetItemResponseSchema,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.error("Error fetching user data4:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }
  return data;
}
