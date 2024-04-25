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
});
