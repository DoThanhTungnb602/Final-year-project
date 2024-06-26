"use client";

import { Card, CardContent } from "~/components/ui/card";
import { useProblemStore } from "~/hooks/use-problem-store";
import { useEffect, useState } from "react";
import { TestCase } from "~/lib/types";
import { Button } from "~/components/ui/button";
import { cn, unknownToString } from "~/lib/utils";
import DefaultLoadingPage from "~/components/shared/default-loading-page";

const TestCasePanel = () => {
  const { problem } = useProblemStore();
  const [testcases, setTestcases] = useState<TestCase[]>([]);
  const [currentTestCase, setCurrentTestCase] = useState<
    TestCase | undefined
  >();
  const [activeTestCaseTab, setActiveTestCaseTab] = useState(0);

  useEffect(() => {
    if (problem) {
      try {
        const testcases = JSON.parse(problem.testcases) as TestCase[];
        setTestcases(testcases);
        setCurrentTestCase(testcases[0]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [problem]);

  return problem ? (
    <Card className="h-full min-h-0 overflow-hidden">
      <CardContent className="h-full min-h-0 p-3">
        <div className="flex gap-4">
          {testcases.map((testcase, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              onClick={() => {
                setCurrentTestCase(testcase);
                setActiveTestCaseTab(index);
              }}
              className={cn(
                "font-semibold",
                activeTestCaseTab !== index && "bg-transparent",
              )}
            >
              Case {index + 1}
            </Button>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <p className="text-sm font-semibold">Input:</p>
          {Object.entries(currentTestCase?.input ?? {}).map(([key, value]) => (
            <Card className="bg-neutral-100 dark:bg-neutral-800" key={key}>
              <CardContent className="flex min-h-0 items-center p-3 text-sm font-semibold">
                <code>
                  {key}: {unknownToString(value)}
                </code>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  ) : (
    <DefaultLoadingPage />
  );
};

export default TestCasePanel;
