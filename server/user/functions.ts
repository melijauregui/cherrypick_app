import { db } from "../db.config";
import { GetBrandId } from "../brand/functions";
import { NotFoundError } from "../errorHandler";
import { DeleteFromWeaviate } from "../catalog/delete";

export async function VerifyUserExists(
  email: string
): Promise<{ exists: boolean; userType: string | null }> {
  let res: { exists: boolean; userType: string | null } = {
    exists: false,
    userType: null,
  };

  // Buscar en clients primero
  const client = await db.client.findUnique({
    where: { email },
  });

  if (client) {
    res = { exists: true, userType: "client" };
  } else {
    // Buscar en brands si no se encuentra en clients
    const brand = await db.brand.findUnique({
      where: { email },
    });

    if (brand) {
      res = { exists: true, userType: "brand" };
    } else {
      res = { exists: false, userType: null };
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
