import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const problemRouter = createTRPCRouter({
  getDescription: publicProcedure.query(async ({ input }) => {
    const res = await fetch(
      `https://utfs.io/f/2a136dcc-1291-4275-a63a-d0b762b89a28-21kzz.mdx`,
    );
    const text = await res.text();
    return { text };
  }),
});
