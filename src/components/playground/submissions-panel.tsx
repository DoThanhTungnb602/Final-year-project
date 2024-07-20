"use client";

import { Tabs, TabsContent } from "~/components/ui/tabs";
import { useProblemStore } from "~/hooks/use-problem-store";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { PublicSubmission } from "~/server/api/client";
import { cn } from "~/lib/utils";
import { ArrowLeft, Check, Clock, Copy, Cpu, Eye } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import moment from "moment";
import { useSubmitResultStore } from "~/hooks/use-submission-store";

const SubmissionsPanel = () => {
  const { problem } = useProblemStore();
  const { submitResult, setSubmitResult } = useSubmitResultStore();
  const submissionsQuery = api.submission.getByProblemId.useQuery(
    {
      problemId: problem?.id ?? "",
    },
    { enabled: !!problem },
  );

  const [submissionDetail, setSubmissionDetail] =
    useState<PublicSubmission | null>(null);

  const [isCopied, setIsCopied] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "submissions" | "submissionDetail"
  >("submissions");

  const { theme } = useTheme();

  useEffect(() => {
    if (submitResult) {
      setActiveTab("submissionDetail");
      setSubmissionDetail(submitResult);
    }

    return () => {
      setSubmitResult(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitResult]);

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard
      .writeText(submissionDetail?.code ?? "")
      .then(() => {
        setIsCopied(true);
      })
      .catch(console.error);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const columns: ColumnDef<PublicSubmission>[] = [
    {
      accessorKey: "verdict",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.verdict;
        return (
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                status === "ACCEPTED" ? "text-green-500" : "text-red-500",
              )}
            >
              {
                {
                  ACCEPTED: "Accepted",
                  WRONG_ANSWER: "Wrong Answer",
                  TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
                  RUNTIME_ERROR: "Runtime Error",
                  MEMORY_LIMIT_EXCEEDED: "Memory Limit Excceeded",
                  COMPILATION_ERROR: "Compilation Error",
                }[status]
              }
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.language.name}</Badge>
      ),
    },
    {
      accessorKey: "time",
      header: "Runtime",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Clock className="size-4" />
          {row.original.time ? row.original.time : "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "memory",
      header: "Memory",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Cpu className="size-4" />
          {row.original.memory ? row.original.memory : "N/A"}
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button
          className="rounded-full bg-transparent hover:bg-transparent"
          variant="secondary"
          onClick={() => {
            setSubmissionDetail(row.original);
            setActiveTab("submissionDetail");
          }}
        >
          <Eye className="size-4" />
        </Button>
      ),
    },
  ];

  const RenderStatus = () => {
    const status = submissionDetail?.verdict ?? "ACCEPTED";
    switch (status) {
      case "ACCEPTED": {
        return (
          <p className="text-xl font-semibold  text-green-500">Accepted</p>
        );
      }
      case "COMPILATION_ERROR": {
        return (
          <p className="text-xl font-semibold  text-red-500">
            Compilation Error
          </p>
        );
      }
      case "RUNTIME_ERROR": {
        return (
          <p className="text-xl font-semibold  text-red-500">Runtime Error</p>
        );
      }
      case "TIME_LIMIT_EXCEEDED": {
        return (
          <p className="text-xl font-semibold  text-red-500">
            Time Limit Exceeded
          </p>
        );
      }
      case "MEMORY_LIMIT_EXCEEDED": {
        return (
          <p className="text-xl font-semibold  text-red-500">
            Memory Limit Exceeded
          </p>
        );
      }
      case "WRONG_ANSWER": {
        return (
          <p className="text-xl font-semibold  text-red-500">Wrong Answer</p>
        );
      }
    }
  };

  return (
    <Tabs
      defaultValue="submissions"
      className="flex h-full w-full flex-col"
      value={activeTab}
    >
      <TabsContent value="submissions" className="min-h-0 flex-1">
        {submissionsQuery.isPending ? (
          <DefaultLoadingPage />
        ) : (
          <DataTable
            columns={columns}
            pagination={false}
            data={submissionsQuery.data ?? []}
          />
        )}
      </TabsContent>
      <TabsContent value="submissionDetail" className="min-h-0 flex-1">
        <div className="flex flex-col items-start gap-4 px-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setActiveTab("submissions");
            }}
          >
            <ArrowLeft className="mr-2 size-4" />
            All submissions
          </Button>
          <div className="flex w-full items-center justify-between gap-4">
            <RenderStatus />
            <p className="text-xs font-semibold text-muted-foreground">
              {moment(submissionDetail?.createdAt)
                .local()
                .format("MMM Do YYYY")}
            </p>
          </div>
          <p className="font-semibold">
            Code: {submissionDetail?.language.name}
          </p>
          <div className="group relative flex h-96 min-h-0 w-full flex-col border bg-zinc-200 dark:bg-transparent">
            <Button
              className="absolute right-2 top-2 z-[1000] opacity-0 transition-all group-hover:opacity-100"
              size="icon"
              variant="outline"
              onClick={handleCopy}
            >
              {isCopied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              <span className="sr-only">Copy</span>
            </Button>
            <Editor
              theme={theme === "dark" ? "vs-dark" : "vs-light"}
              defaultLanguage={submissionDetail?.language.editorValue}
              language={submissionDetail?.language.editorValue}
              value={submissionDetail?.code ?? ""}
              options={{
                minimap: { enabled: false },
                contextmenu: true,
                readOnly: true,
                padding: { top: 10 },
              }}
              loading={<DefaultLoadingPage />}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SubmissionsPanel;
