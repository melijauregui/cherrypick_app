// db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'cherrypick',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'cherrypick_db',
});
