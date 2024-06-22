import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const languageRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Remove this timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await ctx.db.language.findMany();
  }),

  getById: protectedProcedure
    .input(z.object({ languageId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.language.findUnique({
          where: { id: input.languageId },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Language not found",
        });
      }
    }),
});
