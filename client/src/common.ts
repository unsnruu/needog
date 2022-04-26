import { PetOption } from "./components/types";

const petInitItems: PetOption[] = [
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];

const allPet = { key: "*", text: "모든 동물" };

const getBaseUrl = (pathname: string) => {
  const split = pathname.split("/").filter((v) => v !== "");

  return split[0];
};

export { petInitItems, getBaseUrl };
