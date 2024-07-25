/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useProblemTestcaseDriverStore } from "~/hooks/use-problem-testcase-driver-store";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useTheme } from "next-themes";
import { LanguageSelector } from "~/components/pages/problemset/driver-language-selector";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { api } from "~/trpc/react";
import { DEFAULT_LANGUAGE } from "~/routes";

interface CodeEditorProps {
  readOnly?: boolean;
}

export function TestcaseDriverCodeEditor({ readOnly }: CodeEditorProps) {
  const { theme } = useTheme();

  const {
    selectedLanguage,
    setLanguages,
    setSelectedLanguage,
    codeMap,
    setCodeMap,
    languages,
  } = useProblemTestcaseDriverStore();

  const { data } = api.language.all.useQuery(undefined, {
    enabled: !languages,
  });

  const [sourceCode, setSourceCode] = useState(
    codeMap.get(selectedLanguage.name),
  );

  const debouncedSourceCode = useDebounce(sourceCode, 100);

  useEffect(() => {
    setCodeMap({
      language: selectedLanguage.name,
      code: debouncedSourceCode ?? "",
    });
  }, [debouncedSourceCode]);

  useEffect(() => {
    setSourceCode(codeMap.get(selectedLanguage.name));
  }, [selectedLanguage, codeMap]);

  useEffect(() => {
    if (data?.length) {
      setLanguages(data);
      setSelectedLanguage(
        data.find((language) => language.name === DEFAULT_LANGUAGE) ?? data[0]!,
      );
    }
  }, [data]);

  return languages ? (
    <div className="flex h-96 min-h-0 flex-col border bg-zinc-200 dark:bg-transparent">
      <LanguageSelector />
      <div className="min-h-0 flex-1">
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          defaultLanguage={selectedLanguage.editorValue}
          language={selectedLanguage.editorValue}
          value={sourceCode ?? ""}
          options={{
            minimap: { enabled: false },
            contextmenu: true,
            readOnly,
            padding: { top: 10 },
          }}
          onChange={(e) => {
            console.log(e);
            setSourceCode(e);
          }}
          loading={<DefaultLoadingPage />}
        />
      </div>
    </div>
  ) : (
    <div className="h-96 min-h-0 w-full rounded-md border bg-zinc-200 dark:bg-transparent">
      <DefaultLoadingPage />
    </div>
  );
}
