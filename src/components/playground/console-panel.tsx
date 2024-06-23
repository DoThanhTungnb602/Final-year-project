"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { GrTest } from "react-icons/gr";
import { useSubmissionStore } from "~/hooks/use-submission-store";
import { useProblemStore } from "~/hooks/use-problem-store";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { TestCase } from "~/lib/types";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import DefaultLoadingPage from "../shared/default-loading-page";

function unknownToString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toString();
  } else if (Array.isArray(value)) {
    return `[${value.map(unknownToString).join(", ")}]`;
  } else if (typeof value === "object") {
    return JSON.stringify(value);
  } else {
    return value?.toString() ?? "null";
  }
}
const ConsolePanel = () => {
  const { submission } = useSubmissionStore();
  const { problem } = useProblemStore();
  const [testcases, setTestcases] = useState<TestCase[]>([]);
  const [currentTestCase, setCurrentTestCase] = useState<
    TestCase | undefined
  >();
  const [activeTab, setActiveTab] = useState(0);

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
    <Tabs defaultValue="testcase" className="flex h-full w-full flex-col">
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger value="testcase" className="flex gap-2">
          <GrTest />
          Test case
        </TabsTrigger>
        <TabsTrigger value="output" className="flex gap-2">
          <Terminal className="size-4" />
          Test Result
        </TabsTrigger>
      </TabsList>
      <TabsContent value="testcase" className="min-h-0 flex-1">
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
                    setActiveTab(index);
                  }}
                  className={cn(
                    "font-semibold",
                    activeTab !== index && "bg-transparent",
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
                  <Card
                    className="bg-neutral-100 dark:bg-neutral-800"
                    key={key}
                  >
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
        </Card>
      </TabsContent>
      <TabsContent value="output" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0"></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ) : (
    <DefaultLoadingPage />
  );
};

export default ConsolePanel;
