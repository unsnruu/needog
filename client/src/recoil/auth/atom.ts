import { atom } from "recoil";

// 아니면 selector을 사용해서 user 객체가 있는지를 판단할까?
const authAtom = atom({
  key: "authAtom",
  default: { user: {}, isLoggedIn: false },
});

export default authAtom;
