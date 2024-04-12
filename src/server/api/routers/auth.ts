import { z } from "zod";

import { LoginSchema, RegisterSchema } from "schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(LoginSchema)
    .output(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
          password: input.password,
        },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      return {
        token: user.id,
      };
    }),

  register: publicProcedure
    .input(RegisterSchema)
    .output(z.string())
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const user = await ctx.db.user.create({
          data: {
            email: input.email,
            password: input.password,
            name: input.name,
          },
        });
        return `User ${user.id} created`;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Email already exists",
            });
          }
        }
        throw error;
      }
    }),
});
