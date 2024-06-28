import { authRouter } from "~/server/api/routers/auth";
import { userRouter } from "~/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { problemRouter } from "./routers/problem";
import { submissionRouter } from "./routers/submission";
import { classRouter } from "./routers/class";
import { exerciseRouter } from "./routers/exercise";
import { testRouter } from "./routers/test";
import { languageRouter } from "./routers/language";
import { topicRouter } from "./routers/topic";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  problem: problemRouter,
  submission: submissionRouter,
  class: classRouter,
  exercise: exerciseRouter,
  test: testRouter,
  language: languageRouter,
  topic: topicRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
