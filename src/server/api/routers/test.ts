import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPublicTestcases } from "~/lib/utils";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

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

  getProblemsWithoutChecking: adminProcedure
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
                    testId: input.testId,
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
        if (!test) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Test not found",
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
    .input(z.object({ testId: z.string(), problemId: z.string() }))
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
                exerciseId: null,
                testId: input.testId,
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
                    testId: input.testId,
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

  getStudentsProgress: adminProcedure
    .input(z.object({ testId: z.string(), classId: z.string() }))
    .query(async ({ ctx, input }) => {
      const students = await ctx.db.user.findMany({
        where: {
          enrolledClasses: {
            some: {
              id: input.classId,
            },
          },
        },
        include: {
          submissions: {
            where: {
              testId: input.testId,
            },
            select: {
              verdict: true,
              problemId: true,
            },
          },
        },
      });
      const test = await ctx.db.test.findUnique({
        where: { id: input.testId },
        include: {
          problems: {
            select: {
              id: true,
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
      const problems = test.problems.map((problem) => problem.id);
      const result = students.map((student) => {
        const acceptedSubmissions = student.submissions.filter(
          (sub) => sub.verdict === "ACCEPTED",
        );
        const solvedProblems = problems.filter((problem) =>
          acceptedSubmissions.some((sub) => sub.problemId === problem),
        );
        return {
          id: student.id,
          name: student.name,
          score: solvedProblems.length * 20,
        };
      });
      return result;
    }),
});
