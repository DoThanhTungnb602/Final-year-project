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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DateTimePicker } from "~/components/shared/datetime-picker";
import MultipleSelector, { Option } from "~/components/shared/multiselect";
import { FaCheck, FaPen } from "react-icons/fa6";
import DefaultLoadingPage from "~/components/shared/default-loading-page";

interface TestDialogProps {
  classroomId: string;
  testId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mode: "view" | "create" | "edit";
  setMode: (mode: "view" | "create" | "edit") => void;
}

const DEFAULT_VALUES: Partial<z.infer<typeof TestSchema>> = {
  title: "",
  startTime: undefined,
  duration: 0,
  problems: [],
};

export function TestDialog({
  classroomId,
  mode,
  setMode,
  isOpen,
  setIsOpen,
  testId,
}: TestDialogProps) {
  const [problems, setProblems] = useState<Option[]>();
  const utils = api.useUtils();

  const problemQuery = api.problem.all.useQuery();

  const testQuery = api.class.getTestById.useQuery(testId, {
    enabled: mode !== "create",
  });

  const tagOptions = problemQuery.data?.map((problem) => ({
    label: problem.title,
    value: problem.id,
  }));

  const testCreator = api.class.addTest.useMutation({
    onSuccess() {
      toast.success(`Test was created successfully`);
      utils.class.getById.invalidate().catch(console.error);
      form.reset(DEFAULT_VALUES);
      setProblems([]);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const testEditor = api.class.editTest.useMutation({
    onSuccess() {
      toast.success(`Test was updated successfully`);
      form.reset(DEFAULT_VALUES);
      setProblems([]);
      utils.class.getById.invalidate().catch(console.error);
      utils.class.getTestById.invalidate().catch(console.error);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const form = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
    values: testQuery?.data,
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (testQuery?.data) {
      setProblems(
        testQuery.data.problems.map((problem) => ({
          label: problem.title,
          value: problem.id,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testQuery?.data]);

  useEffect(() => {
    if (mode === "create") {
      form.reset(DEFAULT_VALUES);
      setProblems([]);
    }
    if (mode === "edit" || mode === "view") {
      form.reset(testQuery?.data);
      setProblems(
        testQuery?.data?.problems.map((problem) => ({
          label: problem.title,
          value: problem.id,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSubmit = (values: z.infer<typeof TestSchema>) => {
    if (mode === "create") {
      testCreator.mutate({
        classroomId,
        ...values,
      });
    }
    if (mode === "edit") {
      testEditor.mutate({
        id: testId,
        ...values,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogContent className="min-h-80 sm:max-w-[425px]">
        {testQuery?.isPending && mode !== "create" ? (
          <DefaultLoadingPage />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>
                  {mode === "create"
                    ? "Create Test"
                    : mode === "edit"
                      ? "Edit Test"
                      : "View Test"}
                </DialogTitle>
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
                        <Input
                          placeholder="Enter test title"
                          {...field}
                          readOnly={mode === "view"}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {mode === "view" ? (
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            readOnly={true}
                            defaultValue=""
                            value={field.value?.toLocaleString()}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="startTime">Start Time</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            hourCycle={24}
                            granularity="minute"
                            jsDate={field.value}
                            onJsDateChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="duration">
                        Duration (in minutes)
                      </FormLabel>
                      <FormControl>
                        <Input
                          readOnly={mode === "view"}
                          type="number"
                          id="duration"
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value, 10));
                          }}
                          placeholder="Minutes"
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
                          disabled={mode === "view"}
                          options={tagOptions}
                          value={problems}
                          onChange={(options) => {
                            setProblems(options);
                            field.onChange(
                              options.map((option) => ({
                                id: option.value,
                              })),
                            );
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
                {mode === "create" && (
                  <Button type="submit">Create Test</Button>
                )}
                {mode === "view" && (
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => setMode("edit")}
                  >
                    <FaPen className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
                {mode === "edit" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => setMode("view")}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      type="submit"
                      disabled={testEditor.isPending || !form.formState.isDirty}
                    >
                      <FaCheck className="mr-2 h-4 w-4" />
                      Update
                    </Button>
                  </>
                )}
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
