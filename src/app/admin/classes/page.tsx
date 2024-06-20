"use client";

import { api } from "~/trpc/react";
import { NewClassDialog } from "~/components/pages/classes/new-class-dialog";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { Button } from "~/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Class, User } from "@prisma/client";
import Link from "next/link";
import { DataTable } from "~/components/shared/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useModalStore } from "~/hooks/use-modal-store";

interface ClassWithStudents extends Class {
  students: User[];
}

export default function Page() {
  const { data, isPending } = api.class.all.useQuery();
  const router = useRouter();

  const { onOpen } = useModalStore();

  const columns: ColumnDef<ClassWithStudents>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/admin/classes/${row.original.id}`}
          className="transition-all hover:underline"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "students",
      header: "Students",
      cell: ({ row }) => <div>{row.original.students.length}</div>,
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
                    router.push(`/admin/classes/${row.original.id}`);
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onOpen({
                      type: "deleteClass",
                      data: {
                        classId: row.original.id,
                      },
                    });
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
    <>
      {isPending ? (
        <DefaultLoadingPage />
      ) : (
        <Card className="bg-dark flex h-full w-full flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <h2>List of classes</h2>
              <NewClassDialog />
            </CardTitle>
            <CardDescription>You can manage your classes here</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1">
            <DataTable data={data ?? []} columns={columns} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
