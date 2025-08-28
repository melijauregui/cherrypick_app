import * as dotenv from "dotenv";
dotenv.config();

const {
  EXPO_PUBLIC_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_IOS_CLIENT_ID,
  SMTP_USER,
  SMTP_PASS,
  WEAVIATE_URL,
  WEAVIATE_API_KEY,
  DATABASE_URL,
} = process.env;
const REQUIRED_VARS = {
  EXPO_PUBLIC_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_IOS_CLIENT_ID,
  SMTP_USER,
  SMTP_PASS,
  WEAVIATE_URL,
  WEAVIATE_API_KEY,
  DATABASE_URL,
};

// Check if any required variable is missing
const missingVars = Object.entries(REQUIRED_VARS).filter(
  ([key, value]) => !value
);
if (missingVars.length > 0) {
  throw new Error(
    `❌ Missing environment variables: ${missingVars
      .map(([key]) => key)
      .join(", ")}`
  );
}

// Export the variables for easy use
export const config = {
  EXPO_PUBLIC_ANDROID_CLIENT_ID: process.env
    .EXPO_PUBLIC_ANDROID_CLIENT_ID as string,
  EXPO_PUBLIC_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_IOS_CLIENT_ID as string,
  EXPO_PUBLIC_IP: process.env.EXPO_PUBLIC_IP as string,
  SMTP_USER: process.env.SMTP_USER as string,
  SMTP_PASS: process.env.SMTP_PASS as string,
  WEAVIATE_URL: process.env.WEAVIATE_URL as string,
  WEAVIATE_API_KEY: process.env.WEAVIATE_API_KEY as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
};
