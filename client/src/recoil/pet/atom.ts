import { atom } from "recoil";
import { OptionItem } from "../../common/types";

const petAtom = atom<OptionItem[]>({
  key: "petAtom",
  default: [
    { key: "dog", text: "강아지" },
    { key: "cat", text: "고양이" },
    { key: "misc", text: "기타 동물" },
  ],
});

export { petAtom };
