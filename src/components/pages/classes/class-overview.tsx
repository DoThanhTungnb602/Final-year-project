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
import { Class, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";

interface ClassWithStudents extends Class {
  students: User[];
}

export default function ClassOverview({
  classroom,
}: {
  classroom?: ClassWithStudents;
}) {
  const [editMode, setEditMode] = useState(false);
  const utils = api.useUtils();

  const classMutation = api.class.update.useMutation({
    onSettled: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      utils.class.getById.invalidate();
      form.reset();
      setEditMode(false);
    },
  });

  const studentMutation = api.class.deleteStudentById.useMutation({
    onSettled: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      utils.class.getById.invalidate();
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
    <Card className="bg-dark w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-between"
            >
              {editMode ? (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
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
                <p>{classroom?.name}</p>
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
