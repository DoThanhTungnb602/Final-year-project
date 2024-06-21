"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface ViewerProps {
  content: string;
}

const Viewer = ({ content }: ViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  useEffect(() => {
    editor?.commands.setContent(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!editor) return <></>;

  return (
    <article className="prose-mt-0 prose max-w-none dark:prose-invert">
      <EditorContent editor={editor} readOnly={true} />
    </article>
  );
};

export default Viewer;
