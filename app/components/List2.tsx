import React, { useEffect, useRef, useState } from "react";
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
  useQueryClient,
} from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
import { prefetchItemDetail } from "../utils/prefetchs";
import { useSession } from "@/lib/auth-client";

const width = Dimensions.get("window").width;

const ImageGallery = ({
  queryKey,
  getClothingItems,
  limit,
  columnCount,
  itemWhenNothingFound,
  contentUp,
  roundRobin,
}: {
  queryKey: any[];
  getClothingItems: (
    page: number,
    limit: number
  ) => Promise<CatalogItemSchemaType[]>;
  limit: number;
  columnCount: number;
  itemWhenNothingFound?: () => React.ReactElement;
  contentUp?: React.ReactElement;
  roundRobin?: boolean;
}) => {
  const { user } = useSession();
  const lastTriggeredHeightRef = useRef(0);
  const queryClient = useQueryClient();
  const { data, fetchNextPage, refetch } = useInfiniteGetItems(
    queryKey,
    pageParam => getClothingItems(pageParam, limit),
    item =>
      prefetchItemDetail(queryClient, item, user?.email ?? "", item.brandId)
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
    <LoadingPage alreadyPrefetched={true} />
  ) : itemQuantity === 0 ? (
    itemWhenNothingFound?.()
  ) : (
    <>
      <View
        className={`flex-row ${
          itemQuantity < columnCount ? `justify-start ` : "justify-between"
        }`}
        style={{
          gap: itemQuantity < columnCount ? resto : 0,
        }}
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
      </View>
    </>
  );

  return (
    <ScrollView
      // contentContainerStyle={}
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
      {contentUp}
      {content}
    </ScrollView>
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
  getClothingItems: (pageParam: number) => Promise<CatalogItemSchemaType[]>,
  prefetchItemDetail: (item: CatalogItemSchemaType) => Promise<void>
): { data: any; fetchNextPage: any; refetch: any } {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam }) => {
      const items = await getClothingItems(pageParam);
      console.log(
        `useInfiniteQuery got ${items.length} items for page ${pageParam}, queryKey:`,
        queryKey
      );

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
  items: CatalogItemSchemaType[],
  numColumns: number,
  roundRobin: boolean
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

    // Reorganizar columnas al final: mover items de columnas más a la derecha hacia columnas más a la izquierda
    for (let i = numColumns - 1; i > 0; i--) {
      // Si la columna actual tiene más items que la columna anterior, mover el último item
      const currentColumn = columns[i];
      const previousColumn = columns[i - 1];

      if (currentColumn && previousColumn) {
        while (currentColumn.length > previousColumn.length) {
          const lastItem = currentColumn.pop();
          if (lastItem) {
            previousColumn.push(lastItem);
          }
        }
      }
    }

    return columns;
  } catch (err) {
    console.error("Failed to prepare image columns:", err);
    // Return empty columns array in case of error
    return Array.from({ length: numColumns }, () => []);
  }
};
