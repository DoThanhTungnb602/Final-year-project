"use client";

import { Separator } from "~/components/ui/separator";
import { Progress } from "~/components/ui/progress";
import { useEffect, useState } from "react";
import { ProblemDataTable } from "~/components/shared/problem-data-table";
import { Badge } from "~/components/ui/badge";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiTarget } from "react-icons/si";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CustomTooltip from "~/components/shared/custom-tooltip";
import { api } from "~/trpc/react";
import moment from "moment";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import Timer from "~/components/shared/timer";
import { PublicProblems } from "~/server/api/client";

export default function Page({ params }: { params: { testId: string } }) {
  const { testId } = params;
  const [score, setScore] = useState(40);
  const [totalScore, setTotalScore] = useState(100);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isStarted, setIsStarted] = useState(false);

  const { data: test } = api.test.getById.useQuery({ testId });
  const { data: problems } = api.test.getProblems.useQuery(
    { testId },
    { enabled: isStarted },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (test) {
      const start = new Date(test.startTime).getTime();

      if (currentTime < start) {
        setIsStarted(false);
      } else {
        setIsStarted(true);
      }
    }
  }, [currentTime, test]);

  const columns: ColumnDef<PublicProblems>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        if (status === "ACCEPTED") {
          return (
            <CustomTooltip content="Solved" side="top">
              <span>
                <IoMdCheckmarkCircleOutline className="h-6 w-6 text-green-400" />
              </span>
            </CustomTooltip>
          );
        } else if (status === "ATTEMPTED") {
          return (
            <CustomTooltip content="Attempted" side="top">
              <span>
                <SiTarget className="h-6 w-6 text-gray-300" />
              </span>
            </CustomTooltip>
          );
        } else {
          return (
            <CustomTooltip content="UnSolved" side="top">
              <span>
                <MdOutlineRadioButtonUnchecked className="h-6 w-6 text-gray-300" />
              </span>
            </CustomTooltip>
          );
        }
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const problem = row.original;
        return (
          <Link
            href={`/test/${testId}/problem/${row.original.id}`}
            className="transition-all hover:underline"
          >
            {problem.title}
          </Link>
        );
      },
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

  const ScoreBar = () => {
    return (
      <div>
        <p className="mb-2 text-lg font-semibold">Total score</p>
        <div className="flex items-center gap-5">
          <Progress value={score} className="h-3 w-3/4" max={totalScore} />
          <span className="text-muted-foreground">
            {score} / {totalScore}
          </span>
        </div>
      </div>
    );
  };

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
      <ScoreBar />
      <div className="flex flex-col gap-2">
        <p className="text-md font-semibold">Problem list</p>
        {isStarted ? (
          <ProblemDataTable columns={columns} data={problems ?? []} />
        ) : (
          <p className="text-md rounded-md border px-4 py-5 text-muted-foreground">
            Problems will be available once the test starts.
          </p>
        )}
      </div>
    </div>
  ) : (
    <DefaultLoadingPage />
  );
}
