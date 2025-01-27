import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./root";
type RouterOutput = inferRouterOutputs<AppRouter>;

export type PublicProblems = RouterOutput["problem"]["allPublic"][number];

export type PrivateProblems = RouterOutput["problem"]["all"][number];

export type PublicProblem = RouterOutput["problem"]["getPublicProblemById"];

export type PrivateProblem = RouterOutput["problem"]["getPrivateProblemById"];

export type RunSubmissionResult = RouterOutput["submission"]["run"];

export type SubmitResult = RouterOutput["submission"]["submit"];

export type PublicSubmission = RouterOutput["submission"]["all"][number];

export type SubmissionsByProblemId =
  RouterOutput["submission"]["getByProblemId"][number];

export type ClassroomById = RouterOutput["class"]["getById"];

export type TestStats = RouterOutput["test"]["getStudentsProgress"][number];
