export interface RegCodes {
  regcodes: RegCode[];
}
export interface RegCode {
  name: string;
  code: string;
}

export type OptionItem = { key: string; text: string; disabled?: boolean };

export type HandleChangeSelect = React.ChangeEvent<HTMLSelectElement>;

export interface SearchState {
  selected: string | null;
  items: OptionItem[];
}
