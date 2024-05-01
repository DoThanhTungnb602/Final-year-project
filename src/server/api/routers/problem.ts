import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const problemRouter = createTRPCRouter({
  getDescription: publicProcedure.query(async ({ input }) => {
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

  getProblemList: publicProcedure.query(async ({ ctx, input }) => {
    try {
      const problems = await ctx.db.problem.findMany({
        include: {
          submissions: {
            where: {
              userId: ctx.session?.user.id,
            },
            select: {
              verdict: true,
            },
          },
          solution: {
            select: {
              code: true,
            },
          },
        },
      });
      return problems.map((problem) => {
        const hasAccepted = problem.submissions.some(
          (sub) => sub.verdict === "ACCEPTED",
        );
        const hasAttempted = problem.submissions.length > 0;
        const solution = problem.solution.length > 0;
        let status: "UNSOLVED" | "ACCEPTED" | "ATTEMPTED" = "UNSOLVED";
        if (hasAccepted) {
          status = "ACCEPTED";
        } else if (hasAttempted) {
          status = "ATTEMPTED";
        }
        return {
          ...problem,
          solution,
          status,
        };
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch problem list",
      });
    }
  }),
});
