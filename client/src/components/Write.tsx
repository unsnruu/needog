import React, { useState } from "react";

import { Grid, SelectChangeEvent } from "@mui/material";
import SearchForm from "./SearchForm";

import { Selected } from "../common/types";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "@emotion/styled";

const StyledEditorContent = styled(EditorContent)`
  outline: 1px solid black;
`;

function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<h1>Hello World!</h1>",
  });

  return <StyledEditorContent editor={editor} />;
}

function Write() {
  //<SearchFrom>의 changeEvnet에 따라 변경되는 값을 추적하기 위해 local state 사용
  const [selected, setSelected] = useState<Selected>({
    pet: "",
    sido: "",
    sigungu: "",
  });
  //sigungu가 sido에 의존적이기 때문에 이벤트 함수를 일일이 만들었음.
  const handleChangePet = (event: SelectChangeEvent) => {
    setSelected((prev) => ({ ...prev, pet: event.target.value }));
  };
  const handleChangeSido = (event: SelectChangeEvent) => {
    setSelected((prev) => ({ ...prev, sido: event.target.value, sigungu: "" }));
  };
  const handleChangeSigungu = (event: SelectChangeEvent) => {
    setSelected((prev) => ({ ...prev, sigungu: event.target.value }));
  };

  return (
    <Grid>
      <div>Heading</div>
      <SearchForm
        selected={selected}
        handleChangePet={handleChangePet}
        handleChangeSido={handleChangeSido}
        handleChangeSigungu={handleChangeSigungu}
      />
      <Tiptap />
    </Grid>
  );
}

export default Write;
