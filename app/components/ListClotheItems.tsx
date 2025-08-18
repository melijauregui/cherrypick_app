import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";
import ClothingItemComponent from "@/app/components/ClothingItemComponent";
import { MasonryFlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { prefetchItemDetail } from "../utils/prefetchs";
import { useSession } from "@/lib/auth-client";
import LoadingPage from "./LoadingPage";

const ListItems = ({
  brandId,
  brandEmail,
  getClothingItems,
  limit,
  columnCount,
}: {
  brandId: string | null;
  brandEmail?: string;
  getClothingItems: (
    page: number,
    limit: number,
    brandId: string | null
  ) => Promise<CatalogItemSchemaType[]>;
  limit: number;
  columnCount: number;
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useSession();

  const queryClient = useQueryClient();

  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ["clothing-items", brandEmail ? brandEmail : brandId],
    queryFn: async ({ pageParam }) => {
      const items = await getClothingItems(pageParam, limit, brandId);

      // Prefetch item-detail queries for each item fetched
      items.forEach(async item => {
        const existingData = queryClient.getQueryData([
          "item-detail",
          item.uuid,
        ]);
        if (!existingData) {
          await prefetchItemDetail(queryClient, item, user?.email);
        }
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
      ["clothing-items", brandId],
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

  if (!data) return <LoadingPage alreadyPrefetched={true} />;

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
