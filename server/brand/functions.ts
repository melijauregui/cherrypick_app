import { BrandSchemaType } from "@/schemas/brand/brand-schema";
import { db } from "../db.config";
import logger from "../logger";
import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { QueryIdSchemaType } from "@/schemas/standar-query-schema";
import { extractFeatures, getCollection } from "../catalog/functions";
import { InsertBatchItemsType } from "@/schemas/catalog/catalog-schema";
import { uploadFromFile } from "../file-uploader";
import prisma from "../db";

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
  const updateData: {
    description: string;
    url: string;
    logoId?: string;
  } = {
    description: description,
    url: url,
  };

  // Only include logoId if it's not empty
  if (logoId && logoId.trim().length > 0) {
    updateData.logoId = logoId;
  }

  await db.brand.update({
    where: { userId: userId },
    data: updateData,
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

export async function InsertItems(
  items: InsertBatchItemsType["items"],
  brandId: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  // 1. Obtener la colección de Weaviate (solo una vez para todos los items)
  let res: SuccessSchemaType | ErrorSchemaType;
  const collectionRes = await getCollection();
  if (collectionRes.error) {
    res = {
      error: true,
      details: collectionRes.details,
    };
    return res;
  }
  const collection = collectionRes.collection;

  const errors: string[] = [];
  let insertedCount = 0;

  // 2. Procesar cada item del array
  for (const item of items) {
    try {
      const { name, description, price, url, image, uuid } = item;

      logger.info(
        `POST /brand/insert-item-with-image-multipart - Processing item: ${name}, contentType: ${image.type}`
      );

      // 2.1. Subir la imagen desde multipart a R2
      const fileName = `item-image-${name.toLowerCase().replace(/\s+/g, "-")}`;
      const uploadedFile = await uploadFromFile(
        image,
        "items-images",
        fileName
      );

      // 2.2. Extraer características de la imagen y texto
      const featuresResult = await extractFeatures(
        description,
        uploadedFile.url
      );

      if (
        featuresResult.error ||
        featuresResult.features.image_features.length === 0 ||
        featuresResult.features.text_features.length === 0
      ) {
        throw new Error(
          "No se pudieron extraer características de la imagen o el texto"
        );
      }

      // 2.3. Insertar el item en PostgreSQL
      const dbItem = await prisma.item.create({
        data: {
          name,
          description,
          price: price,
          url,
          brandId,
          imageId: uploadedFile.id,
          id: uuid ?? undefined,
        },
      });

      // 2.4. Insertar en Weaviate
      await collection.data.insert({
        id: dbItem.id,
        vectors: {
          image_vector: featuresResult.features.image_features,
          text_vector: featuresResult.features.text_features,
        },
        properties: {
          brandId: brandId,
          price: price, // Ya viene validado como number del schema
        },
      });

      logger.info(`Item inserted successfully with UUID: ${dbItem.id}`);
      insertedCount++;
    } catch (error) {
      const errorMsg = `Error processing item ${item.name}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
      logger.error(errorMsg);
      errors.push(errorMsg);
    }
  }

  // 3. Retornar resultado
  if (errors.length > 0) {
    res = {
      error: true,
      details: `Se insertaron ${insertedCount} de ${items.length} items. Errores: ${errors.join(", ")}`,
    };
    return res;
  }

  res = {
    error: false,
  };
  return res;
}
