/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { api } from "~/trpc/react";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useEffect } from "react";
import { useProblemStore } from "~/hooks/use-problem-store";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import { ProblemComponent } from "~/components/shared/problem";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isPending } = api.problem.getById.useQuery(id);
  const { data: problems } = api.problem.allPublic.useQuery();
  const { setProblem } = useProblemStore();
  const { setProblems } = useSidebarStore();

  useEffect(() => {
    if (problems) {
      setProblems(problems);
    }
  }, [problems]);

  useEffect(() => {
    if (data) {
      setProblem(data);
    }
  }, [data]);

  return (
    <div className="h-full flex-1 overflow-auto">
      <div className="h-full">
        {isPending ? <DefaultLoadingPage /> : <ProblemComponent />}
      </div>
    </div>
  );
}
