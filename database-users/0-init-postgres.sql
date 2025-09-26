-- PostgreSQL initialization script for CherryPick
-- This script creates the database and tables for the CherryPick application

-- Table for register in progress
CREATE TABLE IF NOT EXISTS "RegisterInProgress" (
    email VARCHAR(50) PRIMARY KEY,
    "verificationCode" VARCHAR(6) NOT NULL,
    "verificationCodeExpiration" VARCHAR(30) NOT NULL
);

-- Create unified users table
CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(50) UNIQUE NOT NULL,
    "userType" VARCHAR(10) NOT NULL CHECK ("userType" IN ('client', 'brand'))
);

-- Table for client
CREATE TABLE IF NOT EXISTS "Client" (
    "userId" UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    "dateOfBirth" TIMESTAMP,
    preferences JSONB,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Table for brand
CREATE TABLE IF NOT EXISTS "Brand" (
    "userId" UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    "logoUrl" VARCHAR(255) NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Table for likes (unified for both clients and brands)
CREATE TABLE IF NOT EXISTS "ItemLike" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "itemUuid" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    UNIQUE("userId", "itemUuid")
);

-- Table for favorites (unified for both clients and brands)
CREATE TABLE IF NOT EXISTS "ItemFavorite" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "itemUuid" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    UNIQUE("userId", "itemUuid")
);

-- Table for inspiration items
CREATE TABLE IF NOT EXISTS "InspoItems" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "itemUuid" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_user_type ON "User"("userType");
CREATE INDEX IF NOT EXISTS idx_client_user_id ON "Client"("userId");
CREATE INDEX IF NOT EXISTS idx_brand_user_id ON "Brand"("userId");
CREATE INDEX IF NOT EXISTS idx_item_likes_user ON "ItemLike"("userId");
CREATE INDEX IF NOT EXISTS idx_item_likes_item ON "ItemLike"("itemUuid");
CREATE INDEX IF NOT EXISTS idx_item_favorites_user ON "ItemFavorite"("userId");
CREATE INDEX IF NOT EXISTS idx_item_favorites_item ON "ItemFavorite"("itemUuid");
