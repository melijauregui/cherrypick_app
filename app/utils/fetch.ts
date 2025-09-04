import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import * as FileSystem from "expo-file-system";
import {} from "@/schemas/auth/brand-schema";
import {
  CatalogResponseSchema,
  IsMyItemSchema,
  ItemResponseSchema,
  ItemSchemaType,
  ItemUuidNameResponseSchema,
  ItemUuidNameSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { CheckLikeFavoriteResponseSchema } from "@/schemas/catalog/like-favorite-schema.ts";
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
import {
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";

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

// Helper function to convert image URI to base64
export const convertUriToBase64 = async (
  uri: string
): Promise<string | null> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error("Error converting URI to base64:", error);
    return null;
  }
};

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
        url: `http://${LOCAL_IP}:3000/item/${uuidItem}/is-mine`,
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
    CatalogResponseSchema,
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
    CatalogResponseSchema,
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
    CatalogResponseSchema,
    "getClothingItemsHome"
  );
  return res?.items || [];
}

export const getItemsUuidNames = async (
  search: string,
  page: number
): Promise<ItemUuidNameSchemaType[]> => {
  const limit = 20;
  const res = await handleApiResponse<{
    items: ItemUuidNameSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/all-names-items?filter=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    ItemUuidNameResponseSchema,
    "getItemsUuidNames"
  );
  return res?.items || [];
};

export async function getItem(itemUuid: string): Promise<{
  item: ItemSchemaType;
} | null> {
  console.log("getting item", itemUuid);
  return handleApiResponse<{ item: ItemSchemaType }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/item/${itemUuid}`,
        method: "GET",
      }),
    ItemResponseSchema,
    "getItem"
  );
}

// Funciones para likes y favoritos
const toggleLikeFavorite = async (
  action: "like" | "favorite",
  itemUuid: string
) => {
  const res = await handleApiResponse<SuccessSchemaType>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/item/${itemUuid}/toggle-${action}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    SuccessSchema,
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
        url: `http://${LOCAL_IP}:3000/item/${itemUuid}/check-${action}`,
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
  limit: number = 10,
  brandId: string | null = null
): Promise<ItemSchemaType[]> => {
  console.log("getAllLikedItems", page, limit);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/user/all-liked?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogResponseSchema,
    "getAllLikedItems"
  );
  return res?.items || [];
};

export const getAllFavoritedItems = async (
  page: number = 0,
  limit: number = 10
): Promise<ItemSchemaType[]> => {
  console.log("getAllFavoritedItems", page, limit);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/user/all-favorited?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogResponseSchema,
    "getAllFavoritedItems"
  );
  return res?.items || [];
};

export const getClothingItemsTextSearch = async (
  page: number,
  limit: number,
  query: string
): Promise<ItemSchemaType[]> => {
  console.log("getClothingItemsTextSearch", page, limit, query);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/search/text/${query}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    CatalogResponseSchema,
    "getClothingItemsTextSearch"
  );
  return res?.items || [];
};

export const getClothingItemsSimilar = async (
  page: number,
  limit: number,
  imageUrl: string
): Promise<ItemSchemaType[]> => {
  console.log("getClothingItemsSimilar", page, limit);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/search/image/url?page=${page}&limit=${limit}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
        }),
      }),
    CatalogResponseSchema,
    "getClothingItemsSimilar"
  );
  return res?.items || [];
};

export async function getClothingItemsSimilarBase64(
  page: number,
  limit: number,
  imageBase64?: string | null
): Promise<ItemSchemaType[]> {
  // If no image base64 provided, return empty array
  if (!imageBase64) {
    console.warn("No image base64 provided in getClothingItemsSimilarBase64");
    return [];
  }

  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/search/image/base64?page=${page}&limit=${limit}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: imageBase64,
        }),
      }),
    CatalogResponseSchema,
    "getClothingItemsSimilarBase64"
  );
  return res?.items || [];
}
