import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { config } from "../config";
import { getSignedUrl as getSignedUrlPresigner } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { createHash } from "node:crypto";
import { prisma } from "./db";
import { NotFoundError } from "./errorHandler";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${config.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.R2_ACCESS_KEY_ID,
    secretAccessKey: config.R2_SECRET_ACCESS_KEY,
  },
});

export const uploadSchema = z.object({
  bucket: z.string(),
  name: z.string(),
  contentType: z.string(),
  fileExtension: z.string(),
  replace: z.boolean(),
  hash: z.boolean(),
  metadata: z.record(z.any(), z.any()).optional(),
});

export type UploadSchema = z.infer<typeof uploadSchema>;

/**
 * Upload a file to R2
 * @param input - The input object
 * @returns The signed url
 * This function is intended to be used by the backend to get a signed url
 * to upload a file to R2. This will create the file in the database. and return
 * its data. The frontend will use this url to upload the file so that the file
 * does not travel through the backend and then to R2. The return of this function
 * has to be used afterwards to make the proper relation between the file and the entity.
 * @example

 * 
 * ON THE FRONTEND:
 *  const input = {
 *   bucket: "melodia-users",
 *   name: "test_file",
 *   contentType: "image/png",
 *   fileExtension: "png",
 *   replace: false,
 *   hash: false,
 *   metadata: {},
 * };
 * const newFile = await usersService.getProfileSignedUrl(input);
 * await fetch(newFile.uploadUrl, {
 *   method: "PUT",
 *   headers: {
 *     "Content-Type": input.contentType,
 *   },
 *   body: file,
 * });
 * 
 * ON THE BACKEND:
 * const newFile = await getSignedUrl(input);
 * return newFile;

 **/

export async function getFileUrl(
  fileId: string
): Promise<{ url: string; updatedAt: Date }> {
  const image = await prisma.files.findUnique({
    where: { id: fileId },
    select: { url: true, updatedAt: true },
  });
  if (!image) {
    throw new NotFoundError(
      "File not found",
      "Image" + fileId,
      "Image Not Found" + fileId
    );
  }
  return image;
}

export async function getSignedUrl(input: z.infer<typeof uploadSchema>) {
  const filename = await getFilename(input);

  const uploadUrl = await getSignedUrlPresigner(
    S3,
    new PutObjectCommand({
      Bucket: input.bucket,
      Key: filename,
      ContentType: input.contentType,
    }),
    { expiresIn: 3600 }
  );

  const url = `https://${input.bucket}.cherrypick.com.ar/${filename}`;

  const newFile = await prisma.files.create({
    data: {
      name: filename,
      bucket: input.bucket,
      contentType: input.contentType,
      uploadUrl: uploadUrl,
      url: url,
      metadata: input.metadata ?? {},
    },
  });

  return newFile;
}

async function getFilename(input: z.infer<typeof uploadSchema>) {
  let filename = "";

  if (input.hash) {
    let foundAvailableName = false;

    while (!foundAvailableName) {
      const hash = createHash("sha256")
        .update(Date.now().toString())
        .digest("hex")
        .slice(0, 8);
      filename = `${input.name}-${hash}.${input.fileExtension}`;
      const rows = await prisma.files.findMany({
        where: { name: filename, bucket: input.bucket },
      });
      foundAvailableName = rows.length === 0;
    }
  } else {
    filename = `${input.name}.${input.fileExtension}`;
    const rows = await prisma.files.findMany({
      where: { name: filename, bucket: input.bucket },
    });
    let foundAvailableName = rows.length === 0;
    let i = 2;

    while (!foundAvailableName) {
      filename = `${input.name} (${i}).${input.fileExtension}`;
      const rows = await prisma.files.findMany({
        where: { name: filename, bucket: input.bucket },
      });
      foundAvailableName = rows.length === 0;
      i++;
    }
  }

  return filename;
}

export async function getFilesFromR2(bucket: string, prefix?: string) {
  const files = (
    await S3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix }))
  ).Contents;

  return files ?? [];
}
