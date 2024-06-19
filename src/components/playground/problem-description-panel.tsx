"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { IoDocumentText } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import Viewer from "../ui/editor/viewer";
import { useProblemStore } from "~/hooks/use-problem-store";

const ProblemDescriptionPanel = () => {
  const { problem } = useProblemStore();

  return (
    <Tabs defaultValue="description" className="flex h-full w-full flex-col">
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger value="description" className="flex gap-2">
          <IoDocumentText className="h-4 w-4" />
          Description
        </TabsTrigger>
        <TabsTrigger value="submissions" className="flex gap-2">
          <FaHistory />
          Submissions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 overflow-y-auto p-3">
            {problem && <Viewer content={problem?.description ?? ""} />}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="submissions" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0"></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProblemDescriptionPanel;
