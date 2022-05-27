// https://juso.dev/

import axios from "axios";
import { OptionItem, RegCode, RegCodes } from "../common/types";

const API_URL = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=`;
const convertToOptionItem = ({ code, name }: RegCode): OptionItem => ({
  key: code,
  text: name,
});

export default async function getRegion(query: string, isIgnore: boolean) {
  const ignoreFlag = isIgnore ? "&is_ignore_zero=true" : "";
  const requestURL = API_URL + query + ignoreFlag;

  try {
    const {
      data: { regcodes },
    } = await axios.get<RegCodes>(requestURL);

    if (!regcodes.length) return;

    //regCodes를 OptionItem형식으로 바꾸기
    const convertedRegionItem = regcodes.map((regcode) =>
      convertToOptionItem(regcode)
    );

    return convertedRegionItem;
  } catch (error) {
    console.error(error);
  }
}
