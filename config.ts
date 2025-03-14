// import { PINECONE_API_KEY, PINECONE_INDEX_NAME, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";

// // Required variables
// const REQUIRED_VARS = { PINECONE_API_KEY, PINECONE_INDEX_NAME, ANDROID_CLIENT_ID, IOS_CLIENT_ID };

// // Check if any required variable is missing
// const missingVars = Object.entries(REQUIRED_VARS).filter(([key, value]) => !value);
// if (missingVars.length > 0) {
//   throw new Error(`❌ Missing environment variables: ${missingVars.map(([key]) => key).join(", ")}`);
// }

// // Export the variables for easy use
// export const config = {
//   ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID as string,
//   IOS_CLIENT_ID: process.env.IOS_CLIENT_ID as string,
//   PINECONE_API_KEY: process.env.PINECONE_API_KEY as string,
//   PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME as string,
// };