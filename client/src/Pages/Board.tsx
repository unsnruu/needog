import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";

import { useRegion } from "../api";
import { PetState, HandleChangeSelect } from "../components/types";
import { petInitItems } from "../common";

import Card, { CardProp } from "../components/Card";
import Select from "../components/Select";
import axios from "axios";

type Pathname = "/missing" | "/care" | "/adoption" | string;

type AxiosRerturnBoard = CardProp[];

function getTitle(pathname: Pathname) {
  let title = "";
  switch (pathname) {
    case "/adoption":
      title = "동물 입양";
      break;
    case "/care":
      title = "동물을 보호 중이에요";
      break;
    case "/missing":
      title = "실종 동물을 찾습니다";
      break;
    default:
      throw new Error("Unhandled pathname");
  }
  return title;
}

function Board() {
  const { sido, setSido, sigungu, setSigungu } = useRegion();
  const [pet, setPet] = useState<PetState>({
    selected: "*",
    items: petInitItems,
  });
  const { pathname } = useLocation();
  const baseUrl = useOutletContext<string>();

  const [posts, setPosts] = useState<CardProp[]>([]);
  let title = useMemo(() => getTitle(pathname), [pathname]);

  const handleChangePet = ({ target }: HandleChangeSelect) => {
    setPet((prev) => ({ ...prev, selected: target.value }));
  };
  const handleChangeSido = ({ target }: HandleChangeSelect) => {
    setSido((prev) => ({ ...prev, selected: target.value }));
  };
  const handleChangeSigungu = ({ target }: HandleChangeSelect) => {
    setSigungu((prev) => ({ ...prev, selected: target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("검색 실행");
  };

  useEffect(() => {
    async function initBoard() {
      const { data } = await axios.post<AxiosRerturnBoard>(
        `/${baseUrl}/board/init`
      );
      setPosts((prev) => [...prev, ...data]);
    }
    initBoard();
  }, [baseUrl]);

  return (
    <div>
      <div>
        <h2 style={{ display: "inline-block" }}>{title}</h2>
        <Link to={"write"}>게시물 작성하기</Link>
      </div>
      <form id="search-form" onSubmit={handleSubmit}>
        <Select optionItems={pet.items} handleChange={handleChangePet} />
        <Select optionItems={sido.items} handleChange={handleChangeSido} />
        {sido.selected === "*" || (
          <Select
            optionItems={sigungu.items}
            handleChange={handleChangeSigungu}
          />
        )}
        <button>검색</button>
      </form>
      <hr />
      <h3>BOARD</h3>
      <main id="board-main" style={{ display: "flex" }}>
        {posts.map(({ author, id, title }) => (
          <Card
            key={id}
            id={id}
            title={title}
            author={author}
            baseUrl={baseUrl}
          />
        ))}
      </main>
    </div>
  );
}

export default Board;
