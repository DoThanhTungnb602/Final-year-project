"use client";

import { ChevronLeft } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import MultipleSelector, { Option } from "~/components/shared/multiselect";
import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultEditorOptions } from "~/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProblemSchema } from "~/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import Editor from "~/components/ui/editor/editor";
import { api } from "~/trpc/react";
import { Switch } from "~/components/ui/switch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaPen, FaCheck } from "react-icons/fa";
import { SkeletonCodeEditor } from "./problem-code-editor";
import { useProblemSkeletonStore } from "~/hooks/use-problem-skeleton-store";
import { Editor as JsonEditor } from "@monaco-editor/react";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useTheme } from "next-themes";
import { PrivateProblem } from "~/server/api/client";
import { TestcaseDriverCodeEditor } from "./testcase-driver-code-editor";
import { useProblemTestcaseDriverStore } from "~/hooks/use-problem-testcase-driver-store";

interface ProblemFormProps {
  problem?: PrivateProblem;
  _mode: "view" | "edit" | "create";
}

export function ProblemForm({ problem, _mode }: ProblemFormProps) {
  const { theme } = useTheme();
  const [tags, setTags] = useState<Option[]>(
    problem?.tags.map((tag) => ({ value: tag.id, label: tag.name })) ?? [],
  );
  const [tagOptions, setTagOptions] = useState<Option[]>([]);
  const [mode, setMode] = useState(_mode);
  const [saveChanges, setSaveChanges] = useState(false);
  const router = useRouter();
  const { setCodeMap, codeMap, languages } = useProblemSkeletonStore();
  const {
    setCodeMap: setDriverCodeMap,
    codeMap: driverCodeMap,
    languages: driverLanguages,
  } = useProblemTestcaseDriverStore();
  const { data: tagsData } = api.topic.all.useQuery();

  useEffect(() => {
    if (tagsData) {
      setTagOptions(
        tagsData.map((tag) => ({
          value: tag.id,
          label: tag.name,
        })),
      );
    }
  }, [tagsData]);

  const form = useForm<z.infer<typeof ProblemSchema>>({
    resolver: zodResolver(ProblemSchema),
    defaultValues: {
      title: problem?.title ?? "",
      description: problem?.description ?? "",
      testcases: problem?.testcases ?? "",
      solution: problem?.solution ?? "",
      difficulty: problem?.difficulty ?? undefined,
      isPublic: problem?.isPublic ?? true,
      tags: problem?.tags ?? [],
      timeLimit: problem?.timeLimit ?? undefined,
      memoryLimit: problem?.memoryLimit ?? undefined,
      skeletons: problem?.skeletons ?? [],
      testCaseDrivers: problem?.testCaseDrivers ?? [],
    },
  });

  useEffect(() => {
    if (problem) {
      problem.skeletons.map((skeleton) => {
        setCodeMap({
          language: skeleton.language.name,
          code: skeleton.code,
        });
      });
      problem.testCaseDrivers.map((driver) => {
        setDriverCodeMap({
          language: driver.language.name,
          code: driver.code,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem]);

  useEffect(() => {
    const skeletons = languages?.map((language) => {
      const code = codeMap.get(language.name) ?? "";
      return {
        languageId: language.id,
        code,
      };
    });
    form.setValue("skeletons", skeletons ?? [], { shouldDirty: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeMap]);

  useEffect(() => {
    const drivers = driverLanguages?.map((language) => {
      const code = driverCodeMap.get(language.name) ?? "";
      return {
        languageId: language.id,
        code,
      };
    });
    form.setValue("testCaseDrivers", drivers ?? [], { shouldDirty: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverCodeMap]);

  const problemCreator = api.problem.create.useMutation({
    onSuccess: () => {
      toast.success("Problem created successfully");
      router.push("/admin/problemset");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const problemEditor = api.problem.update.useMutation({
    onSuccess: () => {
      toast.success("Problem updated successfully");
      router.push("/admin/problemset");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: z.infer<typeof ProblemSchema>) => {
    const isSkeletonEmpty = languages?.some((language) => {
      const code = codeMap.get(language.name);
      return !code || code.trim() === "";
    });
    if (isSkeletonEmpty) {
      toast.error("Please provide code skeleton for all languages");
      return;
    }
    if (mode === "create") {
      problemCreator.mutate(values);
    } else if (mode === "edit" && problem) {
      problemEditor.mutate({ ...values, id: problem?.id });
    } else {
      // Do nothing
    }
  };

  const renderActionsButton = () => {
    if (mode === "view") {
      return (
        <Button size="sm" type="button" onClick={() => setMode("edit")}>
          <FaPen className="mr-2 h-4 w-4" />
          Edit
        </Button>
      );
    } else if (mode === "edit") {
      return (
        <>
          <AlertDialog open={saveChanges}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Save Changes ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel editing this problem?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setSaveChanges(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setSaveChanges(false);
                    setMode("view");
                    form.reset();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => {
              if (form.formState.isDirty) {
                setSaveChanges(true);
              } else {
                setMode("view");
              }
            }}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={problemEditor.isPending || !form.formState.isDirty}
          >
            <FaCheck className="mr-2 h-4 w-4" />
            Update
          </Button>
        </>
      );
    } else {
      return (
        <Button size="sm" type="submit" disabled={problemCreator.isPending}>
          Create Problem
        </Button>
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-5xl"
      >
        <div className="sticky top-0 z-20 flex items-center gap-4 bg-background/30 pb-4 pt-4 backdrop-blur lg:pt-6">
          <Link href="/admin/problemset">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight lg:text-3xl">
            {
              {
                view: "View Problem",
                edit: "Edit Problem",
                create: "Create Problem",
              }[mode]
            }
          </h1>
          <div className="items-center gap-2 md:ml-auto md:flex">
            {renderActionsButton()}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Problem Details</CardTitle>
              <CardDescription>
                Fill in the details of the problem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={mode === "view"}
                          placeholder="Enter title of the problem"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <div className="h-96 overflow-hidden rounded-md border">
                          <Editor
                            editable={mode !== "view"}
                            content={field.value}
                            onChange={(e) => {
                              console.log(e);
                              field.onChange(e);
                            }}
                            placeholder="Enter description of the problem"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
            <div className="flex w-full flex-col gap-4 md:w-1/2 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Problem Difficulty</CardTitle>
                  <CardDescription>
                    Select the difficulty level of the problem
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mode === "view" ? (
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem className="h-full">
                          <FormControl>
                            <Input readOnly type="text" value={field.value} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem className="h-full">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  id="difficulty"
                                  aria-label="Select difficulty"
                                >
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="EASY">EASY</SelectItem>
                                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                                <SelectItem value="HARD">HARD</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Time and Memory Limit</CardTitle>
                  <CardDescription>
                    Set up time and memory limit for problem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="timeLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time limit</FormLabel>
                        <FormControl>
                          <Input
                            readOnly={mode === "view"}
                            type="number"
                            id="timeLimit"
                            {...field}
                            defaultValue={field.value}
                            onChange={(e) => {
                              if (e.target.valueAsNumber) {
                                field.onChange(e.target.valueAsNumber);
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                            placeholder="Millisecond"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="memoryLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Memory limit</FormLabel>
                        <FormControl>
                          <Input
                            readOnly={mode === "view"}
                            type="number"
                            id="memoryLimit"
                            {...field}
                            onChange={(e) => {
                              if (e.target.valueAsNumber) {
                                field.onChange(e.target.valueAsNumber);
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                            placeholder="Megabyte"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="flex w-full flex-col gap-4 md:w-1/2 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Problem Topics</CardTitle>
                  <CardDescription>
                    A list of topics that this problem belongs to
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      const defaultOptions = tagOptions.filter((option) =>
                        tags.some((tag) => tag.value === option.value),
                      );
                      return (
                        <FormItem className="h-full">
                          <FormControl>
                            <MultipleSelector
                              disabled={mode === "view"}
                              options={tagOptions}
                              defaultOptions={defaultOptions}
                              value={tags}
                              onChange={(options) => {
                                setTags(options);
                                field.onChange(
                                  options.map((option) => ({
                                    id: option.value,
                                    name: option.label,
                                  })),
                                );
                              }}
                              placeholder="Tags"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Problem Visibility</CardTitle>
                  <CardDescription>
                    Set the visibility of the problem
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Make problem public
                          </FormLabel>
                          <FormDescription>
                            This will make the problem visible to all users
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={mode === "view"}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
              <CardTitle>Problem Solution</CardTitle>
              <CardDescription>
                Provide a solution for the problem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormControl>
                      <div className="h-96 overflow-hidden rounded-md border">
                        <Editor
                          editable={mode !== "view"}
                          content={field.value ?? ""}
                          onChange={(e) => {
                            console.log(e);
                            field.onChange(e);
                          }}
                          placeholder="Enter solution of the problem"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-07-chunk-5"
            className="h-full min-h-0 overflow-hidden"
          >
            <CardHeader>
              <CardTitle>Testcase Drivers</CardTitle>
              <CardDescription>
                Provide testcase drivers for the problem in different languages
                <span className="block text-yellow-400">
                  <strong>Note:</strong>
                  You have to provide testcase drivers for every language
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full min-h-0">
              <FormField
                control={form.control}
                name="testCaseDrivers"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <TestcaseDriverCodeEditor readOnly={mode === "view"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-07-chunk-5"
            className="h-full min-h-0 overflow-hidden"
          >
            <CardHeader>
              <CardTitle>Problem Code Skeleton</CardTitle>
              <CardDescription>
                Provide code skeleton of the problem for different languages
                <span className="block text-yellow-400">
                  <strong>Note:</strong> You have to provide code skeleton for
                  every language
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full min-h-0">
              <FormField
                control={form.control}
                name="skeletons"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <SkeletonCodeEditor readOnly={mode === "view"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Problem Test Cases</CardTitle>
              <CardDescription>
                Provide test cases for the problem
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <FormField
                control={form.control}
                name="testcases"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <div className="h-96 min-h-0 w-full border">
                        <JsonEditor
                          theme={theme === "dark" ? "vs-dark" : "vs-light"}
                          language="json"
                          value={field.value}
                          options={{
                            ...defaultEditorOptions,
                          }}
                          onChange={(e) => {
                            console.log(e);
                            field.onChange(e);
                          }}
                          loading={<DefaultLoadingPage />}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
