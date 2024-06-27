"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { GrTest } from "react-icons/gr";
import { useRunResultStore } from "~/hooks/use-submission-store";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import TestCasePanel from "./testcase-panel";
import TestResultPanel from "./test-result-panel";

const ConsolePanel = () => {
  const { result } = useRunResultStore();
  const [activeTab, setActiveTab] = useState<"testcase" | "test_result">(
    "testcase",
  );

  useEffect(() => {
    if (result) {
      setActiveTab("test_result");
    }
  }, [result]);

  return (
    <Tabs
      defaultValue="testcase"
      className="flex h-full w-full flex-col"
      value={activeTab}
    >
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger
          value="testcase"
          className="flex gap-2"
          onClick={() => setActiveTab("testcase")}
        >
          <GrTest />
          Test case
        </TabsTrigger>
        <TabsTrigger
          value="test_result"
          className="flex gap-2"
          onClick={() => setActiveTab("test_result")}
        >
          <Terminal className="size-4" />
          Test Result
        </TabsTrigger>
      </TabsList>
      <TabsContent value="testcase" className="min-h-0 flex-1">
        <TestCasePanel />
      </TabsContent>
      <TabsContent value="test_result" className="min-h-0 flex-1">
        <TestResultPanel />
      </TabsContent>
    </Tabs>
  );
};

export default ConsolePanel;
