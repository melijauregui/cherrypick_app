import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  EvilIcons,
  Feather,
  Entypo,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import { getClothingItemsSimilar } from "@/app/utils/fetch";
import useIsMyItem, {
  useFetchBrandProfileItem,
  useFetchItem,
  useFetchItemEmbedding,
} from "@/app/utils/use-query";
import useIsLiked from "@/app/utils/likes-favorites";
import {
  useIsFavorited,
  useToggleLike,
  useToggleFavorite,
} from "@/app/utils/likes-favorites";
import { UpdateItemModal } from "@/app/components/profile/insertNewItems";
import { FormDataItem } from "@/app/utils/update";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSession } from "@/lib/auth-client";
import CustomModal from "@/app/components/Modal";
import LoadingPage from "@/app/components/LoadingPage";
import { useDeleteItem } from "@/app/utils/update";
import { prefetchBrandPageItem } from "@/app/utils/prefetchs";
import List2 from "@/app/components/List2";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { BrandSchemaPropertiesType } from "@/schemas/brand/brand-schema";
import ImageComplete from "@/app/components/ImageComplete";

const ItemDetail = () => {
  const params = useLocalSearchParams();
  const decodedUuid = decodeURIComponent(params.uuid as string);
  const { user } = useSession();
  const queryClient = useQueryClient();

  const itemData = useFetchItem(decodedUuid);
  const itemEmbeddingData = useFetchItemEmbedding(decodedUuid);

  const item = itemData?.item;
  const brand = useFetchBrandProfileItem(item?.brandId || "");
  const isBrandItem = useIsMyItem(item?.uuid || "") || false;
  const deleteItem = useDeleteItem(item?.uuid || "");

  // Ejecutar prefetch solo una vez cuando se monta el componente
  useEffect(() => {
    if (item?.brandId && user?.email) {
      prefetchBrandPageItem(queryClient, item.brandId, user.email);
    }
  }, []); // Array vacío = solo se ejecuta una vez al montar

  const bottomSheetRefAddItem = useRef<BottomSheet>(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const likeData = useIsLiked(item?.uuid || "");
  const favoriteData = useIsFavorited(item?.uuid || "");
  const toggleLikeMutation = useToggleLike();
  const toggleFavoriteMutation = useToggleFavorite();

  const openSheetUpdateItem = () => {
    bottomSheetRefAddItem.current?.snapToIndex(0);
  };

  const handleSubmitAddItem = (data: FormDataItem) => {
    // console.log("Form submitted with data:", data);
  };

  if (!item || !user) {
    return <LoadingPage alreadyPrefetched={true} />;
  }

  const content = (
    <>
      <View className="relative">
        <ImageComplete imageUrl={item.imageUrl} url={item.url} />
      </View>

      <View className="px-5 flex flex-col gap-6">
        <IconComponent
          uuid={item.uuid}
          isLiked={likeData.data ?? false}
          isFavorited={favoriteData.data ?? false}
          onToggleLike={() =>
            toggleLikeMutation.mutate({ itemUuid: item.uuid })
          }
          onToggleFavorite={() =>
            toggleFavoriteMutation.mutate({ itemUuid: item.uuid })
          }
          isLoadingLike={toggleLikeMutation.isPending}
          isLoadingFavorite={toggleFavoriteMutation.isPending}
          isBrandItem={isBrandItem || false}
          openSheetUpdateItem={openSheetUpdateItem}
          itemName={item.name}
          setVisibleModal={setVisibleModal}
        />

        <ItemDetailComponent item={item} brand={brand?.brand} />

        <Text className="py-3 text-neutral-300 text-xl font-psemibold">
          Más para explorar
        </Text>
      </View>
    </>
  );

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

        <List2
          queryKey={[
            "similar-items",
            item.uuid,
            itemEmbeddingData?.embedding?.length || 0,
          ]}
          getClothingItems={(page, limit) =>
            getClothingItemsSimilar(
              page,
              limit,
              itemEmbeddingData?.embedding || [],
              item.imageUrl
            )
          }
          limit={6}
          columnCount={2}
          contentUp={content}
        />

        <UpdateItemModal
          bottomSheetRef={bottomSheetRefAddItem}
          onSubmit={handleSubmitAddItem}
          formDataLastValue={{
            name: item.name,
            price: item.price.toString(),
            url: item.url,
            imageUrl: item.imageUrl,
            description: item.description,
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

const ItemDetailComponent = ({
  item,
  brand,
}: {
  item: ItemSchemaType;
  brand: BrandSchemaPropertiesType | undefined;
}) => {
  const [measured, setMeasured] = React.useState(false); // ya medí?
  const [overflows, setOverflows] = React.useState(false); // tiene >1 línea?
  const [expanded, setExpanded] = React.useState(false);
  const [lastDescription, setLastDescription] = React.useState(
    item.description
  );

  const handleTextLayout = React.useCallback(
    (e: any) => {
      const lines = e?.nativeEvent?.lines ?? [];
      // Solo actualizar si la descripción cambió o si no hemos medido aún
      if (lastDescription !== item.description || !measured) {
        setOverflows(lines.length > 1);
        setMeasured(true);
        setLastDescription(item.description);
      }
    },
    [measured, item.description, lastDescription]
  );

  return (
    <View className="gap-2">
      <TouchableOpacity
        className="flex-row items-center gap-2"
        onPress={() => {
          router.push({
            pathname: "/(tabs)/(brand)/[id]",
            params: {
              id: brand?.id || "",
            },
          });
        }}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: brand?.logoUrl }}
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
          {/* Text invisible para medir el número real de líneas */}
          <Text
            className="text-white text-xl font-pregular flex-1 absolute opacity-0"
            onTextLayout={handleTextLayout}
          >
            {item.description}
          </Text>

          <View className="flex-row flex-wrap">
            <Text
              className="text-white text-xl font-pregular flex-1"
              numberOfLines={expanded ? undefined : 1}
              ellipsizeMode="tail"
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
  isBrandItem,
  uuid,
  openSheetUpdateItem,
  itemName,
  setVisibleModal,
  isLiked,
  isFavorited,
  onToggleLike,
  onToggleFavorite,
  isLoadingLike,
  isLoadingFavorite,
}: {
  uuid: string;
  isBrandItem: boolean;
  openSheetUpdateItem: () => void;
  itemName: string;
  setVisibleModal: (visible: boolean) => void;
  isLiked: boolean;
  isFavorited: boolean;
  onToggleLike: () => void;
  onToggleFavorite: () => void;
  isLoadingLike: boolean;
  isLoadingFavorite: boolean;
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
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={onToggleLike}
          disabled={isLoadingLike}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "#bd8e75" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={onToggleFavorite}
          disabled={isLoadingFavorite}
        >
          <FontAwesome
            name={isFavorited ? "bookmark" : "bookmark-o"}
            size={24}
            color={isFavorited ? "#bd8e75" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={handleShareItem}
        >
          <Feather name="link" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {isBrandItem && (
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
