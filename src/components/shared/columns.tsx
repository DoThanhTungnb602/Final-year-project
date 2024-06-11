"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Problem } from "@prisma/client";

import { Badge } from "~/components/ui/badge";
import { GrDocumentVerified } from "react-icons/gr";
import { MdNotInterested } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";

type ProblemWithStatus = Problem & {
  status: "UNSOLVED" | "ACCEPTED" | "ATTEMPTED";
  solution: boolean;
};

export const columns: ColumnDef<ProblemWithStatus>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Title",
  },
  {
    accessorKey: "solution",
    header: "Solution",
    cell: ({ row }) => {
      const solution = row.original.solution;
      return (
        <>
          {solution ? (
            <GrDocumentVerified className="h-6 w-6 text-green-400" />
          ) : (
            <MdNotInterested className="h-6 w-6 text-gray-300" />
          )}
        </>
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
