import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import BoardHeading from "./BoardHeading";
import SearchForm from "../SearchForm";
import BoardMain from "./BoardMain";
import { Grid, SelectChangeEvent } from "@mui/material";

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
    </Grid>
  );
}

export default Board;
