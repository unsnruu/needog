import React from "react";
import { Link } from "react-router-dom";

import Post from "../../components/Post";
import Form from "../../components/Form";

interface PostType {
  id: number;
  author: string;
  text: string;
  titile: string;
}

function Board() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <h2 style={{ display: "inline-block" }}>실종 동물을 찾습니다</h2>
        <Link to={"write"}>게시물 작성하기</Link>
      </div>
      <Form />
      <hr />
      <main>
        <h3>BOARD</h3>
      </main>
    </div>
  );
}

export default Board;
