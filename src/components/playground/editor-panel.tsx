"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { SlNote } from "react-icons/sl";
import { Code2 } from "lucide-react";
import { MdDraw } from "react-icons/md";
import { useState } from "react";
import dynamic from "next/dynamic";

type Props = {};

const CodeEditor = dynamic(() =>
  import("~/components/editor/code-editor").then((mod) => mod.CodeEditor),
);

const RichEditor = dynamic(
  () => import("~/components/editor/rich-editor").then((mod) => mod.default),
  {
    // TODO: Add a loading component
    loading: () => <div>Loading...</div>,
  },
);

const WhiteboardEditor = dynamic(
  () =>
    import("~/components/editor/white-board-editor").then((mod) => mod.default),
  {
    loading: () => <div>Loading...</div>,
  },
);

const EditorPanel = (props: Props) => {
  const [tab, setTab] = useState<"code" | "note" | "whiteboard">("code");

  return (
    <Tabs
      defaultValue={tab}
      value={tab}
      className="flex h-full w-full flex-col"
      activationMode="manual"
    >
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger
          value="code"
          className="flex gap-2"
          onClick={() => setTab("code")}
        >
          <Code2 className="h-4 w-4" />
          Code
        </TabsTrigger>
        <TabsTrigger
          value="note"
          className="flex gap-2"
          onClick={() => setTab("note")}
        >
          <SlNote />
          Note
        </TabsTrigger>
        <TabsTrigger
          value="whiteboard"
          className="flex gap-2"
          onClick={() => setTab("whiteboard")}
        >
          <MdDraw className="h-4 w-4" />
          White Board
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0">
            <CodeEditor />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="note" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0">
            {tab === "note" && <RichEditor />}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="whiteboard" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0">
            {tab === "whiteboard" && <WhiteboardEditor />}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default EditorPanel;
