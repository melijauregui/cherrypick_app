import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import {
  checkIfLiked,
  checkIfFavorited,
  checkIsMyItem,
  getBrandProfile,
  getSelfBrandProfile,
  getSelfClientProfile,
  getSelfBrandItems,
  getItem,
  getClothingItemsHome,
  getAllLikedItems,
  getAllFavoritedItems,
  getEmbedding,
  getClothingItemsTextSearch,
  getInspirationItems,
} from "./fetch";
import { QueryIdSchemaType } from "@/schemas/standar-query-schema";

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
    // console.log("prefetching brand profile", user.email);
    queryClient.prefetchQuery({
      queryKey: ["self-brand-profile", user.email],
      queryFn: () => getSelfBrandProfile(),
    });
    prefetchInfiniteQueryIfNeeded(
      queryClient,
      ["self-brand-items", user.email],
      () => getSelfBrandItems(0, 18),
      user.email
    );
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
    () => getClothingItemsHome(0, 10),
    userEmail
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
  queryFn: () => Promise<ItemSchemaType[]>,
  userEmail: string
) {
  const existingData = queryClient.getQueryData(queryKey);
  const isPrefetching = queryClient.isFetching({
    queryKey: queryKey,
  });

  if (!existingData && !isPrefetching) {
    // console.log("prefetching infinite query: ", queryKey);
    queryClient.prefetchInfiniteQuery({
      queryKey: queryKey,
      queryFn: async () => {
        const items = await queryFn();
        items.forEach(item => {
          prefetchItemDetail(queryClient, item, userEmail, item.brandId);
        });
        return items;
      },
      initialPageParam: 0,
      getNextPageParam: (
        lastPage: ItemSchemaType[],
        allPages: ItemSchemaType[][],
        lastPageParam: number,
        allPageParams: number[]
      ) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });
  } else {
    // console.log(
    //   "skipping prefetch for infinite query (already cached or fetching): ",
    //   queryKey
    // );
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
}

export function prefetchLikeAndFavoritePage(
  queryClient: QueryClient,
  userEmail: string
) {
  console.log("prefetching like and favorite page for user:", userEmail);
  prefetchInfiniteQueryIfNeeded(
    queryClient,
    ["all-liked-items", userEmail],
    () => getAllLikedItems(0, 18),
    userEmail
  );
  prefetchInfiniteQueryIfNeeded(
    queryClient,
    ["all-favorited-items", userEmail],
    () => getAllFavoritedItems(0, 18),
    userEmail
  );
}
export async function prefetchExplorePage(queryClient: QueryClient) {
  console.log("prefetching explore page");
  prefetchExplorePageQuery(queryClient, "Minimalist");
  prefetchExplorePageQuery(queryClient, "Coquette");
  prefetchExplorePageQuery(queryClient, "Streetwear");
  prefetchExplorePageQuery(queryClient, "Sporty");
  prefetchExplorePageQuery(queryClient, "Old money");
  prefetchExplorePageQuery(queryClient, "Boho-chic");
}

export async function prefetchExplorePageQuery(
  queryClient: QueryClient,
  query: string
) {
  // console.log("prefetching explore page for query: ", query);
  if (!query || query.trim().length === 0) return;

  const embeddingKey = ["embedding", "text", query];
  prefetchIfNeeded(queryClient, embeddingKey, () =>
    getEmbedding("text", query)
  );

  for (let i = 0; i < 10; i++) {
    const isEmbeddingFetching = queryClient.isFetching({
      queryKey: embeddingKey,
    });
    if (!isEmbeddingFetching) {
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const embedding = queryClient.getQueryData<number[] | null>(embeddingKey);
  if (!embedding || embedding.length === 0) return;

  const itemsKey = ["explore-items", query, String(embedding.length)];
  await prefetchIfNeeded(queryClient, itemsKey, () =>
    getClothingItemsTextSearch(0, 4, embedding)
  );
}

// prefetch inspiration items
export async function prefetchInspirationItems(
  queryClient: QueryClient,
  userEmail: string,
  category: string = "spring"
) {
  const queryKey = ["inspiration-items", category];
  prefetchIfNeeded(queryClient, queryKey, () => getInspirationItems(category));
  // //por cada item de la lista de items, prefetch el item detail
  // for (let i = 0; i < 100; i++) {
  //   const isInspirationItemsFetching = queryClient.isFetching({
  //     queryKey: queryKey,
  //   });
  //   if (!isInspirationItemsFetching) {
  //     break;
  //   }
  //   await new Promise(resolve => setTimeout(resolve, 200));
  // }
  // const items = queryClient.getQueryData<QueryIdSchemaType[]>(queryKey);
  // if (items) {
  //   items.forEach(item => {
  //     prefetchItemDetail(queryClient, { uuid: item.id }, userEmail, "");
  //   });
  // }
}
