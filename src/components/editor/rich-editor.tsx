"use client";

import React from "react";
import Editor from "~/components/ui/editor/editor";

type Props = {};

const RichEditor = (props: Props) => {
  return (
    <Editor content={""} onChange={() => {}} placeholder="Write something..." />
  );
};

export default RichEditor;
