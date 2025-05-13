CREATE DATABASE IF NOT EXISTS cherrypick_db;

USE cherrypick_db;

DROP USER IF EXISTS 'cherrypick' @'%';

CREATE USER 'cherrypick' @'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON cherrypick_db.* TO 'cherrypick' @'%';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    date_of_birth DATE
);

CREATE TABLE IF NOT EXISTS registerInProgress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    verification_code VARCHAR(6) NOT NULL,
    verification_code_expiry DATETIME NOT NULL
);

/* CREATE TABLE IF NOT EXISTS clothingItem (
id INT AUTO_INCREMENT PRIMARY KEY,
description VARCHAR(255) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
brand VARCHAR(50) NOT NULL,
);

CREATE TABLE IF NOT EXISTS likes (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,        
item_id INT NOT NULL,         
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (item_id) REFERENCES clothingItem(id) ON DELETE CASCADE,
);

CREATE TABLE IF NOT EXISTS views (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,        
item_id INT NOT NULL,         
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (item_id) REFERENCES clothingItem(id) ON DELETE CASCADE,
); */