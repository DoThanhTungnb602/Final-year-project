"use client";

import { Test } from "@prisma/client";
import { ClipboardList } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";

interface ClassTestItemProps {
  test: Test;
}

export function ClassTestItem({ test }: ClassTestItemProps) {
  const { data } = api.test.getById.useQuery({
    testId: test.id,
  });

  return (
    <Link href={`/test/${test.id}`}>
      <Card className="bg-background transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md">
        <CardContent className="flex items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <ClipboardList />
            <div className="flex flex-col">
              <p className="text-md truncate font-semibold">{test.title}</p>
              {data && (
                <p className="text-sm text-muted-foreground">
                  {data?.problems.length} problems
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>
              Start time: {moment(test.startTime).format("HH:mm - MMM D, YYYY")}
            </p>
            <p>Duration: {test.duration} minutes</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
