//Todo : 로그인 시에만 이 페이지 방문 가능하도록 navigate해야한다.
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import Select, { OptionItem } from "../components/Select";

import { useRegion } from "../api";
import { petInitItems } from "../common";
import { PetState, HandleChangeSelect } from "../components/types";

function Write() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { sido, setSido, sigungu, setSigungu } = useRegion();
  const [pet, setPet] = useState<PetState>({
    selected: "null",
    items: petInitItems,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pet.selected === "null") {
      window.alert("동물의 종류를 선택해 주세요");
      return;
    } else if (sido.selected === "*") {
      window.alert("지역을 선택해 주세요");
      return;
    } else if (sigungu.selected === "*") {
      window.alert("상세 지역을 선택해 주세요");
      return;
    } else if (!title.trim().length) {
      window.alert("제목이 비었습니다.");
      return;
    } else if (!text.length) {
      window.alert("내용이 비었습니다.");
      return;
    }

    try {
      await axios.post(
        "/missing/write",
        {
          title,
          text,
          pet: pet.selected,
          sido: sido.selected,
          sigungu: sigungu.selected,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Failed to submit");
    }
    navigate("/missing", { replace: true });
  };

  const petItems: OptionItem[] = [
    { key: "null", text: "동물 선택", disabled: true },
    ...pet.items,
  ];
  const sidoItems: OptionItem[] = [
    { key: "*", text: "지역 선택", disabled: true },
    ...sido.items,
  ];
  const sigunguItems: OptionItem[] = [
    { key: "*", text: "상세 지역 선택", disabled: true },
    ...sigungu.items,
  ];

  return (
    <div id="page-write">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" onChange={handleChangeTitle} />
        </div>
        <div>
          <Select optionItems={petItems} handleChange={handleChangePet} />
          {<Select optionItems={sidoItems} handleChange={handleChangeSido} />}
          {sido.selected === "*" || (
            <Select
              optionItems={sigunguItems}
              handleChange={handleChangeSigungu}
            />
          )}
        </div>
        <textarea cols={30} rows={10} onChange={handleChangeText} />
        <button>작성 완료</button>
      </form>
    </div>
  );
}

export default Write;
