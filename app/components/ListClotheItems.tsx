import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";
import ClothingItemComponent from "@/app/components/ClothingItemComponent";
import { MasonryFlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { BrandSchemaType } from "@/schemas/auth/brand-schema";

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
    brandName: string | undefined
  ) => Promise<CatalogItemSchemaType[]>;
  limit: number;
  columnCount: number;
}) => {
  const [clothingItems, setClothingItems] = useState<CatalogItemSchemaType[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchClothingItems(
      page,
      profileData,
      setClothingItems,
      setIsLoadingMore,
      setHasMore,
      limit,
      getClothingItems
    );
  }, [page, profileData]);
  return (
    <MasonryFlashList
      data={clothingItems}
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
        <ClothingItemComponent
          i={index}
          url={item.image_url}
          numColumns={columnCount}
        />
      )}
      onEndReached={() =>
        handleLoadMore(isLoadingMore, hasMore, profileData, page, setPage)
      }
      onEndReachedThreshold={0.1}
      estimatedItemSize={280}
    />
  );
};

export default ListItems;

const fetchClothingItems = async (
  pageToFetch: number,
  profileData: BrandSchemaType | null,
  setClothingItems: React.Dispatch<
    React.SetStateAction<CatalogItemSchemaType[]>
  >,
  setIsLoadingMore: (isLoading: boolean) => void,
  setHasMore: (hasMore: boolean) => void,
  limit: number,
  getClothingItems: (
    page: number,
    limit: number,
    brandName: string | undefined
  ) => Promise<CatalogItemSchemaType[]>
) => {
  if (profileData !== null && !profileData.name) {
    console.log("No brand name found yet");
    return;
  }

  setIsLoadingMore(true);
  const items = await getClothingItems(pageToFetch, limit, profileData?.name);

  if (items.length === 0) {
    console.log("No more items");
    setHasMore(false);
    setIsLoadingMore(false);
    return;
  }

  if (pageToFetch === 0) {
    console.log("Setting items to first page");
    setClothingItems(items);
  } else {
    console.log("Adding items to existing list with page", pageToFetch);
    setClothingItems((prev: CatalogItemSchemaType[]) => [...prev, ...items]);
  }
  setIsLoadingMore(false);
};

const handleLoadMore = (
  isLoadingMore: boolean,
  hasMore: boolean,
  profileData: BrandSchemaType | null,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  if ((profileData !== null && !profileData.name) || isLoadingMore || !hasMore)
    return;
  console.log("Page", page);
  setPage(prev => prev + 1);
};
