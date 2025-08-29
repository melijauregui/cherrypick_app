import { db } from "../db.config";
import { VerifyUserExistsResponseSchemaType } from "@/schemas/user/user-schema";
import { DeleteFromWeaviate } from "../app/catalogFunctions";
import { GetBrandId } from "../brand/functions";
import { NotFoundError } from "../errorHandler";

export async function VerifyUserExists(
  email: string
): Promise<VerifyUserExistsResponseSchemaType> {
  let res: VerifyUserExistsResponseSchemaType;

  // Buscar en clients primero
  const client = await db.client.findUnique({
    where: { email },
  });

  if (client) {
    res = {
      error: false,
      exists: true,
      userType: "client",
    };
  } else {
    // Buscar en brands si no se encuentra en clients
    const brand = await db.brand.findUnique({
      where: { email },
    });

    if (brand) {
      res = {
        error: false,
        exists: true,
        userType: "brand",
      };
    } else {
      res = {
        error: false,
        exists: false,
        userType: null,
      };
    }
  }

  return res;
}

export async function DeleteUser(email: string, userType: string) {
  if (userType === "brand") {
    const brandId = await GetBrandId(email);
    if (!brandId) {
      throw new NotFoundError("Brand not found", email, "Brand not found");
    }
    await DeleteFromWeaviate(brandId);
    await db.brand.delete({
      where: { email },
    });
  } else {
    await db.client.delete({
      where: { email },
    });
  }
}
