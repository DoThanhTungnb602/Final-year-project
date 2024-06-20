"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DataTable } from "~/components/shared/data-table";
import { Separator } from "~/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";

import { Class, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import DefaultLoadingPage from "~/components/shared/default-loading-page";

interface ClassWithStudents extends Class {
  students: User[];
}

export default function ClassOverview({
  classroom,
}: {
  classroom?: ClassWithStudents;
}) {
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
    },
  ];

  return (
    <>
      {classroom ? (
        <Card className="bg-dark flex h-full w-full flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <p className="text-center">{classroom?.name}</p>
            </CardTitle>
            <CardDescription>
              {classroom?.students.length} students
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1">
            <DataTable data={classroom?.students ?? []} columns={columns} />
          </CardContent>
        </Card>
      ) : (
        <DefaultLoadingPage />
      )}
    </>
  );
}
