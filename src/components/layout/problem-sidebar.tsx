"use client";

import { Button } from "~/components/ui/button";
import { FaList } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import { Progress } from "~/components/ui/progress";
import { useState } from "react";
import { ProblemDataTable } from "~/components/shared/problem-data-table";
import { Badge } from "~/components/ui/badge";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiTarget } from "react-icons/si";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CustomTooltip from "~/components/shared/custom-tooltip";
import Timer from "~/components/shared/timer";
import { PublicProblems } from "~/server/api/client";
import { useEffect } from "react";

export function ProblemSidebar() {
  const { title, problems, test, exercise } = useSidebarStore();
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (problems && test) {
      setTotalScore(problems.length * 20);
      const solved = problems.filter(
        (problem) => problem.status === "ACCEPTED",
      );
      setScore(solved.length * 20);
    }
  }, [problems, test]);

  useEffect(() => {
    if (exercise && problems) {
      const totalProblems = problems.length;
      const solvedProblems = problems.filter(
        (problem) => problem.status === "ACCEPTED",
      ).length;
      const progress = (solvedProblems / totalProblems) * 100;
      setProgress(progress);
    }
  }, [exercise, problems]);

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
        const url = test
          ? `/test/${test.id}/problem/${problem.id}`
          : exercise
            ? `/exercise/${exercise.id}/problem/${problem.id}`
            : `/problem/${problem.id}`;
        return (
          <SheetClose asChild>
            <Link href={url} className="transition-all hover:underline">
              {problem.title}
            </Link>
          </SheetClose>
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

  const ProgressBar = () => {
    if (test) {
      return (
        <>
          <Timer
            startTime={test.startTime.toString()}
            duration={test.duration * 1}
          />
          <div>
            <p className="mb-2 text-lg font-semibold">Total score</p>
            <div className="flex items-center gap-5">
              <Progress
                value={(score / totalScore) * 100}
                className="h-3 w-3/4"
                max={totalScore}
              />
              <span className="text-muted-foreground">
                {score} / {totalScore}
              </span>
            </div>
          </div>
        </>
      );
    }
    if (exercise) {
      return (
        <div>
          <p className="mb-2 text-lg font-semibold">Progress</p>
          <div className="flex items-center gap-5">
            <Progress value={progress} className="h-3 w-3/4" />
            <span className="text-muted-foreground">{progress}%</span>
          </div>
        </div>
      );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <FaList className="mr-2 size-4" />
          {title}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-5 sm:max-w-lg">
        <p className="text-2xl font-semibold">{title}</p>
        <Separator />
        <ProgressBar />
        <ProblemDataTable columns={columns} data={problems ?? []} />
      </SheetContent>
    </Sheet>
  );
}
