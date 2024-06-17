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

import { Class, Test } from "@prisma/client";
import { Checkbox } from "~/components/ui/checkbox";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ClassTestsDialog } from "./class-tests-dialog";

interface ClassWithTests extends Class {
  tests: Test[];
}

export default function ClassTests({
  classroom,
}: {
  classroom?: ClassWithTests;
}) {
  const [rowSelection, setRowSelection] = useState({});
  const columns: ColumnDef<Test>[] = [
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
      accessorKey: "startTime",
      accessorFn: (row) =>
        moment(row?.startTime).local().format("DD-MM-YYYY hh:mm:ss a"),
      header: "Start Time",
    },
    {
      accessorKey: "endTime",
      accessorFn: (row) =>
        moment(row?.endTime).local().format("DD-MM-YYYY hh:mm:ss a"),
      header: "End Time",
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

  return classroom ? (
    <Card className="bg-dark w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <div>List of tests</div>
            <ClassTestsDialog classroomId={classroom?.id} />
          </div>
        </CardTitle>
        <CardDescription>{classroom?.tests.length} tests</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <DataTable
          data={classroom?.tests ?? []}
          columns={columns}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </CardContent>
    </Card>
  ) : null;
}
