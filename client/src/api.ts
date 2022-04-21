//API docs: https://juso.dev/
import axios from "axios";
import { kill } from "process";
import { useState, useEffect } from "react";
import { OptionItem } from "./components/Select";

interface ReturnAxios {
  regcodes: RegCode[];
}
interface RegCode {
  name: string;
  code: string;
}
interface Sido {
  selected: string;
  items: OptionItem[];
}
interface Sigungu {
  selected: string;
  items: OptionItem[];
}

const jusoUrl = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=`;

async function getRegSidos() {
  const {
    data: { regcodes },
  } = await axios.get<ReturnAxios>(`${jusoUrl}??00000000`);
  return regcodes;
}

async function getRegSidoguns(sidoCode: string) {
  const {
    data: { regcodes },
  } = await axios.get<ReturnAxios>(
    `${jusoUrl}${sidoCode}*00000&is_ignore_zero=true`
  );
  return regcodes;
}

function useRegion() {
  const [sido, setSido] = useState<Sido>({
    selected: "*",
    items: [],
  });
  const [sigungu, setSigungu] = useState<Sigungu>({
    selected: "*",
    items: [],
  });

  useEffect(() => {
    async function getAllSidos() {
      if (sido.items.length) return;

      const regcodes = await getRegSidos();
      const allSidos: OptionItem[] = regcodes.map(({ code, name }) => ({
        key: code.slice(0, 2),
        text: name,
      }));
      allSidos.unshift({ key: "*", text: "모든 지역" });

      setSido((prev) => ({ ...prev, items: allSidos }));
    }

    getAllSidos();
  }, [sido.items]);

  useEffect(() => {
    async function getSidoguns(sidoCode: string) {
      if (sidoCode === "*") {
        setSigungu((prev) => ({ ...prev, items: [] }));
        return;
      }

      const regcodes = await getRegSidoguns(sidoCode);

      const newSidoguns: OptionItem[] = regcodes.map(({ code, name }) => ({
        key: code.slice(2, 5),
        text: name.split(" ").splice(1).join(" "),
      }));
      newSidoguns.unshift({ key: "*", text: "모든 지역" });
      setSigungu((prev) => ({ ...prev, items: newSidoguns }));
    }
    getSidoguns(sido.selected);
  }, [sido.selected]);

  return { sido, setSido, sigungu, setSigungu };
}

export { useRegion };