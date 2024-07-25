import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPublicTestcases } from "~/lib/utils";

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
                    exerciseId: input.exerciseId,
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

  getProblems: protectedProcedure
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
                    exerciseId: input.exerciseId,
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
            message: "Test not found",
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

  getPublicProblemById: protectedProcedure
    .input(z.object({ exerciseId: z.string(), problemId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const problem = await ctx.db.problem.findUnique({
          where: {
            id: input.problemId,
            isPublic: true,
          },
          include: {
            skeletons: {
              select: {
                languageId: true,
                code: true,
                language: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            submissions: {
              where: {
                userId: ctx.session?.user.id,
                exerciseId: input.exerciseId,
                testId: null,
              },
              select: {
                verdict: true,
              },
            },
            tags: true,
          },
        });
        if (!problem) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Problem not found",
          });
        }
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
        const { testcases, ...rest } = problem;
        const publicTestcases = getPublicTestcases(testcases ?? "");
        return {
          ...rest,
          status,
          testcases: publicTestcases,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch problem",
        });
      }
    }),
});
