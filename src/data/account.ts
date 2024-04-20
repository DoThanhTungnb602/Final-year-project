import { db } from "~/server/db";

export async function getAccountByUserId(id: string) {
  try {
    const account = await db.account.findFirst({
      where: { userId: id },
    });
    return account;
  } catch {
    return null;
  }
}
