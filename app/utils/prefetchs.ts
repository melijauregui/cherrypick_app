import { QueryClient } from "@tanstack/react-query";
import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";
import {
  checkIfLiked,
  checkIfFavorited,
  checkIsMyItem,
  getBrandProfile,
  getBrandItems,
  getSelfBrandProfile,
  getSelfClientProfile,
  getSelfBrandItems,
  getItem,
  handleAuthError,
  getClothingItemsHome,
} from "./fetch";

export function prefetchProfile(
  user: {
    email: string;
    userType: string;
  },
  queryClient: QueryClient
) {
  if (user.userType === "client") {
    console.log("prefetching client profile", user.email);
    queryClient.prefetchQuery({
      queryKey: ["fetch-client-profile", user.email],
      queryFn: () => getSelfClientProfile(),
    });
  } else if (user.userType === "brand") {
    console.log("prefetching brand profile", user.email);
    queryClient.prefetchQuery({
      queryKey: ["fetch-brand-profile", user.email],
      queryFn: () => getSelfBrandProfile(),
    });

    // Also prefetch brand's clothing items
    queryClient.prefetchInfiniteQuery({
      queryKey: ["clothing-items", user.email],
      queryFn: async () => {
        try {
          const items = await getSelfBrandItems(0, 100, user.email);
          items.forEach(item => {
            const existingData = queryClient.getQueryData([
              "item-detail",
              item.uuid,
            ]);
            if (!existingData) {
              prefetchItemDetail(queryClient, item, user?.email);
            }
          });
          return items;
        } catch (error) {
          const result = handleAuthError(
            error,
            "prefetchProfile (brand items)"
          );
          return result === null ? [] : result;
        }
      },
      initialPageParam: 0,
      getNextPageParam: (
        lastPage: CatalogItemSchemaType[],
        allPages: CatalogItemSchemaType[][],
        lastPageParam: number,
        allPageParams: number[]
      ) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });
  }
}

export default function prefetchHome(
  queryClient: QueryClient,
  userEmail: string | undefined
) {
  prefetchInfiniteQueryIfNeeded(
    queryClient,
    ["clothing-items", null],
    async () => {
      console.log("prefetching clothing items HOMEE");
      const items = await getClothingItemsHome(0, 100);
      items.forEach(item => {
        prefetchItemDetail(queryClient, item, userEmail);
      });
      return items;
    },
    0,
    (
      lastPage: CatalogItemSchemaType[],
      allPages: CatalogItemSchemaType[][],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    }
  );
}

function prefetchIfNeeded(
  queryClient: QueryClient,
  queryKey: string[],
  queryFn: () => Promise<any>
) {
  const existingData = queryClient.getQueryData(queryKey);
  const isPrefetching = queryClient.isFetching({
    queryKey: queryKey,
  });

  // Only prefetch when there is truly no cached entry (undefined)
  if (existingData === undefined && !isPrefetching) {
    console.log("prefetching: ", queryKey);
    queryClient.prefetchQuery({
      queryKey: queryKey,
      queryFn: queryFn,
    });
  }
}

function prefetchInfiniteQueryIfNeeded(
  queryClient: QueryClient,
  queryKey: (string | null)[],
  queryFn: () => Promise<any>,
  initialPageParam: number,
  getNextPageParam: (
    lastPage: any[],
    allPages: any[][],
    lastPageParam: number,
    allPageParams: number[]
  ) => number | undefined
) {
  const existingData = queryClient.getQueryData(queryKey);
  const isPrefetching = queryClient.isFetching({
    queryKey: queryKey,
  });

  if (!existingData && !isPrefetching) {
    console.log("prefetching infinite query: ", queryKey);
    queryClient.prefetchInfiniteQuery({
      queryKey: queryKey,
      queryFn: queryFn,
      initialPageParam: initialPageParam,
      getNextPageParam: getNextPageParam,
    });
  }
}

export function prefetchItemDetail(
  queryClient: QueryClient,
  item: CatalogItemSchemaType,
  userEmail: string | undefined
) {
  console.log("checking if prefetching item detail", item.uuid);
  prefetchIfNeeded(queryClient, ["item-detail", item.uuid], () =>
    getItem(item.uuid)
  );

  if (item.brandId) {
    prefetchIfNeeded(
      queryClient,
      ["fetch-brand-profile-item", item.brandId],
      () => getBrandProfile(item.brandId)
    );
  }

  if (userEmail) {
    prefetchIfNeeded(queryClient, ["is-liked", item.uuid], () =>
      checkIfLiked(userEmail, item.uuid)
    );
    prefetchIfNeeded(queryClient, ["is-favorited", item.uuid], () =>
      checkIfFavorited(userEmail, item.uuid)
    );
  }

  if (userEmail) {
    prefetchIfNeeded(queryClient, ["is-my-item", item.uuid], () =>
      checkIsMyItem(item.uuid, userEmail)
    );
  }
}

export function prefetchBrandPageItem(
  queryClient: QueryClient,
  brandId: string,
  userEmail: string
) {
  prefetchIfNeeded(queryClient, ["fetch-brand-profile-item", brandId], () =>
    getBrandProfile(brandId)
  );
  console.log("going to check if prefetching brand page item", brandId);
  prefetchInfiniteQueryIfNeeded(
    queryClient,
    ["clothing-items", brandId],
    async () => {
      const items = await getBrandItems(0, 100, brandId);
      items.forEach(item => {
        prefetchItemDetail(queryClient, item, userEmail);
      });
      return items;
    },
    0,
    (
      lastPage: CatalogItemSchemaType[],
      allPages: CatalogItemSchemaType[][],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    }
  );
}
