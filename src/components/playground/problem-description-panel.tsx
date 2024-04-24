"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { IoDocumentText } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MDXRemote } from "next-mdx-remote/rsc";
import { api } from "~/trpc/server";
import { Suspense } from "react";

const ProblemDescriptionPanel = async () => {
  const mdxSource = await api.problem.getDescription();

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
          <CardContent className="h-full min-h-0 p-0 prose dark:prose-invert">
            <Suspense fallback={<div>Loading md file...</div>}>
              <MDXRemote  source={mdxSource.text} />
            </Suspense>
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
