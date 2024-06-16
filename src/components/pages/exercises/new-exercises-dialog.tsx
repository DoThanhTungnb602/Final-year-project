"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { ExerciseSchema } from "~/schemas";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormControl,
  FormMessage,
  FormLabel,
} from "~/components/ui/form";
import { api } from "~/trpc/react";
import { useState } from "react";
import { toast } from "sonner";
import { DateTimePicker } from "~/components/shared/datetime-picker";
import MultipleSelector, { Option } from "~/components/shared/multiselect";

export function NewExercisesDialog({ classroomId }: { classroomId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [problems, setProblems] = useState<Option[]>();
  const utils = api.useUtils();

  const problemQuery = api.problem.getProblemList.useQuery();

  const tagOptions = problemQuery.data?.map((problem) => ({
    label: problem.title,
    value: problem.id,
  }));

  const exerciseCreator = api.class.addExercise.useMutation({
    onSuccess(data) {
      toast.success(`Class ${data.name} created successfully`);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      utils.class.all.invalidate();
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const form = useForm<z.infer<typeof ExerciseSchema>>({
    resolver: zodResolver(ExerciseSchema),
    defaultValues: {
      title: "",
      assignedDate: undefined,
      dueDate: undefined,
      problems: [],
    },
  });

  const onSubmit = (values: z.infer<typeof ExerciseSchema>) => {
    exerciseCreator.mutate({
      classroomId,
      ...values,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create new exercise</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new exercise
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter exercise title" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="assignedDate">Assigned Date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="second"
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="second"
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="problems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="problems">Problems</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        options={tagOptions}
                        value={problems}
                        onChange={(options) => {
                          setProblems(options);
                          field.onChange(options.map((option) => option.value));
                        }}
                        placeholder="Select problems for the exercise"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create Exercise</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
