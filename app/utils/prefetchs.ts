import { QueryClient } from "@tanstack/react-query";
import { LOCAL_IP } from "@/config/api";
import safeFetch from "./safe-fetch";
import { UserSchemaRes } from "@/schemas/auth/preferences-schema";
import {
  BrandSchemaRes,
  BrandSchemaPropertiesRes,
} from "@/schemas/auth/brand-schema";
import {
  CatalogItemArraySchema,
  CatalogItemArraySchemaResponse,
  CatalogItemSchemaType,
  GetItemResponseSchema,
  IsMyItemSchema,
} from "@/schemas/catalog/catalog-schema";

export function prefetchProfile(
  user: {
    email: string;
    userType: string;
  },
  queryClient: QueryClient
) {
  if (user.userType === "client") {
    queryClient.prefetchQuery({
      queryKey: ["fetch-client-profile", user.email],
      queryFn: async () => {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-self-client`,
          method: "GET",
          schema: UserSchemaRes,
        });
        if (!data.error) {
          return data;
        }
      },
    });
  } else if (user.userType === "brand") {
    queryClient.prefetchQuery({
      queryKey: ["fetch-brand-profile", user.email],
      queryFn: async () => {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-self-brand`,
          method: "GET",
          schema: BrandSchemaRes,
        });
        if (!data.error) {
          return data;
        }
      },
    });

    // Also prefetch brand's clothing items
    queryClient.prefetchInfiniteQuery({
      queryKey: ["clothing-items", user.email],
      queryFn: async () => {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/all-self-brand?page=0&limit=100`,
          method: "GET",
          schema: CatalogItemArraySchemaResponse,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        data.items.forEach(item => {
          prefetchItemDetail(queryClient, item, user.email);
        });
        return data.items;
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
  queryClient.prefetchInfiniteQuery({
    queryKey: ["clothing-items", null],
    queryFn: async () => {
      console.log("prefetching clothing items HOMEE");
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/all?page=0&limit=100`,
        method: "GET",
        schema: CatalogItemArraySchema,
      });

      data.forEach(item => {
        prefetchItemDetail(queryClient, item, userEmail);
      });
      return data;
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

export function prefetchItemDetail(
  queryClient: QueryClient,
  item: CatalogItemSchemaType,
  userEmail: string | undefined
) {
  queryClient.prefetchQuery({
    queryKey: ["item-detail", item.uuid],
    queryFn: async () => {
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-item?uuid=${item.uuid}`,
          schema: GetItemResponseSchema,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        return null;
      }
    },
  });

  // Prefetch brand profile for the item
  if (item.brandId) {
    queryClient.prefetchQuery({
      queryKey: ["fetch-brand-profile-item", item.brandId],
      queryFn: async () => {
        try {
          const { data } = await safeFetch({
            url: `http://${LOCAL_IP}:3000/get-brand?id=${item.brandId}`,
            method: "GET",
            schema: BrandSchemaPropertiesRes,
          });
          if (data.error) {
            throw new Error(data.details);
          }
          return data;
        } catch (error) {
          console.error("Error prefetching brand profile:", error);
          return null;
        }
      },
    });
  }

  // Prefetch is-my-item check for the item
  if (userEmail) {
    queryClient.prefetchQuery({
      queryKey: ["is-my-item", item.uuid, userEmail],
      queryFn: async () => {
        try {
          const { data } = await safeFetch({
            url: `http://${LOCAL_IP}:3000/is-my-item?uuid=${item.uuid}`,
            method: "GET",
            schema: IsMyItemSchema,
          });
          if (data.error) {
            throw new Error(data.details);
          }
          return data;
        } catch (error) {
          console.error("Error prefetching is-my-item check:", error);
          return null;
        }
      },
    });
  }
}
