import { atom, AtomEffect } from "recoil";
import sidoAtom from "../sido";
import { OptionItem } from "../../common/types";
import { getRegion } from "../../apis";

//! fetchSigunguEffect가 SearchForm에서 약 30번의 리렌더링을 발생시킨다.
/**
 *   if (trigger === "get") {
    const sigunguValue = getLoadable(node).getValue();
    const keys = Object.keys(sigunguValue);
    keys.forEach(async () => getSigunguValueFromJuso());
  }

  발생했떤 이유는 해당 로직에 있었음
  이번에 한번에 받아오므로 getSigunguValueFromJuso를 한번만 호출하면 된다.
 * 
 */

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

const parseSigunguKey = (regcode: string) => regcode.slice(0, 2) + "00000000";
const extractSidoText = (text: string): string => {
  const split = text.split(" ");
  if (split.length === 1) return text;
  else return split.slice(1).join(" ");
};
const fetchSigunguEffect: AtomEffect<SigunguAtom> = ({
  node,
  getLoadable,
  setSelf,
  trigger,
  onSet,
}) => {
  const getSigunguValueFromJuso = async () => {
    const allRegionOptionItems = await getRegion("*00000", true);
    if (!allRegionOptionItems) return;

    const newSigunguValues: SigunguAtom = {};
    //받아온 모든 지역 정보를 시/군/구 별 분류
    allRegionOptionItems.forEach(({ key, text }) => {
      const sigunguKey = parseSigunguKey(key);

      //시군구의 초기화 작업 및 처음 값으로 모든 지역에 대한 오브젝트를 삽입
      if (!newSigunguValues[sigunguKey])
        newSigunguValues[sigunguKey] = [{ key: "all", text: "모든 지역" }];
      //시, 도와 완전히 일치하는 경우에는 제외
      if (sigunguKey === key) return;
      newSigunguValues[sigunguKey].push({
        key,
        text: extractSidoText(text),
      });
    });

    setSelf(newSigunguValues);
  };

  if (trigger === "get") {
    getSigunguValueFromJuso();
  }

  onSet((newVal, preVal, isReset) => {
    console.log("isReset", isReset);
  });
};

const sigunguAtom = atom<SigunguAtom>({
  key: "sigunguAtom",
  default: {},
  effects: [initSigunguEffect, fetchSigunguEffect],
});

export { sigunguAtom };
