import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ViewerProps {
  content: string;
}

const Viewer = ({ content }: ViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  if (!editor) return <></>;

  return (
    <article className="prose-mt-0 prose max-w-none p-4 dark:prose-invert overflow-scroll">
      <EditorContent editor={editor} readOnly={true} />
    </article>
  );
};

export default Viewer;
