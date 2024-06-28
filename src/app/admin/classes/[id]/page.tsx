"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";

import ClassOverview from "~/components/pages/admin/classes/class-overview";
import ClassExercises from "~/components/pages/admin/classes/class-exercises";
import ClassTests from "~/components/pages/admin/classes/class-tests";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const classQuery = api.class.getById.useQuery(id);

  return (
    <Tabs defaultValue="students" className="flex h-full w-full flex-col">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="students">Overview</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="flex-1">
        <ClassOverview classroom={classQuery.data} />
      </TabsContent>
      <TabsContent value="exercises" className="flex-1">
        <ClassExercises classroom={classQuery.data} />
      </TabsContent>
      <TabsContent value="tests" className="flex-1">
        <ClassTests classroom={classQuery.data} />
      </TabsContent>
    </Tabs>
  );
}
