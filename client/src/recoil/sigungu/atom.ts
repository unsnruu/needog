import { atom, AtomEffect } from "recoil";
import sidoAtom from "../sido";
import { OptionItem } from "../../common/types";

// const initialSigungu = {
//   "1100000000": [],
//   "2600000000": [],
//   "2800000000": [],
//   "2900000000": [],
//   "3000000000": [],
//   "3100000000": [],
//   "4100000000": [],
//   "4200000000": [],
//   "4300000000": [],
//   "4400000000": [],
//   "4500000000": [],
//   "4600000000": [],
//   "4700000000": [],
//   "4800000000": [],
//   "5000000000": [],
// };

type SigunguAtom = { [key: string]: OptionItem[] };
const getSigunguFromJuso = async (sidoCode: string) => {};

const initSigunguAtom: AtomEffect<SigunguAtom> = ({ getLoadable, setSelf }) => {
  const sidoAtomValue = getLoadable(sidoAtom).getValue();
  const sidoCodes = sidoAtomValue.map(({ key }) => key);

  const newSigungu: SigunguAtom = {};
  sidoCodes.forEach((code) => {
    if (!newSigungu[code]) newSigungu[code] = [];
  });
  setSelf(newSigungu);
};

const sigunguAtom = atom<SigunguAtom>({
  key: "sigunguAtom",
  default: {},
  effects: [initSigunguAtom],
});

export { sigunguAtom };
