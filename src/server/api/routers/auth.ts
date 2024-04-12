import { z } from "zod";

import { LoginSchema, RegisterSchema } from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "~/data/user";
import { signIn, signOut } from "~/server/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(LoginSchema)
    .output(z.string())
    .mutation(async ({ ctx, input }) => {
      let a = null;
      try {
        await signIn("credentials", {
          email: input.email,
          password: input.password,
          redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return "Logged in";
      } catch (error) {
        if (error instanceof AuthError) {
          a = error;
        }
      }
      switch (a!.type) {
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
    }),

  logout: protectedProcedure.mutation(async () => {
    await signOut();
    return;
  }),

  register: publicProcedure
    .input(RegisterSchema)
    .output(z.string())
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
        // TODO: Send email verification
        return `User  created`;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating user",
        });
      }
    }),
});
