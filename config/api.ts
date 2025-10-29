import Constants from "expo-constants";

const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP ?? "localhost";

const PROD_BACKEND = Constants.expoConfig?.extra?.PROD_BACKEND ?? "";
const ENVIRONMENT = Constants.expoConfig?.extra?.ENVIRONMENT ?? "development";

export const BASE_URL =
  ENVIRONMENT === "production"
    ? `https://${PROD_BACKEND}`
    : `http://${LOCAL_IP}:3000`;

export const BETTER_AUTH_URL =
  ENVIRONMENT === "production"
    ? `https://${PROD_BACKEND}`
    : (Constants.expoConfig?.extra?.BETTER_AUTH_URL ?? "http://localhost:3000");

console.log("BASE_URL", BASE_URL);
console.log("LOCAL_IP", LOCAL_IP);
console.log("PROD_BACKEND", PROD_BACKEND);
console.log("ENVIRONMENT", ENVIRONMENT);
console.log("BETTER_AUTH_URL", BETTER_AUTH_URL);
