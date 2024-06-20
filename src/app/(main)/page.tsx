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
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ProblemFilter } from "~/components/shared/problem-filter";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiTarget } from "react-icons/si";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";
import { z } from "zod";
import { ProblemFilterSchema } from "~/schemas";
import DefaultLoadingPage from "~/components/shared/default-loading-page";

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
        href={`/problem/${row.original.id}`}
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
          <GrDocumentVerified className="size-5 text-green-400" />
        ) : (
          <MdNotInterested className="size-6 text-gray-300" />
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
  const { data, isPending } = api.problem.allPublic.useQuery();
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<ProblemWithStatus[]>([]);

  useEffect(() => {
    setFilteredData(data ?? []);
  }, [data]);

  const handleFilterChange = (filter: z.infer<typeof ProblemFilterSchema>) => {
    const filtered = data?.filter((problem) => {
      if (filter.difficulty && problem.difficulty !== filter.difficulty) {
        return false;
      }
      if (filter.status && problem.status !== filter.status) {
        return false;
      }
      if (filter.tags && filter.tags.length > 0) {
        const problemTags = problem.tags.map((tag) => tag);
        const selectedTags = filter.tags.map((tag) => tag);
        if (!selectedTags.every((tag) => problemTags.includes(tag))) {
          return false;
        }
      }
      if (
        filter.search &&
        !problem.title.toLowerCase().includes(filter.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    setFilteredData(filtered ?? []);
  };

  return isPending ? (
    <DefaultLoadingPage />
  ) : (
    <Card
      x-chunk="dashboard-06-chunk-0"
      className="bg-dark flex h-full w-full flex-1 flex-col gap-4"
    >
      <CardHeader>
        <div className="flex justify-between">
          <div className="text-2xl font-bold">List of Problems</div>
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
        {filter && (
          <Card className="bg-dark">
            <CardContent className="p-3">
              <ProblemFilter onFilterChange={handleFilterChange} />
            </CardContent>
          </Card>
        )}
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <DataTable columns={columns} data={filteredData} />
      </CardContent>
    </Card>
  );
}
