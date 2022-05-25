import { snapshot_UNSTABLE } from "recoil";
import { sigunguAtom } from "./atom";

const initialSigungu = {
  "1100000000": [],
  "2600000000": [],
  "2800000000": [],
  "2900000000": [],
  "3000000000": [],
  "3100000000": [],
  "4100000000": [],
  "4200000000": [],
  "4300000000": [],
  "4400000000": [],
  "4500000000": [],
  "4600000000": [],
  "4700000000": [],
  "4800000000": [],
  "5000000000": [],
};

test("recoil이 제대로 작동되는지 확인", () => {
  const initialSnapshot = snapshot_UNSTABLE();
  const value = initialSnapshot.getLoadable(sigunguAtom).getValue();

  expect(value).toMatchObject(initialSigungu);
});
