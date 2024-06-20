"use client";

import { Exercise } from "@prisma/client";
import { ClipboardList } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";

interface ClassExerciseItemProps {
  exercise: Exercise;
}

export function ClassExerciseItem({ exercise }: ClassExerciseItemProps) {
  const { data } = api.exercise.getById.useQuery({
    exerciseId: exercise.id,
  });

  return (
    <Link href={`/exercise/${exercise.id}`}>
      <Card className="bg-background transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md">
        <CardContent className="flex items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <ClipboardList />
            <div className="flex flex-col">
              <p className="text-md truncate font-semibold">{exercise.title}</p>
              {data && (
                <p className="text-sm text-muted-foreground">
                  {data?.problems.length} problems
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Due date: {moment(exercise.dueDate).format("HH:mm - MMM D, YYYY")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
