CREATE TABLE IF NOT EXISTS "user" (
    "id" text not null primary key, 
    "name" text not null, 
    "email" text not null unique, 
    "emailVerified" boolean not null, 
    "image" text, 
    "createdAt" timestamp default CURRENT_TIMESTAMP not null, 
    "updatedAt" timestamp default CURRENT_TIMESTAMP not null, 
    "userType" text not null default 'client'
);

CREATE TABLE IF NOT EXISTS "session" (
    "id" text not null primary key, 
    "expiresAt" timestamp not null, 
    "token" text not null unique, 
    "createdAt" timestamp not null, 
    "updatedAt" timestamp not null, 
    "ipAddress" text, 
    "userAgent" text, 
    "userId" text not null references "user" ("id") on delete cascade
);

CREATE TABLE IF NOT EXISTS "account" (
    "id" text not null primary key, 
    "accountId" text not null, 
    "providerId" text not null, 
    "userId" text not null references "user" ("id") on delete cascade, 
    "accessToken" text, 
    "refreshToken" text, 
    "idToken" text, 
    "accessTokenExpiresAt" timestamp, 
    "refreshTokenExpiresAt" timestamp, 
    "scope" text, 
    "password" text, 
    "createdAt" timestamp not null, 
    "updatedAt" timestamp not null
);

CREATE TABLE IF NOT EXISTS "verification" (
    "id" text not null primary key, 
    "identifier" text not null, 
    "value" text not null, 
    "expiresAt" timestamp not null, 
    "createdAt" timestamp default CURRENT_TIMESTAMP, 
    "updatedAt" timestamp default CURRENT_TIMESTAMP
);