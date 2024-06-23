import { TRPCError } from "@trpc/server";
import { createSubmission, getSubmission } from "~/lib/axios";
import { prepareSubmissionData } from "~/lib/utils";
import { SubmissionSchema } from "~/schemas";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const submissionRouter = createTRPCRouter({
  run: protectedProcedure
    .input(SubmissionSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const problem = await ctx.db.problem.findUnique({
          where: {
            id: input.problemId,
          },
        });
        const testcaseDriver = await ctx.db.testCaseDriver.findUnique({
          where: {
            languageId_problemId: {
              languageId: input.languageId,
              problemId: input.problemId,
            },
          },
          select: {
            code: true,
          },
        });
        if (!problem || !testcaseDriver) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error. Please try again later.",
          });
        }
        const { code, stdin } = prepareSubmissionData({
          userCode: input.code,
          driverCode: testcaseDriver.code,
          languageId: input.languageId,
          testcases: problem.testcases ?? "",
        });
        const token = await createSubmission({
          code,
          languageId: input.languageId,
          stdin,
        });
        if (!token) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error. Please try again later.",
          });
        }
        const submissionResponse = await getSubmission(token);
        if (!submissionResponse) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error. Please try again later.",
          });
        }
        return submissionResponse;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error. Please try again later.",
        });
      }
    }),

  // submit: protectedProcedure
  //   .input(SubmissionSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     try {
  //     } catch (error) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to submit solution",
  //       });
  //     }
  //   }),
});
