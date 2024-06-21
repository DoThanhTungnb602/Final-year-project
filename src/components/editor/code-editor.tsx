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

export function CodeEditor() {
  const { theme } = useTheme();
  const { selectedLanguage: language, codeMap, setCodeMap } = useEditorStore();
  const [sourceCode, setSourceCode] = useState(codeMap.get(language.name));
  const debouncedSourceCode = useDebounce(sourceCode, 500);
  const { problem } = useProblemStore();

  const runProblem = api.problem.run.useMutation({
    onSuccess() {
      console.log("success");
    },
  });

  // useEffect(() => {
  //   if (problem) {
  //     setCodeMap({
  //       language: language.name,
  //       code: problem?.skeletonCode as string,
  //     });
  //     setSourceCode(codeMap.get(language.name));
  //   }
  // }, [problem]);

  useEffect(() => {
    if (debouncedSourceCode) {
      setCodeMap({ language: language.name, code: debouncedSourceCode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSourceCode]);

  useEffect(() => {
    setSourceCode(codeMap.get(language.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="min-h-0 flex-1">
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          defaultLanguage={language.editorValue}
          value={sourceCode}
          options={{ minimap: { enabled: false } }}
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
  );
}
