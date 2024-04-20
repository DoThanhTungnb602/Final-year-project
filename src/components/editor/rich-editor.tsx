"use client";

import Editor from "~/components/ui/editor/editor";

const RichEditor = () => {
  return (
    <Editor
      content={""}
      onChange={() => {
        // TODO: Implement onChange for rich editor
        console.log("changed");
      }}
      placeholder="Write something..."
    />
  );
};

export default RichEditor;
