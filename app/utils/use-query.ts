import { useSession } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import {
  checkIsMyItem,
  getSelfClientProfile,
  getSelfBrandProfile,
  getBrandProfile,
  getItem,
} from "./fetch";
import { CatalogItemSchemaType } from "@/schemas/catalog/catalog-schema";

export default function useIsMyItem(uuidItem: string): boolean | null {
  const { user } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["is-my-item", uuidItem],
    queryFn: () => checkIsMyItem(uuidItem, user?.email),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }
  return data;
}

interface UserInfo {
  email: string;
  name: string;
}
export type { UserInfo };
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
    queryFn: () => getSelfClientProfile(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    console.log("Loading...");
    return null;
  }
  if (!data) {
    return null;
  }
  return { user: data };
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
    queryFn: () => getSelfBrandProfile(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }
  return { brand: data };
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
    queryFn: () => {
      console.log("fetching brand profile item", brandId);
      return getBrandProfile(brandId);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }
  return { brand: data };
}

export function useFetchItem(itemUuid: string): {
  item: CatalogItemSchemaType;
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item-detail", itemUuid],
    queryFn: () => getItem(itemUuid),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }

  return data;
}
