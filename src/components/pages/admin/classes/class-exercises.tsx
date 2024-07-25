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
import { Exercise } from "@prisma/client";
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
import { ExerciseDialog } from "./class-exercise-dialog";
import { FaTrash } from "react-icons/fa6";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { ClassroomById } from "~/server/api/client";
import Link from "next/link";

export default function ClassExercises({
  classroom,
}: {
  classroom?: ClassroomById;
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseDialogMode, setExerciseDialogMode] = useState<
    "view" | "create" | "edit"
  >("create");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const utils = api.useUtils();

  const deleteManyExercisesMutation = api.class.deleteManyExercises.useMutation(
    {
      onSuccess: () => {
        utils.class.getById.invalidate().catch(console.error);
        setRowSelection({});
        toast.success("Exercises deleted successfully");
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const exerciseMutation = api.class.deleteExercise.useMutation({
    onSuccess: () => {
      utils.class.getById.invalidate().catch(console.error);
      toast.success("Exercise deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete exercise.\n Error: " + error.message);
    },
    onSettled: () => {
      setOpen(false);
      setDeleteId("");
    },
  });

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
      cell: ({ row }) => (
        <Link
          href={`/admin/classes/${classroom?.id}/exercise/${row.original.id}`}
          className="transition-all hover:underline"
        >
          {row.original.title}
        </Link>
      ),
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
                    setExerciseId(row.original.id);
                    setExerciseDialogMode("view");
                    setIsExerciseDialogOpen(true);
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setExerciseId(row.original.id);
                    setExerciseDialogMode("edit");
                    setIsExerciseDialogOpen(true);
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
          <ExerciseDialog
            isOpen={isExerciseDialogOpen}
            setIsOpen={setIsExerciseDialogOpen}
            classroomId={classroom?.id}
            mode={exerciseDialogMode}
            setMode={setExerciseDialogMode}
            exerciseId={exerciseId}
          />
          <AlertDialog open={open}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  exercise.
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
                  disabled={exerciseMutation.isPending}
                  onClick={() => {
                    exerciseMutation.mutate(deleteId);
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
                <div>List of exercises</div>
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
                          delete the selected exercises.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            const selectedRowIds = Object.keys(
                              rowSelection,
                            ).filter((key) => rowSelection[key]);
                            deleteManyExercisesMutation.mutate(selectedRowIds);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    onClick={() => {
                      setExerciseDialogMode("create");
                      setIsExerciseDialogOpen(true);
                      setExerciseId("");
                    }}
                  >
                    Create Exercise
                  </Button>
                </div>
              </div>
            </CardTitle>
            <CardDescription>
              {classroom?.exercises.length} exercises
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1">
            <DataTable
              data={classroom?.exercises ?? []}
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
