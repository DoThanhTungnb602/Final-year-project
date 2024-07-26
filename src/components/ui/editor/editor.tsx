"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";
import { useEffect } from "react";

interface EditorProps {
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
  editable?: boolean;
}

const Editor = ({ content, placeholder, onChange, editable }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder ?? "Write something...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        onChange("");
      } else {
        onChange(editor.getHTML());
      }
    },
    editable: editable,
    editorProps: {
      attributes: {
        class: "h-full w-full focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    editor.setOptions({
      editable: editable,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable]);

  if (!editor) return <></>;

  return (
    <div className="prose flex h-full w-full max-w-none flex-col dark:prose-invert">
      {editable && <EditorToolbar editor={editor} />}
      <EditorContent
        className="max-h-[500px] flex-1 overflow-auto p-3"
        editor={editor}
      />
    </div>
  );
};

export default Editor;
