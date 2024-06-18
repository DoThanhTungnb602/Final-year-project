"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useState } from "react";

interface ClassItemProps {
  id: string;
  name: string;
  studentCount: number;
}

export function ClassItem({ id, name, studentCount }: ClassItemProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const classesMutation = api.class.delete.useMutation({
    onSuccess() {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      utils.class.all.invalidate();
      toast.success("Class deleted successfully");
    },
  });

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              class.
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
              disabled={classesMutation.isPending}
              onClick={() => {
                classesMutation.mutate(deleteId);
                setOpen(false);
                setDeleteId("");
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card
        className="w-80 cursor-pointer"
        onClick={() => {
          router.push(`/admin/classes/${id}`);
        }}
      >
        <CardHeader>
          <div className="flex justify-between gap-3">
            <CardTitle className="truncate transition-all hover:underline">
              {name}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="shrink-0 rounded-full bg-transparent"
                >
                  <BsThreeDotsVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={`/classes/${id}`}>View</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                    setDeleteId(id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>
            {studentCount} student{studentCount > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4"></CardContent>
      </Card>
    </>
  );
}
