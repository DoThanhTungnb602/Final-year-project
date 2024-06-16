"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { GrDocumentVerified } from "react-icons/gr";
import { MdNotInterested } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";
import { ProblemWithStatus } from "~/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const problemColumns: ColumnDef<ProblemWithStatus>[] = [
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
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                console.log(row.original.id);
              }}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log(row.original.id);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log(row.original.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
