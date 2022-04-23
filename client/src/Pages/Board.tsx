import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useRegion } from "../api";
import { PetState, HandleChangeSelect } from "../components/types";
import { petInitItems } from "../common";

import Post from "../components/Post";
import Select from "../components/Select";
import axios from "axios";

type Pathname = "/missing" | "/care" | "/adoption" | string;

interface Post {
  id: string | number;
  author: string;
  title: string;
  text: string;
  sido?: string;
  sigungu?: string;
  createdAt?: Date;
  pet?: string;
}

type AxiosPostData = Post[];

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
  const { pathname } = useLocation();

  const { sido, setSido, sigungu, setSigungu } = useRegion();
  const [pet, setPet] = useState<PetState>({
    selected: "*",
    items: petInitItems,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  let title = getTitle(pathname);

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
    async function init() {
      const { data } = await axios.post<AxiosPostData>("/missing/board/init");
      setPosts((prev) => [...prev, ...data]);
    }
    init();
  }, []);

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
        {posts.map(({ author, id, title, text }) => (
          <Post author={author} key={id} text={text} titile={title} />
        ))}
      </main>
    </div>
  );
}

export default Board;
