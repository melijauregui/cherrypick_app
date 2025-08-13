import { db } from "../db";
import { VerifyUserResponseSchemaType } from "../../schemas/auth/sign-in-schema";
import { queryDbSchemaUser } from "../../schemas/auth/sign-in-schema";
import {
  CreateAccountSchemaResType,
  UserSchemaResType,
} from "../../schemas/auth/preferences-schema";
import { VerifyAccountDeletedSchemaType } from "../../schemas/auth/sign-up-schema";
import {
  QueryDbSchemaBrandUpdate,
  QueryDbSchemaBrand,
} from "../../schemas/auth/brand-schema";

export async function VerifyUserExists(
  email: string
): Promise<VerifyUserResponseSchemaType> {
  let res: VerifyUserResponseSchemaType;
  const [userRows]: any[] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  // Buscar en brands si no se encuentra en users
  if (userRows.length === 0) {
    const [brandRows]: any[] = await db.query(
      "SELECT * FROM brands WHERE email = ?",
      [email]
    );

    if (brandRows.length === 0) {
      res = {
        error: true,
        details: "User not found",
      };
    } else {
      console.log("Brand found:", brandRows);
      // Usando la estructura correcta de la tabla brands
      const brand = brandRows[0];
      res = {
        error: false,
        userType: "brand",
      };
    }
  } else {
    console.log("User found:", userRows);
    const parsedRows = queryDbSchemaUser.parse(userRows);
    res = {
      error: false,
      userType: "client",
    };
  }
  return res;
}

export async function CreateUser(
  email: string,
  name: string,
  dateString: string | null,
  preferences: string[]
): Promise<CreateAccountSchemaResType> {
  let res: CreateAccountSchemaResType;
  res = await VerifyUserExists(email);

  if (!res.error) {
    res = {
      error: true,
      details: "Email already registered",
    };
    return res;
  }
  let dateBirth: Date | null;
  if (dateString === null) {
    console.log("dateString is null");
    dateBirth = null;
  } else {
    console.log("dateString is not null");
    dateBirth = new Date(dateString);
  }

  const [result]: any = await db.query(
    "INSERT INTO users (name, email, date_of_birth, preferences) VALUES (?, ?, ?, ?)",
    [name, email, dateBirth, JSON.stringify(preferences)]
  );
  console.log("User created:", result);
  res = {
    error: false,
  };
  return res;
}

export async function DeleteUser(
  email: string
): Promise<VerifyAccountDeletedSchemaType> {
  let res: VerifyAccountDeletedSchemaType;
  const resV = await VerifyUserExists(email);

  if (resV.error) {
    res = {
      error: true,
      details: "User not found1",
    };
    return res;
  }

  let result: any;
  if (resV.userType === "brand") {
    result = await db.query("DELETE FROM brands WHERE email = ?", [email]);
  } else {
    result = await db.query("DELETE FROM users WHERE email = ?", [email]);
  }

  if (result[0].affectedRows > 0) {
    res = {
      error: false,
      success: true,
    };
  } else {
    res = {
      error: true,
      details: "User not found2",
    };
  }
  return res;
}

export async function GetClient(email: string): Promise<UserSchemaResType> {
  let res: UserSchemaResType;
  const [result]: any = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (result.length > 0) {
    const parsedRows = queryDbSchemaUser.parse(result);
    const { name, email, date_of_birth, preferences } = parsedRows[0];

    res = {
      error: false,
      user: {
        username: name,
        email: email,
        dateOfBirth: date_of_birth,
        preferences: preferences,
      },
    };
  } else {
    res = {
      error: true,
      details: "User not found",
    };
  }
  return res;
}

export async function UpdateClient(
  email: string,
  name: string,
  dateString: string | null,
  preferences: string[]
): Promise<CreateAccountSchemaResType> {
  let res: CreateAccountSchemaResType;
  const [existing]: any[] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (existing.length === 0) {
    console.log("client not found");
    res = {
      error: true,
      details: "Email not registered",
    };
    return res;
  }

  const parsedRows = queryDbSchemaUser.parse(existing);
  if (name === undefined) {
    name = parsedRows[0].name;
  }
  if (preferences === undefined) {
    preferences = parsedRows[0].preferences;
  }
  if (dateString === undefined) {
    const existingDate = parsedRows[0].date_of_birth;
    dateString = existingDate ? existingDate.toISOString() : "";
  }

  const dateBirth = dateString ? new Date(dateString) : null;

  const [result]: any = await db.query(
    "UPDATE users SET name = ?, date_of_birth = ?, preferences = ? WHERE email = ?",
    [name, dateBirth, JSON.stringify(preferences), email]
  );
  console.log("client updated");
  res = {
    error: false,
  };
  return res;
}

export async function UpdateBrand(
  email: string,
  description: string,
  url: string
): Promise<CreateAccountSchemaResType> {
  let res: CreateAccountSchemaResType;
  const [existing]: any[] = await db.query(
    "SELECT * FROM brands WHERE email = ?",
    [email]
  );
  if (existing.length === 0) {
    res = {
      error: true,
      details: "Email not registered",
    };
    return res;
  }

  const parsedFormUpdate = QueryDbSchemaBrand.parse(existing);
  if (description === undefined) {
    description = parsedFormUpdate[0].description;
  }
  if (url === undefined) {
    url = parsedFormUpdate[0].url;
  }

  const [result]: any = await db.query(
    "UPDATE brands SET description = ?, url = ? WHERE email = ?",
    [description, url, email]
  );
  console.log("brand updated");
  res = {
    error: false,
  };
  return res;
}
