import { db } from "../db.config";
import { GetBrandId } from "../brand/functions";
import { NotFoundError } from "../errorHandler";
import { DeleteFromWeaviate } from "../catalog/delete";

export async function VerifyUserExists(
  email: string
): Promise<{ exists: boolean; userType: string | null }> {
  let res: { exists: boolean; userType: string | null } = {
    exists: false,
    userType: null,
  };

  const user = await db.user.findUnique({
    where: { email },
  });

  if (user) {
    res = { exists: true, userType: user.userType };
  } else {
    res = { exists: false, userType: null };
  }

  return res;
}

export async function DeleteUser(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new NotFoundError("User not found", email, "User not found");
  }

  if (user.userType === "brand") {
    await DeleteFromWeaviate(user.id);
  }

  await db.user.delete({
    where: { email },
  });
}

export async function GetUserIdByEmail(email: string): Promise<string | null> {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }
  return user.id;
}
