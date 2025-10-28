import Constants from "expo-constants";

const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP ?? "localhost";
export const BETTER_AUTH_URL =
  Constants.expoConfig?.extra?.BETTER_AUTH_URL ?? "http://localhost:3000";
const PROD_BACKEND = Constants.expoConfig?.extra?.PROD_BACKEND ?? "";
const ENVIRONMENT = Constants.expoConfig?.extra?.ENVIRONMENT ?? "development";

export const BASE_URL =
  ENVIRONMENT === "production"
    ? `https://${PROD_BACKEND}`
    : `http://${LOCAL_IP}:3000`;
