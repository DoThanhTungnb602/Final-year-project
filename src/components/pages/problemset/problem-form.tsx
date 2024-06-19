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
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import Link from "next/link";
import { tagOptions } from "~/lib/types";
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
import Editor from "~/components/ui/editor/editor";
import { api } from "~/trpc/react";
import { Switch } from "~/components/ui/switch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Problem } from "@prisma/client";
import { FaPen, FaCheck } from "react-icons/fa";

interface ProblemFormProps {
  problem?: Problem;
  _mode: "view" | "edit" | "create";
}

export function ProblemForm({ problem, _mode }: ProblemFormProps) {
  const [tags, setTags] = useState<Option[]>(
    problem?.tags.map((tag) => ({ value: tag, label: tag })) ?? [],
  );
  const [mode, setMode] = useState(_mode);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProblemSchema>>({
    disabled: mode === "view",
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
    },
  });

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 pb-4">
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
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
            {
              {
                view: "View Problem",
                edit: "Edit Problem",
                create: "Create Problem",
              }[mode]
            }
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            {renderActionsButton()}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
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
                          <div className="h-80 overflow-hidden rounded-md border">
                            <Editor
                              editable={mode !== "view"}
                              content={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                console.log(field.value);
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
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Problem Test Cases</CardTitle>
                <CardDescription>
                  Provide test cases for the problem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="testcases"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={8}
                          placeholder="Enter test cases in json format"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
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
                        <div className="h-80 overflow-hidden rounded-md border">
                          <Editor
                            editable={mode !== "view"}
                            content={field.value}
                            onChange={field.onChange}
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
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Problem Difficulty</CardTitle>
                <CardDescription>
                  Select the difficulty level of the problem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormLabel>Difficulty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={mode === "view"}
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
                          <SelectItem value="EASY">Easy</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HARD">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
                      field.value.includes(option.value),
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
                                options.map((option) => option.value),
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
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Create Problem</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}