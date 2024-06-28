export type Theme = "light" | "dark";

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
  output: unknown;
  expected_output: unknown;
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

export type SubmissionRequest = {
  source_code: string;
  language_id: string;
  stdin: string;
  expected_output: string;
  cpu_time_limit?: number;
  memory_limit?: number;
  stack_limit?: number;
};
