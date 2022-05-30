import React, { useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axios from "axios";

import styled from "@emotion/styled";

import { Grid } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  FormatSize,
  FormatListBulleted,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  AddAPhoto,
} from "@mui/icons-material";

const StyledEditorContent = styled(EditorContent)`
  outline: 1px solid black;
`;

export default function Tiptap() {
  const [file, setFile] = useState<File | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<h1>Hello World!</h1>",
  });

  const handleChangeFile = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (target.files) {
        const formData = new FormData();
        formData.append("img", target.files[0]);

        const { data } = await axios.post<{ url: string }>(
          "/post/img",
          formData,
          {
            withCredentials: true,
          }
        );
        const { url } = data;
        console.log(url);
      }
    } catch (error) {}
  };
  return (
    <Grid>
      <TiptapMenubar editor={editor} />
      <StyledEditorContent editor={editor} />
      <label htmlFor="hello-world" style={{ cursor: "pointer" }}>
        <AddAPhoto />
        <input
          type="file"
          id="hello-world"
          style={{ display: "none" }}
          onChange={handleChangeFile}
        />
      </label>
    </Grid>
  );
}

interface TiptapMenubarProps {
  editor: Editor | null;
}
function TiptapMenubar({ editor }: TiptapMenubarProps) {
  if (!editor) return null;

  return (
    <>
      <FormatBold />
      <FormatItalic />
      <FormatUnderlined />
      <StrikethroughS />
      <FormatSize />
      <FormatListBulleted />
      <FormatAlignLeft />
      <FormatAlignCenter />
      <FormatAlignRight />
    </>
  );
}

//todo
//[ ] tiptap 옵션기능들 추가하기 - 볼드, 이미지 등
