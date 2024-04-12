import { z } from "zod";

import { LoginSchema, RegisterSchema } from "schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(LoginSchema)
    .output(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input)
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
      console.log("input", input)
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
      });
      return `User ${user.id} created`;
    }),
});
