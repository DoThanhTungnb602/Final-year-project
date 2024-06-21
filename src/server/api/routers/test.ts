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
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test not found",
        });
      }
    }),

  getProblems: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const test = await ctx.db.test.findUnique({
          where: { id: input.testId },
          include: {
            problems: {
              include: {
                submissions: {
                  where: {
                    userId: ctx.session?.user.id,
                  },
                  select: {
                    verdict: true,
                  },
                },
              },
            },
          },
        });
        if (!test) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Test not found",
          });
        }
        const currentTime = Date.now();
        const start = new Date(test.startTime).getTime();
        if (currentTime < start) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Test has not started yet",
          });
        }
        const problems = test.problems.map((problem) => {
          const hasAccepted = problem.submissions.some(
            (sub) => sub.verdict === "ACCEPTED",
          );
          let status: "UNSOLVED" | "ACCEPTED" | "ATTEMPTED" = "UNSOLVED";
          if (hasAccepted) {
            status = "ACCEPTED";
          } else {
            const hasAttempted = problem.submissions.length > 0;
            if (hasAttempted) status = "ATTEMPTED";
          }
          return {
            ...problem,
            status,
          };
        });
        return problems;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test not found",
        });
      }
    }),
});
