import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "@emotion/styled";

import { Grid } from "@mui/material";

const StyledEditorContent = styled(EditorContent)`
  outline: 1px solid black;
`;

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<h1>Hello World!</h1>",
  });

  return (
    <Grid>
      <StyledEditorContent editor={editor} />
    </Grid>
  );
}

//todo
//[ ] tiptap 옵션기능들 추가하기 - 볼드, 이미지 등
