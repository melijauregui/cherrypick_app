import { BrandSchemaType } from "@/schemas/brand/brand-schema";
import { db } from "../db.config";
import logger from "../logger";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";

export async function GetBrandById(
  id: string
): Promise<BrandSchemaType | null> {
  const brand = await db.brand.findUnique({
    where: { userId: id },
    include: {
      files: true,
    },
  });
  if (!brand) {
    return null;
  }
  return {
    ...brand,
    id: id,
    logo: {
      url: brand.files?.url,
      updatedAt: brand.files?.updatedAt.toISOString(),
    },
  };
}

export async function GetBrandId(brandEmail: string): Promise<string | null> {
  const user = await db.user.findUnique({
    where: { email: brandEmail, userType: "brand" },
  });
  if (!user) {
    return null;
  }
  return user.id;
}

export async function UpdateBrand(
  userId: string,
  description: string,
  url: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;
  const brandUpdated = await db.brand.update({
    where: { userId: userId },
    data: { description: description, url: url },
  });
  logger.info("brand updated", brandUpdated);
  res = {
    error: false,
  };
  return res;
}
