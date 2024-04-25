"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { IoDocumentText } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { api } from "~/trpc/server";
import ErrorBoundary from "~/components/shared/error-boundary";
import { convertMdToHtml } from "~/lib/utils";

const ProblemDescriptionPanel = async () => {
  const mdxSource = await api.problem.getDescription();
  const html = await convertMdToHtml(mdxSource.text);

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
        <Card className="h-full min-h-0 overflow-y-auto">
          <CardContent className="prose h-full min-h-0 p-3 dark:prose-invert prose-code:rounded-md prose-code:bg-gray-300 prose-code:p-0.5 before:prose-code:content-none after:prose-code:content-none dark:prose-code:bg-gray-700">
            <ErrorBoundary>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </ErrorBoundary>
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
