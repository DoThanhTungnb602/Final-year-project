/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { api } from "~/trpc/react";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useEffect } from "react";
import { useProblemStore } from "~/hooks/use-problem-store";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import { ProblemComponent } from "~/components/shared/problem";
import { useEditorStore } from "~/hooks/use-editor-store";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: problem, isPending } = api.problem.getById.useQuery(id);
  const { data: problems } = api.problem.allPublic.useQuery();
  const { setProblem } = useProblemStore();
  const { setProblems } = useSidebarStore();
  const { setCodeMap } = useEditorStore();

  useEffect(() => {
    if (problems) {
      setProblems(problems);
    }
  }, [problems]);

  useEffect(() => {
    if (problem) {
      setProblem(problem);
      problem.skeletons.forEach((skeleton) => {
        setCodeMap({ language: skeleton.language.name, code: skeleton.code });
      });
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
