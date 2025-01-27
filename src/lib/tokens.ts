import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "~/data/verification-token";
import { getPasswordResetTokenByEmail } from "~/data/password-reset-token";
import { db } from "~/server/db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    try {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    try {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
