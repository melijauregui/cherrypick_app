import { ErrorSchemaType } from "@/schemas/standar-response-schema";
import { db } from "../db.config";
import logger from "../logger";
import { ClientSchemaResponseType } from "@/schemas/client/client-schema";

export async function CreateClient(
  email: string,
  name: string,
  dateOfBirth: Date | null,
  preferences: string[]
) {
  await db.client.create({
    data: {
      email,
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
  const user = await db.client.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    res = {
      error: false,
      user: {
        ...user,
        preferences: user.preferences as string[],
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
) {
  const user = await db.client.update({
    where: {
      email,
    },
    data: {
      name,
      dateOfBirth,
      preferences,
    },
  });
  logger.info("Client updated", user);
}
