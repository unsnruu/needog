import React, { useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import axios from "axios";

import styled from "@emotion/styled";

import { Grid } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
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
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<h1>Hello World!</h1>",
  });

  return (
    <Grid>
      <TiptapMenubar editor={editor} />
      <StyledEditorContent editor={editor} />
    </Grid>
  );
}

interface TiptapMenubarProps {
  editor: Editor | null;
}
function TiptapMenubar({ editor }: TiptapMenubarProps) {
  if (!editor) return null;
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

        editor.commands.setImage({ src: `http://localhost:8000/post${url}` });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Grid>
      <Grid>
        <FormatBold onClick={() => editor.chain().focus().toggleBold().run()} />
        <FormatItalic
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <StrikethroughS
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
      </Grid>

      <Grid>
        <FormatAlignLeft
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <FormatAlignCenter
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <FormatAlignRight
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
      </Grid>
      <Grid>
        <FormatSize
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
      </Grid>
      <Grid>
        <FormatListBulleted
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
      </Grid>
      <Grid>
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
    </Grid>
  );
}

//todo
//[ ] tiptap 옵션기능들 추가하기 - 볼드, 이미지 등
