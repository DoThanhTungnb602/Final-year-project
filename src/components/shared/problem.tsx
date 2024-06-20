"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import EditorPanel from "~/components/playground/editor-panel";
import ProblemDescriptionPanel from "~/components/playground/problem-description-panel";
import ConsolePanel from "~/components/playground/console-panel";

export function ProblemComponent() {
  return (
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
  );
}
