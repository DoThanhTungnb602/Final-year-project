"use client";

import { Separator } from "~/components/ui/separator";
import { useEffect, useState } from "react";
import { ProblemDataTable } from "~/components/shared/problem-data-table";
import { Badge } from "~/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { api } from "~/trpc/react";
import moment from "moment";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import Timer from "~/components/shared/timer";
import { PublicProblems, TestStats } from "~/server/api/client";

export default function Page({
  params,
}: {
  params: { id: string; testId: string };
}) {
  const { testId, id: classId } = params;
  const [totalScore, setTotalScore] = useState(0);

  const { data: test } = api.test.getById.useQuery({ testId });
  const { data: problems } = api.test.getProblemsWithoutChecking.useQuery({
    testId,
  });

  const { data: students } = api.test.getStudentsProgress.useQuery({
    testId,
    classId,
  });

  useEffect(() => {
    if (problems) {
      setTotalScore(problems.length * 20);
    }
  }, [problems]);

  const columns: ColumnDef<PublicProblems>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => {
        const problem = row.original;
        return (
          <>
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
          </>
        );
      },
    },
  ];

  const studentsColumns: ColumnDef<TestStats>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/admin/users/${row.original.id}`}
          className="transition-all hover:underline"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => (
        <p className="font-semibold text-muted-foreground">
          {row.original.score}/{totalScore}
        </p>
      ),
    },
  ];

  return test ? (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 bg-background md:gap-8 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
        <p className="text-3xl font-semibold">{test?.title}</p>
        <div>
          <p className="text-sm text-muted-foreground">
            {moment(test.startTime).format("HH:mm - MMM D, YYYY")}
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            Duration: {test.duration} minutes
          </p>
        </div>
      </div>
      <Separator />
      <Timer
        startTime={test.startTime.toString()}
        duration={test.duration * 1}
      />
      <div className="flex flex-col gap-2">
        <p className="text-md font-semibold">Problem list</p>
        <ProblemDataTable columns={columns} data={problems ?? []} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-md font-semibold">Students</p>
        <ProblemDataTable columns={studentsColumns} data={students ?? []} />
      </div>
    </div>
  ) : (
    <DefaultLoadingPage />
  );
}
