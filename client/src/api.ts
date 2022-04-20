//API docs: https://juso.dev/
import axios from "axios";

interface ReturnAxios {
  regcodes: RegCode[];
}
interface RegCode {
  name: string;
  code: string;
}
interface JusoUrlParams {
  query: string;
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

export { getRegSidos, getRegSidoguns };
