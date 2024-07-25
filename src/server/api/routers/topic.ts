import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.topic.findMany();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch topics",
      });
    }
  }),
});
