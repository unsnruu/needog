export interface RegCodes {
  regcodes: RegCode[];
}
export interface RegCode {
  name: string;
  code: string;
}

export type HandleChangeSelect = React.ChangeEvent<HTMLSelectElement>;

export interface SearchState {
  selected: string | null;
  items: OptionItem[];
}

export interface Selected {
  pet: null | string;
  sido: null | string;
  sigungu: null | string;
}
export interface Items {
  pet: OptionItem[];
  sido: OptionItem[];
  sigungu: OptionItem[];
}

export type OptionItem = { key: string; text: string; disabled?: boolean };
