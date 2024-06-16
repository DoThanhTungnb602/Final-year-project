import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { remark } from "remark";
import html from "remark-html";
import { Topic } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertMdToHtml(md: string) {
  const processedContent = await remark().use(html).process(md);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export async function getUploadthingFile(fileKey: string) {
  const response = await fetch(`https://utfs.io/f/${fileKey}`);
  const data = await response.text();
  return data;
}

const extractIncludes = (code: string) => {
  const includeRegex = /^\s*#include\s*<[^>]+>\s*\n/gm;
  const includes = new Set();
  let match;
  while ((match = includeRegex.exec(code)) !== null) {
    includes.add(match[0].trim().replaceAll(" ", ""));
  }
  const strippedCode = code.replace(includeRegex, "");
  return { includes: Array.from(includes), strippedCode };
};

export const consolidateIncludes = (userCode: string, judgeCode: string) => {
  const userIncludes = extractIncludes(userCode);
  const judgeIncludes = extractIncludes(judgeCode);

  const combinedIncludes = new Set([
    ...userIncludes.includes,
    ...judgeIncludes.includes,
  ]);

  return {
    includes: Array.from(combinedIncludes),
    userStrippedCode: userIncludes.strippedCode,
    judgeStrippedCode: judgeIncludes.strippedCode,
  };
};

export const jsonToStdin = (input: any) => {
  const stdin = Object.values(input)
    .map((item: any) => {
      if (typeof item === "number") {
        return item;
      }
      if (typeof item === "string") {
        return item;
      }
      if (typeof item === "object") {
        return item.join(" ");
      }
    })
    .join("\n");
  return stdin;
};

export const tagOptions: Array<{
  value: Topic;
  label: string;
}> = [
  { value: "ARRAY", label: "Array" },
  { value: "STRING", label: "String" },
  { value: "HASH_TABLE", label: "Hash Table" },
  { value: "DYNAMIC_PROGRAMMING", label: "Dynamic Programming" },
  { value: "MATH", label: "Math" },
  { value: "SORTING", label: "Sorting" },
  { value: "GREEDY", label: "Greedy" },
  { value: "DEPTH_FIRST_SEARCH", label: "Depth First Search" },
  { value: "DATABASE", label: "Database" },
  { value: "BINARY_SEARCH", label: "Binary Search" },
  { value: "TREE", label: "Tree" },
  { value: "BREADTH_FIRST_SEARCH", label: "Breadth First Search" },
  { value: "MATRIX", label: "Matrix" },
  { value: "BIT_MANIPULATION", label: "Bit Manipulation" },
  { value: "TWO_POINTERS", label: "Two Pointers" },
  { value: "BINARY_TREE", label: "Binary Tree" },
  { value: "HEAP", label: "Heap" },
  { value: "PREFIX_SUM", label: "Prefix Sum" },
  { value: "STACK", label: "Stack" },
  { value: "SIMULATION", label: "Simulation" },
  { value: "GRAPH", label: "Graph" },
  { value: "COUNTING", label: "Counting" },
  { value: "DESIGN", label: "Design" },
  { value: "SLIDING_WINDOW", label: "Sliding Window" },
  { value: "BACKTRACKING", label: "Backtracking" },
  { value: "ENUMERATION", label: "Enumeration" },
  { value: "UNION_FIND", label: "Union Find" },
  { value: "LINKED_LIST", label: "Linked List" },
  { value: "ORDERED_SET", label: "Ordered Set" },
  { value: "MONOTONIC_STACK", label: "Monotonic Stack" },
  { value: "NUMBER_THEORY", label: "Number Theory" },
  { value: "TRIE", label: "Trie" },
  { value: "DIVIDE_AND_CONQUER", label: "Divide and Conquer" },
  { value: "BITMASK", label: "Bitmask" },
  { value: "RECURSION", label: "Recursion" },
  { value: "SEGMENT_TREE", label: "Segment Tree" },
  { value: "QUEUE", label: "Queue" },
  { value: "BINARY_SEARCH_TREE", label: "Binary Search Tree" },
  { value: "MEMOIZATION", label: "Memoization" },
  { value: "GEOMETRY", label: "Geometry" },
  { value: "BINARY_INDEXED_TREE", label: "Binary Indexed Tree" },
  { value: "HASH_FUNCTION", label: "Hash Function" },
  { value: "COMBINATORICS", label: "Combinatorics" },
  { value: "TOPOLOGICAL_SORT", label: "Topological Sort" },
  { value: "STRING_MATCHING", label: "String Matching" },
  { value: "SHORTEST_PATH", label: "Shortest Path" },
  { value: "ROLLING_HASH", label: "Rolling Hash" },
  { value: "GAME_THEORY", label: "Game Theory" },
  { value: "INTERACTIVE", label: "Interactive" },
  { value: "DATA_STREAM", label: "Data Stream" },
  { value: "BRAINTEASER", label: "Brainteaser" },
  { value: "MONOTONIC_QUEUE", label: "Monotonic Queue" },
  { value: "RANDOMIZED", label: "Randomized" },
  { value: "MERGE_SORT", label: "Merge Sort" },
  { value: "ITERATOR", label: "Iterator" },
  { value: "CONCURRENCY", label: "Concurrency" },
  { value: "DOUBLY_LINKED_LIST", label: "Doubly Linked List" },
  { value: "PROBABILITY_AND_STATISTICS", label: "Probability and Statistics" },
  { value: "QUICKSELECT", label: "Quickselect" },
  { value: "BUCKET_SORT", label: "Bucket Sort" },
  { value: "SUFFIX_ARRAY", label: "Suffix Array" },
  { value: "MINIMUM_SPANNING_TREE", label: "Minimum Spanning Tree" },
  { value: "COUNTING_SORT", label: "Counting Sort" },
  { value: "SHELL", label: "Shell" },
  { value: "LINE_SWEEP", label: "Line Sweep" },
  { value: "RESERVOIR_SAMPLING", label: "Reservoir Sampling" },
  {
    value: "STRONGLY_CONNECTED_COMPONENT",
    label: "Strongly Connected Component",
  },
  { value: "EULERIAN_CIRCUIT", label: "Eulerian Circuit" },
  { value: "RADIX_SORT", label: "Radix Sort" },
  { value: "REJECTION_SAMPLING", label: "Rejection Sampling" },
  { value: "BICONNECTED_COMPONENT", label: "Biconnected Component" },
];
