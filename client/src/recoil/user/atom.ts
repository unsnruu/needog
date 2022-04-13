import { atom } from "recoil";

const authAtom = atom({
  key: "userAtom",
  default: { userId: null, nickname: null, snsId: null },
});

export default authAtom;
