import { CatalogResponseSchemaType, ItemSchema, ItemSchemaType } from "@/schemas/catalog/catalog-schema";
import { GetEmbedding, SearchItems, SearchPersonalizedItems } from "../search/functions";
import { GetClient } from "../client/functions";
import { UserData } from "@/schemas/client/client-schema";
import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import { getAllLikedItems } from "../catalog/like-favorite";
import { GetCatalog } from "../catalog/functions";

const LIKES_PAGE = 0;
const LIKES_LIMIT = 5;


export async function GetUserFeed(user: UserData, page: number, limit: number
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
    const resultClient = await GetClient(user.id);
    if (resultClient.error) {
        return {
            error: true,
            details: "Cliente no encontrado",
        };
    }
    const client = resultClient.user;

    const preferencesArray = client.preferences;
    const resultLikes = await getAllLikedItems(user.id, LIKES_PAGE, LIKES_LIMIT);
    if (resultLikes.error) {
        return {
            error: true,
            details: "Error obteniendo los likes del cliente",
        };
    }

    const likes = resultLikes.items;
    const likesDescriptions = likes.map(item => item.description);

    return await GetPersonalizedFeed(preferencesArray, likesDescriptions, page, limit);
}

export async function GetBrandFeed(brand: UserData, page: number, limit: number): Promise<CatalogResponseSchemaType | ErrorSchemaType> {
    const resultLikes = await getAllLikedItems(brand.id, LIKES_PAGE, LIKES_LIMIT);
    if (resultLikes.error) {
        return {
            error: true,
            details: "Error obteniendo los likes de la marca",
        };
    }

    const likes = resultLikes.items;
    const likesDescriptions = likes.map(item => item.description);
    return await GetPersonalizedFeed([], likesDescriptions, page, limit);
}

export async function GetPersonalizedFeed(
    preferences: string[],
    likesDescriptions: string[],
    page: number,
    limit: number
): Promise<CatalogResponseSchemaType | ErrorSchemaType> {

    let pageResults: ItemSchemaType[] = [];

    if (preferences.length === 0 && likesDescriptions.length === 0) {
        const result = await GetCatalog(page, limit, undefined);
        if (result.error) {
            return {
                error: true,
                details: "Error querying Weaviate",
            };
        }
        pageResults = result.items;
    } else {
        const allResults = await SearchPersonalizedItems(preferences, likesDescriptions, limit, page);
        if (allResults.error) {
            console.error("Error searching preferred items:", allResults.details);
            return allResults;
        }
        pageResults = allResults.items;//.slice(page * limit, (page + 1) * limit);
    }


    const shuffledResults = shuffleArray(pageResults);
    return { error: false, items: shuffledResults };
}

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j] as T, arr[i] as T];
    }
    return arr;
}
