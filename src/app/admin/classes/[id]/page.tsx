"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ClassSchema } from "~/schemas";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPen, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Page({ params }: { params: { id: string } }) {
  const [editMode, setEditMode] = useState(false);
  const { id } = params;
  const utils = api.useUtils();

  const classQuery = api.class.getById.useQuery(id);

  const classMutation = api.class.update.useMutation({
    onSettled: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      utils.class.getById.invalidate();
      form.reset();
      setEditMode(false);
    },
  });

  const form = useForm<z.infer<typeof ClassSchema>>({
    resolver: zodResolver(ClassSchema),
  });

  const onSubmit = (values: z.infer<typeof ClassSchema>) => {
    classMutation.mutate({
      id,
      ...values,
    });
  };

  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="students">Overview</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        <Card className="bg-dark w-full">
          <CardHeader>
            <CardTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex justify-between"
                >
                  {editMode ? (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              defaultValue={classQuery.data?.name}
                              placeholder="Class name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <p>{classQuery.data?.name}</p>
                  )}
                  <div>
                    {!editMode ? (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => {
                          setEditMode(true);
                        }}
                      >
                        <FaPen className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={() => {
                            form.reset();
                            setEditMode(false);
                          }}
                        >
                          <FaXmark className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          type="submit"
                          className="rounded-full"
                          disabled={
                            classMutation.isPending || !form.formState.isDirty
                          }
                        >
                          <FaCheck className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </CardTitle>
            <CardDescription>
              {classQuery.data?.students.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter className="flex justify-between">Footer</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="exercises">Change your password here.</TabsContent>
      <TabsContent value="tests">Test here</TabsContent>
    </Tabs>
  );
}
