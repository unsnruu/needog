//API docs: https://juso.dev/
// todo :  요청이 너무 많이 가는 문제가 있는 듯. 어떻게 하면 요청을 줄일 수 있을까.
import { useState, useEffect } from "react";
import axios from "axios";

import { OptionItem } from "../common/types";
import { SearchState } from "../common/types";

interface RegCodes {
  regcodes: RegCode[];
}
interface RegCode {
  name: string;
  code: string;
}

type Query = string | null;

const URL = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes`;

function useRegion(query: Query) {
  const [region, setRegion] = useState<SearchState>({
    selected: null,
    items: [],
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getRegion(query: string | null) {
      if (!query) return;

      const requestURL = URL + "?regcode_pattern=" + query;
      try {
        const { data } = await axios.get<RegCodes>(requestURL, {
          cancelToken: source.token,
        });
        const { regcodes } = data;
        if (!regcodes.length) return;
        //regCodes를 OptionItem형식으로 바꾸기
        const newRegionItems = regcodes.map((regcode) =>
          convertToOptionItem(regcode)
        );
        setRegion((prev) => ({
          ...prev,
          items: [...prev.items, ...newRegionItems],
        }));
      } catch (error) {
        console.error(error);
      }
    }

    getRegion(query);

    return () => source.cancel("Cancel getRegion");
  }, [query]);

  return [region, setRegion] as [
    SearchState,
    React.Dispatch<React.SetStateAction<SearchState>>
  ];
}

function convertToOptionItem({ code, name }: RegCode): OptionItem {
  return { key: code, text: name };
}

export default useRegion;
