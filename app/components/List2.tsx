import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ClothingItemComponent, {
  ItemPlaceholder,
} from "./ClothingItemComponent";
import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";
import {
  QueryClient,
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { getClothingItemsHome, getItem } from "../utils/fetch";
import LoadingPage from "./LoadingPage";
import { prefetchItemDetail } from "../utils/prefetchs";
import { useSession } from "@/lib/auth-client";

const width = Dimensions.get("window").width;

const ImageGallery = ({
  brandId,
  brandEmail,
  getClothingItems,
  limit,
  columnCount,
  itemWhenNothingFound,
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
  itemWhenNothingFound?: () => React.ReactElement;
}) => {
  const { user } = useSession();
  const lastTriggeredHeightRef = useRef(0);
  const queryClient = useQueryClient();
  const queryKey = ["clothing-items", brandEmail ? brandEmail : brandId];
  const { data, fetchNextPage, refetch } = useInfiniteGetItems(
    queryKey,
    pageParam => getClothingItems(pageParam, limit, brandId),
    item => prefetchItemDetail(queryClient, item, user?.email)
  );

  // State for organized columns with calculated dimensions
  const [organizedColumns, setOrganizedColumns] = useState<
    Array<
      Array<
        CatalogItemSchemaType & {
          renderedHeight: number;
          renderedWidth: number;
        }
      >
    >
  >([]);

  // Organize items into columns with calculated dimensions
  useEffect(() => {
    const organizeItems = async () => {
      if (data && data.pages.flat().length > 0) {
        const renderData = data.pages.flat() as CatalogItemSchemaType[];
        const columns = await prepareColumns(renderData, columnCount);
        setOrganizedColumns(columns);
      }
    };

    organizeItems();
  }, [data, columnCount]);

  const onRefresh = async () => {
    await resetInfiniteQueryPagination(queryKey, queryClient);
    await refetch();
    lastTriggeredHeightRef.current = 0;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const preloadThreshold = Math.max(300, layoutMeasurement.height * 0.7);
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - preloadThreshold;

    if (isCloseToBottom) {
      const currentContentHeight = contentSize.height;
      if (currentContentHeight > lastTriggeredHeightRef.current) {
        lastTriggeredHeightRef.current = currentContentHeight;
        console.log("Llegaste al final!");
        fetchNextPage();
      }
    }
  };

  if (!data || organizedColumns.length === 0)
    return <LoadingPage alreadyPrefetched={true} />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
          tintColor="#ffffff"
          colors={["#ffffff"]}
        />
      }
    >
      {organizedColumns.map((items, columnIndex) => (
        <View key={columnIndex}>
          {items?.map((item, i) => {
            return item ? (
              <ClothingItemComponent
                key={item.uuid}
                i={i * columnCount + columnIndex}
                item={item as CatalogItemSchemaType}
                numColumns={columnCount}
                renderedHeight={item.renderedHeight}
                renderedWidth={item.renderedWidth}
              />
            ) : (
              <ItemPlaceholder
                key={i}
                width={width / columnCount - 10}
                height={280}
                marginTop={i < columnCount ? 0 : 18}
              />
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ImageGallery;

const getImageSize = (
  imageUrl: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      imageUrl,
      (width, height) => resolve({ width, height }),
      error => reject(error)
    );
  });
};

function useInfiniteGetItems(
  queryKey: any[],
  getClothingItems: (pageParam: number) => Promise<CatalogItemSchemaType[]>,
  prefetchItemDetail: (item: CatalogItemSchemaType) => Promise<void>
): { data: any; fetchNextPage: any; refetch: any } {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam }) => {
      const items = await getClothingItems(pageParam);

      items.forEach(async item => {
        await prefetchItemDetail(item);
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
}

const resetInfiniteQueryPagination = (
  queryKey: any[],
  queryClient: QueryClient
) => {
  return queryClient.setQueryData(queryKey, (oldData: any) => {
    if (!oldData) return undefined;

    return {
      ...oldData,
      pages: oldData.pages.slice(0, 1),
      pageParams: 0,
    };
  });
};

const prepareColumns = async (
  items: CatalogItemSchemaType[],
  numColumns: number
): Promise<
  Array<
    Array<
      CatalogItemSchemaType & { renderedHeight: number; renderedWidth: number }
    >
  >
> => {
  const screenWidth = Dimensions.get("screen").width;
  const widthDetermined = width / numColumns - 6;

  try {
    const itemsWithSizes = await Promise.all(
      items.map(async item => {
        try {
          const size = await getImageSize(item.image_url);
          const width = size?.width || 1;
          const height = size?.height || 1;
          const scale = widthDetermined / width;
          const renderedHeight = Math.max(1, Math.round(height * scale));
          const renderedWidth = widthDetermined;
          return { ...item, renderedHeight, renderedWidth };
        } catch (error) {
          // Fallback to default dimensions if image size cannot be determined
          const renderedHeight = 200; // Default height
          const renderedWidth = widthDetermined;
          return { ...item, renderedHeight, renderedWidth };
        }
      })
    );

    const columns: Array<
      Array<
        CatalogItemSchemaType & {
          renderedHeight: number;
          renderedWidth: number;
        }
      >
    > = Array.from({ length: numColumns }, () => []);
    const columnHeights: number[] = Array.from({ length: numColumns }, () => 0);
    for (const item of itemsWithSizes) {
      const minHeight = Math.min(...columnHeights);
      const minHeightIndex = columnHeights.indexOf(minHeight);

      // Always add to the column with minimum height (even if it's 0)
      columns[minHeightIndex]?.push(item);
      columnHeights[minHeightIndex] =
        (columnHeights[minHeightIndex] ?? 0) + item.renderedHeight;
    }

    return columns;
  } catch (err) {
    console.error("Failed to prepare image columns:", err);
    // Return empty columns array in case of error
    return Array.from({ length: numColumns }, () => []);
  }
};

//--------------------------------
//   const allUuids = useMemo(
//     () => data?.pages.flat().map(x => x.uuid) ?? [],
//     [data?.pages]
//   );

// 1) Lanzamos todas las queries en el MISMO orden que allUuids
//   const itemResults = useQueries({
//     queries: allUuids.map(uuid => ({
//       queryKey: ["item-detail", uuid],
//       queryFn: () => getItem(uuid),
//       staleTime: 60_000,
//       gcTime: 5 * 60_000,
//       enabled: !!uuid,
//     })),
//   });

//   // 2) Armamos data para la lista SIN perder posiciones
//   type Row = { uuid: string; item?: CatalogItemSchemaType };
//   const renderData: Row[] = allUuids.map((uuid, i) => ({
//     uuid,
//     item: itemResults[i]?.data?.item,
//   }));
