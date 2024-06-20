"use client";

import { Button } from "~/components/ui/button";
import { FaList } from "react-icons/fa6";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";
import { useSidebarStore } from "~/hooks/use-sidebar-store";
import { Progress } from "~/components/ui/progress";
import { useState } from "react";
import { ProblemDataTable } from "../shared/problem-data-table";
import { ProblemWithStatus } from "~/lib/types";
import { Badge } from "~/components/ui/badge";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiTarget } from "react-icons/si";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CustomTooltip from "../shared/custom-tooltip";

export function ProblemSidebar() {
  const { problems, test, exercise } = useSidebarStore();
  const [score, setScore] = useState(40);
  const title = test ? test.title : exercise ? exercise.title : "Problem List";

  const columns: ColumnDef<ProblemWithStatus>[] = [
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
          <Link href={url} className="transition-all hover:underline">
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
    if (!test) {
      return (
        <div>
          <p className="mb-2 text-lg font-semibold">Total score</p>
          <div className="flex items-center gap-5">
            <Progress value={score} className="h-3 w-3/4" />
            <span className="text-muted-foreground">{score}%</span>
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
        <RenderScoreBar />
        <ProblemDataTable columns={columns} data={problems ?? []} />
      </SheetContent>
    </Sheet>
  );
}
