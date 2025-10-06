import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { db } from "../db.config";
import logger from "../logger";
import { ClientSchemaResponseType } from "@/schemas/client/client-schema";

export async function CreateClient(userId: string, name: string) {
  await db.client.create({
    data: {
      userId,
      name,
      preferences: [],
    },
  });
}

export async function GetClient(
  userId: string
): Promise<ClientSchemaResponseType | ErrorSchemaType> {
  let res: ClientSchemaResponseType | ErrorSchemaType;

  const client = await db.client.findUnique({
    where: {
      userId: userId,
    },
  });
  if (client) {
    res = {
      error: false,
      user: {
        ...client,
        preferences: client.preferences as string[],
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
  dateOfBirth: Date | null,
  preferences: string[]
): Promise<SuccessSchemaType | ErrorSchemaType> {
  let res: SuccessSchemaType | ErrorSchemaType;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res = {
      error: true,
      details: "User not found",
    };
    return res;
  }
  const client = await db.client.update({
    where: {
      userId: user.id,
    },
    data: {
      name,
      dateOfBirth,
      preferences,
    },
  });
  logger.info("Client updated", client);
  res = {
    error: false,
  };
  return res;
}

export async function UpdatePreferences(
  idUser: string,
  preferences: string[]
): Promise<SuccessSchemaType> {
  let res: SuccessSchemaType;
  const client = await db.client.update({
    where: { userId: idUser },
    data: { preferences },
  });
  res = {
    error: false,
  };
  return res;
}
