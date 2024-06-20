"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ProblemFilter } from "~/components/shared/problem-filter";
import { Toggle } from "~/components/ui/toggle";
import { useEffect, useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { DataTable } from "~/components/shared/data-table";
import { api } from "~/trpc/react";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";

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
import { toast } from "sonner";
import { FaTrash } from "react-icons/fa6";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { ProblemFilterSchema } from "~/schemas";
import { z } from "zod";

export default function ProblemSet() {
  const [filter, setFilter] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const query = api.problem.all.useQuery();
  const [filteredData, setFilteredData] = useState<ProblemWithStatus[]>([]);
  const router = useRouter();
  const utils = api.useUtils();

  useEffect(() => {
    if (query.data) {
      setFilteredData(query.data);
    }
  }, [query.data]);

  const problemMutation = api.problem.delete.useMutation({
    onSuccess() {
      utils.problem.invalidate().catch(console.error);
      setRowSelection({});
      toast.success("Problem deleted successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteManyProblemsMutation = api.problem.deleteMany.useMutation({
    onSuccess() {
      utils.problem.invalidate().catch(console.error);
      setRowSelection({});
      toast.success("Problems deleted successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleFilterChange = (filter: z.infer<typeof ProblemFilterSchema>) => {
    const filtered = query.data?.filter((problem) => {
      if (filter.difficulty && problem.difficulty !== filter.difficulty) {
        return false;
      }
      if (filter.status && problem.solution !== filter.status) {
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
            <GrDocumentVerified className="size-6 text-green-400" />
          ) : (
            <MdNotInterested className="size-5 text-gray-300" />
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
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/admin/problemset/${row.original.id}`);
                }}
              >
                View
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
        );
      },
    },
  ];

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              problem.
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
              disabled={problemMutation.isPending}
              onClick={() => {
                problemMutation.mutate(deleteId);
                setOpen(false);
                setDeleteId("");
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  selected problems.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    const selectedRowIds = Object.keys(rowSelection).filter(
                      (key) => rowSelection[key],
                    );
                    deleteManyProblemsMutation.mutate(selectedRowIds);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href="/admin/problemset/create">
            <Button>Add Problem</Button>
          </Link>
        </div>
      </div>
      {filter && (
        <Card className="bg-dark">
          <CardContent className="p-3">
            <ProblemFilter
              onFilterChange={handleFilterChange}
              statusFilter={false}
            />
          </CardContent>
        </Card>
      )}
      {query.isPending ? (
        <DefaultLoadingPage />
      ) : (
        <Card x-chunk="dashboard-06-chunk-0" className="bg-dark">
          <CardContent className="overflow-auto pt-6">
            <DataTable
              columns={columns}
              data={filteredData}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
