import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import * as FileSystem from "expo-file-system";
import {
  CatalogResponseSchema,
  IsMyItemSchema,
  ItemResponseSchema,
  ItemSchemaType,
  UuidItemsSchemaResponse,
  UuidNameResponseSchema,
  UuidNameSchemaType,
} from "@/schemas/catalog/catalog-schema";
import { CheckLikeFavoriteResponseSchema } from "@/schemas/catalog/like-favorite-schema.ts";
import z, { ZodSchema } from "zod";
import {
  ClientSchemaResponse,
  ClientSchemaType,
} from "@/schemas/client/client-schema";
import {
  BrandSchemaPropertiesResponse,
  BrandSchemaType,
  BrandSchemaResponse,
} from "@/schemas/brand/brand-schema";
import {
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import {
  AllInspirationItemsResponseSchema,
  EmbbedingResponseSchema,
} from "@/schemas/search/search-schema";
import {
  QueryIdSchema,
  QueryIdSchemaType,
} from "@/schemas/standar-query-schema";
import {
  VerifyUserExistsResponseSchema,
  VerifyUserExistsResponseSchemaType,
} from "@/schemas/user/user-schema";

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
): Promise<BrandSchemaType | null> {
  if (!brandId) {
    return null;
  }

  const res = await handleApiResponse<{
    brand: BrandSchemaType;
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
  // console.log("getSelfBrandProfile");
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
  // console.log("getSelfClientProfile");
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
  limit: number,
  search?: string
): Promise<ItemSchemaType[]> {
  console.log("getSelfBrandItems", page, limit, search);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/all-items?page=${page}&limit=${limit}${search ? `&filter=${search}` : ""}`,
        method: "GET",
      }),
    CatalogResponseSchema,
    "getSelfBrandItems"
  );
  return res?.items || [];
}

export async function getSelfBrandInspoItems(): Promise<QueryIdSchemaType[]> {
  const res = await handleApiResponse<{
    items: QueryIdSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/brand/inspo-items`,
        method: "GET",
      }),
    UuidItemsSchemaResponse,
    "getSelfBrandInspoItems"
  );
  return res?.items || [];
}

export async function getClothingItemsHome(
  page: number,
  limit: number
): Promise<ItemSchemaType[]> {
  // console.log("getClothingItemsHome", page, limit);
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

export const getAllBrands = async (
  search: string,
  page: number
): Promise<UuidNameSchemaType[]> => {
  const limit = 10;
  const res = await handleApiResponse<{
    data: UuidNameSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/search/all-brands?filter=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    UuidNameResponseSchema,
    "getAllBrands"
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
  return res?.isSelected;
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
  // console.log("getAllLikedItems", page, limit);
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
  // console.log("getAllFavoritedItems", page, limit);
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
  embedding: number[],
  minPrice?: number,
  maxPrice?: number,
  brandIds?: string[]
): Promise<ItemSchemaType[]> => {
  if (embedding.length === 0) {
    return [];
  }
  // console.log("getClothingItemsTextSearch", page, limit, embedding.length);
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/search/text?page=${page}&limit=${limit}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embedding: embedding,
          minPrice: minPrice,
          maxPrice: maxPrice,
          brandIds: brandIds,
        }),
      }),
    CatalogResponseSchema,
    "getClothingItemsTextSearch"
  );
  return res?.items || [];
};

export const getClothingItemsSimilar = async (
  page: number,
  limit: number,
  embedding: number[],
  imageUrl: string
): Promise<ItemSchemaType[]> => {
  // console.log(
  //   "getClothingItemsSimilar",
  //   page,
  //   limit,
  //   embedding.length,
  //   imageUrl
  // );
  if (embedding.length === 0) {
    return [];
  }
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
          embedding: embedding,
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
  embedding: number[],
  minPrice?: number,
  maxPrice?: number,
  brandIds?: string[]
): Promise<ItemSchemaType[]> {
  if (embedding.length === 0) {
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
          embedding: embedding,
          minPrice: minPrice,
          maxPrice: maxPrice,
          brandIds: brandIds,
        }),
      }),
    CatalogResponseSchema,
    "getClothingItemsSimilarBase64"
  );
  return res?.items || [];
}

export async function getEmbedding(
  type: "text" | "image",
  query: string
): Promise<number[] | null> {
  if (query.length === 0) {
    return null;
  }
  const res = await handleApiResponse<{
    embedding: number[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/search/embedding/${type}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      }),
    EmbbedingResponseSchema,
    "getEmbedding"
  );
  return res?.embedding || null;
}

export async function getItemEmbedding(
  itemUuid: string
): Promise<number[] | null> {
  const res = await handleApiResponse<{
    embedding: number[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/item/${itemUuid}/embedding`,
        method: "GET",
      }),
    EmbbedingResponseSchema,
    "getItemEmbedding"
  );
  return res?.embedding || null;
}

export async function getInspirationItems(
  category: string
): Promise<ItemSchemaType[] | null> {
  const res = await handleApiResponse<{
    items: ItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/search/all-inspiration-items?category=${category}`,
        method: "GET",
      }),
    CatalogResponseSchema,
    "getInspirationItems"
  );
  return res?.items || null;
}

export async function getExpirationCode(): Promise<Date | null> {
  const res = await handleApiResponse<{
    expirationTime: string;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/code-verification/expiration`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    SuccessSchema.extend({ expirationTime: z.string() }),
    "getExpirationCode"
  );
  return new Date(res?.expirationTime ?? "") || null;
}

export async function verifyCode(
  code: string,
  email: string
): Promise<{ isCorrect: boolean } | null> {
  const res = await handleApiResponse<{
    isCorrect: boolean;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/code-verification/verify`,
        method: "POST",
        body: JSON.stringify({ code, email }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    SuccessSchema.extend({ isCorrect: z.boolean() }),
    "verifyCode"
  );
  return res || null;
}

export async function getExpirationCodeResetPassword(
  email: string
): Promise<Date | null> {
  const res = await handleApiResponse<{
    expirationTime: string;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/code-verification/expiration-reset-password`,
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    SuccessSchema.extend({ expirationTime: z.string() }),
    "getExpirationCodeResetPassword"
  );
  console.log("getExpirationCodeResetPassword", res);
  return new Date(res?.expirationTime ?? "") || null;
}

export async function verifyMailAvailability(
  email: string
): Promise<VerifyUserExistsResponseSchemaType | ErrorSchemaType> {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/user/verify`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (data.error) {
      throw new Error(data.details || "Unexpected error");
    }
    VerifyUserExistsResponseSchema.parse(data);
    return data;
  } catch (error: unknown) {
    return {
      error: true,
      details: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
