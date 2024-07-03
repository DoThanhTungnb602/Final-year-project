import { TRPCError } from "@trpc/server";
import {
  createBatchSubmission,
  createSubmission,
  getBatchSubmission,
  getSubmission,
} from "~/lib/axios";
import { SubmissionRequest, TestCase } from "~/lib/types";
import { preparePreSubmissionData, prepareSubmissionData } from "~/lib/utils";
import { SubmissionSchema } from "~/schemas";
import { decode } from "js-base64";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { warn } from "console";

export const submissionRouter = createTRPCRouter({
  run: protectedProcedure
    .input(SubmissionSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const token = await createSubmission({
          code: preparePreSubmissionData({
            userCode: input.code ?? "",
            languageId: input.languageId,
          }),
          languageId: input.languageId,
          stdin: "",
        });

        if (!token) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error. Please try again later.",
          });
        }

        let submission = await getSubmission(token);

        if (!submission) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error. Please try again later.",
          });
        }

        const isSubmissionProcessing =
          submission.status.description === "Processing" ||
          submission.status.description === "In Queue";

        while (isSubmissionProcessing) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const updatedSubmissionResponse = await getSubmission(token);
          if (!updatedSubmissionResponse) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Internal server error. Please try again later.",
            });
          }
          if (
            updatedSubmissionResponse.status.description !== "Processing" ||
            submission.status.description === "In Queue"
          ) {
            submission = updatedSubmissionResponse;
            break;
          }
        }

        if (submission.status.description === "Compilation Error") {
          return {
            status: "Compilation Error",
            error: decode(submission.compile_output ?? ""),
          };
        }

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

        const testcases = JSON.parse(problem.testcases) as TestCase[];
        const publicTestcases = testcases.slice(0, 2);
        const { code, stdin_array, expected_output_array } =
          prepareSubmissionData({
            userCode: input.code,
            driverCode: testcaseDriver.code,
            languageId: input.languageId,
            testcases: publicTestcases,
          });

        const submissions: SubmissionRequest[] = publicTestcases.map(
          (testcase, index) => {
            const stdin = stdin_array[index] ?? "";
            const expected_output = expected_output_array[index] ?? "";
            return {
              source_code: btoa(code),
              language_id: input.languageId,
              stdin: btoa(stdin),
              expected_output: btoa(expected_output),
            };
          },
        );

        // const tokens = await createBatchSubmission(submissions);
        // if (!tokens) {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: "Internal server error. Please try again later.",
        //   });
        // }

        // Wrong Answer tokens
        // const tokens = [
        //   {
        //     token: "b1d8a91e-2dac-467a-b9eb-d675a195678d",
        //   },
        //   {
        //     token: "4ac1ccdd-8eec-407a-8d08-f6b1865ce78e",
        //   },
        // ];

        // Accepted tokens
        const tokens = [
          { token: "5c82312d-645d-45da-af87-e32ce21ca7bb" },
          { token: "e2d1e388-7d92-4a3b-bd88-8fe269fa778a" },
        ];

        // Compilation Error tokens
        // const tokens = [
        //   { token: "7054f592-533b-44f1-bb27-4890fcb14a08" },
        //   { token: "a5db2876-4a8f-4710-9ddc-5109b8100347" },
        // ];

        // Runtime Error tokens
        // const tokens = [
        //   { token: "9c57e2da-884b-4124-a8cb-c8e66e9906ab" },
        //   { token: "25182e62-db3a-485e-a1fe-a377674f6de5" },
        // ];

        // Time Limit Exceeded tokens
        // const tokens = [
        //   { token: "d645b2fd-f69f-4bb9-aec1-bf669e134a71" },
        //   { token: "d645b2fd-f69f-4bb9-aec1-bf669e134a71" },
        // ];

        let submissionResponse = await getBatchSubmission(tokens);
        if (!submissionResponse) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error. Please try again later.",
          });
        }

        const isProcessing =
          submissionResponse.submissions.some(
            (submission) => submission.status.description === "Processing",
          ) ||
          submissionResponse.submissions.some(
            (submission) => submission.status.description === "In Queue",
          );

        while (isProcessing) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const updatedSubmissionResponse = await getBatchSubmission(tokens);
          if (!updatedSubmissionResponse) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Internal server error. Please try again later.",
            });
          }
          if (
            updatedSubmissionResponse.submissions.every(
              (submission) => submission.status.description !== "Processing",
            )
          ) {
            submissionResponse = updatedSubmissionResponse;
            break;
          }
        }

        const isCompilationError = submissionResponse.submissions.some(
          (submission) => submission.status.description === "Compilation Error",
        );
        if (isCompilationError) {
          return {
            status: "Compilation Error",
            error: decode(
              submissionResponse.submissions[0]?.compile_output ?? "",
            ),
          };
        }

        const isRuntimeError = submissionResponse.submissions.some(
          (submission) =>
            submission.status.description === "Runtime Error (NZEC)" ||
            submission.status.description === "Runtime Error (SIGSEGV)" ||
            submission.status.description === "Runtime Error (SIGXFSZ)" ||
            submission.status.description === "Runtime Error (SIGFPE)" ||
            submission.status.description === "Runtime Error (SIGABRT)" ||
            submission.status.description === "Runtime Error (Other)",
        );
        if (isRuntimeError) {
          return {
            status: "Runtime Error",
            error: decode(submissionResponse.submissions[0]?.stderr ?? ""),
          };
        }

        const isTimeLimitExceeded = submissionResponse.submissions.some(
          (submission) =>
            submission.status.description === "Time Limit Exceeded",
        );
        if (isTimeLimitExceeded) {
          return {
            status: "Time Limit Exceeded",
            runtime: submissionResponse.submissions.reduce(
              (acc, submission) => acc + parseFloat(submission.time),
              0,
            ),
            submissions: submissionResponse.submissions,
            timeLimitExceededTestcase: publicTestcases.find(
              (testcase, index) =>
                submissionResponse.submissions[index]?.status.description ===
                "Time Limit Exceeded",
            ),
          };
        }

        const isAccepted = submissionResponse.submissions.every(
          (submission) => submission.status.description === "Accepted",
        );
        if (isAccepted) {
          return {
            status: "Accepted",
            runtime: submissionResponse.submissions.reduce(
              (acc, submission) => acc + parseFloat(submission.time),
              0,
            ),
            submissions: submissionResponse.submissions,
          };
        }

        const isWrongAnswer = submissionResponse.submissions.some(
          (submission) => submission.status.description === "Wrong Answer",
        );
        if (isWrongAnswer) {
          return {
            status: "Wrong Answer",
            runtime: submissionResponse.submissions.reduce(
              (acc, submission) => acc + parseFloat(submission.time),
              0,
            ),
            submissions: submissionResponse.submissions,
          };
        }

        return {
          status: "Internal Server Error",
          error: "Internal server error. Please try again later.",
        };
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

  submit: protectedProcedure
    .input(SubmissionSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // const token = await createSubmission({
        //   code: preparePreSubmissionData({
        //     userCode: input.code ?? "",
        //     languageId: input.languageId,
        //   }),
        //   languageId: input.languageId,
        //   stdin: "",
        // });
        //
        // if (!token) {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: "Internal server error. Please try again later.",
        //   });
        // }
        //
        // let submission = await getSubmission(token);
        //
        // if (!submission) {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: "Internal server error. Please try again later.",
        //   });
        // }
        //
        // const isSubmissionProcessing =
        //   submission.status.description === "Processing" ||
        //   submission.status.description === "In Queue";
        //
        // while (isSubmissionProcessing) {
        //   await new Promise((resolve) => setTimeout(resolve, 1000));
        //   const updatedSubmissionResponse = await getSubmission(token);
        //   if (!updatedSubmissionResponse) {
        //     throw new TRPCError({
        //       code: "INTERNAL_SERVER_ERROR",
        //       message: "Internal server error. Please try again later.",
        //     });
        //   }
        //   if (
        //     updatedSubmissionResponse.status.description !== "Processing" ||
        //     submission.status.description === "In Queue"
        //   ) {
        //     submission = updatedSubmissionResponse;
        //     break;
        //   }
        // }
        //
        // if (submission.status.description === "Compilation Error") {
        //   const newSubmission = await ctx.db.submission.create({
        //     data: {
        //       verdict: "COMPILATION_ERROR",
        //       code: input.code,
        //       compile_output: decode(submission.compile_output ?? ""),
        //       problem: {
        //         connect: {
        //           id: input.problemId,
        //         },
        //       },
        //       user: {
        //         connect: {
        //           id: ctx.session.user.id,
        //         },
        //       },
        //       language: {
        //         connect: {
        //           id: input.languageId,
        //         },
        //       },
        //     },
        //   });
        //   return newSubmission;
        // }

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
            // message: "Internal server error. Please try again later.",
            message: "Problem or testcase driver not found.",
          });
        }

        const testcases = JSON.parse(problem.testcases) as TestCase[];
        const publicTestcases = testcases.slice(0, 2);
        const { code, stdin_array, expected_output_array } =
          prepareSubmissionData({
            userCode: input.code,
            driverCode: testcaseDriver.code,
            languageId: input.languageId,
            testcases: publicTestcases,
          });

        const submissions: SubmissionRequest[] = publicTestcases.map(
          (testcase, index) => {
            const stdin = stdin_array[index] ?? "";
            const expected_output = expected_output_array[index] ?? "";
            return {
              source_code: btoa(code),
              language_id: input.languageId,
              stdin: btoa(stdin),
              expected_output: btoa(expected_output),
            };
          },
        );

        // const tokens = await createBatchSubmission(submissions);
        // if (!tokens) {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: "Internal server error. Please try again later.",
        //   });
        // }

        // Wrong Answer tokens
        // const tokens = [
        //   {
        //     token: "b1d8a91e-2dac-467a-b9eb-d675a195678d",
        //   },
        //   {
        //     token: "4ac1ccdd-8eec-407a-8d08-f6b1865ce78e",
        //   },
        // ];

        // Accepted tokens
        const tokens = [
          { token: "5c82312d-645d-45da-af87-e32ce21ca7bb" },
          { token: "e2d1e388-7d92-4a3b-bd88-8fe269fa778a" },
        ];

        // Compilation Error tokens
        // const tokens = [
        //   { token: "7054f592-533b-44f1-bb27-4890fcb14a08" },
        //   { token: "a5db2876-4a8f-4710-9ddc-5109b8100347" },
        // ];

        // Runtime Error tokens
        // const tokens = [
        //   { token: "9c57e2da-884b-4124-a8cb-c8e66e9906ab" },
        //   { token: "25182e62-db3a-485e-a1fe-a377674f6de5" },
        // ];

        // Time Limit Exceeded tokens
        // const tokens = [
        //   { token: "d645b2fd-f69f-4bb9-aec1-bf669e134a71" },
        //   { token: "d645b2fd-f69f-4bb9-aec1-bf669e134a71" },
        // ];

        let submissionResponse = await getBatchSubmission(tokens);
        if (!submissionResponse) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            // message: "Internal server error. Please try again later.",
            message: "Submission response not found.",
          });
        }

        console.log(submissionResponse.submissions);

        const isProcessing =
          submissionResponse.submissions.some(
            (submission) => submission?.status.description === "Processing",
          ) ||
          submissionResponse.submissions.some(
            (submission) => submission?.status.description === "In Queue",
          );

        while (isProcessing) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const updatedSubmissionResponse = await getBatchSubmission(tokens);
          if (!updatedSubmissionResponse) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              // message: "Internal server error. Please try again later.",
              message: "Updated submission response not found.",
            });
          }
          if (
            updatedSubmissionResponse.submissions.every(
              (submission) => submission?.status.description !== "Processing",
            )
          ) {
            submissionResponse = updatedSubmissionResponse;
            break;
          }
        }

        console.log(submissionResponse.submissions);

        const user = await ctx.db.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const isCompilationError = submissionResponse.submissions.some(
          (submission) =>
            submission?.status.description === "Compilation Error",
        );
        if (isCompilationError) {
          const newSubmission = await ctx.db.submission.create({
            data: {
              verdict: "COMPILATION_ERROR",
              code: input.code,
              compile_output: decode(
                submissionResponse.submissions[0]?.compile_output ?? "",
              ),
              problem: {
                connect: {
                  id: input.problemId,
                },
              },
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              language: {
                connect: {
                  id: input.languageId,
                },
              },
            },
          });
          return newSubmission;
        }

        const isRuntimeError = submissionResponse.submissions.some(
          (submission) =>
            submission?.status.description === "Runtime Error (NZEC)" ||
            submission?.status.description === "Runtime Error (SIGSEGV)" ||
            submission?.status.description === "Runtime Error (SIGXFSZ)" ||
            submission?.status.description === "Runtime Error (SIGFPE)" ||
            submission?.status.description === "Runtime Error (SIGABRT)" ||
            submission?.status.description === "Runtime Error (Other)",
        );
        if (isRuntimeError) {
          const newSubmission = await ctx.db.submission.create({
            data: {
              verdict: "RUNTIME_ERROR",
              code: input.code,
              stderr: decode(submissionResponse.submissions[0]?.stderr ?? ""),
              problem: {
                connect: {
                  id: input.problemId,
                },
              },
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              language: {
                connect: {
                  id: input.languageId,
                },
              },
            },
          });
          return newSubmission;
        }

        const isTimeLimitExceeded = submissionResponse.submissions.some(
          (submission) =>
            submission?.status.description === "Time Limit Exceeded",
        );
        if (isTimeLimitExceeded) {
          const newSubmission = await ctx.db.submission.create({
            data: {
              verdict: "TIME_LIMIT_EXCEEDED",
              code: input.code,
              problem: {
                connect: {
                  id: input.problemId,
                },
              },
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              language: {
                connect: {
                  id: input.languageId,
                },
              },
            },
          });
          return newSubmission;
        }

        const isAccepted = submissionResponse.submissions.every(
          (submission) => submission?.status.description === "Accepted",
        );
        if (isAccepted) {
          const newSubmission = await ctx.db.submission.create({
            data: {
              verdict: "ACCEPTED",
              code: input.code,
              memory: Math.max(
                ...submissionResponse.submissions.map((s) => s.memory),
              ),
              time: Math.max(
                ...submissionResponse.submissions.map((s) =>
                  parseFloat(s.time),
                ),
              ),
              problem: {
                connect: {
                  id: input.problemId,
                },
              },
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              language: {
                connect: {
                  id: input.languageId,
                },
              },
            },
          });
          return newSubmission;
        }

        const isWrongAnswer = submissionResponse.submissions.some(
          (submission) => submission?.status.description === "Wrong Answer",
        );
        if (isWrongAnswer) {
          const newSubmission = await ctx.db.submission.create({
            data: {
              verdict: "WRONG_ANSWER",
              code: input.code,
              memory: Math.max(
                ...submissionResponse.submissions.map((s) => s.memory),
              ),
              time: Math.max(
                ...submissionResponse.submissions.map((s) =>
                  parseFloat(s.time),
                ),
              ),
              problem: {
                connect: {
                  id: input.problemId,
                },
              },
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              language: {
                connect: {
                  id: input.languageId,
                },
              },
            },
          });
          return newSubmission;
        }
        return null;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error. Please try again later.",
        });
      }
    }),

  all: protectedProcedure
    .input(z.object({ problemId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const submissions = await ctx.db.submission.findMany({
          where: {
            problemId: input.problemId,
            userId: ctx.session.user.id,
            testId: null,
            exerciseId: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            language: true,
          },
        });
        if (!submissions) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error. Please try again later.",
          });
        }
        return submissions;
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
});
