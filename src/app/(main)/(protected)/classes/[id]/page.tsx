"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";

import ClassOverview from "~/components/pages/classes/class-overview";
import ClassExercises from "~/components/pages/classes/class-exercises";
import ClassTests from "~/components/pages/classes/class-tests";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const classQuery = api.class.getById.useQuery(id);

  // TODO: Design overview page
  return (
    <Tabs defaultValue="students" className="flex h-full w-full flex-col">
      <TabsList className="w-full justify-start">
        {
          // <TabsTrigger value="overview">Overview</TabsTrigger>
        }
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
      </TabsList>
      {
        // <TabsContent value="overview" className="flex-1">
        //   <div>Overview page</div>
        // </TabsContent>
      }
      <TabsContent value="exercises" className="flex-1">
        <ClassExercises classroom={classQuery.data} />
      </TabsContent>
      <TabsContent value="tests" className="flex-1">
        <ClassTests classroom={classQuery.data} />
      </TabsContent>
      <TabsContent value="students" className="flex-1">
        <ClassOverview classroom={classQuery.data} />
      </TabsContent>
    </Tabs>
  );
}
