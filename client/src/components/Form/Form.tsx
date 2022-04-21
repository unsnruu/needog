//Todo: 이후에 리팩토링을 통해서 이 Form을 기본 형식으로 사용해 다른 [something]Form의 기본 형태로 사용하게끔 바꿔야함.

import React, { useState } from "react";

import { PetOption, HandleChangeSelect, PetState } from "./types";
import Select from "../Select";
import { useRegion } from "../../api";

const petKindsInit: PetOption[] = [
  { key: "*", text: "모든 동물" },
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];

interface FormProps {
  children?: React.ReactElement;
}

function Form({ children }: FormProps) {
  const [pet, setPet] = useState<PetState>({
    selected: "*",
    items: petKindsInit,
  });
  const { sido, setSido, sigungu, setSigungu } = useRegion();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit executed");
    //Todo: sumbit 로직 추가하기
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

  return (
    <form onSubmit={handleSubmit}>
      <Select optionItems={pet.items} handleChange={handleChangePet} />
      <Select optionItems={sido.items} handleChange={handleChangeSido} />
      {sido.selected !== "*" && (
        <Select
          optionItems={sigungu.items}
          handleChange={handleChangeSigungu}
        />
      )}
    </form>
  );
}

export default Form;
