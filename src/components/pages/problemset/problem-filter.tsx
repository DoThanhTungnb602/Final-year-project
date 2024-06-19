import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbReload } from "react-icons/tb";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ProblemFilterSchema } from "~/schemas";
import MultipleSelector, { Option } from "~/components/shared/multiselect";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { tagOptions } from "~/lib/types";

interface ProblemFilterProps {
  onFilterChange: (filter: z.infer<typeof ProblemFilterSchema>) => void;
  statusFilter?: boolean;
}

export function ProblemFilter({
  onFilterChange,
  statusFilter = true,
}: ProblemFilterProps) {
  const [tags, setTags] = useState<Option[]>();
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");

  const form = useForm<z.infer<typeof ProblemFilterSchema>>({
    resolver: zodResolver(ProblemFilterSchema),
    defaultValues: {
      difficulty: undefined,
      tags: [],
      status: undefined,
      search: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      onFilterChange(values as z.infer<typeof ProblemFilterSchema>);
    });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch]);

  return (
    <Form {...form}>
      <form className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={difficulty}
                  onValueChange={(value) => {
                    setDifficulty(value);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {statusFilter && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      setStatus(value);
                      field.onChange(value);
                    }}
                    value={status}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="solved">Solved</SelectItem>
                      <SelectItem value="attempted">Attempted</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => {
              const defaultOptions = tagOptions.filter((option) =>
                field.value?.includes(option.value),
              );
              return (
                <FormItem className="h-full">
                  <FormControl>
                    <MultipleSelector
                      options={tagOptions}
                      defaultOptions={defaultOptions}
                      value={tags}
                      onChange={(options) => {
                        setTags(options);
                        field.onChange(options.map((option) => option.value));
                      }}
                      placeholder="Tags"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="shrink-0">
                <FormControl>
                  <Input placeholder="Search by problem title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            form.reset();
            setTags([]);
            setDifficulty("");
            setStatus("");
          }}
        >
          <TbReload className="mr-3 size-5" />
          Reset
        </Button>
      </form>
    </Form>
  );
}