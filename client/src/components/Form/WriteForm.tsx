//Todo : title과 text를 다루는 state가 필요로 함.
//Todo : useEffect부분은 어차피 겹치는 거 그냥 custom hook으로 빼면 좋을 듯.
//todo:  handleChange도 그냥 전달 받는 게 나을지도~
// * SearchForm과는 다른 점(1): handleSubmit을 상위에서 전달받는다.

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import Select, { OptionItem } from "../Select";
import { useRegion } from "../../api";
import { Docs } from "../../Pages/Missing/Write";

interface WriteFormProps {
  setSelected: Dispatch<SetStateAction<Docs>>;
}
interface PetState {
  selected: PetKind;
  items: PetOption[];
}
interface PetOption extends OptionItem {
  key: PetKind;
}
type PetKind = "dog" | "cat" | "misc" | "*" | string;

const petKindsInit: PetOption[] = [
  { key: "*", text: "모든 동물" },
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];
type HandleChangeSelect = React.ChangeEvent<HTMLSelectElement>;

function WriteForm({ setSelected }: WriteFormProps) {
  const [pet, setPets] = useState<PetState>({
    selected: "*",
    items: petKindsInit,
  });
  const { sido, setSido, sigungu, setSigungu } = useRegion();

  const handleChangePet = ({ target }: HandleChangeSelect) => {
    setPets((prev) => ({ ...prev, selected: target.value }));
  };
  const handleChangeSido = ({ target }: HandleChangeSelect) => {
    setSido((prev) => ({ ...prev, selected: target.value }));
  };
  const handleChangeSigungu = ({ target }: HandleChangeSelect) => {
    setSigungu((prev) => ({ ...prev, selected: target.value }));
  };
  // const createHandleChange = (key: "pet" | "sido" | "sigungu") => {
  //   return ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
  //     switch (key) {
  //       case "pet":
  //         return setPets((prev) => ({ ...prev, selected: target.value }));
  //       case "sido":
  //         return setSidos((prev) => ({ ...prev, selected: target.value }));
  //       case "sigungu":
  //         return setSigungus((prev) => ({ ...prev, selected: target.value }));
  //       default:
  //         throw new Error("Unhandled Key on createHandleChnage");
  //     }
  //   };
  // };

  return (
    <form>
      <Select optionItems={pet.items} handleChange={handleChangePet} />
      <Select optionItems={sido.items} handleChange={handleChangeSido} />
      <Select
        optionItems={sigungu.items}
        handleChange={handleChangeSigungu}
      ></Select>
    </form>
  );
}
export default WriteForm;
