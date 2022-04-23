//API docs: https://juso.dev/
import axios from "axios";
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
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getRegSidos() {
      const {
        data: { regcodes },
      } = await axios.get<ReturnAxios>(`${jusoUrl}??00000000`, {
        cancelToken: source.token,
      });
      return regcodes;
    }

    async function getAllSidos() {
      if (sido.items.length) return;

      const regcodes = await getRegSidos();
      const allSidos: OptionItem[] = regcodes.map(({ code, name }) => ({
        key: code.slice(0, 2),
        text: name,
      }));
      // allSidos.unshift({ key: "*", text: "모든 지역" });

      setSido((prev) => ({ ...prev, items: allSidos }));
    }

    getAllSidos();
    return () => {
      source.cancel("Cancel getAllSidos");
    };
  }, [sido.items]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getRegSidoguns(sidoCode: string) {
      const {
        data: { regcodes },
      } = await axios.get<ReturnAxios>(
        `${jusoUrl}${sidoCode}*00000&is_ignore_zero=true`,
        { cancelToken: source.token }
      );
      return regcodes;
    }
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
      // newSidoguns.unshift({ key: "*", text: "모든 시군구" });
      setSigungu((prev) => ({ ...prev, items: newSidoguns }));
    }
    getSidoguns(sido.selected);
    return () => {
      source.cancel("Cancel getSidoguns");
    };
  }, [sido.selected]);

  return { sido, setSido, sigungu, setSigungu };
}

export { useRegion };
