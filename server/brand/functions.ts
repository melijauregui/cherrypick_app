import {
  BrandSchemaPropertiesType,
  BrandSchemaType,
} from "@/schemas/brand/brand-schema";
import { db } from "../db.config";
import logger from "../logger";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";

export async function GetBrandId(brandEmail: string): Promise<string | null> {
  const user = await db.user.findUnique({
    where: { email: brandEmail, userType: "brand" },
  });
  if (!user) {
    return null;
  }
  return user.id;
}

export async function GetBrandByEmail(
  email: string
): Promise<BrandSchemaType | null> {
  const user = await db.user.findUnique({
    where: { email: email, userType: "brand" },
  });
  if (!user) {
    return null;
  }
  const brand = await db.brand.findUnique({
    where: { userId: user.id },
  });
  if (!brand) {
    return null;
  }
  return { ...brand, email: user.email, id: user.id };
}

export async function GetBrandById(
  id: string
): Promise<BrandSchemaPropertiesType | null> {
  const brand = await db.brand.findUnique({
    where: { userId: id },
  });
  if (!brand) {
    return null;
  }
  return { ...brand, id: id };
}

export async function UpdateBrand(
  email: string,
  description: string,
  url: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;
  const user = await db.user.findUnique({
    where: { email: email, userType: "brand" },
  });
  if (!user) {
    res = {
      error: true,
      details: "User not found",
    };
    return res;
  }
  const brandUpdated = await db.brand.update({
    where: { userId: user.id },
    data: { description: description, url: url },
  });
  logger.info("brand updated", brandUpdated);
  res = {
    error: false,
  };
  return res;
}
