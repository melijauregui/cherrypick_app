import { QueryClient, useQueryClient } from "@tanstack/react-query";
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
      queryKey: ["self-client-profile", user.email],
      queryFn: () => getSelfClientProfile(),
    });
  } else if (user.userType === "brand") {
    console.log("prefetching brand profile", user.email);
    queryClient.prefetchQuery({
      queryKey: ["self-brand-profile", user.email],
      queryFn: () => getSelfBrandProfile(),
    });

    // Also prefetch brand's clothing items
    queryClient.prefetchInfiniteQuery({
      queryKey: ["self-brand-items", user.email],
      queryFn: async () => {
        try {
          const items = await getSelfBrandItems(0, 18);
          items.forEach(item => {
            prefetchItemDetail(queryClient, item, user?.email, item.brandId);
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
        lastPage: { uuid: string }[],
        allPages: { uuid: string }[][],
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
  userEmail: string
) {
  console.log("prefetchHome called for user:", userEmail);
  prefetchInfiniteQueryIfNeeded(
    queryClient,
    ["home-items", userEmail],
    async () => {
      console.log("prefetching clothing items HOMEE");
      const items = await getClothingItemsHome(0, 10);
      console.log(`prefetchHome got ${items.length} items`);
      items.forEach(item => {
        prefetchItemDetail(queryClient, item, userEmail, item.brandId);
      });
      return items;
    },
    0,
    (
      lastPage: { uuid: string }[],
      allPages: { uuid: string }[][],
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
    // console.log("prefetching: ", queryKey);
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
  } else {
    console.log(
      "skipping prefetch for infinite query (already cached or fetching): ",
      queryKey
    );
  }
}

export async function prefetchItemDetail(
  queryClient: QueryClient,
  item: { uuid: string },
  userEmail: string,
  brandId: string
) {
  prefetchIfNeeded(queryClient, ["item-detail", item.uuid], () =>
    getItem(item.uuid)
  );

  // //obtengo el item completo a traves de la ultima query
  // const itemQuery: CatalogItemSchemaType | undefined = queryClient.getQueryData(
  //   ["item-detail", item.uuid]
  // );

  // if (itemQuery) {
  //   console.log("itemQuery brandId", itemQuery.brandId);
  //   console.log("itemQuery name", itemQuery.name);
  // }

  if (brandId) {
    prefetchIfNeeded(queryClient, ["brand-profile-item", brandId], () =>
      getBrandProfile(brandId)
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
  prefetchIfNeeded(queryClient, ["brand-profile-item", brandId], () =>
    getBrandProfile(brandId)
  );
  console.log("going to check if prefetching brand page item", brandId);
  prefetchInfiniteQueryIfNeeded(
    queryClient,
    ["brand-items", brandId],
    async () => {
      const items = await getBrandItems(0, 6, brandId);
      items.forEach(item => {
        prefetchItemDetail(queryClient, item, userEmail, brandId);
      });
      return items;
    },
    0,
    (
      lastPage: { uuid: string }[],
      allPages: { uuid: string }[][],
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
