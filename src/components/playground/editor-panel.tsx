import { Card, CardContent } from "~/components/ui/card";
import { CodeEditor } from "~/components/editor/code-editor";

const EditorPanel = () => {
  return (
    <Card className="h-full min-h-0">
      <CardContent className="h-full min-h-0 p-0">
        <CodeEditor />
      </CardContent>
    </Card>
  );
};

export default EditorPanel;
