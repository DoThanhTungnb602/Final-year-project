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
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";

interface ClassItemProps {
  id: string;
  name: string;
  studentCount: number;
}

export function ClassItem({ id, name, studentCount }: ClassItemProps) {
  const router = useRouter();
  const utils = api.useUtils();

  const classesMutation = api.class.delete.useMutation({
    onSuccess() {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      utils.class.all.invalidate();
      toast.success("Class deleted successfully");
    },
  });

  return (
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
                  classesMutation.mutate(id);
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
      {/*
        <Separator />
          <CardFooter className="p-0">
            <div className="flex w-full justify-end gap-3 px-6 py-3">
              <CustomTooltip content="Open exercises for this class" side="bottom">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Link href={`/admin/classes/${id}/exercises`}>
                    <MdOutlineMenuBook className="size-4" />
                  </Link>
                </Button>
              </CustomTooltip>
              <CustomTooltip content="Open tests for this class" side="bottom">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Link href={`/admin/classes/${id}/tests`}>
                    <PiExamFill className="size-4" />
                  </Link>
                </Button>
              </CustomTooltip>
            </div>
              </CardFooter>
         */}
    </Card>
  );
}
