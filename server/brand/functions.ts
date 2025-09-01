import { BrandSchemaType } from "@/schemas/brand/brand-schema";
import { db } from "../db.config";
import logger from "../logger";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";

export async function GetBrandId(brandEmail: string): Promise<string | null> {
  const brand = await db.brand.findUnique({
    where: { email: brandEmail },
  });
  return brand?.id ?? null;
}

export async function GetBrandByEmail(
  email: string
): Promise<BrandSchemaType | null> {
  const brand = await db.brand.findUnique({
    where: { email: email },
  });

  return brand;
}

export async function GetBrandById(
  id: string
): Promise<BrandSchemaType | null> {
  const brand = await db.brand.findUnique({
    where: { id: id },
  });
  return brand;
}

export async function UpdateBrand(
  email: string,
  description: string,
  url: string
) {
  const brandUpdated = await db.brand.update({
    where: { email: email },
    data: { description: description, url: url },
  });
  logger.info("brand updated", brandUpdated);
}
