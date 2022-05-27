import { atom, AtomEffect } from "recoil";
import sidoAtom from "../sido";
import { OptionItem } from "../../common/types";
import { getRegion } from "../../apis";

//! fetchSigunguEffect가 SearchForm에서 약 30번의 리렌더링을 발생시킨다.

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

const sigunguAtom = atom<SigunguAtom>({
  key: "sigunguAtom",
  default: {},
  effects: [initSigunguEffect],
});

export { sigunguAtom };

// const trimRawItems = ({ key, text }: OptionItem) => ({
//   key,
//   text: text.split(" ").slice(1).join(" "),
// });

// const fetchSigunguEffect: AtomEffect<SigunguAtom> = ({
//   node,
//   getLoadable,
//   setSelf,
//   trigger,
//   onSet,
// }) => {
//   const getSigunguValueFromJuso = async () => {
//     const allSigunguOptionItem = await getRegion("*00000", true);

//     if (!allSigunguOptionItem) return;
//     const newSigungu: SigunguAtom = {};
//     allSigunguOptionItem.forEach((item) => {
//       const { key } = item;
//       const newItemKey = key.slice(0, 2) + "00000000";
//       if (!newSigungu[newItemKey]) newSigungu[newItemKey] = [];
//       newSigungu[newItemKey].push(item);
//     });
//     // if (!sigunguRawOptionItems) return;
//     // const sigunguOptionItems = sigunguRawOptionItems.map((item) =>
//     //   trimRawItems(item)
//     // );
//     setSelf(newSigungu);
//   };

//   if (trigger === "get") {
//     const sigunguValue = getLoadable(node).getValue();
//     const keys = Object.keys(sigunguValue);
//     keys.forEach(async (key) => getSigunguValueFromJuso());
//   }

//   onSet((newVal, preVal, isReset) => {
//     console.log("isReset", isReset);
//   });
// };
