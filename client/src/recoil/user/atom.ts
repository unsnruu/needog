import { atom } from "recoil";

interface AuthAtom {
  userId: null | string;
  nickname: null | string;
  snsId: null | string;
}

const authAtom = atom<AuthAtom>({
  key: "userAtom",
  default: { userId: null, nickname: null, snsId: null },
});

export default authAtom;
