import { Topic } from "@prisma/client";

export type Theme = "light" | "dark";

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

interface IEditorHoverOptions {
  above?: boolean;
  delay?: number;
  enabled?: boolean;
  hidingDelay?: number;
  sticky?: boolean;
}

interface IEditorMinimapOptions {
  autohide?: boolean;
  enabled?: boolean;
  maxColumn?: number;
  renderCharacters?: boolean;
  scale?: number;
  sectionHeaderFontSize?: number;
  sectionHeaderLetterSpacing?: number;
  showMarkSectionHeaders?: boolean;
  showRegionSectionHeaders?: boolean;
  showSlider?: "always" | "mouseover";
  side?: "right" | "left";
  size?: "proportional" | "fill" | "fit";
}

interface IEditorPaddingOptions {
  bottom?: number;
  top?: number;
}

interface ISuggestOptions {
  filterGraceful?: boolean;
  insertMode?: "insert" | "replace";
  localityBonus?: boolean;
  matchOnWordStartOnly?: boolean;
  preview?: boolean;
  previewMode?: "prefix" | "subword" | "subwordSmart";
  selectionMode?:
    | "always"
    | "never"
    | "whenTriggerCharacter"
    | "whenQuickSuggestion";
  shareSuggestSelections?: boolean;
  showClasses?: boolean;
  showColors?: boolean;
  showConstants?: boolean;
  showConstructors?: boolean;
  showDeprecated?: boolean;
  showEnumMembers?: boolean;
  showEnums?: boolean;
  showEvents?: boolean;
  showFields?: boolean;
  showFiles?: boolean;
  showFolders?: boolean;
  showFunctions?: boolean;
  showIcons?: boolean;
  showInlineDetails?: boolean;
  showInterfaces?: boolean;
  showIssues?: boolean;
  showKeywords?: boolean;
  showMethods?: boolean;
  showModules?: boolean;
  showOperators?: boolean;
  showProperties?: boolean;
  showReferences?: boolean;
  showSnippets?: boolean;
  showStatusBar?: boolean;
  showStructs?: boolean;
  showTypeParameters?: boolean;
  showUnits?: boolean;
  showUsers?: boolean;
  showValues?: boolean;
  showVariables?: boolean;
  showWords?: boolean;
  snippetsPreventQuickSuggestions?: boolean;
}

interface IEditorOptions {
  hover?: IEditorHoverOptions;
  minimap?: IEditorMinimapOptions;
  padding?: IEditorPaddingOptions;
  quickSuggestions?: boolean;
  readOnly?: boolean;
  suggest?: ISuggestOptions;
  renderValidationDecorations?: "off" | "on" | "editable";
}

export const defaultEditorOptions: IEditorOptions = {
  minimap: {
    enabled: false,
  },
  padding: {
    top: 5,
  },
  quickSuggestions: false,
};

export const editorOptionsDisableIntellisense: IEditorOptions = {
  hover: {
    enabled: false,
  },
  minimap: {
    enabled: false,
  },
  padding: {
    top: 5,
  },
  quickSuggestions: false,
  suggest: {
    filterGraceful: false,
    insertMode: "insert",
    localityBonus: false,
    matchOnWordStartOnly: false,
    preview: false,
    previewMode: "prefix",
    selectionMode: "never",
    shareSuggestSelections: false,
    showClasses: false,
    showColors: false,
    showConstants: false,
    showConstructors: false,
    showDeprecated: false,
    showEnumMembers: false,
    showEnums: false,
    showEvents: false,
    showFields: false,
    showFiles: false,
    showFolders: false,
    showFunctions: false,
    showIcons: false,
    showInlineDetails: false,
    showInterfaces: false,
    showIssues: false,
    showKeywords: false,
    showMethods: false,
    showModules: false,
    showOperators: false,
    showProperties: false,
    showReferences: false,
    showSnippets: false,
    showStatusBar: false,
    showStructs: false,
    showTypeParameters: false,
    showUnits: false,
    showUsers: false,
    showValues: false,
    showVariables: false,
    showWords: false,
    snippetsPreventQuickSuggestions: false,
  },
  renderValidationDecorations: "off",
};

export interface TestCase {
  input: Record<string, unknown>;
  expected_output: Record<string, unknown>;
}

export type SubmissionResponse = {
  stdout: string;
  time: string;
  memory: number;
  stderr: string;
  token: string;
  compile_output: string;
  message: string;
  status: {
    id: number;
    description:
      | "In Queue"
      | "Processing"
      | "Accepted"
      | "Wrong Answer"
      | "Time Limit Exceeded"
      | "Compilation Error"
      | "Runtime Error (SIGSEGV)"
      | "Runtime Error (SIGXFSZ)"
      | "Runtime Error (SIGFPE)"
      | "Runtime Error (SIGABRT)"
      | "Runtime Error (NZEC)"
      | "Runtime Error (Other)"
      | "Internal Error"
      | "Exec Format Error";
  };
};
