import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import BoardHeading from "./BoardHeading";
import SearchForm from "../SearchForm";
import BoardMain from "./BoardMain";
import { Grid, SelectChangeEvent, Fab, Typography } from "@mui/material";
import { Create } from "@mui/icons-material";
import { Selected, CardItem } from "../../common/types";

function Board() {
  const { pathname } = useLocation();
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

  const [cardItems, setCardItems] = useState<CardItem[]>([]);
  //carditems를 가져오는 effect hook
  useEffect(() => {
    async function fetchCardItem() {
      const { data } = await axios.post<CardItem[]>(`${pathname}/board/init`);
      setCardItems(data);
    }
    fetchCardItem();
  }, [pathname]);

  const handleClickWrite = () => {};

  return (
    <Grid container justifyContent={"center"}>
      <BoardHeading pathname={pathname} />
      <SearchForm
        selected={selected}
        handleChangePet={handleChangePet}
        handleChangeSido={handleChangeSido}
        handleChangeSigungu={handleChangeSigungu}
      />
      <BoardMain cardItems={cardItems} pathname={pathname} />
      <FloatingActionButton />
    </Grid>
  );
}

export default Board;
//todo 액션 버튼 구현하기

function FloatingActionButton() {
  return (
    <Grid
      sx={{
        position: "absolute",
        right: "2rem",
        bottom: "2rem",
      }}
    >
      <Fab
        variant="extended"
        aria-label="write"
        color="secondary"
        sx={{ width: "10rem", height: "4rem" }}
      >
        <Create sx={{ mr: "1rem" }} />
        <Typography>작성하기</Typography>
      </Fab>
    </Grid>
  );
}
