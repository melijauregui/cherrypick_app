import { db } from "../db.config";

export async function GetBrandId(brandEmail: string): Promise<string | null> {
  const brand = await db.brand.findUnique({
    where: { email: brandEmail },
  });
  return brand?.id ?? null;
}
