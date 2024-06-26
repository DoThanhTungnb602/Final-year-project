"use client";

import { Card, CardContent } from "~/components/ui/card";
import { useSubmissionStore } from "~/hooks/use-submission-store";
import { useProblemStore } from "~/hooks/use-problem-store";

const TestResultPanel = () => {
  const { submission } = useSubmissionStore();
  const { problem } = useProblemStore();

  return submission ? (
    <Card className="h-full min-h-0 overflow-hidden">
      <CardContent className="h-full min-h-0 p-3">
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
            {Object.entries(currentTestCase?.input ?? {}).map(
              ([key, value]) => (
                <Card className="bg-neutral-100 dark:bg-neutral-800" key={key}>
                  <CardContent className="flex min-h-0 items-center p-3 text-sm font-semibold">
                    <code>
                      {key}: {unknownToString(value)}
                    </code>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </CardContent>
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
