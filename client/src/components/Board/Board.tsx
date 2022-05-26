// 보드 자체만 테스트를 하는데 4번의 렌더링이 추가적으로 발생하는 것을 보면
// 보드 내부 혹은 useRegion 내부의 문제가 아닐까 싶다.ㅡ
import React, { useState } from "react";

import BoardHeading from "./BoardHeading";
import SearchForm from "../SearchForm";
import BoardMain from "./BoardMain";
import { Grid, SelectChangeEvent } from "@mui/material";

import { Selected } from "../../common/types";

function Board() {
  //<SearchFrom>의 changeEvnet에 따라 변경되는 값을 추적하기 위해 local state 사용
  const [selected, setSelected] = useState<Selected>({
    pet: null,
    sido: null,
    sigungu: null,
  });

  const createChangedHandler =
    (selected: string) => (event: SelectChangeEvent) => {
      setSelected((prev) => ({ ...prev, [selected]: event.target.value }));
    };

  return (
    <Grid container justifyContent={"center"}>
      <BoardHeading />
      <SearchForm createChangeHandler={createChangedHandler} />
      <BoardMain />
    </Grid>
  );
}

export default Board;
