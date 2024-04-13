"use client";

import { useEditorStore } from "~/lib/stores";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useTheme } from "next-themes";
import { SelectLanguage } from "~/components/shared/select-language";
import { Button } from "~/components/ui/button";

export function CodeEditor() {
  const languageCode = useEditorStore((state) => state.languageCode);
  const language = useEditorStore((state) => state.language);
  const setLanguageCode = useEditorStore((state) => state.setLanguageCode);
  const [sourceCode, setSourceCode] = useState(languageCode.get(language.name));
  const debouncedSourceCode = useDebounce(sourceCode, 500);
  const { theme } = useTheme();

  useEffect(() => {
    if (debouncedSourceCode) {
      setLanguageCode(language.name, debouncedSourceCode);
    }
  }, [debouncedSourceCode]);

  useEffect(() => {
    setSourceCode(languageCode.get(language.name));
  }, [language]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="min-h-0 flex-1">
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          defaultLanguage={language.editorValue}
          defaultValue={sourceCode}
          value={sourceCode}
          options={{ minimap: { enabled: false } }}
          onChange={(value) => setSourceCode(value)}
          loading={
            <div>
              {/* TODO: loading component */}
              Loading...
            </div>
          }
        />
      </div>
      <div className="flex justify-between gap-3 p-3">
        <SelectLanguage />
        <div className="my-auto space-x-2">
          <Button size="sm">Submit</Button>
          <Button size="sm">Get Submission</Button>
        </div>
      </div>
    </div>
  );
}
