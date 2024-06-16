"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/shared/data-table";
import { Separator } from "~/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";

import { Class, Exercise } from "@prisma/client";
import { Checkbox } from "~/components/ui/checkbox";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface ClassWithExercises extends Class {
  exercises: Exercise[];
}

export default function ClassExercises({
  classroom,
}: {
  classroom?: ClassWithExercises;
}) {
  const columns: ColumnDef<Exercise>[] = [
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
    },
    {
      accessorKey: "assignedDate",
      accessorFn: (row) =>
        moment(row?.assignedDate).local().format("DD-MM-YYYY hh:mm:ss a"),
      header: "Assigned Date",
    },
    {
      accessorKey: "dueDate",
      accessorFn: (row) =>
        moment(row?.dueDate).local().format("DD-MM-YYYY hh:mm:ss a"),
      header: "Due Date",
    },
    {
      id: "actions",
      header: () => <div className="text-end">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="text-end">
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
          </div>
        );
      },
    },
  ];

  return (
    <Card className="bg-dark w-full">
      <CardHeader>
        <CardTitle>List of exercises</CardTitle>
        <CardDescription>
          {classroom?.exercises.length} exercises
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <DataTable data={classroom?.exercises ?? []} columns={columns} />
      </CardContent>
    </Card>
  );
}
