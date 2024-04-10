export type Language = {
  id: number;
  editorValue:
    | "cpp"
    | "csharp"
    | "java"
    | "python"
    | "javascript"
    | "php"
    | "rust"
    | "go"
    | "typescript";
  name:
    | "C"
    | "C++"
    | "C#"
    | "Java"
    | "Python"
    | "JavaScript"
    | "PHP"
    | "Rust"
    | "Go"
    | "TypeScript";
};

export type Theme = "light" | "dark";

export const languagesExtra: Array<Language> = [
  {
    id: 2,
    name: "C++",
    editorValue: "cpp",
  },
  {
    id: 4,
    name: "Java",
    editorValue: "java",
  },
  {
    id: 28,
    name: "Python",
    editorValue: "python",
  },
  {
    id: 29,
    name: "C#",
    editorValue: "csharp",
  },
];

export const languages: Array<Language> = [
  {
    id: 15,
    name: "C++",
    editorValue: "cpp",
  },
  {
    id: 51,
    name: "C#",
    editorValue: "csharp",
  },
  {
    id: 91,
    name: "Java",
    editorValue: "java",
  },
  {
    id: 92,
    name: "Python",
    editorValue: "python",
  },
  {
    id: 93,
    name: "JavaScript",
    editorValue: "javascript",
  },
  {
    id: 68,
    name: "PHP",
    editorValue: "php",
  },
  {
    id: 73,
    name: "Rust",
    editorValue: "rust",
  },
  {
    id: 95,
    name: "Go",
    editorValue: "go",
  },
  {
    id: 94,
    name: "TypeScript",
    editorValue: "typescript",
  },
];
