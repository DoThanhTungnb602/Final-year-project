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
import { TestSchema } from "~/schemas";
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

export function ClassTestsDialog({ classroomId }: { classroomId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [problems, setProblems] = useState<Option[]>();
  const utils = api.useUtils();

  const problemQuery = api.problem.all.useQuery();

  const tagOptions = problemQuery.data?.map((problem) => ({
    label: problem.title,
    value: problem.id,
  }));

  const testCreator = api.class.addTest.useMutation({
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

  const form = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      title: "",
      startTime: undefined,
      endTime: undefined,
      problems: [],
    },
  });

  const onSubmit = (values: z.infer<typeof TestSchema>) => {
    testCreator.mutate({
      classroomId,
      ...values,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Test</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create new test</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new test
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
                      <Input placeholder="Enter test title" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="startTime">Start Time</FormLabel>
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
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="endTime">End Time</FormLabel>
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
                        placeholder="Select problems for the test"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create Test</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
