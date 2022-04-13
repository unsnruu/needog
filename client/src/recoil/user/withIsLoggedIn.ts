import { selector } from "recoil";
import userAtom from "./atom";

const withIsLoggedIn = selector({
  key: "userWithIsLoggedIn",
  get: ({ get }) => {
    return get(userAtom).userId ? true : false;
  },
});

export default withIsLoggedIn;
