import { CardProp } from "../components/Card";

export interface RegCodes {
  regcodes: RegCode[];
}
export interface RegCode {
  name: string;
  code: string;
}

export type HandleChangeSelect = React.ChangeEvent<HTMLSelectElement>;

export interface Selected {
  pet: string;
  sido: string;
  sigungu: string;
}
export interface Items {
  pet: OptionItem[];
  sido: OptionItem[];
  sigungu: OptionItem[];
}
export type SearchKey = "pet" | "sido" | "sigungu";

export type OptionItem = { key: string; text: string; disabled?: boolean };

export type CardItem = Omit<CardProp, "pathname">;
