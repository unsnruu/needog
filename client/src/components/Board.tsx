// todo : 왜 처음에 리렌더링이 4번 연속해서 일어나게 되는 걸까?
// 보드 자체만 테스트를 하는데 4번의 렌더링이 추가적으로 발생하는 것을 보면
// 보드 내부 혹은 useRegion 내부의 문제가 아닐까 싶다.ㅡ
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Link, useLocation } from "react-router-dom";
import { withSidoOptionItems } from "../recoil/sido";
import getRegion from "../apis/getRegion";
import { getBasePathname } from "../apis/getBasePathname";

import { OptionItem } from "../common/types";
import Select from "./Select";

interface BoardProps {
  pathname: string;
}
interface Selected {
  pet: null | string;
  sido: null | string;
  sigungu: null | string;
}
interface Items {
  pet: OptionItem[];
  sido: OptionItem[];
  sigungu: OptionItem[];
}

const initialSelected = {
  pet: null,
  sido: null,
  sigungu: null,
};
const initialItems = {
  pet: [
    { key: "dog", text: "강아지" },
    { key: "cat", text: "고양이" },
    { key: "misc", text: "다른 동물들" },
  ],
  sido: [],
  sigungu: [],
};

function Board() {
  const location = useLocation();
  const pathname = getBasePathname(location.pathname);

  const [selected, setSelected] = useState<Selected>(initialSelected);
  const [items, setItems] = useState<Items>(initialItems);

  const sidoItems = useRecoilValue(withSidoOptionItems);
  useEffect(() => {
    //sido items
    setItems((prev) => ({ ...prev, sido: sidoItems }));
  }, [sidoItems]);

  useEffect(() => {
    //sigungu items
    if (!selected.sido) return;
    getRegion(selected.sido.slice(0, 2) + "*00000")
      .then((results) => {
        return results?.map((result) => ({
          ...result,
          text: result.text.split(" ")[1],
        }));
      })
      .then((items) => {
        if (!items) return;
        setItems((prev) => ({ ...prev, sigungu: items }));
      })
      .catch((err) => console.error(err));
  }, [selected.sido]);
  const hanldeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleChange =
    (selectName: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected((prev) => ({ ...prev, [selectName]: event.target.value }));
    };

  const title = getTitle(pathname);

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <Link to={"/missing/write"}>글쓰기</Link>
      </div>
      <form onSubmit={hanldeSubmit} aria-label="search form">
        <Select
          name="pet"
          optionItems={items.pet}
          handleChange={handleChange("pet")}
        />
        <Select
          name="sido"
          optionItems={items.sido}
          handleChange={handleChange("sido")}
        />
        <Select
          name="sigungu"
          optionItems={items.sigungu}
          handleChange={handleChange("sigungu")}
        />
      </form>
    </div>
  );
}
type Pathname = "/missing" | "/care" | "/adoption" | string;
function getTitle(pathname: Pathname) {
  switch (pathname) {
    case "/adoption":
      return "동물 입양";
    case "/care":
      return "동물을 보호 중입니다";
    case "/missing":
      return "실종 동물을 찾습니다";
    default:
      throw new Error("Unhandled pathname");
  }
}

export default Board;
