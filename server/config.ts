import * as dotenv from "dotenv";
dotenv.config();

const {
  PINECONE_API_KEY,
  PINECONE_INDEX_NAME,
  PINECONE_HOST_NAME,
  PINECONE_NAMESPACE,
  EXPO_PUBLIC_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_IOS_CLIENT_ID,
  EXPO_PUBLIC_IP,
  SMTP_USER,
  SMTP_PASS,
} = process.env;
const REQUIRED_VARS = {
  PINECONE_API_KEY,
  PINECONE_INDEX_NAME,
  PINECONE_HOST_NAME,
  PINECONE_NAMESPACE,
  EXPO_PUBLIC_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_IOS_CLIENT_ID,
  SMTP_USER,
  SMTP_PASS,
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
  PINECONE_API_KEY: process.env.PINECONE_API_KEY as string,
  PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME as string,
  PINECONE_HOST_NAME: process.env.PINECONE_HOST_NAME as string,
  PINECONE_NAMESPACE: process.env.PINECONE_NAMESPACE as string,
  EXPO_PUBLIC_ANDROID_CLIENT_ID: process.env
    .EXPO_PUBLIC_ANDROID_CLIENT_ID as string,
  EXPO_PUBLIC_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_IOS_CLIENT_ID as string,
  EXPO_PUBLIC_IP: process.env.EXPO_PUBLIC_IP as string,
  SMTP_USER: process.env.SMTP_USER as string,
  SMTP_PASS: process.env.SMTP_PASS as string,
};
