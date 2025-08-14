CREATE DATABASE IF NOT EXISTS cherrypick_db;

USE cherrypick_db;

DROP USER IF EXISTS 'cherrypick' @'%';

CREATE USER 'cherrypick' @'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON cherrypick_db.* TO 'cherrypick' @'%';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS users (
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

CREATE TABLE IF NOT EXISTS likes (
    userEmail VARCHAR(50) NOT NULL,        
    brand VARCHAR(50) NOT NULL,
    itemName VARCHAR(50) NOT NULL,         
    FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (brand) REFERENCES brands(email) ON DELETE CASCADE,
    PRIMARY KEY (userEmail, brand, itemName)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
