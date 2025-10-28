import Constants from "expo-constants";

export const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP ?? "localhost";
export const BETTER_AUTH_URL =
  Constants.expoConfig?.extra?.BETTER_AUTH_URL ?? "http://localhost:3000";
export const PROD_BACKEND = Constants.expoConfig?.extra?.PROD_BACKEND ?? "";
export const ENVIRONMENT =
  Constants.expoConfig?.extra?.ENVIRONMENT ?? "development";

export const BASE_URL =
  ENVIRONMENT === "production" ? PROD_BACKEND : `http://${LOCAL_IP}:3000`;
