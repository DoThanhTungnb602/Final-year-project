import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getUserByEmail } from "~/data/user";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "~/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { LoginSchema, RegisterSchema, ResetSchema } from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { signIn, signOut } from "~/server/auth";

import { TRPCError } from "@trpc/server";
import { sendPasswordResetEmail, sendVerificationEmail } from "~/lib/mail";
import { getVerificationTokenByToken } from "~/data/verification-token";
import { getPasswordResetTokenByToken } from "~/data/password-reset-token";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(LoginSchema).mutation(async ({ input }) => {
    try {
      await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin": {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Invalid credentials",
            });
          }
          default: {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error signing in",
            });
          }
        }
      }
    }
  }),

  logout: protectedProcedure.mutation(async () => {
    await signOut();
    return;
  }),

  register: publicProcedure
    .input(RegisterSchema)
    .output(z.object({ success: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const existingUser = await getUserByEmail(input.email);
      if (existingUser !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exists",
        });
      }
      try {
        await ctx.db.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            name: input.name,
          },
        });
        const verificationToken = await generateVerificationToken(input.email);
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token,
        );
        return {
          success: "Confirm your email address to complete registration",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating user",
        });
      }
    }),

  verify: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingToken = await getVerificationTokenByToken(input.token);
      if (!existingToken) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token does not exist!",
        });
      }
      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token has expired!",
        });
      }
      const existingUser = await getUserByEmail(existingToken.email);
      if (!existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email does not exist!",
        });
      }
      try {
        await ctx.db.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
        await ctx.db.verificationToken.delete({
          where: {
            id: existingToken.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error verifying email",
        });
      }
      return {
        success: "Email verified",
      };
    }),

  reset: publicProcedure.input(ResetSchema).mutation(async ({ input }) => {
    const existingUser = await getUserByEmail(input.email);
    if (!existingUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email does not exist!",
      });
    }

    const passwordResetToken = await generatePasswordResetToken(input.email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return {
      success: "Reset email sent",
    };
  }),

  resetPassword: publicProcedure
    .input(z.object({ password: z.string(), token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingToken = await getPasswordResetTokenByToken(input.token);

      if (!existingToken) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token does not exist!",
        });
      }

      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token has expired!",
        });
      }

      const existingUser = await getUserByEmail(existingToken.email);
      if (!existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email does not exist!",
        });
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      try {
        await ctx.db.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            password: hashedPassword,
          },
        });
        await ctx.db.passwordResetToken.delete({
          where: {
            id: existingToken.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating password",
        });
      }

      return {
        success: "Password updated.",
      };
    }),
});
