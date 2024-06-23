import { TRPCError } from "@trpc/server";
import { axiosInstance } from "~/lib/axios";
import { SolutionSchema } from "~/schemas";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const submissionRouter = createTRPCRouter({
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit solution",
        });
      }
    }),
});
