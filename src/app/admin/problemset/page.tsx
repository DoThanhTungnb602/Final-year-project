"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ProblemFilter } from "~/components/pages/problemset/problem-filter";
import { Toggle } from "~/components/ui/toggle";
import { useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { DataTable } from "~/components/shared/data-table";
import { problemColumns as columns } from "~/components/shared/columns";
import { api } from "~/trpc/react";

export default function ProblemSet() {
  const [filter, setFilter] = useState(false);
  const query = api.problem.getProblemList.useQuery();
  const [rowSelection, setRowSelection] = useState({});

  return (
    <>
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
          <Link href="/admin/problemset/create">
            <Button>Add Problem</Button>
          </Link>
        </div>
      </div>
      {filter && (
        <Card className="bg-dark">
          <CardContent className="p-3">
            <ProblemFilter />
          </CardContent>
        </Card>
      )}
      <Card x-chunk="dashboard-06-chunk-0" className="bg-dark">
        <CardContent className="overflow-auto pt-6">
          <DataTable
            columns={columns}
            data={query?.data ?? []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </CardContent>
      </Card>
    </>
  );
}
