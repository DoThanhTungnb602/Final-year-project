/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEditorStore } from "~/hooks/use-editor-store";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useTheme } from "next-themes";
import { SelectLanguage } from "~/components/shared/select-language";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useProblemStore } from "~/hooks/use-problem-store";
import { DEFAULT_LANGUAGE } from "~/routes";

interface ISuggestOptions {
    filterGraceful?: boolean;
    insertMode?: "insert" | "replace";
    localityBonus?: boolean;
    matchOnWordStartOnly?: boolean;
    preview?: boolean;
    previewMode?: "prefix" | "subword" | "subwordSmart";
    selectionMode?: "always" | "never" | "whenTriggerCharacter" | "whenQuickSuggestion";
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

const editorConfig: ISuggestOptions = {
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
};

export function CodeEditor() {
  const { theme } = useTheme();
  const { problem } = useProblemStore();

  const {
    languages,
    selectedLanguage,
    codeMap,
    setCodeMap,
    setLanguages,
    setSelectedLanguage,
  } = useEditorStore();

  const [sourceCode, setSourceCode] = useState(
    codeMap.get(selectedLanguage.name),
  );

  // Debounce source code
  const debouncedSourceCode = useDebounce(sourceCode, 500);

  // Fetch languages
  const { data } = api.language.all.useQuery(undefined, {
    enabled: !languages,
  });

  // Set languages
  useEffect(() => {
    if (data?.length) {
      setLanguages(data);
      setSelectedLanguage(
        data.find((language) => language.name === DEFAULT_LANGUAGE) ?? data[0]!,
      );
    }
  }, [data]);

  // Set code map on source code change
  useEffect(() => {
    if (problem) {
      setCodeMap({
        language: selectedLanguage.name,
        code: debouncedSourceCode ?? "",
      });
    }
  }, [debouncedSourceCode]);

  // Set source code on language change
  useEffect(() => {
    setSourceCode(codeMap.get(selectedLanguage.name));
  }, [selectedLanguage]);

  const runProblem = api.problem.run.useMutation({
    onSuccess() {
      console.log("success");
    },
  });

  return problem ? (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="min-h-0 flex-1">
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          defaultLanguage={selectedLanguage.editorValue}
          language={selectedLanguage.editorValue}
          value={sourceCode ?? ""}
          options={{ minimap: { enabled: false }, suggest: editorConfig, padding: { top: 5 } }}
          onChange={setSourceCode}
          loading={<DefaultLoadingPage />}
        />
      </div>
      <div className="flex justify-between gap-3 p-2">
        <SelectLanguage />
        <div className="my-auto space-x-2">
          <Button
            size="sm"
            onClick={() => {
              // runProblem.mutate({
              //   code: debouncedSourceCode ?? "",
              //   languageId: language.id,
              //   problemId: 1,
              // });
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <DefaultLoadingPage />
  );
}
