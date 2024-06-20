/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { api } from "~/trpc/react";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useEffect } from "react";
import { useProblemStore } from "~/hooks/use-problem-store";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import { ProblemComponent } from "~/components/shared/problem";

export default function Page({
  params,
}: {
  params: { exerciseId: string; problemId: string };
}) {
  const { exerciseId, problemId } = params;
  const { data: problem, isPending } = api.problem.getById.useQuery(problemId);
  const { data: exercise } = api.exercise.getById.useQuery({ exerciseId });
  const { setProblem } = useProblemStore();
  const { setProblems, setExercise } = useSidebarStore();

  useEffect(() => {
    if (exercise) {
      setProblems(exercise.problems ?? []);
      setExercise(exercise);
    }
  }, [exercise]);

  useEffect(() => {
    if (problem) {
      setProblem(problem);
    }
  }, [problem]);

  return (
    <div className="h-full flex-1 overflow-auto">
      <div className="h-full">
        {isPending ? <DefaultLoadingPage /> : <ProblemComponent />}
      </div>
    </div>
  );
}
