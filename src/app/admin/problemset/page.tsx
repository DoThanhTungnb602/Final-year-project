"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ProblemFilter } from "~/components/pages/problemset/problem-filter";
import { Toggle } from "~/components/ui/toggle";
import { useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { DataTable } from "~/components/shared/data-table";
import { api } from "~/trpc/react";
import { ColumnDef, Row } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { GrDocumentVerified } from "react-icons/gr";
import { MdNotInterested } from "react-icons/md";
import { Checkbox } from "~/components/ui/checkbox";
import { ProblemWithStatus } from "~/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const ActionsCellComponent = ({ row }: { row: Row<ProblemWithStatus> }) => {
  const router = useRouter();
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
            router.push(`/admin/problemset/edit/${row.original.id}`);
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
};

const columns: ColumnDef<ProblemWithStatus>[] = [
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
    cell: ActionsCellComponent,
  },
];

export default function ProblemSet() {
  const [filter, setFilter] = useState(false);
  const query = api.problem.all.useQuery();
  const [rowSelection, setRowSelection] = useState({});

  return (
    <>
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
          <Link href="/admin/problemset/create">
            <Button>Add Problem</Button>
          </Link>
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
          <DataTable
            columns={columns}
            data={query?.data ?? []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </CardContent>
      </Card>
    </>
  );
}
