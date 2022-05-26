import { atom, AtomEffect } from "recoil";
import sidoAtom from "../sido";
import { OptionItem } from "../../common/types";
import { getRegion, getSigunguQuery } from "../../apis";

type SigunguAtom = { [key: string]: OptionItem[] };

const initSigunguEffect: AtomEffect<SigunguAtom> = ({
  getLoadable,
  setSelf,
}) => {
  const sidoAtomValue = getLoadable(sidoAtom).getValue();
  const sidoCodes = sidoAtomValue.map(({ key }) => key);

  const newSigungu: SigunguAtom = {};
  sidoCodes.forEach((code) => {
    if (!newSigungu[code]) newSigungu[code] = [];
  });

  setSelf(newSigungu);
};

const fetchSigunguEffect: AtomEffect<SigunguAtom> = ({
  node,
  getLoadable,
  setSelf,
  trigger,
}) => {
  const getSigunguFromJuso = async (sidoCode: string) => {
    const sigunguItmes = await getRegion(getSigunguQuery(sidoCode));

    if (!sigunguItmes) return;
    const newState = {
      ...getLoadable(node).getValue(),
      [sidoCode]: sigunguItmes,
    };
    setSelf(newState);
  };

  if (trigger === "get") {
    const sigunguValue = getLoadable(node).getValue();
    const keys = Object.keys(sigunguValue);
    keys.forEach(async (key) => getSigunguFromJuso(key));
  }
};

const sigunguAtom = atom<SigunguAtom>({
  key: "sigunguAtom",
  default: {},
  effects: [initSigunguEffect, fetchSigunguEffect],
});

export { sigunguAtom };

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
