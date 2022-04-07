import React from "react";
import { Post } from "../components/Post";

function Missing() {
  return (
    <div>
      <div>
        <h2 style={{ display: "inline-block" }}>실종 동물을 찾습니다</h2>
        <button>게시글 올리기</button>
      </div>
      <hr />
      <form>
        <label htmlFor="pet-select">종류</label>
        <select name="pets" id="pet-select">
          <option value="dog">강아지</option>
          <option value="cat">고양이</option>
          <option value="misc">기타</option>
        </select>
        <label htmlFor="location-select">지역</label>
        <select name="locations" id="location-select">
          <option value="seoul">서울</option>
          <option value="incheon">인천</option>
          <option value="gyeonggi">경기</option>
          <option value="busan">부산</option>
          <option value="daegeon">대전</option>
          <option value="gwangju">광주</option>
        </select>
        <label htmlFor="region-select">상세 지역</label>
        <select name="regions" id="region-select">
          {/* - [ ] 여기는 데이터를 받아와서 reactive하게 처리해야함 */}
          <option value=""></option>
        </select>
        <button type="submit">검색</button>
      </form>
      <hr />
      <main>
        <Post />
      </main>
    </div>
  );
}

export { Missing };
