import { useQuery } from "@tanstack/react-query";
import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import {
  AllBrandItemsSchemaRes,
  BrandSchemaPropertiesRes,
  BrandSchemaRes,
} from "@/schemas/auth/brand-schema";
import {
  CatalogItemArraySchema,
  CatalogItemArraySchemaResponse,
  CatalogItemSchemaType,
  GetItemResponseSchema,
  IsMyItemSchema,
} from "@/schemas/catalog/catalog-schema";
import { authClient, useSession } from "@/lib/auth-client";
import { UserInfo } from "../(tabs)/profile";
import { UserSchemaRes } from "@/schemas/auth/preferences-schema";

export function useFetchItem(itemUuid: string): {
  item: CatalogItemSchemaType;
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item-detail", itemUuid],
    queryFn: async () => {
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-item?uuid=${itemUuid}`,
          method: "GET",
          schema: GetItemResponseSchema,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.log("error", error);
        console.log("itemUuid", itemUuid);
        console.error("Error fetching user data4:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }

  return { item: data.item };
}

export function useFetchBrandProfile(email: string): {
  brand: {
    name: string;
    description: string;
    email: string;
    url: string;
    logo_url: string;
    id: string;
  };
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch-brand-profile", email],
    queryFn: async () => {
      if (!email) {
        console.log("No email found");
        return null;
      }
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-self-brand`,
          method: "GET",
          schema: BrandSchemaRes,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.error("Error fetching brand data2:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    console.log("No data found", error);
    return null;
  }
  return data;
}

export function useFetchBrandProfileItem(brandId: string): {
  brand: {
    id: string;
    name: string;
    description: string;
    url: string;
    logo_url: string;
  };
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch-brand-profile-item", brandId],
    queryFn: async () => {
      if (!brandId) {
        console.log("No email found");
        return null;
      }
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-brand?id=${brandId}`,
          method: "GET",
          schema: BrandSchemaPropertiesRes,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.error("Error fetching brand item data2:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    console.log("No data found", error);
    return null;
  }
  return data;
}

export function useIsMyItem(uuidItem: string): {
  isMyItem: boolean;
} | null {
  const { user } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["is-my-item", uuidItem, user?.email],
    queryFn: async () => {
      if (!user?.email || !uuidItem) {
        console.log("No email or uuidItem found");
        return null;
      }
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/is-my-item?uuid=${uuidItem}`,
          method: "GET",
          schema: IsMyItemSchema,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.error("Error fetching is my item:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    console.log("No data found", error);
    return null;
  }
  return data;
}

export default async function getClothingItems(
  page: number,
  limit: number,
  brandId: string | null
): Promise<CatalogItemSchemaType[]> {
  if (brandId === null) {
    console.log("No brand email found yet");
    return [];
  }
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all-self-brand?page=${page}&limit=${limit}`,
      method: "GET",
      schema: CatalogItemArraySchemaResponse,
    });
    if (data.error) {
      throw new Error(data.details);
    }
    return data.items;
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getClothingItemsBrand(
  page: number,
  limit: number,
  brandId: string | null
): Promise<CatalogItemSchemaType[]> {
  if (brandId === null) {
    console.log("No brand email found");
    return [];
  }
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all-brand?page=${page}&limit=${limit}&id=${brandId}`,
      method: "GET",
      schema: CatalogItemArraySchemaResponse,
    });
    if (data.error) {
      throw new Error(data.details);
    }
    return data.items;
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getClothingItemsHome(
  page: number,
  limit: number
): Promise<CatalogItemSchemaType[]> {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/all?page=${page}&limit=${limit}`,
      method: "GET",
      schema: CatalogItemArraySchema,
    });
    return data;
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getClothingItemsSimilar(
  page: number,
  limit: number,
  brandId: string | null
): Promise<CatalogItemSchemaType[]> {
  return getClothingItemsHome(page, limit);
}

export function useFetchClientProfile(user: UserInfo): {
  user: {
    username: string;
    email: string;
    preferences: string[];
    dateOfBirth: Date | null;
  };
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch-client-profile", user.email],
    queryFn: async () => {
      try {
        const { data } = await safeFetch({
          url: `http://${LOCAL_IP}:3000/get-self-client`,
          method: "GET",
          schema: UserSchemaRes,
        });
        if (data.error) {
          throw new Error(data.details);
        }
        return data;
      } catch (error) {
        console.error("Error fetching user data2:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    console.log("Loading...");
    return null;
  }
  if (!data) {
    console.log("No data found", error);
    return null;
  }
  return data;
}

export const fetchItems = async (search: string, page: number) => {
  const limit = 20;
  const res = await safeFetch({
    url: `http://${LOCAL_IP}:3000/all-brand-items?filter=${search}&page=${page}&limit=${limit}`,
    schema: AllBrandItemsSchemaRes,
  });
  if (res.data.error) {
    throw new Error(res.data.details);
  } else {
    return res.data.data || [];
  }
};
