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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DateTimePicker } from "~/components/shared/datetime-picker";
import MultipleSelector, { Option } from "~/components/shared/multiselect";
import { FaCheck, FaPen } from "react-icons/fa6";
import DefaultLoadingPage from "~/components/shared/default-loading-page";

interface ExerciseDialogProps {
  classroomId: string;
  exerciseId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mode: "view" | "create" | "edit";
  setMode: (mode: "view" | "create" | "edit") => void;
}

const DEFAULT_VALUES: Partial<z.infer<typeof ExerciseSchema>> = {
  title: "",
  dueDate: undefined,
  problems: [],
};

export function ExerciseDialog({
  classroomId,
  mode,
  setMode,
  isOpen,
  setIsOpen,
  exerciseId,
}: ExerciseDialogProps) {
  const [problems, setProblems] = useState<Option[]>();
  const utils = api.useUtils();

  const problemQuery = api.problem.all.useQuery();

  const exerciseQuery = api.class.getExerciseById.useQuery(exerciseId, {
    enabled: mode !== "create",
  });

  const tagOptions = problemQuery.data?.map((problem) => ({
    label: problem.title,
    value: problem.id,
  }));

  const exerciseCreator = api.class.addExercise.useMutation({
    onSuccess(data) {
      toast.success(`Class ${data.name} created successfully`);
      utils.class.getById.invalidate().catch(console.error);
      form.reset(DEFAULT_VALUES);
      setProblems([]);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const exerciseEditor = api.class.editExercise.useMutation({
    onSuccess() {
      toast.success(`Exercise was updated successfully`);
      form.reset(DEFAULT_VALUES);
      setProblems([]);
      utils.class.getById.invalidate().catch(console.error);
      utils.class.getExerciseById.invalidate().catch(console.error);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const form = useForm<z.infer<typeof ExerciseSchema>>({
    resolver: zodResolver(ExerciseSchema),
    values: exerciseQuery?.data,
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (exerciseQuery?.data) {
      setProblems(
        exerciseQuery.data.problems.map((problem) => ({
          label: problem.title,
          value: problem.id,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseQuery?.data]);

  useEffect(() => {
    if (mode === "create") {
      form.reset(DEFAULT_VALUES);
      setProblems([]);
    }
    if (mode === "edit" || mode === "view") {
      form.reset(exerciseQuery?.data);
      setProblems(
        exerciseQuery?.data?.problems.map((problem) => ({
          label: problem.title,
          value: problem.id,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSubmit = (values: z.infer<typeof ExerciseSchema>) => {
    if (mode === "create") {
      exerciseCreator.mutate({
        classroomId,
        ...values,
      });
    }
    if (mode === "edit") {
      exerciseEditor.mutate({
        id: exerciseId,
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
        {exerciseQuery?.isPending && mode !== "create" ? (
          <DefaultLoadingPage />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>
                  {mode === "create"
                    ? "Create Exercise"
                    : mode === "edit"
                      ? "Edit Exercise"
                      : "View Exercise"}
                </DialogTitle>
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
                        <Input
                          placeholder="Enter exercise title"
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
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
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
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="dueDate">Due Date</FormLabel>
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
                          placeholder="Select problems for the exercise"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                {mode === "create" && (
                  <Button type="submit">Create Exercise</Button>
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
                      disabled={
                        exerciseEditor.isPending || !form.formState.isDirty
                      }
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
