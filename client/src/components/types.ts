export type HandleChangeSelect = React.ChangeEvent<HTMLSelectElement>;

export interface PetState {
  selected: PetKind;
  items: PetOption[];
}

export interface PetOption {
  key: PetKind;
  text: string;
}

type PetKind = "dog" | "cat" | "misc" | "*" | string;
