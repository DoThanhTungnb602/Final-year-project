"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useSubmissionStore } from "~/hooks/use-submission-store";
import { useProblemStore } from "~/hooks/use-problem-store";
import { useEffect, useState } from "react";
import { TestCase } from "~/lib/types";
import { Button } from "~/components/ui/button";
import { cn, unknownToString } from "~/lib/utils";
import { RxDotFilled } from "react-icons/rx";

const TestResultPanel = () => {
  const { submission } = useSubmissionStore();
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

  const RenderStatus = () => {
    const status = submission?.status.description;
    switch (status) {
      case "Accepted": {
        return (
          <div className="flex items-center gap-4">
            <p className="text-xl font-semibold text-green-500">{status}</p>
            <span className="text-sm font-semibold text-muted-foreground">
              Runtime: {submission?.time}ms
            </span>
          </div>
        );
      }
    }
  };

  return submission ? (
    <Card className="h-full min-h-0 overflow-hidden">
      <CardContent className="h-full min-h-0 space-y-5 overflow-y-auto p-3">
        <RenderStatus />
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
                "ps-2 font-semibold",
                activeTestCaseTab !== index && "bg-transparent",
              )}
            >
              <RxDotFilled className="mr-2 text-xl text-green-500" />
              Case {index + 1}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">Output:</p>
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
    <Card className="h-full min-h-0 overflow-hidden">
      <CardContent className="flex h-full min-h-0 items-center justify-center p-3">
        <div className="text-sm font-semibold text-muted-foreground">
          You must run your code first
        </div>
      </CardContent>
    </Card>
  );
};

export default TestResultPanel;
