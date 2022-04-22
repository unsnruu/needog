//Todo : 로그인 시에만 이 페이지 방문 가능하도록 navigate해야한다.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "../components/Select";
import { useRegion } from "../api";
import {
  PetOption,
  PetState,
  HandleChangeSelect,
} from "../components/Form/types";

const petInitItems: PetOption[] = [
  { key: "*", text: "모든 동물" },
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];

function Write() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [pet, setPet] = useState<PetState>({
    selected: "*",
    items: petInitItems,
  });
  const { sido, setSido, sigungu, setSigungu } = useRegion();

  const navigate = useNavigate();

  const handleChangeTitle = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };
  const handleChangeText = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(target.value);
  };
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
    console.log({
      sido: sido.selected,
      sigungu: sigungu.selected,
      pet: pet.selected,
      title,
      text,
    });
    navigate("/missing", { replace: true });
  };

  return (
    <div id="page-write">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" onChange={handleChangeTitle} />
        </div>
        <div>
          <Select optionItems={pet.items} handleChange={handleChangePet} />
          <Select optionItems={sido.items} handleChange={handleChangeSido} />
          <Select
            optionItems={sigungu.items}
            handleChange={handleChangeSigungu}
          />
        </div>
        <textarea cols={30} rows={10} onChange={handleChangeText} />
        <button>작성 완료</button>
      </form>
    </div>
  );
}

export default Write;
