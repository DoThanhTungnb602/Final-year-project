"use client";

import { useEditorStore } from "~/lib/stores";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useTheme } from "next-themes";

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
    <Editor
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
      defaultLanguage={language.editorValue}
      defaultValue={sourceCode}
      value={sourceCode}
      options={{ minimap: { enabled: false } }}
      onChange={(value) => setSourceCode(value)}
    />
  );
}
