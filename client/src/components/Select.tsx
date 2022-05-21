import React from "react";
import { OptionItem } from "../common/types";

type SelectProps = {
  name: string;
  optionItems: OptionItem[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select({ name, optionItems, handleChange }: SelectProps) {
  if (!optionItems.length) return null;

  return (
    <select
      onChange={handleChange}
      defaultValue={optionItems[0].key}
      data-testid={name}
    >
      {optionItems.map(({ key, text, disabled }) => (
        <option key={key} value={key} label={text}>
          {text}
        </option>
      ))}
    </select>
  );
}

export default Select;
