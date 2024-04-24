import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const problemRouter = createTRPCRouter({
  getDescription: publicProcedure.query(async ({ input }) => {
    const res = await fetch(
      `https://utfs.io/f/57dd7ab6-e693-4ec2-bcb1-d241d7bed8f3-21kzz.md`,
    );
    const text = await res.text();
    return { text };
  }),
});
