import { PetOption } from "./components/types";

const petInitItems: PetOption[] = [
  { key: "dog", text: "강아지" },
  { key: "cat", text: "고양이" },
  { key: "misc", text: "기타" },
];

export { petInitItems };

const allPet = { key: "*", text: "모든 동물" };
