/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { api } from "~/trpc/react";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useEffect, useState } from "react";
import { useProblemStore } from "~/hooks/use-problem-store";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import { ProblemComponent } from "~/components/shared/problem";

// TODO: Make a timer component for problem page
export default function Page({
  params,
}: {
  params: { testId: string; problemId: string };
}) {
  const { testId, problemId } = params;

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isStarted, setIsStarted] = useState(false);
  const { setProblem } = useProblemStore();
  const { setIsShow, setTitle, setProblems, setTest } = useSidebarStore();

  const { data: problem, isPending } = api.problem.getById.useQuery(problemId, {
    enabled: isStarted,
  });
  const { data: test } = api.test.getById.useQuery({ testId });
  const { data: problemList } = api.test.getProblems.useQuery(
    { testId },
    { enabled: isStarted },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (test) {
      const start = new Date(test.startTime).getTime();

      if (currentTime < start) {
        setIsStarted(false);
      } else {
        setIsStarted(true);
      }
    }
  }, [currentTime, test]);

  useEffect(() => {
    setIsShow(true);

    return () => {
      setIsShow(false);
    };
  }, []);

  useEffect(() => {
    if (test && problemList && problem) {
      setProblems(problemList ?? []);
      setTest(test);
      setTitle(test.title);
      setProblem(problem);
    }

    return () => {
      setProblems([]);
      setTest(null);
      setTitle("");
      setProblem(null);
    };
  }, [test, problemList, problem]);

  return (
    <div className="h-full flex-1 overflow-auto">
      <div className="h-full">
        {isPending ? <DefaultLoadingPage /> : <ProblemComponent />}
      </div>
    </div>
  );
}
