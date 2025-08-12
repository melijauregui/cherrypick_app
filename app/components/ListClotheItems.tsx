import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";
import ClothingItemComponent from "@/app/components/ClothingItemComponent";
import { MasonryFlashList } from "@shopify/flash-list";
import { BrandSchemaType } from "@/schemas/auth/brand-schema";
import { RefreshControl } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LOCAL_IP } from "@/config/api";

const ListItems = ({
  profileData,
  getClothingItems,
  limit,
  columnCount,
}: {
  profileData: BrandSchemaType | null;
  getClothingItems: (
    page: number,
    limit: number,
    brandEmail: string | undefined
  ) => Promise<CatalogItemSchemaType[]>;
  limit: number;
  columnCount: number;
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const queryClient = useQueryClient();

  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ["clothing-items", profileData?.email],
    queryFn: async ({ pageParam }) => {
      const items = await getClothingItems(
        pageParam,
        limit,
        profileData?.email
      );

      // Prefetch item-detail queries for each item fetched
      items.forEach(item => {
        console.log("prefetching item-detail", item.uuid);
        queryClient.prefetchQuery({
          queryKey: ["item-detail", item.uuid],
          queryFn: async () => {
            try {
              const response = await fetch(
                `http://${LOCAL_IP}:3000/get-item?uuid=${item.uuid}`
              );
              const data = await response.json();
              if (data.error) {
                throw new Error(data.details);
              }
              return data;
            } catch (error) {
              console.error("Error prefetching item detail:", error);
              return null;
            }
          },
        });
      });

      return items;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  const resetInfiniteQueryPagination = () => {
    return queryClient.setQueryData(
      ["clothing-items", profileData?.email],
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

  const onRefresh = async () => {
    await resetInfiniteQueryPagination();
    await refetch();
    setRefreshKey(k => k + 1);
  };

  if (!data) return null;

  return (
    <MasonryFlashList
      extraData={refreshKey}
      data={data.pages.flat()}
      numColumns={columnCount}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
      renderItem={({
        item,
        index,
      }: {
        item: CatalogItemSchemaType;
        index: number;
      }) => (
        <ClothingItemComponent i={index} item={item} numColumns={columnCount} />
      )}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.1}
      estimatedItemSize={280}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
          tintColor="#ffffff"
          colors={["#ffffff"]}
        />
      }
    />
  );
};

export default ListItems;
