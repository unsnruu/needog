//Todo : 로그인 시에만 이 페이지 방문 가능하도록 navigate해야한다.
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WriteForm } from "../../components/Form";

export interface Docs {
  petKind: PetKind;
  sido: string;
  sigungu: string;
  title: string;
  text: string;
}

type PetKind = "dog" | "cat" | "misc" | "*";

function Write() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<Docs>({
    title: "",
    text: "",
    petKind: "*",
    sido: "*",
    sigungu: "*",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(docs);
    // try {
    //   axios.post("/write", docs, { withCredentials: true });
    //   navigate("/missing");
    // } catch (err) {
    //   console.log("포스트를 생성하는데 실패하였습니다.");
    // }
  };
  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setDocs((prev) => ({ ...prev, title: target.value }));
  };
  const handleChageText = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setDocs((prev) => ({ ...prev, text: target.value }));
  };

  return (
    <div>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" onChange={handleChangeTitle} />
      <WriteForm
        selected={{
          petKind: docs.petKind,
          sido: docs.sido,
          sigungu: docs.sigungu,
        }}
        setSelected={setDocs}
      ></WriteForm>
      <textarea style={{ resize: "none" }} onChange={handleChageText} />
      <button>글쓰기</button>
    </div>
  );
}

export default Write;
