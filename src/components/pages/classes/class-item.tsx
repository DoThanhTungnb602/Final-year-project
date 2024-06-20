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

interface ClassItemProps {
  id: string;
  name: string;
  studentCount: number;
}

export function ClassItem({ id, name, studentCount }: ClassItemProps) {
  const router = useRouter();

  return (
    <>
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
                <DropdownMenuItem>Delete</DropdownMenuItem>
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
