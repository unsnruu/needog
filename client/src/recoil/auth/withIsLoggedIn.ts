import { selector } from "recoil";
import authAtom from "./atom";

const withIsLoggedIn = selector({
  key: "authWithIsLoggedIn",
  get: ({ get }) => {
    return get(authAtom).isLoggedIn;
  },
});

export default withIsLoggedIn;
