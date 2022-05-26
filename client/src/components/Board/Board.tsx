// 보드 자체만 테스트를 하는데 4번의 렌더링이 추가적으로 발생하는 것을 보면
// 보드 내부 혹은 useRegion 내부의 문제가 아닐까 싶다.ㅡ
import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { Grid, SelectChangeEvent } from "@mui/material";

import BoardHeading from "./BoardHeading";
import SearchForm from "../SearchForm";
import BoardMain from "./BoardMain";

function Board() {
  return (
    <Grid container justifyContent={"center"}>
      <BoardHeading />
      <SearchForm />
      <BoardMain />
    </Grid>
  );
}

export default Board;
