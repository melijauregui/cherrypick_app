import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  View,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ClothingItemComponent, {
  ItemPlaceholder,
} from "./ClothingItemComponent";
import {
  QueryClient,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import LoadingPage, { LoadingItem } from "./LoadingPage";
import { prefetchItemDetail } from "../../utils/prefetchs";
import { useSession } from "@/lib/auth-client";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";

const width = Dimensions.get("window").width;

const ImageGallery = ({
  queryKey,
  getClothingItems,
  limit,
  columnCount,
  itemWhenNothingFound,
  contentUp,
  roundRobin,
  canRefresh = true,
  loadingItem,
  useBottomSheetScroll = false,
}: {
  queryKey: any[];
  getClothingItems: (page: number, limit: number) => Promise<ItemSchemaType[]>;
  limit: number;
  columnCount: number;
  itemWhenNothingFound?: () => React.ReactElement;
  contentUp?: React.ReactElement;
  roundRobin?: boolean;
  canRefresh?: boolean;
  loadingItem?: React.ReactElement;
  useBottomSheetScroll?: boolean;
}) => {
  const { user } = useSession();
  const insets = useSafeAreaInsets();
  const lastTriggeredHeightRef = useRef(0);
  const queryClient = useQueryClient();
  // List2 always requires authentication
  const isEnabled = !!user;

  const { data, fetchNextPage, refetch } = useInfiniteGetItems(
    queryKey,
    pageParam => getClothingItems(pageParam, limit),
    item =>
      prefetchItemDetail(queryClient, item, user?.email ?? "", item.brandId),
    isEnabled
  );

  const serializedQueryKey = JSON.stringify(queryKey);
  useEffect(() => {
    lastTriggeredHeightRef.current = 0;
  }, [serializedQueryKey]);

  // State for organized columns with calculated dimensions
  const [organizedColumns, setOrganizedColumns] = useState<
    Array<
      Array<
        ItemSchemaType & {
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
        const renderData = data.pages.flat() as ItemSchemaType[];
        const columns = await prepareColumns(
          renderData,
          columnCount,
          roundRobin ?? false
        );
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

  // Gate: wait until first page images finish loading before showing grid
  const firstPageItems: ItemSchemaType[] = useMemo(
    () => (data?.pages?.[0] as ItemSchemaType[]) ?? [],
    [data]
  );
  const [firstPageReady, setFirstPageReady] = useState(false);
  // Prefetch first page images; show grid only when prefetch settles or timeout
  useEffect(() => {
    let cancelled = false;
    setFirstPageReady(false);
    const urls = firstPageItems
      .map(i => i.image?.url)
      .filter((u): u is string => Boolean(u));
    if (urls.length === 0) {
      setFirstPageReady(true);
      return;
    }
    const timeout = setTimeout(() => {
      if (!cancelled) {
        console.log("firstPageReady on timeout");
        setFirstPageReady(true);
      }
    }, 2000);
    Promise.allSettled(urls.map(u => Image.prefetch(u))).finally(() => {
      if (!cancelled) {
        console.log("firstPageReady on finally");
        setFirstPageReady(true);
      }
      clearTimeout(timeout);
    });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [firstPageItems, serializedQueryKey]);

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

  const itemQuantity = data?.pages.flat().length;
  const resto =
    (width - (width / columnCount - 6) * columnCount) / (columnCount - 1);
  const content = !data ? (
    loadingItem ? (
      loadingItem
    ) : (
      <View className="flex-1 items-center justify-center">
        <LoadingItem />
      </View>
    )
  ) : !firstPageReady ? (
    <View className="flex-1 items-center justify-center">
      <LoadingItem />
    </View>
  ) : itemQuantity === 0 ? (
    itemWhenNothingFound?.()
  ) : (
    <>
      <View
        className={`flex-row ${itemQuantity < columnCount ? `justify-start ` : "justify-between"
          }`}
        style={{
          gap: itemQuantity < columnCount ? resto : 0,
        }}
      >
        {organizedColumns.map((items, columnIndex) => (
          <View key={columnIndex}>
            {items?.map((item, i) => {
              return (
                <ClothingItemComponent
                  key={item.uuid}
                  i={i * columnCount + columnIndex}
                  item={item as ItemSchemaType}
                  numColumns={columnCount}
                  renderedHeight={item.renderedHeight}
                  renderedWidth={item.renderedWidth}
                />
              );
            })}
          </View>
        ))}
      </View>
    </>
  );

  const ScrollComponent: any = useBottomSheetScroll ? BottomSheetScrollView : ScrollView;

  const commonScrollProps: any = {
    contentContainerStyle: {
      // paddingTop: 8,
      flexGrow: 1,
      paddingBottom:
        Platform.OS === "android" ? (insets.bottom ? insets.bottom + 16 : 24) : 0,
    },
    showsVerticalScrollIndicator: false,
    onScroll: handleScroll,
    scrollEventThrottle: 16,
    refreshControl: canRefresh ? (
      <RefreshControl
        refreshing={false}
        onRefresh={onRefresh}
        tintColor="#ffffff"
        colors={["#ffffff"]}
      />
    ) : undefined,
  };

  if (useBottomSheetScroll) {
    // Android
    commonScrollProps.nestedScrollEnabled = true;
    commonScrollProps.keyboardShouldPersistTaps = "handled";
  }

  return (
    <ScrollComponent className="flex-1" {...commonScrollProps}>
      {contentUp}
      {content}
    </ScrollComponent>
  );
};

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
  getClothingItems: (pageParam: number) => Promise<ItemSchemaType[]>,
  prefetchItemDetail: (item: ItemSchemaType) => Promise<void>,
  enabled: boolean = true
): { data: any; fetchNextPage: any; refetch: any } {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam }) => {
      const items = await getClothingItems(pageParam);
      // console.log(
      //   `useInfiniteQuery got ${items.length} items for page ${pageParam}, queryKey:`,
      //   queryKey
      // );

      items.forEach(async item => {
        await prefetchItemDetail(item);
      });
      return items;
    },
    enabled: enabled,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    // Configuraciones para optimizar el uso de datos prefetched
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
    refetchOnMount: false, // No refetch automáticamente al montar
    refetchOnWindowFocus: false, // No refetch al enfocar la ventana
    refetchOnReconnect: false, // No refetch al reconectar
    retry: true, // No reintentar en caso de error
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
  items: ItemSchemaType[],
  numColumns: number,
  roundRobin: boolean
): Promise<
  Array<
    Array<ItemSchemaType & { renderedHeight: number; renderedWidth: number }>
  >
> => {
  const screenWidth = Dimensions.get("screen").width;
  const widthDetermined = width / numColumns - 6;

  try {
    const itemsWithSizes = await Promise.all(
      items.map(async item => {
        try {
          const size = await getImageSize(item.image.url);
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
        ItemSchemaType & {
          renderedHeight: number;
          renderedWidth: number;
        }
      >
    > = Array.from({ length: numColumns }, () => []);

    if (roundRobin) {
      for (let i = 0; i < itemsWithSizes.length; i++) {
        const item = itemsWithSizes[i];
        const columnIndex = i % numColumns;
        if (item) {
          columns[columnIndex]?.push(item);
        }
      }
      return columns;
    }

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
