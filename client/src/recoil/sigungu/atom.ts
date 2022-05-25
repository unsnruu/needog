import { atom, AtomEffect } from "recoil";
import { OptionItem } from "../../common/types";

const initialSigungu = {
  "1100000000": [],
  "2600000000": [],
  "2800000000": [],
  "2900000000": [],
  "3000000000": [],
  "3100000000": [],
  "4100000000": [],
  "4200000000": [],
  "4300000000": [],
  "4400000000": [],
  "4500000000": [],
  "4600000000": [],
  "4700000000": [],
  "4800000000": [],
  "5000000000": [],
};

type SigunguAtom = { [key: string]: OptionItem[] };
const initSigunguAtom: AtomEffect<SigunguAtom> = ({ node, setSelf }) => {
  setSelf({ a: [] });
};

const sigunguAtom = atom({
  key: "sigunguAtom",
  default: initialSigungu,
  effects: [initSigunguAtom],
});

export { sigunguAtom };
