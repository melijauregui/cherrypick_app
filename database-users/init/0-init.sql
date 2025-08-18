CREATE DATABASE IF NOT EXISTS cherrypick_db;

USE cherrypick_db;

DROP USER IF EXISTS 'cherrypick' @'%';

CREATE USER 'cherrypick' @'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON cherrypick_db.* TO 'cherrypick' @'%';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS clients (
    email VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    preferences JSON
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS registerInProgress (
    email VARCHAR(50) PRIMARY KEY,
    verification_code VARCHAR(6) NOT NULL,
    verification_code_expiration VARCHAR(30) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS brands (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Nueva tabla para likes de items
CREATE TABLE IF NOT EXISTS item_likes_client (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_email VARCHAR(50) NOT NULL,
    item_uuid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES clients(email)  ON DELETE CASCADE,
    UNIQUE KEY unique_user_item (user_email, item_uuid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Nueva tabla para favoritos de items
CREATE TABLE IF NOT EXISTS item_favorites_client (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_email VARCHAR(50) NOT NULL,
    item_uuid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES clients(email) ON DELETE CASCADE,
    UNIQUE KEY unique_user_item (user_email, item_uuid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Nueva tabla para likes de items
CREATE TABLE IF NOT EXISTS item_likes_brand (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_email VARCHAR(50) NOT NULL,
    item_uuid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES brands(email)  ON DELETE CASCADE,
    UNIQUE KEY unique_user_item (user_email, item_uuid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Nueva tabla para favoritos de items
CREATE TABLE IF NOT EXISTS item_favorites_brand (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_email VARCHAR(50) NOT NULL,
    item_uuid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES brands(email) ON DELETE CASCADE,
    UNIQUE KEY unique_user_item (user_email, item_uuid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
