import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import {
  AllBrandItemsSchemaRes,
  AllBrandNamesItemsSchemaType,
} from "@/schemas/auth/brand-schema";
import {
  CatalogItemArraySchemaQuery,
  CatalogSchemaResponse,
  GetItemResponseSchema,
  IsMyItemSchema,
  ItemSchemaType,
} from "@/schemas/catalog/catalog-schema";
import {
  CheckLikeFavoriteResponseSchema,
  LikeFavoriteResponseSchema,
  LikeFavoriteResponseSchemaType,
} from "@/schemas/activity/activity";
import { ZodSchema } from "zod";
import {
  ClientSchemaResponse,
  ClientSchemaType,
} from "@/schemas/client/client-schema";
import {
  BrandSchemaPropertiesResponse,
  BrandSchemaPropertiesType,
  BrandSchemaResponse,
  BrandSchemaType,
} from "@/schemas/brand/brand-schema";

// Helper function to handle API responses consistently
const handleApiResponse = async <T>(
  apiCall: () => Promise<{ data: any }>,
  schema: ZodSchema,
  errorContext: string
): Promise<T | null> => {
  try {
    const { data } = await apiCall();

    // Check if it's an error response
    if (data.error) {
      throw new Error(data.details + (data.info ?? ""));
    }

    const parsedData = schema.parse(data);
    const { error, ...dataPart } = parsedData;
    return { ...dataPart } as T;
  } catch (error) {
    console.error(`Error in ${errorContext}:`, error);
    return null;
  }
};
export default handleApiResponse;

export const handleAuthError = (error: unknown, context: string) => {
  if (
    error instanceof Error &&
    error.message.includes("Network response was not ok")
  ) {
    // Silently handle authentication errors - user likely logged out
    return null;
  }
  // Re-throw other errors
  throw error;
};

export async function checkIsMyItem(
  uuidItem: string,
  userEmail?: string
): Promise<boolean | null> {
  if (!userEmail || !uuidItem) {
    return null;
  }
  const res = await handleApiResponse<{ isMyItem: boolean }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/is-my-item?uuid=${uuidItem}`,
        method: "GET",
      }),
    IsMyItemSchema,
    "checkIsMyItem"
  );
  return res?.isMyItem ?? null;
}

export async function getBrandProfile(
  brandId: string
): Promise<BrandSchemaPropertiesType | null> {
  if (!brandId) {
    return null;
  }

  const res = await handleApiResponse<{
    brand: BrandSchemaPropertiesType;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/${brandId}`,
        method: "GET",
      }),
    BrandSchemaPropertiesResponse,
    "getBrandProfileId"
  );

  return res?.brand || null;
}

export async function getBrandItems(
  page: number,
  limit: number,
  brandId: string | null
): Promise<ItemSchemaType[]> {
  if (!brandId) {
    return [];
  }

  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/${brandId}/all-items?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogSchemaResponse,
    "getBrandItems"
  );
  return res?.items || [];
}

export async function getSelfBrandProfile(): Promise<BrandSchemaType | null> {
  console.log("getSelfBrandProfile");
  const res = await handleApiResponse<{
    brand: BrandSchemaType;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/brand`,
        method: "GET",
      }),
    BrandSchemaResponse,
    "getSelfBrandProfile"
  );
  return res?.brand || null;
}

export async function getSelfClientProfile(): Promise<ClientSchemaType | null> {
  console.log("getSelfClientProfile");
  const res = await handleApiResponse<{
    user: ClientSchemaType;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/client`,
        method: "GET",
      }),
    ClientSchemaResponse,
    "getSelfClientProfile"
  );
  return res?.user || null;
}

export async function getSelfBrandItems(
  page: number,
  limit: number
): Promise<ItemSchemaType[]> {
  console.log("getSelfBrandItems", page, limit);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/all-items?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogSchemaResponse,
    "getSelfBrandItems"
  );
  return res?.items || [];
}

export async function getClothingItemsHome(
  page: number,
  limit: number
): Promise<ItemSchemaType[]> {
  console.log("getClothingItemsHome", page, limit);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/feed?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogItemArraySchemaQuery,
    "getClothingItemsHome"
  );
  return res?.items || [];
}

export async function getClothingItemsSimilar(
  page: number,
  limit: number
): Promise<ItemSchemaType[]> {
  return getClothingItemsHome(page, limit);
}

export const fetchItems = async (
  search: string,
  page: number
): Promise<AllBrandNamesItemsSchemaType[]> => {
  const limit = 20;
  const res = await handleApiResponse<{
    data: AllBrandNamesItemsSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/all-brand-items?filter=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    AllBrandItemsSchemaRes,
    "fetchItems"
  );
  return res?.data || [];
};

export async function getItem(itemUuid: string): Promise<{
  item: ItemSchemaType;
} | null> {
  console.log("getting item", itemUuid);
  return handleApiResponse<{ item: ItemSchemaType }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-item?uuid=${itemUuid}`,
        method: "GET",
      }),
    GetItemResponseSchema,
    "getItem"
  );
}

// Funciones para likes y favoritos
const toggleLikeFavorite = async (
  action: "like" | "favorite",
  itemUuid: string
) => {
  const res = await handleApiResponse<LikeFavoriteResponseSchemaType>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/toggle-${action}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_uuid: itemUuid,
        }),
      }),
    LikeFavoriteResponseSchema,
    "toggleLikeFavorite"
  );
  return res;
};

const checkLikeFavorite = async (
  action: "like" | "favorite",
  itemUuid: string
) => {
  const res = await handleApiResponse<{
    isSelected: boolean;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/check-${action}?item_uuid=${itemUuid}`,
        method: "GET",
      }),
    CheckLikeFavoriteResponseSchema,
    "checkLikeFavorite"
  );
  return res?.isSelected ?? null;
};

export const toggleLike = async (userEmail: string, itemUuid: string) => {
  return toggleLikeFavorite("like", itemUuid);
};

export const toggleFavorite = async (userEmail: string, itemUuid: string) => {
  return toggleLikeFavorite("favorite", itemUuid);
};

export const checkIfLiked = async (userEmail: string, itemUuid: string) => {
  if (!userEmail || !itemUuid) {
    return null;
  }
  return checkLikeFavorite("like", itemUuid);
};

export const checkIfFavorited = async (userEmail: string, itemUuid: string) => {
  if (!userEmail || !itemUuid) {
    return null;
  }
  return checkLikeFavorite("favorite", itemUuid);
};

// Funciones para obtener todos los items liked y favorited
export const getAllLikedItems = async (
  page: number = 0,
  limit: number = 100,
  brandId: string | null = null
): Promise<ItemSchemaType[]> => {
  console.log("getAllLikedItems", page, limit);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-all-liked-items?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogItemArraySchemaQuery,
    "getAllLikedItems"
  );
  return res?.items || [];
};

export const getAllFavoritedItems = async (
  page: number = 0,
  limit: number = 100
): Promise<ItemSchemaType[]> => {
  console.log("getAllFavoritedItems", page, limit);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-all-favorited-items?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogItemArraySchemaQuery,
    "getAllFavoritedItems"
  );
  return res?.items || [];
};
