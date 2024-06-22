import { Problem, Topic } from "@prisma/client";

export type Language = {
  id: number;
  editorValue:
    | "cpp"
    // | "csharp"
    // | "java"
    // | "python"
    | "javascript";
  // | "php"
  // | "rust"
  // | "go"
  // | "typescript";
  name: // | "C"
  | "C++"
    // | "C#"
    // | "Java"
    // | "Python"
    | "JavaScript";
  // | "PHP"
  // | "Rust"
  // | "Go"
  // | "TypeScript";
};

export type Theme = "light" | "dark";

type ProblemStatus = "UNSOLVED" | "ACCEPTED" | "ATTEMPTED";

type ProblemSkeletonCode = {
  language: {
    name: string;
  };
  languageId: string;
  code: string;
};

export type ProblemWithSkeletonCode = Problem & {
  skeletons: Array<ProblemSkeletonCode>;
};

export type ProblemWithStatus = Problem & {
  status: ProblemStatus;
};

// export const languagesExtra: Array<Language> = [
//   {
//     id: 2,
//     name: "C++",
//     editorValue: "cpp",
//   },
//   {
//     id: 4,
//     name: "Java",
//     editorValue: "java",
//   },
//   {
//     id: 28,
//     name: "Python",
//     editorValue: "python",
//   },
//   {
//     id: 29,
//     name: "C#",
//     editorValue: "csharp",
//   },
// ];

export const languages: Array<Language> = [
  {
    id: 15,
    name: "C++",
    editorValue: "cpp",
  },
  // {
  //   id: 51,
  //   name: "C#",
  //   editorValue: "csharp",
  // },
  // {
  //   id: 91,
  //   name: "Java",
  //   editorValue: "java",
  // },
  // {
  //   id: 92,
  //   name: "Python",
  //   editorValue: "python",
  // },
  {
    id: 93,
    name: "JavaScript",
    editorValue: "javascript",
  },
  // {
  //   id: 68,
  //   name: "PHP",
  //   editorValue: "php",
  // },
  // {
  //   id: 73,
  //   name: "Rust",
  //   editorValue: "rust",
  // },
  // {
  //   id: 95,
  //   name: "Go",
  //   editorValue: "go",
  // },
  // {
  //   id: 94,
  //   name: "TypeScript",
  //   editorValue: "typescript",
  // },
];

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
