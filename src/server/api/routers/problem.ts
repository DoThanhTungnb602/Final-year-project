import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPublicTestcases } from "~/lib/utils";
import { ProblemSchema } from "~/schemas";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const problemRouter = createTRPCRouter({
  all: adminProcedure.query(async ({ ctx }) => {
    try {
      const problems = await ctx.db.problem.findMany({
        orderBy: {
          createdAt: "desc",
        },
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
      });
      return problems.map((problem) => {
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
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch problems",
      });
    }
  }),

  allPublic: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const problems = await ctx.db.problem.findMany({
          where: {
            isPublic: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            submissions: {
              where: {
                userId: input,
                testId: null,
                exerciseId: null,
              },
              select: {
                verdict: true,
              },
            },
            difficulty: true,
            solution: true,
            tags: true,
          },
        });
        if (!problems) return [];
        return problems.map((problem) => {
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
            solution: !!problem.solution,
          };
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch problems",
        });
      }
    }),

  create: adminProcedure
    .input(ProblemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { skeletons, testCaseDrivers, tags, ...problem } = input;
        return await ctx.db.problem.create({
          data: {
            ...problem,
            skeletons: {
              create: skeletons?.map((skeleton) => ({
                code: skeleton.code,
                language: {
                  connect: {
                    id: skeleton.languageId,
                  },
                },
              })),
            },
            testCaseDrivers: {
              create: testCaseDrivers?.map((driver) => ({
                code: driver.code,
                language: {
                  connect: {
                    id: driver.languageId,
                  },
                },
              })),
            },
            tags: {
              connect: tags?.map((tag) => ({
                id: tag.id,
              })),
            },
          },
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create problem",
        });
      }
    }),

  update: adminProcedure
    .input(z.object({ id: z.string() }).merge(ProblemSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, skeletons, testCaseDrivers, tags, ...problem } = input;
        return await ctx.db.problem.update({
          where: {
            id,
          },
          data: {
            ...problem,
            skeletons: {
              update: skeletons?.map((skeleton) => ({
                where: {
                  languageId_problemId: {
                    languageId: skeleton.languageId,
                    problemId: id,
                  },
                },
                data: {
                  code: skeleton.code,
                },
              })),
            },
            testCaseDrivers: {
              update: testCaseDrivers?.map((driver) => ({
                where: {
                  languageId_problemId: {
                    languageId: driver.languageId,
                    problemId: id,
                  },
                },
                data: {
                  code: driver.code,
                },
              })),
            },
            tags: {
              set: tags?.map((tag) => ({
                id: tag.id,
              })),
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update problem",
        });
      }
    }),

  delete: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.problem.delete({
        where: {
          id: input,
        },
      });
    } catch (error) {
      console.log("error", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete problem",
      });
    }
  }),

  deleteMany: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.problem.deleteMany({
          where: {
            id: {
              in: input,
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete problems",
        });
      }
    }),

  getPublicProblemById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const problem = await ctx.db.problem.findUnique({
          where: {
            id: input,
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

  getPrivateProblemById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.problem.findUnique({
          where: {
            id: input,
          },
          include: {
            testCaseDrivers: {
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
              },
              select: {
                verdict: true,
              },
            },
            tags: true,
          },
        });
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

  getSkeletonCode: protectedProcedure
    .input(z.object({ languageId: z.string(), problemId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const skeleton = await ctx.db.skeleton.findFirst({
          where: {
            languageId: input.languageId,
            problemId: input.problemId,
          },
        });
        if (skeleton) {
          return skeleton.code;
        } else {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Skeleton code not found",
          });
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch skeleton code",
        });
      }
    }),
});
