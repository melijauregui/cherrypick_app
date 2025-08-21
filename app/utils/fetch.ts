import safeFetch from "./safe-fetch";
import { LOCAL_IP } from "@/config/api";
import {
  AllBrandItemsSchemaRes,
  AllBrandNamesItemsSchemaType,
  BrandSchemaPropertiesRes,
  BrandSchemaPropertiesType,
  BrandSchemaRes,
  BrandSchemaType,
} from "@/schemas/auth/brand-schema";
import {
  CatalogItemArraySchemaQuery,
  CatalogItemArraySchemaResponse,
  CatalogItemSchemaType,
  GetItemResponseSchema,
  IsMyItemSchema,
} from "@/schemas/catalog/catalog-schema";
import {
  ClientSchemaType,
  UserSchemaRes,
} from "@/schemas/auth/preferences-schema";
import {
  CheckLikeFavoriteResponseSchema,
  LikeFavoriteResponseSchema,
  LikeFavoriteResponseSchemaType,
} from "@/schemas/activity/activity";
import { ZodSchema } from "zod";

// Helper function to handle API responses consistently
const handleApiResponse = async <T>(
  apiCall: () => Promise<{ data: any }>,
  schema: ZodSchema,
  errorContext: string
): Promise<T | null> => {
  try {
    const { data } = await apiCall();

    // Validate that the schema is a union type with error/success structure
    if (!("_def" in schema) || !("options" in schema._def)) {
      throw new Error("Schema must be a ZodUnion with error/success structure");
    }

    // Parse the response with the schema to validate the structure
    const parsedData = schema.parse(data);

    // Check if it's an error response using the schema validation
    if (parsedData.error) {
      throw new Error(parsedData.details);
    }

    const { error, ...dataPart } = parsedData;
    return dataPart as T;
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
        schema: IsMyItemSchema,
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
  console.log("getBrandProfile", brandId);

  const res = await handleApiResponse<{
    brand: BrandSchemaPropertiesType;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-brand?id=${brandId}`,
        method: "GET",
        schema: BrandSchemaPropertiesRes,
      }),
    BrandSchemaPropertiesRes,
    "getBrandProfile"
  );

  return res?.brand || null;
}

export async function getBrandItems(
  page: number,
  limit: number,
  brandId: string | null
): Promise<CatalogItemSchemaType[]> {
  if (!brandId) {
    return [];
  }

  const res = await handleApiResponse<{
    items: CatalogItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/all-brand?page=${page}&limit=${limit}&id=${brandId}`,
        method: "GET",
        schema: CatalogItemArraySchemaResponse,
      }),
    CatalogItemArraySchemaResponse,
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
        url: `http://${LOCAL_IP}:3000/get-self-brand`,
        method: "GET",
        schema: BrandSchemaRes,
      }),
    BrandSchemaRes,
    "getBrandProfile"
  );
  return res?.brand || null;
}

export async function getSelfClientProfile(): Promise<{
  username: string;
  email: string;
  preferences: string[];
  dateOfBirth: Date | null;
} | null> {
  console.log("getSelfClientProfile");
  const res = await handleApiResponse<{
    user: ClientSchemaType;
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-self-client`,
        method: "GET",
        schema: UserSchemaRes,
      }),
    UserSchemaRes,
    "getSelfClientProfile"
  );
  return res?.user || null;
}

export async function getSelfBrandItems(
  page: number,
  limit: number
): Promise<CatalogItemSchemaType[]> {
  console.log("getSelfBrandItems", page, limit);
  const res = await handleApiResponse<{
    items: CatalogItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/all-self-brand?page=${page}&limit=${limit}`,
        method: "GET",
        schema: CatalogItemArraySchemaResponse,
      }),
    CatalogItemArraySchemaResponse,
    "getSelfBrandItems"
  );
  return res?.items || [];
}

export async function getClothingItemsHome(
  page: number,
  limit: number
): Promise<CatalogItemSchemaType[]> {
  console.log("getClothingItemsHome", page, limit);
  const res = await handleApiResponse<{
    items: CatalogItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/all?page=${page}&limit=${limit}`,
        method: "GET",
        schema: CatalogItemArraySchemaQuery,
      }),
    CatalogItemArraySchemaQuery,
    "getClothingItemsHome"
  );
  return res?.items || [];
}

export async function getClothingItemsSimilar(
  page: number,
  limit: number
): Promise<CatalogItemSchemaType[]> {
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
        schema: AllBrandItemsSchemaRes,
      }),
    AllBrandItemsSchemaRes,
    "fetchItems"
  );
  return res?.data || [];
};

export async function getItem(itemUuid: string): Promise<{
  item: CatalogItemSchemaType;
} | null> {
  console.log("getting item", itemUuid);
  return handleApiResponse<{ item: CatalogItemSchemaType }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-item?uuid=${itemUuid}`,
        method: "GET",
        schema: GetItemResponseSchema,
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
        schema: LikeFavoriteResponseSchema,
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
        schema: CheckLikeFavoriteResponseSchema,
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
): Promise<CatalogItemSchemaType[]> => {
  console.log("getAllLikedItems", page, limit);
  const res = await handleApiResponse<{
    items: CatalogItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-all-liked-items?page=${page}&limit=${limit}`,
        method: "GET",
        schema: CatalogItemArraySchemaQuery,
      }),
    CatalogItemArraySchemaQuery,
    "getAllLikedItems"
  );
  return res?.items || [];
};

export const getAllFavoritedItems = async (
  page: number = 0,
  limit: number = 100
): Promise<CatalogItemSchemaType[]> => {
  console.log("getAllFavoritedItems", page, limit);
  const res = await handleApiResponse<{
    items: CatalogItemSchemaType[];
  }>(
    () =>
      safeFetch({
        url: `http://${LOCAL_IP}:3000/get-all-favorited-items?page=${page}&limit=${limit}`,
        method: "GET",
        schema: CatalogItemArraySchemaQuery,
      }),
    CatalogItemArraySchemaQuery,
    "getAllFavoritedItems"
  );
  return res?.items || [];
};
