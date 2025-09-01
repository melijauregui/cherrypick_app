import {
  ErrorSchemaType,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import { db } from "../db.config";
import logger from "../logger";
import { ClientSchemaResponseType } from "@/schemas/client/client-schema";

export async function CreateClient(
  email: string,
  name: string,
  dateOfBirth: Date | null,
  preferences: string[]
) {
  const user = await db.user.create({
    data: {
      email,
      userType: "client",
    },
  });
  await db.client.create({
    data: {
      userId: user.id,
      name,
      dateOfBirth,
      preferences,
    },
  });
}

export async function GetClient(
  email: string
): Promise<ClientSchemaResponseType | ErrorSchemaType> {
  let res: ClientSchemaResponseType | ErrorSchemaType;

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
  const client = await db.client.findUnique({
    where: {
      userId: user?.id,
    },
  });
  if (client) {
    res = {
      error: false,
      user: {
        email: user.email,
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
