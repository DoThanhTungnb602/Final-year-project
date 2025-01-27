"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ClassSchema } from "~/schemas";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPen, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { DataTable } from "~/components/shared/data-table";
import { Separator } from "~/components/ui/separator";
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
import { FaTrash } from "react-icons/fa6";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { UserRoundPlus } from "lucide-react";
import { useModalStore } from "~/hooks/use-modal-store";
import { ClassroomById } from "~/server/api/client";
import Link from "next/link";

export default function ClassOverview({
  classroom,
}: {
  classroom?: ClassroomById;
}) {
  const [editMode, setEditMode] = useState(false);
  const { onOpen } = useModalStore();
  const utils = api.useUtils();

  const classMutation = api.class.update.useMutation({
    onSettled: () => {
      utils.class.getById.invalidate().catch(console.error);
      form.reset();
      setEditMode(false);
    },
  });

  const studentMutation = api.class.deleteStudentById.useMutation({
    onSettled: () => {
      utils.class.getById.invalidate().catch(console.error);
    },
  });

  const form = useForm<z.infer<typeof ClassSchema>>({
    resolver: zodResolver(ClassSchema),
  });

  const onSubmit = (values: z.infer<typeof ClassSchema>) => {
    classMutation.mutate({
      id: classroom?.id ?? "",
      ...values,
    });
  };

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
      cell: ({ row }) => (
        <Link
          href={`/admin/users/${row.original.id}`}
          className="transition-all hover:underline"
        >
          {row.original.name}
        </Link>
      ),
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
                  <FaTrash className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    {` '${row.original?.name}'`} from this class.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      studentMutation.mutate({
                        classId: classroom?.id ?? "",
                        studentId: row.original.id,
                      });
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <Card className="bg-dark flex h-full w-full flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-5"
            >
              {editMode ? (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="!space-y-0">
                      <FormControl>
                        <Input
                          type="text"
                          defaultValue={classroom?.name}
                          placeholder="Class name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <p className="text-center">{classroom?.name}</p>
              )}
              <div>
                {!editMode ? (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    <FaPen className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => {
                        form.reset();
                        setEditMode(false);
                      }}
                    >
                      <FaXmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      type="submit"
                      className="rounded-full"
                      disabled={
                        classMutation.isPending || !form.formState.isDirty
                      }
                    >
                      <FaCheck className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Form>
          <Button
            onClick={() => {
              onOpen({
                type: "invite",
                data: { classroom },
              });
            }}
          >
            <UserRoundPlus className="mr-2 h-4 w-4" /> Invite students
          </Button>
        </CardTitle>
        <CardDescription>{classroom?.students.length} students</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1">
        <DataTable data={classroom?.students ?? []} columns={columns} />
      </CardContent>
    </Card>
  );
}
