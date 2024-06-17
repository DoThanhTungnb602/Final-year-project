"use client";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { FaList } from "react-icons/fa6";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export function ProblemList() {
  const { data } = api.problem.all.useQuery();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="space-x-2 font-semibold" size="sm">
          <FaList className="me-2" /> Problem list
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="!max-w-[600px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Problem List</SheetTitle>
          <SheetDescription>
            This is a list of all the problems that are available.
          </SheetDescription>
        </SheetHeader>
        <div className="my-5">
          <DataTable columns={columns} data={data ?? []} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
