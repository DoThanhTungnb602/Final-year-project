import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ exerciseId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const exercise = await ctx.db.exercise.findUnique({
          where: { id: input.exerciseId },
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
                tags: true,
              },
            },
          },
        });
        if (!exercise) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Exercise not found",
          });
        }
        const problems = exercise.problems.map((problem) => {
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
            solution: !!problem.solution,
            status,
          };
        });
        return {
          ...exercise,
          problems,
        };
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Exercise not found",
        });
      }
    }),
});
