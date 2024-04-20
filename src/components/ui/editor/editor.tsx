"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";

interface EditorProps {
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder ?? "Write something...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "h-full w-full focus:outline-none",
      },
    },
  });

  if (!editor) return <></>;

  return (
    <div className="prose dark:prose-invert flex h-full w-full max-w-none flex-col bg-background">
      <EditorToolbar editor={editor} />
      <EditorContent
        className="min-h-0 flex-1 overflow-auto p-3"
        editor={editor}
      />
    </div>
  );
};

export default Editor;
