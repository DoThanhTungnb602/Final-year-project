"use client";

import { api } from "~/trpc/react";
import { ClassItem } from "~/components/shared/classItem";
import { NewClassDialog } from "~/components/shared/new-class-dialog";
import { Spinner } from "~/components/shared/spinner";

export default function Page() {
  const classesQuery = api.class.all.useQuery();

  return (
    <>
      <div className="ml-auto">
        <NewClassDialog />
      </div>
      <div className="flex flex-wrap gap-6">
        {
          classesQuery.isPending ? <Spinner className="size-6" /> : null
          // TODO: Fix skeleton loading
        }
        {classesQuery.data?.map((c) => {
          const studentCount = c.students.length;
          return (
            <ClassItem
              key={c.id}
              id={c.id}
              name={c.name}
              studentCount={studentCount}
            />
          );
        })}
      </div>
    </>
  );
}
