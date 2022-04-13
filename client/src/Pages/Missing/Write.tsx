import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ChangeEventElement =
  | HTMLTextAreaElement
  | HTMLInputElement
  | HTMLSelectElement;

function Write() {
  const [doc, setDoc] = useState({
    title: "",
    text: "",
    pet: "all",
    location: "all",
    region: null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      axios.post("/write", doc, { withCredentials: true });
      navigate("/missing");
    } catch (err) {
      console.log("포스트를 생성하는데 실패하였습니다.");
    }
  };
  const handleChange = ({ target }: React.ChangeEvent<ChangeEventElement>) => {
    setDoc((prev) => ({ ...prev, [target.id]: target.value }));
    console.log(doc);
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          onChange={handleChange}
          value={doc.title}
        />
      </div>
      <div>
        <label htmlFor="pet">종류</label>
        <select name="pets" id="pet" onChange={handleChange} value={doc.pet}>
          <option value="all" disabled>
            반려동물의 종류를 선택하세요
          </option>
          <option value="dog">강아지</option>
          <option value="cat">고양이</option>
          <option value="misc">기타</option>
        </select>
      </div>
      <div>
        <label htmlFor="location">지역</label>
        <select
          name="locations"
          id="location"
          onChange={handleChange}
          value={doc.location}
        >
          <option value="all" disabled>
            지역을 선택하세요
          </option>
          <option value="seoul">서울</option>
          <option value="incheon">인천</option>
          <option value="gyeonggi">경기</option>
          <option value="busan">부산</option>
          <option value="daegeon">대전</option>
          <option value="gwangju">광주</option>
        </select>
      </div>
      {doc.location === "all" ? null : (
        <div>
          <label htmlFor="region">상세 지역</label>
          <select name="regions" id="region" onChange={handleChange}>
            <option value=""></option>
          </select>
        </div>
      )}
      <br />
      <textarea
        id="text"
        cols={30}
        rows={10}
        style={{ outline: "none", resize: "none" }}
        onChange={handleChange}
        value={doc.text}
      ></textarea>
      <button>게시글 등록하기</button>
    </form>
  );
}

export default Write;
