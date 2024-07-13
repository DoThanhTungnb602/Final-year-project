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
import { defaultEditorOptions } from "~/lib/types";
import { FaCloudArrowUp } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { Spinner } from "../shared/spinner";
import {
  useRunResultStore,
  useSubmitResultStore,
} from "~/hooks/use-submission-store";

export function CodeEditor() {
  const { theme } = useTheme();
  const { problem } = useProblemStore();
  const { setResult } = useRunResultStore();
  const { setSubmitResult } = useSubmitResultStore();
  const utils = api.useUtils();

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

  useEffect(() => {
    if (problem) {
      problem.skeletons.forEach((skeleton) => {
        setCodeMap({ language: skeleton.language.name, code: skeleton.code });
      });
      setSourceCode(codeMap.get(selectedLanguage.name));
    }

    return () => {
      problem?.skeletons.forEach((skeleton) => {
        setCodeMap({ language: skeleton.language.name, code: "" });
      });
      setSourceCode("");
    };
  }, [problem]);

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

  const runProblem = api.submission.run.useMutation({
    onSuccess(data) {
      console.log(data);
      setResult(data);
    },
  });

  const submitProblem = api.submission.submit.useMutation({
    onSuccess(data) {
      console.log(data);
      utils.submission.all.invalidate().catch(console.error);
      setSubmitResult(data);
    },
  });

  const onRun = () => {
    if (problem) {
      runProblem.mutate({
        problemId: problem.id,
        languageId: selectedLanguage.id,
        code: sourceCode ?? "",
      });
    }
  };

  const onSubmit = () => {
    if (problem) {
      submitProblem.mutate({
        problemId: problem.id,
        languageId: selectedLanguage.id,
        code: sourceCode ?? "",
      });
    }
  };

  return problem ? (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="min-h-0 flex-1">
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          defaultLanguage={selectedLanguage.editorValue}
          language={selectedLanguage.editorValue}
          value={sourceCode ?? ""}
          options={{
            ...defaultEditorOptions,
          }}
          onChange={setSourceCode}
          loading={<DefaultLoadingPage />}
        />
      </div>
      <div className="flex justify-between gap-3 p-2">
        <SelectLanguage />
        <div className="my-auto space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={onRun}
            disabled={runProblem.isPending}
          >
            {runProblem.isPending ? (
              <Spinner className="mr-2 size-5" />
            ) : (
              <FaPlay className="mr-2 size-4" />
            )}
            Run
          </Button>
          <Button
            size="sm"
            onClick={onSubmit}
            disabled={submitProblem.isPending}
          >
            {submitProblem.isPending ? (
              <Spinner className="mr-2 size-5" />
            ) : (
              <FaCloudArrowUp className="mr-2 size-4" />
            )}
            Submit
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <DefaultLoadingPage />
  );
}
