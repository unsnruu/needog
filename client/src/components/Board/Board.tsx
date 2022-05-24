// 보드 자체만 테스트를 하는데 4번의 렌더링이 추가적으로 발생하는 것을 보면
// 보드 내부 혹은 useRegion 내부의 문제가 아닐까 싶다.ㅡ
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { Grid, SelectChangeEvent } from "@mui/material";

import BoardHeading from "./BoardHeading";
import SearchForm from "../SearchForm";
import BoardMain from "./BoardMain";

import { withSidoOptionItems } from "../../recoil/sido";
import { withIsLoggedIn } from "../../recoil/user";
import { getRegion, getBasePathname, getTitle } from "../../apis";
import { Items, Selected } from "../../common/types";
import { CardProp } from "../Card";

type CardItem = Omit<CardProp, "pathname">;

const initialSelected: Selected = {
  pet: null,
  sido: null,
  sigungu: null,
};
const initialItems: Items = {
  pet: [
    { key: "dog", text: "강아지" },
    { key: "cat", text: "고양이" },
    { key: "misc", text: "다른 동물들" },
  ],
  sido: [{ key: uuidv4(), text: "시/도" }],
  sigungu: [{ key: uuidv4(), text: "시/군/구", disabled: true }],
};

function Board() {
  const location = useLocation();
  const pathname = getBasePathname(location.pathname);

  const [selected, setSelected] = useState<Selected>(initialSelected);
  const [items, setItems] = useState<Items>(initialItems);
  const [cardItems, setCardItems] = useState<CardItem[]>([]);

  const sidoItems = useRecoilValue(withSidoOptionItems);
  const isLoggedIn = useRecoilValue(withIsLoggedIn);
  const title = getTitle(pathname);

  useEffect(() => {
    //sido items
    setItems((prev) => ({ ...prev, sido: sidoItems }));
  }, [sidoItems]);

  useEffect(() => {
    //sigungu items
    (async function getSigungu() {
      try {
        if (!selected.sido) return;
        const query = selected.sido.slice(0, 2) + "*00000";
        const results = await getRegion(query, true);

        if (!results) return;
        const items = results.map((result) => ({
          ...result,
          text: result.text.split(" ").slice(1).join(""),
        }));
        items.sort((a, b) => a.text.charCodeAt(0) - b.text.charCodeAt(0));

        setItems((prev) => ({ ...prev, sigungu: items }));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selected.sido]);
  //get card items
  useEffect(() => {
    async function getCardItems() {
      try {
        const { data } = await axios.post<CardItem[]>(
          `${pathname}/board/initCard`,
          selected
        );
        setCardItems((prev) => [...prev, ...data]);
      } catch (error) {
        console.error(error);
      }
    }

    if (!cardItems.length) getCardItems();
  }, [pathname, cardItems.length, selected]);

  const handleChange = (selectName: string) => (event: SelectChangeEvent) => {
    setSelected((prev) => ({
      ...prev,
      [selectName]: event.target.value,
    }));
  };

  return (
    <Grid container justifyContent={"center"}>
      <BoardHeading isLoggedIn={isLoggedIn} title={title} />
      <SearchForm
        handleChange={handleChange}
        items={items}
        handleClickSubmit={() => {}}
      />
      <BoardMain cardItems={cardItems} pathname={pathname} />
    </Grid>
  );
}

export default Board;
