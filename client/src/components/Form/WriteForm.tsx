//Todo : title과 text를 다루는 state가 필요로 함.
//Todo : useEffect부분은 어차피 겹치는 거 그냥 custom hook으로 빼면 좋을 듯.
//todo:  handleChange도 그냥 전달 받는 게 나을지도~
// * SearchForm과는 다른 점(1): handleSubmit을 상위에서 전달받는다.

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import Select, { OptionItem } from "../Select";
import { getRegSidos, getRegSidoguns } from "../../api";
import { Docs } from "../../Pages/Missing/Write";

interface WriteFormProps {
  setSelected: Dispatch<SetStateAction<Docs>>;
  selected: Selected;
}
interface Selected {
  petKind: PetKind;
  sido: string;
  sigungu: string;
}
interface Selects {
  petKinds: PetOption[];
  sidos: OptionItem[];
  sigungus: OptionItem[];
}
interface PetOption extends OptionItem {
  key: PetKind;
}
type PetKind = "dog" | "cat" | "misc" | "*";

const petKindsInit: PetOption[] = [
  { key: "*", text: "모든 동물" },
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];

function WriteForm({ selected, setSelected }: WriteFormProps) {
  const [selects, setSelects] = useState<Selects>({
    petKinds: petKindsInit,
    sidos: [],
    sigungus: [],
  });

  useEffect(() => {
    async function getAllSidos() {
      if (selects.sidos.length) return;

      const regcodes = await getRegSidos();
      const allSidos: OptionItem[] = regcodes.map(({ code, name }) => ({
        key: code.slice(0, 2),
        text: name,
      }));
      allSidos.unshift({ key: "*", text: "모든 지역" });

      setSelects((prev) => ({ ...prev, sidos: allSidos }));
    }

    async function getSidoguns(sidoCode: string) {
      if (sidoCode === "*") {
        setSelects((prev) => ({ ...prev, sigungus: [] }));
        return;
      }

      const regcodes = await getRegSidoguns(sidoCode);

      const newSidoguns: OptionItem[] = regcodes.map(({ code, name }) => ({
        key: code.slice(2, 5),
        text: name.split(" ").splice(1).join(" "),
      }));
      newSidoguns.unshift({ key: "*", text: "모든 지역" });
      setSelects((prev) => ({ ...prev, sigungus: newSidoguns }));
    }

    getAllSidos();
    getSidoguns(selected.sido);
    console.log("sigungus:", selects.sigungus);
  }, [selected.sido, selects.sidos, selects.sigungus]);

  const createHandleChange = (key: keyof Selected) => {
    return ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected((prev) => ({ ...prev, [key]: target.value }));
    };
  };

  return (
    <form>
      <Select
        optionItems={selects.petKinds}
        handleChange={createHandleChange("petKind")}
      />
      <Select
        optionItems={selects.sidos}
        handleChange={createHandleChange("sido")}
      />
      {selects.sigungus.length ? (
        <Select
          optionItems={selects.sigungus}
          handleChange={createHandleChange("sigungu")}
        />
      ) : null}
    </form>
  );
}
export default WriteForm;
