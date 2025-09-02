import * as dotenv from "dotenv";
dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SMTP_USER,
  SMTP_PASS,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  WEAVIATE_URL,
  WEAVIATE_API_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DATABASE_URL,
  DATABASE_PORT,
  ENVIRONMENT,
  HOSTNAME,
  PORT,
} = process.env;
const REQUIRED_VARS = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SMTP_USER,
  SMTP_PASS,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  WEAVIATE_URL,
  WEAVIATE_API_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DATABASE_URL,
  DATABASE_PORT,
  ENVIRONMENT,
  HOSTNAME,
  PORT,
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
  GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET as string,
  SMTP_USER: SMTP_USER as string,
  SMTP_PASS: SMTP_PASS as string,
  BETTER_AUTH_SECRET: BETTER_AUTH_SECRET as string,
  BETTER_AUTH_URL: BETTER_AUTH_URL as string,
  WEAVIATE_URL: WEAVIATE_URL as string,
  WEAVIATE_API_KEY: WEAVIATE_API_KEY as string,
  DB_USER: DB_USER as string,
  DB_PASSWORD: DB_PASSWORD as string,
  DB_NAME: DB_NAME as string,
  DB_HOST: DB_HOST as string,
  DATABASE_URL: DATABASE_URL as string,
  DATABASE_PORT: DATABASE_PORT as string,
  ENVIRONMENT: ENVIRONMENT as string,
  HOSTNAME: HOSTNAME as string,
  PORT: PORT as string,
};
