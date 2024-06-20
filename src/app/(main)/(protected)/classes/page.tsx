"use client";

import { api } from "~/trpc/react";
import { ClassItem } from "~/components/pages/classes/class-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { Button } from "~/components/ui/button";
import { GoPlusCircle } from "react-icons/go";
import { useModalStore } from "~/hooks/use-modal-store";

export default function Page() {
  const { data, isPending } = api.class.getEnrolledClasses.useQuery();
  const { onOpen } = useModalStore();

  return isPending ? (
    <DefaultLoadingPage />
  ) : (
    <Card className="bg-dark flex h-full w-full flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Your Classes</div>
          <Button
            onClick={() => {
              onOpen({
                type: "joinClass",
              });
            }}
          >
            <GoPlusCircle className="mr-2 size-5" /> Join a Class
          </Button>
        </CardTitle>
        <CardDescription>
          Here you can view all the classes you have enrolled in.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-wrap gap-4 pt-6">
        {data?.map((classItem) => (
          <ClassItem
            key={classItem.id}
            id={classItem.id}
            name={classItem.name}
            studentCount={classItem.students.length}
          />
        ))}
      </CardContent>
    </Card>
  );
}
