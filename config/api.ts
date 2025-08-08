import Constants from "expo-constants";

export const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP ?? "localhost";
export const BETTER_AUTH_URL = Constants.expoConfig?.extra?.BETTER_AUTH_URL ?? "http://localhost:3000";