"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { IoDocumentText } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import Viewer from "~/components/ui/editor/viewer";
import { useProblemStore } from "~/hooks/use-problem-store";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiTarget } from "react-icons/si";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { Badge } from "~/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import SubmissionsPanel from "./submissions-panel";
import { useSubmitResultStore } from "~/hooks/use-submission-store";
import { useEffect, useState } from "react";

const ProblemDescriptionPanel = () => {
  const { problem } = useProblemStore();
  const { submitResult } = useSubmitResultStore();
  const [activeTab, setActiveTab] = useState<"description" | "submissions">(
    "description",
  );

  useEffect(() => {
    if (submitResult) {
      setActiveTab("submissions");
    }
  }, [submitResult]);

  const ProblemStatus = () => {
    const status = problem?.status;
    if (status === "ACCEPTED") {
      return (
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-muted-foreground">Solved</p>
          <IoMdCheckmarkCircleOutline className="size-5 text-green-400" />
        </div>
      );
    } else if (status === "ATTEMPTED") {
      return (
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-muted-foreground">
            Attempted
          </p>
          <SiTarget className="size-5 text-gray-300" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-muted-foreground">
            Unsolved
          </p>
          <MdOutlineRadioButtonUnchecked className="size-5 text-gray-300" />
        </div>
      );
    }
  };

  return (
    <Tabs
      defaultValue="description"
      className="flex h-full w-full flex-col"
      value={activeTab}
    >
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger
          value="description"
          className="flex gap-2"
          onClick={() => setActiveTab("description")}
        >
          <IoDocumentText className="h-4 w-4" />
          Description
        </TabsTrigger>
        <TabsTrigger
          value="submissions"
          className="flex gap-2"
          onClick={() => setActiveTab("submissions")}
        >
          <FaHistory />
          Submissions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 overflow-y-auto p-3">
            {problem ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-10">
                  <p className="truncate text-3xl font-semibold">
                    {problem.title}
                  </p>
                  <ProblemStatus />
                </div>
                <div>
                  {problem.difficulty === "EASY" && (
                    <Badge className="bg-primary">Easy</Badge>
                  )}
                  {problem.difficulty === "MEDIUM" && (
                    <Badge className="bg-amber-400 hover:bg-amber-400/80">
                      Medium
                    </Badge>
                  )}
                  {problem.difficulty === "HARD" && (
                    <Badge variant="destructive">Hard</Badge>
                  )}
                </div>
                <Viewer content={problem.description ?? ""} />
                {problem.tags.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Topics</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {problem.tags.map((topic) => (
                            <Badge key={topic.id} variant="secondary">
                              {topic.name}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            ) : (
              <DefaultLoadingPage />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="submissions" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0">
            {problem ? <SubmissionsPanel /> : <DefaultLoadingPage />}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProblemDescriptionPanel;
