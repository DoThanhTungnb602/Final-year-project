"use client";

import { api } from "~/trpc/react";
import { DataTable } from "~/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { GrDocumentVerified } from "react-icons/gr";
import { MdFilterAlt, MdFilterAltOff, MdNotInterested } from "react-icons/md";
import { ProblemWithStatus } from "~/lib/types";
import Link from "next/link";
import { Toggle } from "~/components/ui/toggle";
import { Card, CardContent } from "~/components/ui/card";
import { ProblemFilter } from "~/components/pages/problemset/problem-filter";
import { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiTarget } from "react-icons/si";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

const columns: ColumnDef<ProblemWithStatus>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "ACCEPTED") {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <IoMdCheckmarkCircleOutline className="h-6 w-6 text-green-400" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Solved</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else if (status === "ATTEMPTED") {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <SiTarget className="h-6 w-6 text-gray-300" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attempted</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <MdOutlineRadioButtonUnchecked className="h-6 w-6 text-gray-300" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>UnSolved</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/admin/problemset/${row.original.id}`}
        className="transition hover:underline"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "solution",
    header: "Solution",
    cell: ({ row }) => (
      <>
        {row.original.solution ? (
          <GrDocumentVerified className="size-4 text-green-400" />
        ) : (
          <MdNotInterested className="size-4 text-gray-300" />
        )}
      </>
    ),
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
            <Badge className="bg-amber-400 hover:bg-amber-400/80">Medium</Badge>
          )}
          {problem.difficulty === "HARD" && (
            <Badge variant="destructive">Hard</Badge>
          )}
        </>
      );
    },
  },
];

export default function Home() {
  const { data } = api.problem.all.useQuery();
  const [filter, setFilter] = useState(false);

  return (
    <main className="grid flex-1 items-start gap-4 p-6">
      <div className="flex items-center ">
        <div className="ml-auto flex items-center gap-2">
          <Toggle
            className="px-2"
            variant="outline"
            pressed={filter}
            onPressedChange={() => setFilter(!filter)}
          >
            {filter ? (
              <MdFilterAlt className="size-6" />
            ) : (
              <MdFilterAltOff className="size-6" />
            )}
          </Toggle>
        </div>
      </div>
      {filter && (
        <Card className="bg-dark">
          <CardContent className="p-3">
            <ProblemFilter />
          </CardContent>
        </Card>
      )}
      <Card x-chunk="dashboard-06-chunk-0" className="bg-dark">
        <CardContent className="overflow-auto pt-6">
          <DataTable columns={columns} data={data ?? []} />
        </CardContent>
      </Card>
    </main>
  );
}
