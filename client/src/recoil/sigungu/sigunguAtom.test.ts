import { snapshot_UNSTABLE } from "recoil";
import { sigunguAtom } from "./atom";

test("recoil이 제대로 작동되는지 확인", () => {
  const initialSnapshot = snapshot_UNSTABLE();
  const value = initialSnapshot.getLoadable(sigunguAtom).getValue();
  console.log(value);
  expect(value).toMatchObject({
    a: [],
  });
});
