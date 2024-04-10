import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { CodeEditor } from "~/components/editor/code-editor";
import { SlNote } from "react-icons/sl";
import { Code2 } from "lucide-react";
import { MdDraw } from "react-icons/md";

type Props = {};

const EditorPanel = (props: Props) => {
  return (
    <Tabs defaultValue="code" className="flex h-full w-full flex-col">
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger value="code" className="flex gap-2">
          <Code2 className="h-4 w-4" />
          Code
        </TabsTrigger>
        <TabsTrigger value="note" className="flex gap-2">
          <SlNote />
          Note
        </TabsTrigger>
        <TabsTrigger value="whiteboard" className="flex gap-2">
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
      <TabsContent value="note">
        <Card>
          <CardContent></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="whiteboard">
        <Card>
          <CardContent></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default EditorPanel;
