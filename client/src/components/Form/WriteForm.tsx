// * SearchForm과는 다른 점(1): handleSubmit을 상위에서 전달받는다.

import React, { useState } from "react";

import Select, { OptionItem } from "../Select";
import { useRegion } from "../../api";

interface WriteFormProps {}

interface PetState {
  selected: PetKind;
  items: PetOption[];
}
interface PetOption extends OptionItem {
  key: PetKind;
}
type PetKind = "dog" | "cat" | "misc" | "*" | string;

type HandleChangeSelect = React.ChangeEvent<HTMLSelectElement>;

const petKindsInit: PetOption[] = [
  { key: "*", text: "모든 동물" },
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];
function WriteForm() {
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

  return (
    <form>
      <Select optionItems={pet.items} handleChange={handleChangePet} />
      <Select optionItems={sido.items} handleChange={handleChangeSido} />
      {sido.selected !== "*" && (
        <Select
          optionItems={sigungu.items}
          handleChange={handleChangeSigungu}
        ></Select>
      )}
    </form>
  );
}
export default WriteForm;
