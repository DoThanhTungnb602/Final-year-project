"use client";

import { api } from "~/trpc/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import EditorPanel from "~/components/playground/editor-panel";
import ProblemDescriptionPanel from "~/components/playground/problem-description-panel";
import ConsolePanel from "~/components/playground/console-panel";
import DefaultLoadingPage from "~/components/shared/default-loading-page";
import { useEffect } from "react";
import { useProblemStore } from "~/hooks/use-problem-store";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isPending } = api.problem.getById.useQuery(id);
  const { setProblem } = useProblemStore();

  useEffect(() => {
    if (data) {
      setProblem(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="h-full flex-1 overflow-auto">
      <div className="h-full">
        {isPending ? (
          <DefaultLoadingPage />
        ) : (
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full min-h-full w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={40} minSize={25}>
              <div className="h-full p-2">
                <ProblemDescriptionPanel />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60} minSize={40}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={60} minSize={10}>
                  <div className="h-full p-2">
                    <EditorPanel />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40} minSize={10}>
                  <div className="h-full p-2">
                    <ConsolePanel />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}
