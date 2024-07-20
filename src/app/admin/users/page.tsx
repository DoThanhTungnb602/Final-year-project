"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";

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
import { FaBan } from "react-icons/fa";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { api } from "~/trpc/react";
import Link from "next/link";

export default function Page() {
  const allUsersQuery = api.user.all.useQuery();
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "image",
      header: "Avatar",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={`${row.original.image}`} alt="@shadcn" />
          <AvatarFallback>
            <FaUserCircle className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <Link href={`/admin/users/${row.original.id}`} className="hover:underline transition-all">
        {row.original.name}
      </Link>,
    },
    {
      id: "actions",
      header: () => <div className="text-end">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="text-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <FaBan className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently ban
                    {` '${row.original?.name}'`}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <Card className="bg-dark mt-3 flex w-full flex-col lg:mt-6">
      <CardContent className="flex-1 pt-6">
        <DataTable data={allUsersQuery?.data ?? []} columns={columns} />
      </CardContent>
    </Card>
  );
}
