"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbReload } from "react-icons/tb";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { ProblemFilterSchema } from "~/schemas";
import MultipleSelector from "~/components/shared/multiselect";

export function ProblemFilter() {
  const [difficulty, setDifficulty] = useState("all");
  const [tags, setTags] = useState(undefined);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const form = useForm<z.infer<typeof ProblemFilterSchema>>({
    resolver: zodResolver(ProblemFilterSchema),
    defaultValues: {
      difficulty: undefined,
      tags: [],
      status: undefined,
      search: "",
    },
  });

  const tagOptions = [
    {
      value: "array",
      label: "Array",
    },
    {
      value: "string",
      label: "String",
    },
    {
      value: "dp",
      label: "Dynamic Programming",
    },
    {
      value: "math",
      label: "Math",
    },
    {
      value: "tree",
      label: "Tree",
    },
    {
      value: "graph",
      label: "Graph",
    },
    {
      value: "greedy",
      label: "Greedy",
    },
    {
      value: "binary-search",
      label: "Binary Search",
    },
    {
      value: "dfs",
      label: "Depth First Search",
    },
    {
      value: "bfs",
      label: "Breadth First Search",
    },
    {
      value: "backtracking",
      label: "Backtracking",
    },
    {
      value: "bit-manipulation",
      label: "Bit Manipulation",
    },
    {
      value: "sort",
      label: "Sort",
    },
    {
      value: "two-pointers",
      label: "Two Pointers",
    },
    {
      value: "stack",
      label: "Stack",
    },
    {
      value: "queue",
      label: "Queue",
    },
    {
      value: "heap",
      label: "Heap",
    },
    {
      value: "hash-table",
      label: "Hash Table",
    },
    {
      value: "linked-list",
      label: "Linked List",
    },
    {
      value: "design",
      label: "Design",
    },
    {
      value: "trie",
      label: "Trie",
    },
    {
      value: "binary-search-tree",
      label: "Binary Search Tree",
    },
    {
      value: "recursion",
      label: "Recursion",
    },
    {
      value: "union-find",
      label: "Union Find",
    },
    {
      value: "divide-and-conquer",
      label: "Divide and Conquer",
    },
    {
      value: "sliding-window",
      label: "Sliding Window",
    },
    {
      value: "topological-sort",
      label: "Topological Sort",
    },
    {
      value: "segment-tree",
      label: "Segment Tree",
    },
    {
      value: "binary-indexed-tree",
      label: "Binary",
    },
  ];

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Difficulty</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={difficulty}
            onValueChange={setDifficulty}
          >
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="easy">Easy</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="todo">Todo</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="solved">Solved</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="attempted">
              Attempted
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <MultipleSelector options={tagOptions} value={tags} placeholder="Tags" />
      <Input type="text" value={search} placeholder="Search questions" />
      <Button>
        <TbReload className="mr-3 size-5" />
        Reset
      </Button>
    </div>
  );
}
