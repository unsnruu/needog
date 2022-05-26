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
const trimRawItems = ({ key, text }: OptionItem) => ({
  key,
  text: text.split(" ").slice(1).join(" "),
});
const fetchSigunguEffect: AtomEffect<SigunguAtom> = ({
  node,
  getLoadable,
  setSelf,
  trigger,
}) => {
  const getSigunguValueFromJuso = async (sidoCode: string) => {
    const sigunguRawOptionItems = await getRegion(getSigunguQuery(sidoCode));

    if (!sigunguRawOptionItems) return;
    const sigunguOptionItems = sigunguRawOptionItems.map((item) =>
      trimRawItems(item)
    );
    const newState = {
      ...getLoadable(node).getValue(),
      [sidoCode]: sigunguOptionItems,
    };

    setSelf(newState);
  };

  if (trigger === "get") {
    const sigunguValue = getLoadable(node).getValue();
    const keys = Object.keys(sigunguValue);
    keys.forEach(async (key) => getSigunguValueFromJuso(key));
  }
};

const sigunguAtom = atom<SigunguAtom>({
  key: "sigunguAtom",
  default: {},
  effects: [initSigunguEffect, fetchSigunguEffect],
});

export { sigunguAtom };
