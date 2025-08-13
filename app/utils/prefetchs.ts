import { QueryClient } from "@tanstack/react-query";
import { LOCAL_IP } from "@/config/api";
import safeFetch from "./safe-fetch";
import { UserSchemaRes } from "@/schemas/auth/preferences-schema";
import { BrandSchemaRes } from "@/schemas/auth/brand-schema";
import {
  CatalogItemArraySchema,
  CatalogItemArraySchemaResponse,
  CatalogItemSchemaType,
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
          url: `http://${LOCAL_IP}:3000/get-client?email=${user.email}`,
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
          url: `http://${LOCAL_IP}:3000/get-brand?email=${user.email}`,
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
          url: `http://${LOCAL_IP}:3000/all-brand?page=0&limit=100&brandEmail=${user.email}`,
          method: "GET",
          schema: CatalogItemArraySchemaResponse,
        });
        if (data.error) {
          throw new Error(data.details);
        }
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

export default function prefetchHome(queryClient: QueryClient) {
  queryClient.prefetchInfiniteQuery({
    queryKey: ["clothing-items", null],
    queryFn: async () => {
      const { data } = await safeFetch({
        url: `http://${LOCAL_IP}:3000/all?page=0&limit=100`,
        method: "GET",
        schema: CatalogItemArraySchema,
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
