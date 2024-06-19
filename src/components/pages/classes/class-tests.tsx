/* eslint-disable @typescript-eslint/no-floating-promises */
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
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
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
import { FaTrash } from "react-icons/fa6";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { TestDialog } from "./class-tests-dialog";

interface ClassWithTests extends Class {
  tests: Test[];
}

export default function ClassTests({
  classroom,
}: {
  classroom?: ClassWithTests;
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [testId, setTestId] = useState("");
  const [testDialogMode, setTestDialogMode] = useState<
    "view" | "create" | "edit"
  >("create");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const utils = api.useUtils();

  const deleteManyTestsMutation = api.class.deleteManyTests.useMutation({
    onSuccess: () => {
      utils.class.getById.invalidate();
      setRowSelection({});
      toast.success("Tests deleted successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const testMutation = api.class.deleteTest.useMutation({
    onSuccess: () => {
      utils.class.getById.invalidate();
      toast.success("Test deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete test.\n Error: " + error.message);
    },
    onSettled: () => {
      setOpen(false);
      setDeleteId("");
    },
  });

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
                    setTestId(row.original.id);
                    setTestDialogMode("view");
                    setIsTestDialogOpen(true);
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTestId(row.original.id);
                    setTestDialogMode("edit");
                    setIsTestDialogOpen(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(true);
                    setDeleteId(row.original.id);
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
    <Card className="bg-dark flex h-full w-full flex-col">
      {classroom ? (
        <>
          <TestDialog
            isOpen={isTestDialogOpen}
            setIsOpen={setIsTestDialogOpen}
            classroomId={classroom?.id}
            mode={testDialogMode}
            setMode={setTestDialogMode}
            testId={testId}
          />
          <AlertDialog open={open}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  test.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={testMutation.isPending}
                  onClick={() => {
                    testMutation.mutate(deleteId);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <div>List of tests</div>
                <div className="flex items-center gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={Object.keys(rowSelection).length === 0}
                      >
                        <FaTrash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the selected tests.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            const selectedRowIds = Object.keys(
                              rowSelection,
                            ).filter((key) => rowSelection[key]);
                            deleteManyTestsMutation.mutate(selectedRowIds);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    onClick={() => {
                      setTestDialogMode("create");
                      setIsTestDialogOpen(true);
                      setTestId("");
                    }}
                  >
                    Create Test
                  </Button>
                </div>
              </div>
            </CardTitle>
            <CardDescription>{classroom?.tests.length} tests</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1">
            <DataTable
              data={classroom?.tests ?? []}
              columns={columns}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          </CardContent>
        </>
      ) : (
        <DefaultLoadingPage />
      )}
    </Card>
  );
}
