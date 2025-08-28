-- PostgreSQL initialization script for CherryPick
-- This script creates the database and tables for the CherryPick application

-- Create tables
CREATE TABLE IF NOT EXISTS "Client" (
    email VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    "dateOfBirth" TIMESTAMP,
    preferences JSONB
);

CREATE TABLE IF NOT EXISTS "RegisterInProgress" (
    email VARCHAR(50) PRIMARY KEY,
    "verificationCode" VARCHAR(6) NOT NULL,
    "verificationCodeExpiration" VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Brand" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    "logoUrl" VARCHAR(255) NOT NULL
);

-- Table for client likes
CREATE TABLE IF NOT EXISTS "ItemLikeClient" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userEmail" VARCHAR(50) NOT NULL,
    "itemUuid" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userEmail") REFERENCES "Client"(email) ON DELETE CASCADE,
    UNIQUE("userEmail", "itemUuid")
);

-- Table for client favorites
CREATE TABLE IF NOT EXISTS "ItemFavoriteClient" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userEmail" VARCHAR(50) NOT NULL,
    "itemUuid" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userEmail") REFERENCES "Client"(email) ON DELETE CASCADE,
    UNIQUE("userEmail", "itemUuid")
);

-- Table for brand likes
CREATE TABLE IF NOT EXISTS "ItemLikeBrand" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userEmail" VARCHAR(50) NOT NULL,
    "itemUuid" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userEmail") REFERENCES "Brand"(email) ON DELETE CASCADE,
    UNIQUE("userEmail", "itemUuid")
);

-- Table for brand favorites
CREATE TABLE IF NOT EXISTS "ItemFavoriteBrand" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userEmail" VARCHAR(50) NOT NULL,
    "itemUuid" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userEmail") REFERENCES "Brand"(email) ON DELETE CASCADE,
    UNIQUE("userEmail", "itemUuid")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_email ON "Client"(email);
CREATE INDEX IF NOT EXISTS idx_brand_email ON "Brand"(email);
CREATE INDEX IF NOT EXISTS idx_brand_id ON "Brand"(id);
CREATE INDEX IF NOT EXISTS idx_item_likes_client_user ON "ItemLikeClient"("userEmail");
CREATE INDEX IF NOT EXISTS idx_item_likes_client_item ON "ItemLikeClient"("itemUuid");
CREATE INDEX IF NOT EXISTS idx_item_favorites_client_user ON "ItemFavoriteClient"("userEmail");
CREATE INDEX IF NOT EXISTS idx_item_favorites_client_item ON "ItemFavoriteClient"("itemUuid");
CREATE INDEX IF NOT EXISTS idx_item_likes_brand_user ON "ItemLikeBrand"("userEmail");
CREATE INDEX IF NOT EXISTS idx_item_likes_brand_item ON "ItemLikeBrand"("itemUuid");
CREATE INDEX IF NOT EXISTS idx_item_favorites_brand_user ON "ItemFavoriteBrand"("userEmail");
CREATE INDEX IF NOT EXISTS idx_item_favorites_brand_item ON "ItemFavoriteBrand"("itemUuid");
