// 보드 자체만 테스트를 하는데 4번의 렌더링이 추가적으로 발생하는 것을 보면
// 보드 내부 혹은 useRegion 내부의 문제가 아닐까 싶다.ㅡ

//todo sido의 값이 바뀐다면 sigungu의 값도 dependent하게 초기화 되어야 한다.
// 너무 어렵네 어떻게 해야 깔끔하게 짤 수 있으련지
//todo 궁극적으로는 items에서 sido를 관리할 필요가 없을 듯.

import React, { useState, useEffect, useReducer, createContext } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { Grid, SelectChangeEvent } from "@mui/material";

import BoardHeading from "./BoardHeading";
import SearchForm from "../SearchForm";
import BoardMain from "./BoardMain";

import { withSidoOptionItems } from "../../recoil/sido";
import { withIsLoggedIn } from "../../recoil/user";
import { getRegion, getBasePathname, getTitle } from "../../apis";
import { Items, Selected, OptionItem } from "../../common/types";
import { getInitItems, getInitSelected } from "../../common/data";
import { CardProp } from "../Card";

type CardItem = Omit<CardProp, "pathname">;
type BoardState = { items: Items; selected: Selected; cards: CardItem[] };
type BoardAction =
  | { type: "INIT_SIGUNGU"; payload: OptionItem[] }
  | { type: "INIT_CARD"; payload: CardItem[] }
  | { type: "INIT_SIDO"; payload: OptionItem[] };

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "INIT_CARD": {
      return { ...state, cards: action.payload };
    }
    case "INIT_SIGUNGU": {
      return { ...state, items: { ...state.items, sigungu: action.payload } };
    }
    case "INIT_SIDO": {
      return { ...state, items: { ...state.items, sido: action.payload } };
    }
    default:
      return state;
  }
}

const boardInitState: BoardState = {
  items: getInitItems(),
  selected: getInitSelected(),
  cards: [],
};

function Board() {
  const location = useLocation();
  const pathname = getBasePathname(location.pathname);

  const [boardState, boardDispatch] = useReducer(boardReducer, boardInitState);

  const [selected, setSelected] = useState<Selected>(getInitSelected());
  const [items, setItems] = useState<Items>(getInitItems());
  // const [cardItems, setCardItems] = useState<CardItem[]>([]);

  const sidoItems = useRecoilValue(withSidoOptionItems);
  const isLoggedIn = useRecoilValue(withIsLoggedIn);
  const title = getTitle(pathname);

  useEffect(() => {
    //init sido items
    boardDispatch({ type: "INIT_SIDO", payload: sidoItems });
  }, [sidoItems]);

  useEffect(() => {
    //init sigungu items
    (async function getSigungu() {
      try {
        if (!boardState.selected.sido) return;
        const query = boardState.selected.sido.slice(0, 2) + "*00000";
        const results = await getRegion(query, true);

        if (!results) return;
        const items = results.map((result) => ({
          ...result,
          text: result.text.split(" ").slice(1).join(""),
        }));
        items.sort((a, b) => a.text.charCodeAt(0) - b.text.charCodeAt(0));

        boardDispatch({ type: "INIT_SIGUNGU", payload: items });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [boardState.selected.sido]);

  useEffect(() => {
    //init card items
    async function getCardItems() {
      try {
        const { data } = await axios.post<CardItem[]>(
          `${pathname}/board/initCard`,
          selected
        );
        boardDispatch({ type: "INIT_CARD", payload: data });
      } catch (error) {
        console.error(error);
      }
    }

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
