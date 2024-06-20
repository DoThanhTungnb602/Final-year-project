import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const testRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.test.findUnique({
          where: { id: input.testId },
          include: { problems: true },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test not found",
        });
      }
    }),
});
