import React from "react";
import { OptionItem } from "../common/types";

type SelectProps = {
  name: string;
  optionItems: OptionItem[] | null;
};

function Select({ name, optionItems }: SelectProps) {
  if (!optionItems) return null;

  return (
    <select defaultValue={optionItems[0].key} data-testid={name}>
      {optionItems.map(({ key, text, disabled }) => (
        <option key={key} value={key} label={text}>
          {text}
        </option>
      ))}
    </select>
  );
}

export default Select;
