import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getUserByEmail } from "~/data/user";
import { generateVerificationToken } from "~/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { LoginSchema, RegisterSchema } from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { signIn, signOut } from "~/server/auth";

import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    try {
      await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error!.type) {
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
});
