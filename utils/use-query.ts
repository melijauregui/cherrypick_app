import { useSession } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import {
  checkIsMyItem,
  getSelfClientProfile,
  getBrandProfile,
  getItemEmbedding,
  getEmbedding,
} from "./fetch";
import { ClientSchemaType } from "@/schemas/client/client-schema";
import { BrandSchemaType } from "@/schemas/brand/brand-schema";

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
  user: ClientSchemaType;
} | null {
  const { data, isLoading, error } = useQuery({
    queryKey: ["self-client-profile", user.email],
    queryFn: () => getSelfClientProfile(),
    staleTime: 5 * 60 * 1000,
  });

  console.log("useFetchClientProfile data:", data);

  if (isLoading) {
    console.log("Loading...");
    return null;
  }
  if (!data) {
    return null;
  }
  return { user: data };
}

export function useFetchBrandProfileItem(brandId: string): {
  brand: BrandSchemaType;
} | null {
  const { user } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["brand-profile-item", brandId],
    queryFn: () => {
      // console.log("fetching brand profile item", brandId);
      return getBrandProfile(brandId);
    },
    enabled: !!user && !!brandId,
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

export function useFetchItemEmbedding(itemUuid: string): {
  embedding: number[];
} | null {
  const { user } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["item-embedding", itemUuid],
    queryFn: () => getItemEmbedding(itemUuid),
    enabled: !!user && !!itemUuid,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return null;
  }
  if (!data) {
    return null;
  }
  return { embedding: data };
}
