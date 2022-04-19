import React from "react";

type SelectProps = {
  optionItems: Option[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
export type Option = { key: string; text: string };

function Select({ optionItems, handleChange }: SelectProps) {
  return (
    <select onChange={handleChange}>
      {optionItems.map(({ key, text }) => (
        <option key={key} value={key}>
          {text}
        </option>
      ))}
    </select>
  );
}

export default Select;
