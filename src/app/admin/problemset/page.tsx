"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ProblemFilter } from "~/components/shared/problem-filter";
import { Toggle } from "~/components/ui/toggle";
import { useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { ProblemTable } from "./testtable";
import Link from "next/link";

export default function ProblemSet() {
  const [filter, setFilter] = useState(false);

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
          <ProblemTable />
        </CardContent>
      </Card>
    </>
  );
}
