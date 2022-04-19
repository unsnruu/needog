import React, { useEffect, useState } from "react";
import axios from "axios";

import Select, { Option } from "./Select";

interface Selected {
  petKind: PetKind;
  sido: string;
  sigungu: string;
}
interface Selects {
  petKinds: PetOption[];
  sidos: Option[];
  sigungus: Option[];
}
interface PetOption extends Option {
  key: PetKind;
}
type PetKind = "dog" | "cat" | "misc" | "*";

interface RegCode {
  name: string;
  code: string;
}
interface ReturnAxios {
  regcodes: RegCode[];
}

const petKindsInit: PetOption[] = [
  { key: "*", text: "모든 동물" },
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];

function Form() {
  const [selected, setSelected] = useState<Selected>({
    petKind: "*",
    sido: "*",
    sigungu: "*",
  });

  const [selects, setSelects] = useState<Selects>({
    petKinds: petKindsInit,
    sidos: [],
    sigungus: [],
  });

  useEffect(() => {
    async function getAllSidos() {
      const {
        data: { regcodes },
      } = await axios.get<ReturnAxios>(
        "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000"
      );
      const allSidos: Option[] = regcodes.map(({ code, name }) => ({
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

      const {
        data: { regcodes },
      } = await axios.get<ReturnAxios>(
        `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${sidoCode}*00000&is_ignore_zero=true`
      );

      const newSidoguns: Option[] = regcodes.map(({ code, name }) => ({
        key: code.slice(2, 5),
        text: name.split(" ").splice(1).join(" "),
      }));
      newSidoguns.unshift({ key: "*", text: "모든 지역" });
      setSelects((prev) => ({ ...prev, sigungus: newSidoguns }));
    }

    getAllSidos();
    getSidoguns(selected.sido);
  }, [selected.sido]);

  const createHandleChange = (selecetedKey: keyof Selected) => {
    return ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected((prev) => ({ ...prev, [selecetedKey]: target.value }));
    };
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit executed");
    console.log(selected);
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button>검색</button>
    </form>
  );
}

export default Form;
