import { useRecoilValue } from "recoil";
import { sigunguAtom } from "./atom";

test("recoil이 제대로 작동되는지 확인", () => {
  const sigungu = useRecoilValue(sigunguAtom);
  expect(sigungu).toMatchObject({ a: 1 });
});
