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
  const { data: problem, isPending } =
    api.exercise.getPublicProblemById.useQuery({ exerciseId, problemId });
  const { data: exercise } = api.exercise.getById.useQuery({ exerciseId });
  const { setProblem } = useProblemStore();
  const { setIsShow, setTitle, setProblems, setExercise } = useSidebarStore();

  useEffect(() => {
    setIsShow(true);

    return () => {
      setIsShow(false);
    };
  }, []);

  useEffect(() => {
    if (exercise) {
      setProblems(exercise.problems ?? []);
      setExercise(exercise);
      setTitle(exercise.title);
    }

    return () => {
      setProblems([]);
      setExercise(null);
      setTitle("");
    };
  }, [exercise]);

  useEffect(() => {
    if (problem) {
      setProblem(problem);
    }

    return () => {
      setProblem(null);
    };
  }, [problem]);

  return (
    <div className="h-full flex-1 overflow-auto">
      <div className="h-full">
        {isPending ? <DefaultLoadingPage /> : <ProblemComponent />}
      </div>
    </div>
  );
}
