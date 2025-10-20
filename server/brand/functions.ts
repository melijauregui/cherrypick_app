import { BrandSchemaType } from "@/schemas/brand/brand-schema";
import { db } from "../db.config";
import logger from "../logger";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { QueryIdSchemaType } from "@/schemas/standar-query-schema";

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
      width: brand.files?.width ?? undefined,
      height: brand.files?.height ?? undefined,
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
  url: string,
  logoId: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;
  await db.brand.update({
    where: { userId: userId },
    data: { description: description, url: url, logoId: logoId },
  });
  res = {
    error: false,
  };
  return res;
}

export async function GetBrandInspoItems(
  brandId: string
): Promise<QueryIdSchemaType[]> {
  const inspoItems = await db.inspoItems.findMany({
    where: {
      item: {
        brandId: brandId,
      },
    },
    select: {
      itemUuid: true,
    },
  });

  const itemUuids = inspoItems.map(item => ({ id: item.itemUuid }));

  return itemUuids;
}

export async function GetBrandsByIds(
  ids: string[]
): Promise<BrandSchemaType[]> {
  const brands = await db.brand.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
    include: {
      files: true,
    },
  });

  return brands.map(brand => ({
    id: brand.userId,
    name: brand.name,
    description: brand.description,
    url: brand.url,
    logo: {
      url: brand.files.url,
      updatedAt: brand.files.updatedAt.toISOString(),
      width: brand.files.width ?? undefined,
      height: brand.files.height ?? undefined,
    },
  }));
}
