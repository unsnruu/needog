import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Post from "../../components/Post";

interface PostType {
  id: number;
  author: string;
  text: string;
  titile: string;
}

function Board() {
  const [selected, setSelected] = useState({
    pet: "all",
    location: "all",
    region: "",
  });
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    async function getPosts() {
      const { data: newPosts } = await axios.post("/missing/post", selected);
      setPosts((prev) => [...prev, ...newPosts]);
    }
    getPosts();
  }, []);

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    const key = id.split("-")[0];
    setSelected((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // await axios.post("", selected);
  };

  return (
    <div>
      <div>
        <h2 style={{ display: "inline-block" }}>실종 동물을 찾습니다</h2>
        <Link to={"write"}>게시물 작성하기</Link>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pet-select">종류</label>
          <select name="pets" id="pet-select" onChange={handleChangeSelect}>
            <option value="dog">강아지</option>
            <option value="cat">고양이</option>
            <option value="misc">기타</option>
          </select>
        </div>
        <div>
          <label htmlFor="location-select">지역</label>
          <select
            name="locations"
            id="location-select"
            onChange={handleChangeSelect}
          >
            <option value="seoul">서울</option>
            <option value="incheon">인천</option>
            <option value="gyeonggi">경기</option>
            <option value="busan">부산</option>
            <option value="daegeon">대전</option>
            <option value="gwangju">광주</option>
          </select>
        </div>
        <div>
          <label htmlFor="region-select">상세 지역</label>
          <select
            name="regions"
            id="region-select"
            onChange={handleChangeSelect}
          >
            {/* - [ ] 여기는 데이터를 받아와서 reactive하게 처리해야함 */}
            <option value=""></option>
          </select>
        </div>
        <button type="submit">검색</button>
      </form>
      <hr />
      <main>
        <h3>BOARD</h3>
        {posts.map((post, idx) => (
          <Post key={idx} />
        ))}
      </main>
    </div>
  );
}

export default Board;
