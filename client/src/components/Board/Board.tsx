// 보드 자체만 테스트를 하는데 4번의 렌더링이 추가적으로 발생하는 것을 보면
// 보드 내부 혹은 useRegion 내부의 문제가 아닐까 싶다.ㅡ
import React, { useState, useEffect, useReducer, createContext } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { Grid, SelectChangeEvent } from "@mui/material";

import BoardHeading from "./BoardHeading";
import SearchForm from "../SearchForm";
import BoardMain from "./BoardMain";

import { withIsLoggedIn } from "../../recoil/user";
import { getRegion, getBasePathname, getTitle } from "../../apis";
import { Items, Selected, OptionItem } from "../../common/types";

import { CardProp } from "../Card";

type CardItem = Omit<CardProp, "pathname">;

function Board() {
  const location = useLocation();
  const pathname = getBasePathname(location.pathname);



    if (!boardState.cards.length) getCardItems();
  }, [pathname, boardState.cards.length, selected]);

  const handleClickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(selected);
  };

  const BoardContext = createContext([boardState, boardDispatch]);

  return (
    <BoardContext.Provider value={[boardState, boardDispatch]}>
      <Grid container justifyContent={"center"}>
        <BoardHeading isLoggedIn={isLoggedIn} title={title} />
        <SearchForm
          items={items}
          handleClickSubmit={handleClickSubmit}
          setSelected={setSelected}
        />
        <BoardMain cardItems={boardState.cards} pathname={pathname} />
      </Grid>
    </BoardContext.Provider>
  );
}

export default Board;
