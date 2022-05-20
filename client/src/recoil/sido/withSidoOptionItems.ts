import { selector } from "recoil";
import sidoAtom from "./atom";
import { OptionItem } from "../../common/types";

const withSidoOptionItems = selector<OptionItem[]>({
  key: "withSidoOptionItems",
  get: ({ get }) => {
    const sidoRegItems = get(sidoAtom);
    return sidoRegItems.map(({ code, name }) => ({ key: code, text: name }));
  },
});

export default withSidoOptionItems;
