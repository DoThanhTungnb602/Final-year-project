/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { api } from "~/trpc/react";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useEffect } from "react";
import { useProblemStore } from "~/hooks/use-problem-store";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import { ProblemComponent } from "~/components/shared/problem";
import { useCurrentUser } from "~/hooks/use-current-user";

export default function Page({ params }: { params: { id: string } }) {
  const currentUser = useCurrentUser();
  const { id } = params;
  const { data: problem, isPending } =
    api.problem.getPublicProblemById.useQuery(id);
  const { data: problemsQueryData } = api.problem.allPublic.useQuery(
    currentUser?.id ?? "",
  );
  const { setProblem } = useProblemStore();
  const { setProblems, setIsShow, setTitle } = useSidebarStore();

  useEffect(() => {
    if (problemsQueryData) {
      setProblems(problemsQueryData);
      setIsShow(true);
      setTitle("Problem List");
    }

    return () => {
      setIsShow(false);
      setTitle("");
    };
  }, [problemsQueryData]);

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
