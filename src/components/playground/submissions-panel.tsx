"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { IoDocumentText } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useProblemStore } from "~/hooks/use-problem-store";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";

const SubmissionsPanel = () => {
  const { problem } = useProblemStore();
  const submissionsQuery = api.submission.all.useQuery(
    {
      problemId: problem?.id ?? "",
    },
    { enabled: !!problem },
  );

  return (
    <Tabs defaultValue="description" className="flex h-full w-full flex-col">
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger value="description" className="flex gap-2">
          <IoDocumentText className="h-4 w-4" />
          List
        </TabsTrigger>
        <TabsTrigger value="submissions" className="flex gap-2">
          <FaHistory />
          Submission
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="min-h-0 flex-1"></TabsContent>
      <TabsContent value="submissions" className="min-h-0 flex-1"></TabsContent>
    </Tabs>
  );
};

export default SubmissionsPanel;
