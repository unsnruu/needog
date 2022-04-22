import React from "react";
import { Link, useLocation } from "react-router-dom";

import Post from "../components/Post";
import { SearchForm } from "../components/Form";

type Pathname = "/missing" | "/care" | "/adoption" | string;

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
  let title = getTitle(pathname);

  return (
    <div>
      <div>
        <h2 style={{ display: "inline-block" }}>{title}</h2>
        <Link to={"write"}>게시물 작성하기</Link>
      </div>
      <div id="search-form" style={{ display: "flex" }}>
        <SearchForm />
        <button>검색</button>
      </div>
      <hr />
      <main id="board-main">
        <h3>BOARD</h3>
      </main>
    </div>
  );
}

export default Board;
