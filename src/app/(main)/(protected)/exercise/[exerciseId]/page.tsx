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
import { PublicProblems } from "~/server/api/client";

export default function Page({ params }: { params: { exerciseId: string } }) {
  const { exerciseId } = params;
  const { data: exercise } = api.exercise.getById.useQuery({ exerciseId });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (exercise) {
      const totalProblems = exercise.problems.length;
      const solvedProblems = exercise.problems.filter(
        (problem) => problem.status === "ACCEPTED",
      ).length;
      const progress = (solvedProblems / totalProblems) * 100;
      setScore(progress);
    }
  }, [exercise]);

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
            href={`/exercise/${exerciseId}/problem/${row.original.id}`}
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

  const RenderScoreBar = () => {
    return (
      <div>
        <p className="mb-2 text-lg font-semibold">Progress</p>
        <div className="flex items-center gap-5">
          <Progress value={score} className="h-3 w-3/4" />
          <span className="text-muted-foreground">{score}%</span>
        </div>
      </div>
    );
  };

  return exercise ? (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 bg-background md:gap-8 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
        <p className="text-2xl font-semibold">{exercise?.title}</p>
        <p className="text-sm text-muted-foreground">
          Due date: {moment(exercise.dueDate).format("HH:mm - MMM D, YYYY")}
        </p>
      </div>
      <Separator />
      <RenderScoreBar />
      <div className="flex flex-col gap-2">
        <p className="text-md font-semibold">Problem list</p>
        <ProblemDataTable columns={columns} data={exercise.problems ?? []} />
      </div>
    </div>
  ) : (
    <DefaultLoadingPage />
  );
}
