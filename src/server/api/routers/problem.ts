import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { axiosInstance } from "~/lib/axios";
import {
  consolidateIncludes,
  getUploadthingFile,
  jsonToStdin,
} from "~/lib/utils";
import { ProblemSchema, SolutionSchema } from "~/schemas";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const problemRouter = createTRPCRouter({
  getDescription: protectedProcedure.query(async () => {
    const res = await fetch(
      `https://utfs.io/f/b382960c-13ed-46c2-8207-f9b0143adb79-v4aa8i.md`,
    );
    if (res.status === 200) {
      const text = await res.text();
      return { text };
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch problem description",
      });
    }
  }),

  run: protectedProcedure
    .input(SolutionSchema)
    .mutation(async ({ ctx, input }) => {
      // const judge = await getUploadthingFile(
      //   "6637e899-f8ee-430c-a6ef-2b21c1c6a136-e8f1xd.cpp",
      // );
      // const code = consolidateIncludes(input.code, judge);
      // const data = await fetch(
      //   `https://utfs.io/f/ac4bd4df-b52a-4607-8616-b6efaebd6fa5-e8f1xd.json`,
      // );
      // const testCases = await data.json();
      // const stdin = jsonToStdin(testCases[0].input);
      // console.log("code: ", code);
      // console.log("stdin: ", testCases);
    }),

  submit: protectedProcedure
    .input(SolutionSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await axiosInstance.post<{ token: string }>(
          `/submissions`,
          {
            language_id: 15,
            source_code: btoa(input.code),
            stdin: "",
          },
          {
            params: {
              base64_encoded: "true",
              wait: "false",
              fields: "*",
            },
          },
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }),

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

  allPublic: protectedProcedure.query(async ({ ctx }) => {
    try {
      const problems = await ctx.db.problem.findMany({
        where: {
          isPublic: true,
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

  create: adminProcedure
    .input(ProblemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { skeletons, ...problem } = input;
        const languages = await ctx.db.language.findMany();
        const isSkeletonEmpty = languages?.some((language) => {
          const skeleton = skeletons?.find((skeleton) => {
            return skeleton?.languageId === language.id;
          });
          return !skeleton || skeleton?.code?.trim() === "";
        });
        if (isSkeletonEmpty) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Skeleton code is required for all languages",
          });
        }
        return await ctx.db.problem.create({
          data: {
            ...problem,
            skeletons: {
              create: skeletons.map((skeleton) => ({
                code: skeleton.code,
                language: {
                  connect: {
                    id: skeleton.languageId,
                  },
                },
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
        const { id, skeletons, ...problem } = input;
        return await ctx.db.problem.update({
          where: {
            id,
          },
          data: {
            ...problem,
            skeletons: {
              update: skeletons.map((skeleton) => ({
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

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const problem = await ctx.db.problem.findUnique({
          where: {
            id: input,
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
              },
              select: {
                verdict: true,
              },
            },
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
        return {
          ...problem,
          status,
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
