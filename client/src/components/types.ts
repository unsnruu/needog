import { OptionItem } from "../Select";

export type HandleChangeSelect = React.ChangeEvent<HTMLSelectElement>;

export interface PetState {
  selected: PetKind;
  items: PetOption[];
}

export interface PetOption extends OptionItem {
  key: PetKind;
}

type PetKind = "dog" | "cat" | "misc" | "*" | string;
