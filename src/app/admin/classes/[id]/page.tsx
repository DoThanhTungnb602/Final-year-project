"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";

import ClassOverview from "~/components/pages/classes/class-overview";
import ClassExercises from "~/components/pages/classes/class-exercises";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const classQuery = api.class.getById.useQuery(id);

  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="students">Overview</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        <ClassOverview classroom={classQuery.data} />
      </TabsContent>
      <TabsContent value="exercises">
        <ClassExercises classroom={classQuery.data} />
      </TabsContent>
      <TabsContent value="tests">Test here</TabsContent>
    </Tabs>
  );
}
