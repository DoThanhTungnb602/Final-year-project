import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { GrTest } from "react-icons/gr";
import { HiClipboardDocumentList } from "react-icons/hi2";


const ConsolePanel = () => {
  return (
    <Tabs defaultValue="testcase" className="flex h-full w-full flex-col">
      <TabsList className="flex w-full justify-start gap-1">
        <TabsTrigger value="testcase" className="flex gap-2">
          <GrTest />
          Test case
        </TabsTrigger>
        <TabsTrigger value="output" className="flex gap-2">
          <HiClipboardDocumentList className="size-4" />
          Output
        </TabsTrigger>
      </TabsList>
      <TabsContent value="testcase" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0"></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="output" className="min-h-0 flex-1">
        <Card className="h-full min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 p-0"></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ConsolePanel;
